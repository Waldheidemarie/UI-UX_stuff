const MQTT_URL = 'wss://mqtt.hsl.fi/';
const GRAPHQL_URL = 'https://api.digitransit.fi/routing/v1/routers/hsl/index/graphql';
const STOP_INTERSECT_DISTANCE = 5;

const SCALE = [
new Tone.Buffer('https://s3-us-west-2.amazonaws.com/s.cdpn.io/969699/scale-G2.mp3'),
new Tone.Buffer('https://s3-us-west-2.amazonaws.com/s.cdpn.io/969699/scale-A2.mp3'),
new Tone.Buffer('https://s3-us-west-2.amazonaws.com/s.cdpn.io/969699/scale-C3.mp3'),
new Tone.Buffer('https://s3-us-west-2.amazonaws.com/s.cdpn.io/969699/scale-D3.mp3'),
new Tone.Buffer('https://s3-us-west-2.amazonaws.com/s.cdpn.io/969699/scale-E3.mp3'),
new Tone.Buffer('https://s3-us-west-2.amazonaws.com/s.cdpn.io/969699/scale-G3.mp3'),
new Tone.Buffer('https://s3-us-west-2.amazonaws.com/s.cdpn.io/969699/scale-A3.mp3'),
new Tone.Buffer('https://s3-us-west-2.amazonaws.com/s.cdpn.io/969699/scale-C4.mp3'),
new Tone.Buffer('https://s3-us-west-2.amazonaws.com/s.cdpn.io/969699/scale-D4.mp3'),
new Tone.Buffer('https://s3-us-west-2.amazonaws.com/s.cdpn.io/969699/scale-E4.mp3')];


const RHYTHM_GRAMMAR = {
  pattern: [['#cell#', '#pattern#'], ['#cell#', '#cell#']],
  cell: [['#twoCell#'], ['#threeCell#']],
  twoCell: [['8n', '8n'], ['4n']],
  threeCell: [['8n', '8n', '8n'], ['4n', '8n'], ['8n', '4n']] };


const compressor = new Tone.Compressor().toMaster();
const trams = new Map();
const stops = new Map();
const incomingIntersections = [];
const showingLabels = SCALE.map(() => []);
const timeFormat = new Intl.DateTimeFormat([], {
  timeZone: 'Europe/Helsinki',
  hour: 'numeric', minute: 'numeric' });

const effectsEl = document.querySelector('#effects');
const timeEl = document.querySelector('#current-time');
let rhythmPattern = new Tone.CtrlPattern(expandRhythmPattern(), 'up');
let latLngBounds;


// Initialize the map
patchMapTileGapBug();
const map = L.map('map', {
  center: [60.1799, 24.9384],
  zoom: 13,
  zoomControl: false,
  zoomSnap: 0,
  boxZoom: false,
  doubleClickZoom: false,
  scrollWheelZoom: false,
  dragging: false,
  inertia: false,
  zoomAnimation: false,
  keyboard: false,
  touchZoom: false,
  attributionControl: false });

L.tileLayer('http://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png', {
  attribution: 'Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>. Map imagery &copy; <a href="http://cartodb.com/attributions">CartoDB</a>',
  subdomains: 'abcd',
  maxZoom: 19 }).
addTo(map);
map.addControl(L.control.attribution({
  position: 'bottomright',
  prefix: 'By <a href="https://twitter.com/teropa">@teropa</a>. Data from <a href="http://dev.hsl.fi/">HSL</a>' }));



// Time tick: Update on-screen clock once a second and change the rhythm pattern once a minute
setInterval(() => {
  timeEl.textContent = timeFormat.format(new Date());
  if (new Date().getSeconds() === 0) {
    const newPtn = expandRhythmPattern();
    rhythmPattern = new Tone.CtrlPattern(newPtn, 'up');
  }
}, 1000);

function expandRhythmPattern(token = '#pattern#') {
  if (token.startsWith('#') && token.endsWith('#')) {
    const options = RHYTHM_GRAMMAR[token.substring(1, token.length - 1)];
    const choice = options[Math.floor(Math.random() * options.length)];
    return choice.reduce((result, token) => result.concat(expandRhythmPattern(token)), []);
  } else {
    return [token];
  }
}

