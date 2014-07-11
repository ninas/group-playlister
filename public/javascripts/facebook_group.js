function checkGroupPermissions(groupId) {
  console.log('Welcome!  Fetching your information.... ');
  FB.api(
      "/" + groupId,
      function (response) {
        if (response && !response.error) {
          /* handle the result */
          console.log("group!");
        } else {
          console.log(response);
        }
      }
  );
  FB.api('/me', function(response) {
    console.log('Successful login for: ' + response.name);
    document.getElementById('status').innerHTML =
      'Thanks for logging in, ' + response.name + '!';
  });
}

function performRetrieval(groupId) {
  checkGroupPermissions(groupId);
}
