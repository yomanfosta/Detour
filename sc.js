function init ()
{
var DURATION;
console.log("sc.js opened");
}
//Initialize the SoundCloud app
SC.initialize({
	client_id: 'daf214813061b1bb2f5bbba399dd5524'
	
});		

console.log("client initialized");


//Embed the SoundCloud Widget into the app
var track_url = 'https://soundcloud.com/madeon/technicolor-original';
SC.oEmbed(track_url, { auto_play: true }, function(oEmbed) {
  console.log('oEmbed response: ' + oEmbed);
});




//Play the selected song/playlist
// SC.stream("/tracks/293", function(sound){
  // sound.play();
// });


document.onload(init);