var audioPlayer = document.getElementById("audio");
var playPause 	= document.getElementById("play-pause");
var repeat 		= document.getElementById("repeat");
var amount 		= document.getElementById("amount");
var elapsedTime = document.getElementById("elapsed-time");
var totalTime 	= document.getElementById("total-time");

var playing 	= false;
var repeating	= false;
var i = 0;
var elapsed = 0;
var seconds = 0;
var minutes = 0;
var length = 0;

function calcFormattedLength(){
	var formattedMins = Math.floor(length / 60);
	var formattedSecs = length % 60;
	if(formattedSecs < 10){
		formattedSecs = "0" + formattedSecs;
	}

	return formattedMins + ":" + formattedSecs;
}

function checkTime(){

	//Stop interval checking if percent at 100
	if(percent >= 100){
		if(repeating){
			i = 0;
			elapsed = 0;
			seconds = 0;
			minutes = 0;
		}
		else{
			clearInterval(i);
			return;
		}
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


playPause.addEventListener("click", function(){
	playPause.classList.toggle("paused");

	if(!playing){
		playing = true;
		begun = true;
		audioPlayer.play();
		i = setInterval(checkTime, 1000);
	} else{
		playing = false;
		audioPlayer.pause();
		clearInterval(i);
	}
});

repeat.addEventListener("click", function(){
	repeat.classList.toggle("on-repeat");
	repeating = true;
});

audioPlayer.onloadeddata = function(){
	length = Math.ceil(audioPlayer.duration);
	totalTime.innerHTML = calcFormattedLength();
}






