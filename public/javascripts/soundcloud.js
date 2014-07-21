var scPlayer;
function loadSoundCloud() {
  SC.initialize({
    client_id: 'b6cd4d7342379aeac382f50db0cd0d2f'
  });
};

function songFinished(){
  console.log("event fired");
  playlistDetails.current += 1;
  loadNextVid();
}

function playSC(url) {
  if (!SC) {
    setTimeout(function() { playSC(url); }, 500);
  } else {
    SC.oEmbed(url, { auto_play: true }, function(oEmbed) {
      var widget_html = $(oEmbed.html);
      $('#soundcloud').
        empty().
        append(widget_html);
      SC.Widget(widget_html).bind(SC.Widget.Events.PLAY_PROGRESS, songFinished);
      console.log(oEmbed);
    });
    $('#youtube').hide();
    $('#soundcloud').show();
  }
}

function isSoundCloud(link) {
  return link.search(/soundcloud\.com/gi) >= 0;
}
