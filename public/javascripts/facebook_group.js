function checkGroupPermissions(groupId) {
  FB.api(
      "/" + groupId,
      function (response) {
        if (response && !response.error) {
          console.log(response);
          $('#fullGroupName').text(response.name);
          $('#groupDescription').text(response.description);
          FB.api('/' + groupId + '/feed', loadFeed);
        } else { // Error retrieving
          groupInputError('That group doesn\'t exist - the name can be found in the url: www.facebook.com/group/<COPY_ME>'); 

        }
      }
  );
}

function loadFeed(response) {
  if (response && !response.error) {
    console.log(response);
    var playlist = $('#playlist');
    $.each(response.data, function(i, val) {
      var link = undefined;
      if (val.type == "video") {
        link = val.link;
      }
      var innerDiv = $('<li></li>').
        addClass('row').
        append($('<img/>', { 
          src: val.picture,
          "class": 'col-md-2'
        })).
        append($('<div></div>').
          addClass('col-md-10').
          append($('<a/>').
            addClass('row').
            attr('href', link).
            text(val.name))
            
        );
      playlist.append(innerDiv);
    });
  } else { // Error retrieving
    groupInputError('Error loading feed :('); 

  }
}

function performRetrieval(groupId) {
  asyncYoutubeLoad(); 
  checkGroupPermissions(groupId);
}