// Load stops from the API
fetch(GRAPHQL_URL, {
  method: 'POST',
  headers: { 'Content-Type': 'application/graphql' },
  body: '{ routes(modes: "TRAM") { shortName id stops { id name lat lon }}}' }).

then(res => res.json()).
then(res => {
  let minLatLng, maxLatLng;
  res.data.routes.forEach(route => {
    const routeStops = new Map();
    route.stops.forEach((stop, idx) => {
      routeStops.set(stop.id, { pos: new L.LatLng(stop.lat, stop.lon), name: stop.name });
      if (!minLatLng || minLatLng.lat < stop.lat) {
        minLatLng = new L.LatLng(stop.lat, stop.lon);
      }
      if (!maxLatLng || maxLatLng.lat > stop.lat) {
        maxLatLng = new L.LatLng(stop.lat, stop.lon);
      }
    });
    stops.set(route.shortName, routeStops);

  });
  latLngBounds = new L.LatLngBounds(minLatLng, maxLatLng);
  map.fitBounds(latLngBounds, { padding: new L.Point(10, 10) });


  // Connect to tram data feed, push all incoming messages to the queue
  const clientId = new Date().toString() + Math.random();
  const client = new Paho.MQTT.Client(MQTT_URL, clientId);
  client.onMessageArrived = message => {
    console.log('i');
    let parsed = JSON.parse(message.payloadString);
    processMessage(parsed);
  };
  client.connect({ onSuccess: () => {
      client.subscribe('/hfp/v2/journey/ongoing/vp/tram/+/+/+/+/+/+/+/3/#');
    } });
});



function processMessage({ VP: { desi, lat, long, tsi, veh } }) {
  const pos = L.latLng(lat, long);
  let tram;
  if (trams.has(veh)) {
    tram = trams.get(veh);
  } else {
    tram = {
      desi: '' + desi,
      veh,
      marker: L.circleMarker(pos, { className: 'tram', radius: 5 }) };

    trams.set(veh, tram);
  }
  tram.previousPos = tram.pos;
  tram.previousPt = tram.pt;
  tram.pos = pos;
  tram.pt = map.latLngToContainerPoint(pos);

  const intersectedStop = detectStopIntersection(tram);
  const intersectedIsNew = intersectedStop && intersectedStop !== tram.lastIntersectedStop;
  tram.lastIntersectedStop = intersectedStop;

  if (intersectedIsNew) {
    incomingIntersections.push({ tram, intersectedStop });
  }
  tram.marker.setLatLng(pos);
  tram.marker.addTo(map);
}

// Consume the queue following the current rhythm pattern
function dequeNext(time) {
  if (incomingIntersections.length) {
    let { tram, intersectedStop } = incomingIntersections.shift();
    playIntersection(time, tram, intersectedStop);
    Tone.Draw.schedule(() => {
      drawRing(tram);
      drawLabel(tram, intersectedStop);
    }, time);
  }
  Tone.Transport.schedule(dequeNext, '+' + rhythmPattern.next());
}
Tone.Buffer.on('load', () => Tone.Transport.schedule(dequeNext, '+' + rhythmPattern.next()));



function drawRing(tram) {
  const centerX = document.documentElement.offsetWidth / 2;
  const centerY = document.documentElement.offsetHeight / 2;
  const driftX = tram.previousPt ? (tram.pt.x - tram.previousPt.x) / 3 : 0;
  const driftY = tram.previousPt ? (tram.pt.y - tram.previousPt.y) / 3 : 0;
  const toX = (centerX - tram.pt.x) * 4.8 / 5 + driftX;
  const toY = (centerY - tram.pt.y) * 4.8 / 5 + driftY;
  const toZ = 490;
  const el = document.createElement('div');
  el.classList.add('intersection-effect');
  el.style.top = `${tram.pt.y - 8}px`;
  el.style.left = `${tram.pt.x - 8}px`;
  effectsEl.appendChild(el);
  el.animate([
  { opacity: 0, transform: 'translate3d(0, 0, 0)' },
  { opacity: 1, transform: 'translate3d(0, 0, 0)', offset: 0.2 },
  { opacity: 0, transform: `translate3d(${toX}px, ${toY}px, ${toZ}px)` }],
  {
    duration: 6000,
    easing: 'cubic-bezier(0.215, 0.61, 0.355, 1)' }).
  onfinish = () => el.remove();
}

