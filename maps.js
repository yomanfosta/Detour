var directionsDisplay;
var directionsService = new google.maps.DirectionsService();
var map;
var start;
var end;
var detours; //the detours we have selected
var availableDetours; //available ones we haven't selected
var GPSCoords;
var radius = 20;
var METERS = 1609;
	
//Configure key/url's
	var config = {
		apiKey: 'RT3RC2PZXYLJJKVRD0P1THAIWLTHBHSWB3ENEGD4QRWLJ1G3',
		authUrl: 'https://foursquare.com/',
		apiUrl: 'https://api.foursquare.com/',
		clientSecret: 'ZZRKY01HN3YBFACKRUR1GSEBWZKKPKZOAXQR540PFRFG3PEV'
		

	};	


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
//start and end have changed, reset everything!
function startendChange()
{
	start = document.getElementById("start-loc").value;
	end = document.getElementById("end-loc").value;
	if(start === '' || end === '')
		return;
	detours = new Array();
	console.log("Before getdirections");
	getdirections(); //should be an array of strings

	
}

/*function detourClicked(location)
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
}*/

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
			  //console.log(waypointStrs);

			  GPSCoords = waypointStrs;
			  console.log("before for loop");
			  for(var i =0; i <GPSCoords.length; i++)
			  	getVenues(i);
			  console.log("Reached the end of getdirections");

			}
			else
				GPSCoords = null;
		});
}

//Function that makes the calls to the Foursquare API

function getVenues(i)
{
	console.log("getVenues called");
	var RADIUS = radius*METERS;
	var URL = config.apiUrl + 'v2/venues/explore?ll=' + GPSCoords[i] + '&limit=5' + '&radius=' + RADIUS.toString() + '&client_id=' + config.apiKey + '&clientSecret=' + config.clientSecret;
	//console.log(URL);
	var LOCATIONS = $.getJSON(URL);
	//console.log("This is LOCATIONS: " + LOCATIONS);
	//console.log("This is LOCATIONS: " + LOCATIONS{});
	//var names = response.groups.items.venue.name;
	//console.log(names);
	console.log("finished getVenues");

}

google.maps.event.addDomListener(window, 'load', init);