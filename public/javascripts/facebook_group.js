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

function getGroupNames(){

};

function performRetrieval(groupId) {
  asyncYoutubeLoad(); 
  loadSoundCloud();
  
  getGroupNames();
  checkGroupPermissions(groupId);
}
