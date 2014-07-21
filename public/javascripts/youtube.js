var youtubePlayer;

function asyncYoutubeLoad(){
  var tag = document.createElement('script');
  tag.src = "https://www.youtube.com/player_api";
  var firstScriptTag = document.getElementsByTagName('script')[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
}

function onYouTubePlayerAPIReady() {
  youtubeReady = true;
  //$('#youtube').hide();
  youtubePlayer = new YT.Player('youtube', {
    height: '390',
    width: '640',
    events: {
      'onReady': onPlayerReady,
      'onStateChange': onPlayerStateChange
    }
  });
}

function playYoutubeVideo(id) {
  if (!youtubePlayer) {
    setTimeout(function() { playYoutubeVideo(id); }, 500);
  } else {
    youtubePlayer.loadVideoById(id);
    $('#soundcloud').hide();
    $('#youtube').show();
  }
}

function onPlayerReady(event) {
  //event.target.playVideo();
}

function onPlayerStateChange(event) {
  console.log(event);
  if (event.data === 0) {
    playlistDetails.current += 1;
    loadNextVid();
  }
}
function isYoutube(link) {
  if (link) {
    return link.search(/yout(\.be|ube\.com)\/watch\?v=/ig) !== -1;
  }
  return false;
}

