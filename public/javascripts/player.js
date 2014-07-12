var playlistDetails = {
  prev: undefined,
  next: undefined,
  current: 0,
  list: []
};

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
  if (data.link && isYoutube(data.link)) {
    var id = data.link.split("?v=")[1];
    loadYoutube(id);
  } else {
    console.log("format not yet supported");
  } 
}

