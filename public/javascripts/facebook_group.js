var playlistDetails = {
  prev: undefined,
  next: undefined,
  current: 0,
  list: []
};

function checkGroupPermissions(groupId) {
  FB.api(
      "/" + groupId,
      function (response) {
        if (response && !response.error) {
          console.log(response);
          $('#fullGroupName').text(response.name);
          $('#groupDescription').text(response.description);
          pullFBFeed(groupId);
        } else { // Error retrieving
          groupInputError('That group doesn\'t exist - the name can be found in the url: www.facebook.com/group/<COPY_ME>'); 

        }
      }
  );
}

function pullFBFeed(groupId){
  if (playlistDetails.next) {
    FB.api(playlistDetails.next, loadFeed);
  } else {
    FB.api('/' + groupId + '/feed', loadFeed);
  }
}

function loadFeed(response) {
  if (response && !response.error) {
    console.log(response);
    var playlist = $('#playlist');
    var currentMax = playlistDetails.list.length;
    $.each(response.data, function(i, val) {
      var link = undefined;
      if (val.type == "video") {
        link = val.link;
      } else {
        console.log("link not detected by FB");
      } 
      playlist.append(createPlaylistItem(val.picture, link, val.name, currentMax + i));
      playlistDetails.list.push(val);
    });
    playlistDetails.next = response.paging.next;
    if (playlistDetails.current === currentMax) {
      loadNextVid();
    }
  } else { // Error retrieving
    groupInputError('Error loading feed :('); 
  }
}

function createPlaylistItem(pic, link, name, pos) {
    return $('<li></li>').
    addClass('row').
    addClass('playlistItem').
    attr('id', pos).
    append($('<img/>', { 
      src: pic,
      "class": 'col-md-2'
    })).
    append($('<div></div>').
      addClass('col-md-10').
      append($('<a/>').
        addClass('row').
        attr('href', link).
        text(name))
    );
}

function loadNextVid() {
  var data = playlistDetails.list[playlistDetails.current]; 
  if (isYoutube(data.link)) {
    var id = data.link.split("?v=")[1];
    loadYoutube(id);
  } else {
    console.log("format not yet supported");
  } 
}

function loadYoutube(id) {

}

function isYoutube(link) {
  return link.search("/yout(\.be|ube\.com)\/watch\?v=/ig") !== -1;
}

function performRetrieval(groupId) {
  asyncYoutubeLoad(); 
  checkGroupPermissions(groupId);
}
