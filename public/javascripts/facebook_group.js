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
  FB.api('/me', function(response) {
    console.log('Successful login for: ' + response.name);
  });
}

function loadFeed(response) {
  if (response && !response.error) {
    console.log(response);
    var playlist = $('#playlist');
    $.each(response.data, function(i, val) {
      var innerDiv = $('<div></div>').
        append($('<img/>', { src: val.picture}));
      playlist.append(innerDiv);
    });
  } else { // Error retrieving
    groupInputError('Error loading feed :('); 

  }
}

function performRetrieval(groupId) {
  checkGroupPermissions(groupId);
}
