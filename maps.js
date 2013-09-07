var directionsDisplay;
var directionsService = new google.maps.DirectionsService();
var map;

function init(){
    console.log("Init!");
    directionsDisplay = new google.maps.DirectionsRenderer();
    var mapOptions = 
    {
    zoom: 8,
    center: new google.maps.LatLng((39.952335), -75.163789),
    mapTypeId: google.maps.MapTypeId.ROADMAP
	}
    map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);
    directionsDisplay.setMap(map);
    test();
}
function getdirections()
{
	
	var start = getElementById("start-loc").value;
	var end = getElementById("end-loc").value;
		
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
