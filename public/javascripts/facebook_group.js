function checkGroupPermissions(groupId) {
  FB.api(
      "/" + groupId,
      function (response) {
        if (response && !response.error) {
          console.log(response);
        } else { // Error retrieving
          groupInputError('That group doesn\'t exist - the name can be found in the url: www.facebook.com/group/<COPY_ME>'); 

        }
      }
  );
  FB.api('/me', function(response) {
    console.log('Successful login for: ' + response.name);
  });
}

function performRetrieval(groupId) {
  checkGroupPermissions(groupId);
}
