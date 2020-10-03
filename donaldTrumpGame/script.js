var $container   = $('.container'),
    $body        = $('body'),
    $dialog      = $('dialog'),
    $pop_troll   = $('.pop-troll'),
    original_img = 'http://www.gannett-cdn.com/-mm-/28345c0779915e5dad712c71cd12fd9ac089576a/c=64-0-1536-1107&r=x404&c=534x401/local/-/media/2016/02/01/USATODAY/USATODAY/635899172550523040-trump.png',
    current_weapon;

var messages = {
  music: '<p>"Surprise, Sanders! T Swift\'s my girl.</p><p>No one loves her music more than me!"</p>',
  feather: '<p>"A feather, Sanders? You used a feather?</p><p>I\'ll dodge that tickler all day."</p>',
  mirror: '<p>Damn you, Sanders! Losing really sucks.</p><p>I…cannot…lose…yet…I\'m about to…</p>',
  final: '<p>It\'s been a long, brutal road, Trump.</p><p>Game over. I win. That\'s it.</p>',
  button: '<button class="continue">Continue</button>',
  final_button: '<button class="start-over">Continue</button>'
};

function resetScene() {
  $body
    .addClass('start-battle')
    .removeClass('melee-active start-dancing');

  $dialog.removeClass('show');
  $pop_troll.attr('src', original_img);
}

function dialogCloseHandler() {
  resetScene();

  if (current_weapon !== undefined) {
    $body.addClass('remove-' + current_weapon);

    if (current_weapon === 'music') {
      $('.shitty-music').remove();
    }

    if (current_weapon === 'mirror') {
      finish();
    }
  }
}

function finish() {
  clearDialog();
  setTimeout(function() {
    $('#start-screen').removeClass('active');
    $('#end-screen').addClass('active');
    current_weapon = 'final';
    $body.addClass(' melee-active');
    $('.real-trump-wrapper').remove();

    $dialog
      .removeClass('trump')
      .find('.content')
      .html(messages[current_weapon] + messages['final_button']);

    setTimeout(function() {
      $dialog.addClass('show');
      $('#dialog-close-button').off().on('click', startOver);
    }, 500);
  }, 500);
}

function chooseWeapon() {
  var $this = $(this);

  if (current_weapon !== undefined) {
    $body.removeClass(current_weapon + ' remove-' + current_weapon);
  }

  current_weapon = $this.attr('data-weapon');

  $this.addClass('active used');
  $body.addClass('melee-active ' + current_weapon);

  if (current_weapon === 'music') {
    playShittyMusic();
  } else if (current_weapon === 'feather') {
    tickle();
  }

  showDialog();
}

function showDialog() {
  var delay = current_weapon === 'mirror' ? 4500 : 500;

  clearDialog();
  $dialog
    .addClass('trump')
    .find('.content')
    .html(messages[current_weapon] + messages['button']);

  setTimeout(function() {
    $dialog.addClass('show');
  }, delay)
}

function tickle() {
  var uri = 'http://www.punchdonaldtrump.com/images/donald0.png';
  $pop_troll.attr('src', uri);
  $body.addClass('start-dancing');
}

function clearDialog() {
  $dialog.removeClass('show').find('.content').html('');
}

function playShittyMusic() {
  var resources = {
    uri: 'https://defeatdonaldtrump.com/wp-content/uploads/2014/08/trump-pointing.png',
    audio_src: 'https://upload.wikimedia.org/wikipedia/en/2/23/Eyes_Open_%28Taylor_Swift%29.ogg'
  }

  $body.append('<audio class="shitty-music" autoplay><source src="' + resources.audio_src + '"></audio>');
  $pop_troll.attr('src', resources.uri);
}

function startOver() {
  clearDialog();
  $('#dialog-close-button').off().on('click', dialogCloseHandler);
  $body.attr('class', '');
  $('#end-screen').removeClass('active');
  $('#start-screen').addClass('active');
}

function init() {
  $dialog.addClass('show');
}

$('#dialog-close-button').on('click', dialogCloseHandler);
$('#weapons li:not(.used)').on('click', chooseWeapon);
$body.on('click', '.start-over', startOver);
$body.on('click', '.continue', dialogCloseHandler);

init();