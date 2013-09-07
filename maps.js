var directionsDisplay;
var directionsService = new google.maps.DirectionsService();
var map;
var start;
var end;
var detours; //the detours we have selected
var availableDetours; //available ones we haven't selected
var locationMarkers = {} //a giant array of markers for all the locations we get from foursquare
	
	
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
    test();
}

//is called whenever something is changed..
function startendChange()
{
	start = getElementById("start-loc").value;
	end = getElementById("end-loc").value;
	detours = new Array();
	var waypoints = getdirections(); //should be an array of strings
	availableDetours = new Array();
	for(int i=0;i<waypoints.length;i++)
	{
		var fsi = foursquareinfo(waypoints[0]);
		//fsi should have the following properties
			//marker: a google.maps>Marker //this should already pin it to the map and icon defined based on enabled param
			//rating: number
			//enabled: false; by default
		availableDetours[i] = fsi;
	}
}

function foursquareinfo(waypoint)
{
	var fsi= {
		marker: new google.maps.Marker(google.maps.LatLng,"title");
		rating: 0;//foursquare rating
		enabled: false;
	}
}

function detourAdded(location)
{
	
}

//gets our directions and returns an array of waypoints
function getdirections()
{

		
	var request = 
	{
		origin: start,
		waypoints: detours,
		optimizeWaypoints: true,
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
