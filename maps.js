var directionsDisplay;
var directionsService = new google.maps.DirectionsService();
var map;
var start;
var end;
var detours; //the detours we have selected
var availableDetours; //available ones we haven't selected

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


function init(){
    console.log("Init!");
    directionsDisplay = new google.maps.DirectionsRenderer();
    start = '';
    end = '';
    detours = new Array();
    var mapOptions = 
    {
    zoom: 8,
    center: new google.maps.LatLng((39.952335), -75.163789),
    mapTypeId: google.maps.MapTypeId.ROADMAP
	}
    map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);
    directionsDisplay.setMap(map);
    
    //add event listener to inputs
    var startElement = document.getElementById("start-loc");
    var endElement = document.getElementById("end-loc");
    
    startElement.addEventListener('blur',startendChange);
    endElement.addEventListener('blur',startendChange);
    //test();
}

//start and end have changed, reset everything!
function startendChange()
{
	start = document.getElementById("start-loc").value;
	end = document.getElementById("end-loc").value;
	detours = new Array();
	var waypoints = getdirections(); //should be an array of strings
	availableDetours = new Array();
	for(var i=0;i<waypoints.length;i++)
	{
		var fsi = foursquareinfo(waypoints[0]);
		//fsi should have the following properties
			//marker: a google.maps>Marker //this should already pin it to the map and icon defined based on enabled param
			//rating: number
			//enabled: false; by default
		//add an eventlistener to the marker
		availableDetours[i] = fsi;
	}
}

function foursquareinfo(waypoint)
{
	var fsi= {
		marker: new google.maps.Marker(google.maps.LatLng,"title"),
		rating: 0,//foursquare rating
		enabled: false
	};
}

function detourClicked(location)
{
	//called by eventlistener on markers, location is the marker
	for(var i=0;i<availableDetours.length;i++)
	{
		if(availableDetours[i].marker.position === location.position)
		{
			availableDetours[i].marker.icon = enabledIcon;
			if(availableDetours[i].enabled ===false) //we're adding a detour
			{
				availableDetours[i].enabled = true;
				detours[detours.length] = availableDetours[i];	
			}
			else //we're getting rid of a detour
			{
				var array2 = new Array();
				for(var j=0; j<detours.length;j++)
				{
					if(detours[j] !== availableDetours[i])
						array2[j] = detours[j];
				}
				detours = array2;
				availableDetours[i].enabled = false;
				availableDetours.marker.icon = disabledIcon;
						
				
			}
			break;
		}

	}
}

//gets our directions and returns an array of waypoints
function getdirections()
{
	var request = 
	{
		origin: start,
		waypoints : detours,
		optimizeWaypoints: true,
		destination: end,
		travelMode: google.maps.DirectionsTravelMode.DRIVING
	};
	directionsService.route(request, function(response,status) 
		{
			if (status == google.maps.DirectionsStatus.OK) 
			{
			  directionsDisplay.setDirections(response);
			  //LatLngs
			  var waypoints = response.routes[0].overview_path;
			  var waypointStrs = new Array();
			  for(var i=0; i<waypoints.length;i++)
			  {
				  waypointStrs[i] = waypoints[i].lat().toString() + ',' + waypoints[i].lng().toString();
			  }
			  return waypointStrs;
			}
			else
				return null;
		});
}

function getFourSquareLocations(waypoints)
{
	var locations = new Array();
	
	return locations;
}

function test()
{
	var start = "Philadelphia, PA";
	var end = "Chicago, IL";
	var request = 
	{
		origin: start,
		destination: end,
		travelMode: google.maps.DirectionsTravelMode.DRIVING
	};
	directionsService.route(request, function(response,status) 
		{
			if (status == google.maps.DirectionsStatus.OK) 
			{
			  directionsDisplay.setDirections(response);
			}	
		});
	
}

google.maps.event.addDomListener(window, 'load', init);
