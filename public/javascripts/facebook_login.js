// This is called with the results from from FB.getLoginStatus().
function statusChangeCallback(response, groupId) {
  var login = function() { 
    FB.login(function() { populateGroupNames(); }, { scope: "user_groups" }); 
  };

  if (response.status === 'connected') {
  
    var permissionsGranted = false;
    FB.api("/me/permissions", function(permResponse) {
      $.each(permResponse.data, function(i, val) {
        if (val['permission'] === 'user_groups' && val['status'] === 'granted') {
          permissionsGranted = true;
          return;
        }
      });
      
      permissionsGranted ? populateGroupNames() : login();
    });

  } else {
    login();
  }

}

// This function is called when someone finishes with the Login
// Button.  See the onlogin handler attached to it in the sample
// code below.
function playGroup() {
  var groupName = $('input#groupName').val();
  if (groupName && groupName.length > 0) { 
    performRetrieval(groupNameToId[groupName]); // global declared in autocomplete.js
  }
  else {
    groupInputError("Please enter a group name");
  }

}

function groupInputError (message) {
  $('#groupInputGroup').addClass('has-error');
  $('#groupNameAlert').text(message).show();  
}

window.fbAsyncInit = function() {
  FB.init({
    appId      : '326792880803751',
    cookie     : true,  // enable cookies to allow the server to access 
                        // the session
    xfbml      : true,  // parse social plugins on this page
    version    : 'v2.0' // use version 2.0
  });
  $('#groupNameAlert').hide();
  FB.getLoginStatus(function(response) {
      statusChangeCallback(response, groupName);
    });
  
  $('button#playButton').click(function() {
    $('#groupNameAlert').hide();
    $('#groupInputGroup').removeClass('has-error');
    playGroup();
    return false;
  });
};

// Load the SDK asynchronously
(function(d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) return;
  js = d.createElement(s); js.id = id;
  js.src = "//connect.facebook.net/en_US/sdk.js";
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));
