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
<<<<<<< HEAD
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



=======
var VenueTotal;
var VenueCount;
var detourCount;
var time;
>>>>>>> 9c13996efddbb24e596561bc92ff5c4552303ca9
//Configure key/url's
var config = {
	apiKey: 'RT3RC2PZXYLJJKVRD0P1THAIWLTHBHSWB3ENEGD4QRWLJ1G3',
	authUrl: 'https://foursquare.com/',
	apiUrl: 'https://api.foursquare.com/',
	clientSecret: 'ZZRKY01HN3YBFACKRUR1GSEBWZKKPKZOAXQR540PFRFG3PEV'

<<<<<<< HEAD

};	

=======

};	
>>>>>>> 9c13996efddbb24e596561bc92ff5c4552303ca9


function init(){
	console.log("Init!");
	directionsDisplay = new google.maps.DirectionsRenderer();
	start = '';
	end = '';
<<<<<<< HEAD
	detours = new Array();
	VENUES = {};
=======
	time =0;
	detourCount = 0;
	detours = new Array();
	availableDetours = new Array();
	VENUES = {};
	VenueCount = 0;
	VenueTotal = 0;
>>>>>>> 9c13996efddbb24e596561bc92ff5c4552303ca9
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
	detourCount = 0;
	detours = new Array();
	console.log("Before getdirections");
	getdirections(); //should be an array of strings

	
}
//gets our directions and returns an array of waypoints
function getdirections()
{
	var request = 
	{
		origin: start,
		//waypoints : detours,
		//optimizeWaypoints: true,
		destination: end,
		travelMode: google.maps.DirectionsTravelMode.DRIVING
	};
	directionsService.route(request, function(response,status) 
	{
		if (status == google.maps.DirectionsStatus.OK) 
		{
			directionsDisplay.setDirections(response);
<<<<<<< HEAD
=======
			directionsDisplay.setPanel(document.getElementById("directions"));
>>>>>>> 9c13996efddbb24e596561bc92ff5c4552303ca9
			  //LatLngs
			  var counter = 0;
			  var waypoints = response.routes[0].overview_path;
			  time = response.routes[0].legs[0].duration.value;
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
			  for(var i=0; i<availableDetours.length;i++)
				availableDetours[i].setVisible(false);
			  
			  availableDetours = new Array();
			  VenueTotal = GPSCoords.length;
			  VenueCount = 0;
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
<<<<<<< HEAD

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



=======
	
	var RADIUS = radius*METERS;
	var URL = config.apiUrl + 'v2/venues/explore?ll=' + GPSCoords[i] + '&limit=5' + '&radius=' + RADIUS.toString() + '&client_id=' + config.apiKey + '&client_secret=' + config.clientSecret;
	//console.log(URL);
	$.getJSON(URL, function(data){
		VenueCount++;
		VENUES[data.response.groups[0].items[0].venue.id] = {name: data.response.groups[0].items[0].venue.name, lat: data.response.groups[0].items[0].venue.location.lat, lng: data.response.groups[0].items[0].venue.location.lng}
		//console.log(VENUES);
		if(VenueCount===VenueTotal)
			HandleVenueList();
		// console.log(data.response.groups[0].items[0].venue.name);
		// console.log(data.response.groups[0].items[0].venue.location.lat);
	});


>>>>>>> 9c13996efddbb24e596561bc92ff5c4552303ca9
	// console.log("This is LOCATIONS: " + LOCATIONS);
	//console.log("This is LOCATIONS: " + LOCATIONS{});
	// var names = response.groups.items.venue.name;
	//console.log(names);
	//console.log("finished getVenues");

}
function HandleVenueList()
{
	var count = 0;
	for(id in VENUES)
	{
		console.log(id);
		var markerOptions = { map: map, title: VENUES[id].name, clickable: true, position: new google.maps.LatLng(VENUES[id].lat,VENUES[id].lng)};
		availableDetours[count] = _newGoogleMarker(markerOptions);
		count++;
	}
}

function _newGoogleMarker(param)
{
	var r = new google.maps.Marker(param);
	r.enabled = false;
	google.maps.event.addListener(r,'click',function()
	{
		if (r.enabled)
		{
			var _newDetour = new Array();
			var count = 0;
			for(var i=0;i<=detourCount;i++)
			{
				
				if(detours[i]!==r)
				{
					_newDetour[count] = detours[i];
					count++;
				}
			}
			r.enabled = false;
			detours = _newDetour;
			detourCount--;
			
		}
		else
		{
			//check we don't have more than 8
			if(detourCount===8)
				return; //TODO: some sort of warning window
			r.enabled = true;
			detours[detourCount] = r;
			detourCount++;
			
		}
		reRoute();
	});
	return r;
}

function reRoute()
{
	console.log("reroute");
	var waypts = new Array();
	for(var i=0;i<detours.length;i++)
	{
		
		waypts[i] = {location: detours[i].position, stopover: true};
	}
	var request = 
	{
		origin: start,
		waypoints : waypts, //detours are markers not way
		optimizeWaypoints: true,
		destination: end,
		travelMode: google.maps.DirectionsTravelMode.DRIVING
	};
	directionsService.route(request, function(response,status) 
	{
		if (status == google.maps.DirectionsStatus.OK) 
		{
			console.log("OK!");
			directionsDisplay.setDirections(response);
			directionsDisplay.setPanel(document.getElementById("directions"));
			time = 0;
			for(var i=0;i<response.routes[0].legs.length;i++)
			{
				time+= response.routes[0].legs[i].duration.value;
			}
		}
	});
	
}

function getTravelTime()
{
	return di
}
google.maps.event.addDomListener(window, 'load', init);
