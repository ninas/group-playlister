// This is called with the results from from FB.getLoginStatus().
function statusChangeCallback(response) {
  if (response.status === 'connected') {
    // Logged into your app and Facebook.
    testAPI();
  } else {
    FB.login();
  }

}

// This function is called when someone finishes with the Login
// Button.  See the onlogin handler attached to it in the sample
// code below.
function checkLoginState() {
  var groupName = $('input#groupName').val();
  if (groupName && groupName.length > 0) { 
    FB.getLoginStatus(function(response) {
      statusChangeCallback(response, groupName);
    });
  }
  else {
    $('div#groupNameAlert').text('Please enter a group name').show();  
  }

}

window.fbAsyncInit = function() {
  FB.init({
    appId      : '326792880803751',
    cookie     : true,  // enable cookies to allow the server to access 
                        // the session
    xfbml      : true,  // parse social plugins on this page
    version    : 'v2.0' // use version 2.0
  });

  $('button#playButton').click(function() {
    $('div#groupNameAlert').hide();
    checkLoginState();
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

function testAPI() {
  console.log('Welcome!  Fetching your information.... ');
  FB.api('/me', function(response) {
    console.log('Successful login for: ' + response.name);
    document.getElementById('status').innerHTML =
      'Thanks for logging in, ' + response.name + '!';
  });
}
