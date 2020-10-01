function roundify(options, nodes) {
    var start = options.start || 135,
        delta = options.delta || 70,
        radius = options.radius || 300;

    for(var i = nodes.length -1, n; n = nodes[i]; i--) {
      var newY = (i / (nodes.length - 1)) * delta - start + 90;
      
      n.style.transform = "rotate("+ newY +"deg)";
      n.style.display = "block";
      n.style.position = "absolute";
      n.style.transformOrigin = "50% " + radius + 'px';
      
      if (delta < 0) {
        n.innerHTML = '<span class="upside-down">' + n.textContent + '</span>';
      }
    }
  }

  function spanSplit(text, className) {
    return text.trim().split("").map(function(e, i) {
      return '<span class="' + className + '">'+ e.replace(/ /, "&nbsp;") + '</span>';
    }).join("");
  }

  function initRound() {
    var targets = document.querySelectorAll("[data-round]");
    for (var i = 0, e; e = targets[i]; ++i) {
      var roundOptions = {
        start: e.getAttribute('data-round-start') || 135,
        delta: e.getAttribute('data-round-delta') || 70,
        radius: e.getAttribute('data-round-radius') || 250
      }
      
      e.innerHTML = spanSplit(e.textContent, 'roundy-letter');
      roundify(roundOptions, e.childNodes);
    }    
  }

  function init() {
    initRound();
  }

  init();