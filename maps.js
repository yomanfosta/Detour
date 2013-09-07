var directionsDisplay;
var directionsService = new google.maps.DirectionsService();
var map;
var mapElement; 
var detours;
var start, end;

function init(){
    console.log("Init!");
    directionsDisplay = new google.maps.DirectionsRenderer();
    var mapOptions = 
    {
    zoom: 8,
    center: new google.maps.LatLng((39.952335), -75.163789),
    mapTypeId: google.maps.MapTypeId.ROADMAP
	}
	mapElement = document.getElementById("map-canvas");
    map = new google.maps.Map(mapElement, mapOptions);
    directionsDisplay.setMap(map);
    detours = new Array();
    start = '';
    end = '';
    test();
    var adjust = mapElement.offsetHeight * 0.3;
    map.panBy(0,adjust);
				
}


function onChange()
{
	var waypts = getdirections(); //get directions will redraw the map
	//adjust
	var adjust = mapElement.offsetHeight * 0.3;
    map.panBy(0,adjust);
    
	if(waypts.length===0)
		return;//TODO: alert fail;
	else
		getDetour(waypts, document.getElementById("radius").value);
}

//called solely when start or end is changed
function changeStartEnd()
{
	//check that we're not wasting our time
	
	if(start === getElementById("start-loc").value || end === getElementById("end-loc").value)
		return;
	start = getElementById("start-loc").value;
	end = getElementById("end-loc").value;
	detours = new Array(); //updated start and destination, delete all previous detours added to itenerary
	getDirections();
	
}

function getdirections()
{
	
	
	var request = 
	{
		origin: start,
		
		destination: end,
		travelMode: google.maps.DirectionsTravelMode.DRIVING
	};
	var waypointsStrs = new Array();
	directionsService.route(request, function(response,status) 
		{
			
			if (status == google.maps.DirectionsStatus.OK) 
			{
				var waypoints = response.routes[0].overview_path;
				directionsDisplay.setDirections(response);
				
				for(var i =0;i<waypoints.length;i++)
				{
					waypointsStrs[i] = waypoints[i].ob.toString() + ',' + waypoints[i].pb.toString();
					console.log(waypointsStrs[i]); //prints to console
				}
			}
		});
	return waypointsStrs;
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
	var waypoints;
	var waypointsStrs = new Array();
	directionsService.route(request, function(response,status) 
		{
			var waypoints = response.routes[0].overview_path;
			if (status == google.maps.DirectionsStatus.OK) 
			{
				directionsDisplay.setDirections(response);
				directionsDisplay.setPanel(document.getElementById("directions"));
				for(var i =0;i<waypoints.length;i++)
				{
					waypointsStrs[i] = waypoints[i].ob.toString() + ',' + waypoints[i].pb.toString();
					console.log(waypointsStrs[i]); //prints to console
				}
				
			}
			
			
					
		});
	
}

function addDetour(location)
{
	
	//check location doesn't already exist in detours and that we are not greater than 8.
	detours[detours.length] = location;
	getdirections(); 
	
}

google.maps.event.addDomListener(window, 'load', init);
