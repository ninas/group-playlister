var youtubeReady = false;

function asyncYoutubeLoad(){
  var tag = document.createElement('script');
  tag.src = "https://www.youtube.com/player_api";
  var firstScriptTag = document.getElementsByTagName('script')[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
}

function onYouTubePlayerAPIReady() {
  youtubeReady = true;
}

function playYoutubeVideo(id) {
  var player = new YT.Player('youtube', {
    height: '390',
    width: '640',
    videoId: id
  });
}

function loadYoutube(id) {

}

function isYoutube(link) {
  return link.search("/yout(\.be|ube\.com)\/watch\?v=/ig") !== -1;
}