function drawLabel(tram, stop) {
  if (tram.pt.y < 0 || tram.pt.y > document.documentElement.offsetHeight) {
    return;
  }

  const noteHeight = document.documentElement.offsetHeight / SCALE.length;
  const labelNote = Math.floor(tram.pt.y / noteHeight);
  const labelBaseY = labelNote * noteHeight + 5;
  let labelIndex = -1;
  for (let i = 0; i < showingLabels[labelNote].length; i++) {
    if (!showingLabels[labelNote][i]) {
      labelIndex = i;
    }
  }
  if (labelIndex === -1) labelIndex = showingLabels[labelNote].length;

  const labelEl = document.createElement('div');
  labelEl.classList.add('label');
  labelEl.style.top = `${labelBaseY + labelIndex * 13}px`;
  labelEl.textContent = `${tram.desi} ${stop.name}`;
  effectsEl.appendChild(labelEl);
  showingLabels[labelNote][labelIndex] = labelEl;
  setTimeout(() => labelEl.classList.add('enter'), 0);
  setTimeout(() => {
    labelEl.remove();
    showingLabels[labelNote][labelIndex] = null;
  }, 8000);
}

function detectStopIntersection(tram) {
  if (stops.has(tram.desi)) {
    for (const [stopId, stop] of stops.get(tram.desi).entries()) {
      const distanceToStop = tram.pos.distanceTo(stop.pos);
      if (distanceToStop < STOP_INTERSECT_DISTANCE) {
        return stop;
      }
    }
  }
}

function playIntersection(time, tram, stop) {
  const screenWidth = document.documentElement.offsetWidth;
  const pan = Math.max(-1, Math.min(1, tram.pt.x / screenWidth * 2 - 1));
  const note = getNote(tram);
  if (note >= 0 && note < SCALE.length) {
    const panner = new Tone.Panner(pan).connect(compressor);
    const player = new Tone.Player(SCALE[note]).connect(panner);
    player.volume.value = -6;
    player.start(time);
    // Courtesy of @quinnirill https://twitter.com/quinnirill/status/907557984460570624
    player._source.playbackRate.linearRampToValueAtTime(1.035, time + 10);
    setTimeout(() => player.dispose(), 10000);
  } else {
    console.log('No note for', note);
  }
}

function getNote(tram) {
  const screenHeight = document.documentElement.offsetHeight;
  return Math.floor((screenHeight - tram.pt.y) / screenHeight * SCALE.length);
}

Tone.context.latencyHint = 'playback';
Tone.Transport.bpm.value = 50;

function patchMapTileGapBug() {
  // Workaround for 1px lines appearing in some browsers due to fractional transforms
  // and resulting anti-aliasing. adapted from @cmulders' solution:
  // https://github.com/Leaflet/Leaflet/issues/3575#issuecomment-150544739
  let originalInitTile = L.GridLayer.prototype._initTile;
  if (originalInitTile.isPatched) return;
  L.GridLayer.include({
    _initTile: function (tile) {
      originalInitTile.call(this, tile);

      var tileSize = this.getTileSize();

      tile.style.width = tileSize.x + 1 + 'px';
      tile.style.height = tileSize.y + 1 + 'px';
    } });

  L.GridLayer.prototype._initTile.isPatched = true;
}

window.addEventListener('resize', () => {
  map.fitBounds(latLngBounds, { padding: new L.Point(10, 10) });
});

document.getElementById('start').onclick = e => {
  Tone.context.resume();
  Tone.Transport.start();
  e.target.remove();
};