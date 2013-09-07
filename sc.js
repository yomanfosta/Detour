
var DURATION;
console.log("sc.js opened");
//Initialize the SoundCloud app
SC.initialize({
	client_id: 'daf214813061b1bb2f5bbba399dd5524'
	
});		

console.log("client initialized");

// SC.get('/plau', { duration: { from: DURATION-200000, to: DURATION+200000 }}, function(tracks) {

// });

//Embed the SoundCloud Widget into the app
SC.oEmbed('url=http://soundcloud.com/madeon/technicolor-original', { auto_play: true }, document.getElementbyId("Widget"));
});


//Play the selected song/playlist
// SC.stream("/tracks/293", function(sound){
  // sound.play();
// });


