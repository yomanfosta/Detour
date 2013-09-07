var directionsDisplay;
var directionsService = new google.maps.DirectionsService();
var map;
var start;
var end;
var detours; //the detours we have selected
var availableDetours; //available ones we haven't selected
var GPSCoords;
var defRadius = 20;
var METERS = 1609;
var VENUES;
var NATUREVENUES = {
	b: true,
	id: '4d4b7105d754a06377d81259'
};
var FOODVENUES = {
	b: true,
	id: '4d4b7105d754a06374d81259'
};
var ATTRACTIONVENUES = {
	b: true,
	id: '4bf58dd8d48988d12d941735'
};
var GASVENUES = true;



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
	VENUES = {};
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
    var radius = document.getElementById("distance");
    
    startElement.addEventListener('blur',startendChange);
    endElement.addEventListener('blur',startendChange);
    radius.addEventListener('blur', startendChange);
    //test();
}


//start and end have changed, reset everything!
//start and end have changed, reset everything!
function startendChange()
{
	start = document.getElementById("start-loc").value;
	end = document.getElementById("end-loc").value;
	defRadius = document.getElementById("distance").value;
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
			  var counter = 0;
			  var waypoints = response.routes[0].overview_path;
			  var waypointStrs = new Array();
			  for(var i=0; i<waypoints.length;i++)
			  {
			  	if(i%5 === 0)
			  	{

			  		var num1 = new Number(waypoints[i].lat());
			  		var LAT = num1.toFixed(2); 

			  		var num2 = new Number(waypoints[i].lng());
			  		var LNG = num2.toFixed(2); 

			  		waypointStrs[counter] = LAT.toString() + ',' + LNG.toString();
			  		counter++;
			  	}
			  }
			  //console.log(waypointStrs);

			  GPSCoords = waypointStrs;
			  console.log("before for loop");
			  for(var i =0; i <GPSCoords.length; i++)
			  	getVenues(i);
			  //console.log("Reached the end of getdirections");
			  console.log("getVenues called");

			}
			else
				GPSCoords = null;
		});
}

//Function that makes the calls to the Foursquare API

function getVenues(i)
{

	var RADIUS = defRadius*METERS;
	var CATEGORIES = '';
	if(FOODVENUES.b === true)
		CATEGORIES += FOODVENUES.id;
	else if(NATUREVENUES.b === true)
		CATEGORIES += ',' + NATUREVENUES.id;
	else if(ATTRACTIONVENUES.b === true)
		CATEGORIES += ',' + ATTRACTIONVENUES.id;
	


	var URL = config.apiUrl + 'v2/venues/explore?ll=' + GPSCoords[i] + '&limit=5' + '&radius=' + RADIUS.toString() + '&categoryid=' + CATEGORIES +  '&client_id=' +  config.apiKey + '&client_secret=' + config.clientSecret;
	
	$.getJSON(URL, function(data){
		VENUES[data.response.groups[0].items[0].venue.id] = {name: data.response.groups[0].items[0].venue.name, lat: data.response.groups[0].items[0].venue.location.lat, lng: data.response.groups[0].items[0].venue.location.lng};

	});



	// console.log("This is LOCATIONS: " + LOCATIONS);
	//console.log("This is LOCATIONS: " + LOCATIONS{});
	// var names = response.groups.items.venue.name;
	//console.log(names);
	//console.log("finished getVenues");

}

google.maps.event.addDomListener(window, 'load', init);