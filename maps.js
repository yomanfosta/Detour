


	///////////////////////////////////////////////////////////////////////
	//Configure key/url's
	var config = {
		apiKey: 'RT3RC2PZXYLJJKVRD0P1THAIWLTHBHSWB3ENEGD4QRWLJ1G3',
		authUrl: 'https://foursquare.com/',
		apiUrl: 'https://api.foursquare.com/',
		METERS: 1609,
		radius: 20,
	    GPSCoords: getdirections() //33.40,54.27

	};

	console.log("Values configured!");






	function doAuthRedirect() {
		var redirect = window.location.href.replace(window.location.hash, '');



		var url = config.authUrl + 'oauth2/authenticate?response_type=token&client_id=' + config.apiKey +'&redirect_uri=' + encodeURIComponent(redirect) +'&state=' + encodeURIComponent($.bbq.getState('req') || 'users/self');
		window.location.href = url;
	};

	if ($.bbq.getState('access_token')) {
	// If there is a token in the state, consume it
	var token = $.bbq.getState('access_token');
	$.bbq.pushState({}, 2)
} else if ($.bbq.getState('error')) {
} else {
	doAuthRedirect();
}	
console.log("test");



console.log("it worked!");


//Function that makes the calls to the Foursquare API


for (var i = 0; i < GPSCoords.length;i++) 
{
	var URL = config.apiUrl + 'v2/venues/explore?ll=' + '40.00,-75.13' + '&limit=5' + '&intent=browse' + '&radius=' + '1000' + '&oauth_token=' + window.token;
	$.getJSON(URL);
}







