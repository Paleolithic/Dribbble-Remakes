var audioPlayer = document.getElementById("audio");
var playPause 	= document.getElementById("play-pause");
var repeat 		= document.getElementById("repeat");
var amount 		= document.getElementById("amount");
var elapsedTime = document.getElementById("elapsed-time");
var totalTime 	= document.getElementById("total-time");
var back 		= document.getElementById("back");
var forward 	= document.getElementById("forward");

var playing 	= false;
var repeating	= false;
var i = 0;
var elapsed = 0;
var seconds = 0;
var minutes = 0;
var length = 0;
var percent = 0;
audioPlayer.loop = repeating;

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

	elapsed++;
	seconds = elapsed % 60;
	minutes = Math.floor(elapsed / 60);
	percent = elapsed / length * 100;
	amount.style.width = percent + "%";

	if(seconds < 10){
		seconds = "0" + seconds;
	}

	time = minutes + ":" + seconds;
	elapsedTime.innerHTML = time;
}

audioPlayer.onloadeddata = function(){
	length = Math.ceil(audioPlayer.duration);
	totalTime.innerHTML = calcFormattedLength();
}

playPause.addEventListener("click", function(){
	playPause.classList.toggle("paused");
	playing = !playing;

	if(playing){
		audioPlayer.play();
		i = setInterval(checkTime, 1000);
	} else{
		audioPlayer.pause();
		clearInterval(i);
	}
});

repeat.addEventListener("click", function(){
	repeat.classList.toggle("on-repeat");
	repeating = !repeating;
});


back.addEventListener("click", function(){
	if(elapsed >= 5)
		elapsed -= 5;
	else
		elapsed = 0;

	audioPlayer.currentTime = elapsed;
});

forward.addEventListener("click", function(){
	if(elapsed <= length - 5)
		elapsed += 5;
	else
		elapsed = length;

	audioPlayer.currentTime = elapsed;
});

particlesJS.load('particles-js', 'dist/particles.json', function() {
  console.log('callback - particles.js config loaded');
});