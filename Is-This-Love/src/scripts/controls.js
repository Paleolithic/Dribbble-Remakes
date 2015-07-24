var audioPlayer = document.getElementById("audio");


var playPause 	= document.getElementById("play-pause");
var repeat 		= document.getElementById("repeat");
var amount 		= document.getElementById("amount");
var elapsedTime = document.getElementById("elapsed-time");
var totalTime 	= document.getElementById("total-time");
totalTime.innerHTML = calcFormattedLength();

var playing = false;
var i = 0;
var elapsed = 0;
var seconds = 0;
var minutes = 0;
// var length 	= calcLength();

function checkTime(){

	//Stop interval checking if percent at 100
	if(percent >= 100){
		clearInterval(i);
		return;
	}

	elapsed++ 
	seconds++;
	var percent = elapsed / length * 100;
	amount.style.width = percent + "%";

	if(seconds < 0){
		seconds = 0;
	}
	if(seconds >= 60){
		seconds = 0;
		minutes++; 
	}
	if(seconds < 10){
		seconds = "0" + seconds;
	}

	time = minutes + ":" + seconds;
	elapsedTime.innerHTML = time;
}

function calcFormattedLength(){
	var length = audioPlayer.seekable.end();
	var formattedTime = document.getElementById("total-time").innerHTML;
	formattedMins = parseInt(formattedTime.substr(0, formattedTime.indexOf(':')));
	formattedSecs = parseInt(formattedTime.substr(formattedTime.indexOf(':') + 1));

	return (60 * formattedMins) + formattedSecs;
}

playPause.addEventListener("click", function(){
	playPause.classList.toggle("paused");

	if(!playing){
		playing = true;
		audioPlayer.play();
		i = setInterval(checkTime, 1000);
	} else{
		playing = false;
	}
});

repeat.addEventListener("click", function(){
	repeat.classList.toggle("on-repeat");
});






