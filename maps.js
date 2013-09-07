var directionsDisplay;
var directionsService = new google.maps.DirectionsService();
var map;
var start;
var end;
var detours; //the detours we have selected
var availableDetours; //available ones we haven't selected

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
