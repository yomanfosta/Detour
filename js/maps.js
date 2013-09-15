var directionsDisplay = new google.maps.DirectionsRenderer();
var directionsService = new google.maps.DirectionsService();
var map; //initialized in init so we can get mapOptions
var start ='';
var end ='';
var detours = []; //the detours we have selected
var availableDetours = []; //available ones we haven't selected
var GPSCoords = []; //contains all the GPS coordinates of the original path
var defRadius = 20;
var METERS = 1609;
var VENUES = {};
var infowindow = new google.maps.InfoWindow;
var NATUREVENUES = {
	b: false,
	id: '4d4b7105d754a06377d81259'
};
var FOODVENUES = {
	b: false,
	id: '4d4b7105d754a06374d81259'
};
var ATTRACTIONVENUES = {
	b: false,
	id: '4deefb944765f83613cdba6e'
};
var GAS = {};
var GASVENUES = false;
var isFourSquare = true;
var VenueTotal =0;
var VenueCount = 0;
var GASCount = 0;
var GASTotal = 0;
var detourCount =0;
var time = 0;
var lastopened = {}; //no clue what this is for
//Configure key/url's for FOURSQUARE API
var FSconfig = {
	apiKey: 'RT3RC2PZXYLJJKVRD0P1THAIWLTHBHSWB3ENEGD4QRWLJ1G3',
	authUrl: 'https://foursquare.com/',
	apiUrl: 'https://api.foursquare.com/',
	clientSecret: 'ZZRKY01HN3YBFACKRUR1GSEBWZKKPKZOAXQR540PFRFG3PEV'
};	
var gasConfig = {
	gasKEY: 'tzdn0ydcok',
	gasURL: 'http://api.mygasfeed.com'
};

function init(){
	console.log("Init!");

	var mapOptions = 
	{
		zoom: 8,
		center: new google.maps.LatLng((39.952335), -75.163789), //currently defaults to over Philadelphia
		mapTypeId: google.maps.MapTypeId.ROADMAP
	}
	map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);
	directionsDisplay.setMap(map);

    //add event listener to inputs
    var startElement = document.getElementById("start-loc");
    var endElement = document.getElementById("end-loc");
    var radius = document.getElementById("distance");
    var attractionButton = document.getElementById('sites-button');

    attractionButton.addEventListener('click', function()
    {
    	console.log("attractionButton clicked!");
    	ATTRACTIONVENUES.b = true;
    	startendChange();
    });

    var natureButton = document.getElementById('nature-button');
    natureButton.addEventListener('click', function()
    {
    	NATUREVENUES.b = true;
    	startendChange();
    });

    var foodButton = document.getElementById('food-button');
    foodButton.addEventListener('click', function()
    {
    	
    	FOODVENUES.b = true;
    	startendChange();
    });

    var gasButton = document.getElementById('gas-button');
    gasButton.addEventListener('click',function()
    {
    	
    	GASVENUES = true;
    	startendChange();
    })

    startElement.addEventListener('blur',startendChange);
    endElement.addEventListener('blur',startendChange);
    radius.addEventListener('blur', startendChange);
    //test();
}


//originally meant to be used every time a new origin and destination were entered... Now its been warped into being something that is alled whenever there is a change in state, like when we want to get different types of venues to visit when buttons are clicked... probably doing things we don't need to do repetitively... could probably be broken down into 2 separate functions
function startendChange()
{
	start = document.getElementById("start-loc").value;
	end = document.getElementById("end-loc").value;
	defRadius = document.getElementById("distance").value;
	if(start === '' || end === '')
		return;

	//when locations are changed we should clear both detours and availableDetours

	detourCount = 0;
	detours = []; 
	availableDetours = [];
	console.log("Before getdirections");
	getdirections(); //should be an array of strings

	
}

//meant to get original set of directions
//gets our directions and returns an array of waypoints
function getdirections()
{
	GPSCoords = [];
	var request = 
	{
		origin: start,
		//waypoints : detours,
		//optimizeWaypoints: true,
		destination: end,
		travelMode: google.maps.DirectionsTravelMode.DRIVING //we assume we're driving, it's a roadtrip app!
	};
	directionsService.route(request, function(response,status) 
	{
		if (status == google.maps.DirectionsStatus.OK) 
		{
			//display our directions
			directionsDisplay.setDirections(response); 

			//put text directions in panel
			directionsDisplay.setPanel(document.getElementById("directions"));

			  //LatLngs
			  var counter = 0;
			  var waypoints = response.routes[0].overview_path;
			  time = response.routes[0].legs[0].duration.value;
			  var waypointStrs = [];
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


			  GPSCoords = waypointStrs;
			  //BOOM! this should be all getDirections does... everything below this should be else where are called by startchange() and reroute possibly


			  for(var i=0; i<availableDetours.length;i++)
			  	availableDetours[i].setMap(null);
			  availableDetours = [];
			  availableDetours = [];
			  VenueTotal = GPSCoords.length;
			  GASTotal = GPSCoords.length;
			  GASCount = 0;
			  VenueCount = 0;
			  for(var i =0; i <GPSCoords.length; i++)
			  	getVenues(i);
			  VENUES = {};
			  FOODVENUES.b = false;
			  NATUREVENUES.b = false;
			  ATTRACTIONVENUES.b = false;

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
	else if(GASVENUES === true)
	{
		var LATLNG = GPSCoords[i].split(',');
		var LAT = LATLNG[0];
		var LNG = LATLNG[1];
		var gasurl = gasConfig.gasURL + '/stations' + '/radius' + '/' + LAT + '/' + LNG + '/' + defRadius.toString() + '/' + 'reg' + '/Price/' + gasConfig.gasKEY + '.json?'


		$.getJSON(gasurl, function(data)
		{
			GASCount++;
			
			GAS[data.stations[4].id] = {name: data.stations[4].station,lat: data.stations[5].lat, lng: data.stations[6].lng, price: data.stations[1].price};
			if(GASCount===GASTotal)
				HandleVenueList('GAS');


			
		});	 
		isFourSquare = false;	


	}



	if(isFourSquare === true)
		var URL = FSconfig.apiUrl + 'v2/venues/explore?ll=' + GPSCoords[i] + '&limit=5' + '&radius=' + RADIUS.toString() + '&categoryId=' + CATEGORIES +  '&client_id=' +  FSconfig.apiKey + '&client_secret=' + FSconfig.clientSecret;
	$.getJSON(URL, function(data){
		VenueCount++;
		VENUES[data.response.groups[0].items[0].venue.id] = {name: data.response.groups[0].items[0].venue.name, lat: data.response.groups[0].items[0].venue.location.lat, lng: data.response.groups[0].items[0].venue.location.lng, link: data.response.groups[0].items[0].venue.canonicalUrl}
		if(VenueCount===VenueTotal)
			HandleVenueList('MARKER');



	});
}
function HandleVenueList(typeOFMarker)
{
	console.log("You have made it into the HandleVenueList method!");
	var count = 0;
	if(typeOFMarker === 'GAS')
	{
		for(id in GAS)
		{
			console.log("HandleVenueList GAS Called");
			var markerOptions = { map: map, title: GAS[id].name, clickable: true, position: new google.maps.LatLng(GAS[id].lat,GAS[id].lng)};
			availableDetours[count] = _newGoogleMarker(markerOptions,null, GAS[id].price);
			count++;
		}
	}
	else if(typeOFMarker === 'MARKER')
	{

		for(id in VENUES)
		{
			console.log("HandleVenueList MARKER Called");
			var markerOptions = { map: map, title: VENUES[id].name, clickable: true, position: new google.maps.LatLng(VENUES[id].lat,VENUES[id].lng)};
			availableDetours[count] = _newGoogleMarker(markerOptions,VENUES[id].link,null);
			count++;
		}
	}
}

function _newGoogleMarker(param,link,price)
{
	var r = new google.maps.Marker(param);
	r.enabled = false;
	r.link = link;
	r.price = price;
	
	
	google.maps.event.addListener(r,'click',function()
	{
		if(typeof lastopened === google.maps.Marker)
			lastopened.close();
			
		var context = "<h1 class='dest-title'>"+r.title+"<div class='add-stop'>Add Stop</div>";
		if(r.link!== null)
			context= context+"<div class='link'><a class='the-link' href='"+r.link+"'target='_blank'>▼</a></div>";
		if(r.price!== null && r.price!=="N/A")
			context= context+"<div class='price'>Price: "+r.price+"</div>";
		infowindow.close();
		infowindow.setContent(context);
		infowindow.open(map,r);
		lastopened = infowindow;
		var addStops = document.getElementsByClassName('add-stop');
		for(var i=0; i<addStops.length;i++)
		{
			addStops[i].addEventListener('click',function() {
				if (r.enabled)
				{
					var _newDetour = [];
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
		}
	});

	return r;
}

function reRoute()
{
	var waypts = [];
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
	return di;
}


google.maps.event.addDomListener(window, 'load', init);
