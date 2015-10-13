var audioPlayer = document.getElementById("audio");
var playPause 	= document.getElementById("play-pause");
var repeat 		= document.getElementById("repeat");
var amount 		= document.getElementById("amount");
var elapsedTime = document.getElementById("elapsed-time");
var totalTime 	= document.getElementById("total-time");
var back 		= document.getElementById("back");
var forward 	= document.getElementById("forward");
var favicon 	= document.getElementById("favicon");

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
	// If percent at 100
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
	if(seconds < 10)
		seconds = "0" + seconds;

	time = minutes + ":" + seconds;
	elapsedTime.innerHTML = time;

	percent = elapsed / length * 100;
	amount.style.width = percent + "%";
}

audioPlayer.onloadeddata = function(){
	length = Math.ceil(audioPlayer.duration);
	totalTime.innerHTML = calcFormattedLength();
}

playPause.addEventListener("click", function(){
	playPause.classList.toggle("paused");
	playing = !playing;

	if(playing){
		favicon.href = "dist/images/playing.ico";
		audioPlayer.play();
		// renderFrame();
		i = setInterval(checkTime, 1000);
	} else{
		favicon.href = "dist/images/paused.ico";
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

particlesJS("particles-js", {
  "particles": {
    "number": {
      "value": 80,
      "density": {
        "enable": true,
        "value_area": 800
      }
    },
    "color": {
      "value": "#ffffff"
    },
    "shape": {
      "type": "circle",
      "stroke": {
        "width": 0,
        "color": "#000000"
      },
      "polygon": {
        "nb_sides": 5
      },
      "image": {
        "src": "img/github.svg",
        "width": 100,
        "height": 100
      }
    },
    "opacity": {
      "value": 0.5,
      "random": false,
      "anim": {
        "enable": false,
        "speed": 1,
        "opacity_min": 0.1,
        "sync": false
      }
    },
    "size": {
      "value": 3,
      "random": true,
      "anim": {
        "enable": false,
        "speed": 40,
        "size_min": 0.1,
        "sync": false
      }
    },
    "line_linked": {
      "enable": true,
      "distance": 150,
      "color": "#ffffff",
      "opacity": 0.4,
      "width": 1
    },
    "move": {
      "enable": true,
      "speed": 6,
      "direction": "none",
      "random": false,
      "straight": false,
      "out_mode": "out",
      "bounce": false,
      "attract": {
        "enable": false,
        "rotateX": 600,
        "rotateY": 1200
      }
    }
  },
  "interactivity": {
    "detect_on": "canvas",
    "events": {
      "onhover": {
        "enable": true,
        "mode": "grab"
      },
      "onclick": {
        "enable": true,
        "mode": "push"
      },
      "resize": true
    },
    "modes": {
      "grab": {
        "distance": 140,
        "line_linked": {
          "opacity": 1
        }
      },
      "bubble": {
        "distance": 400,
        "size": 40,
        "duration": 2,
        "opacity": 8,
        "speed": 3
      },
      "repulse": {
        "distance": 200,
        "duration": 0.4
      },
      "push": {
        "particles_nb": 4
      },
      "remove": {
        "particles_nb": 2
      }
    }
  },
  "retina_detect": true
});

var canvas, ctx, source, context, analyser, fbc_array, bars, bar_x, bar_width, bar_height;
window.addEventListener("load", initMp3Player, false);
function initMp3Player(){
	context = new AudioContext();
	analyser = context.createAnalyser();
	canvas = document.getElementById('analyser_render');
	canvas.width=1000;//horizontal resolution (?) - increase for better looking text
	canvas.height=200;//vertical resolution (?) - increase for better looking text
	canvas.setAttribute("width", canvas.width);//actual width of canvas
	canvas.setAttribute("height", canvas.height);//actual width of canvas
	ctx = canvas.getContext('2d');

	source = context.createMediaElementSource(audioPlayer);
	source.connect(analyser);
	analyser.connect(context.destination);

	frameLooper();
}

function frameLooper(){
	window.requestAnimationFrame(frameLooper);
	fbc_array = new Uint8Array(analyser.frequencyBinCount);
	analyser.getByteFrequencyData(fbc_array);
	ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
  
  bars = 200;
  for (var i = 0; i < bars; i++){
    bar_x = i * 5;
    bar_width = 4;
    bar_height = -(fbc_array[i] / 2);

    //  fillRect( x, y, width, height ) // Explanation of the parameters below
    if(bar_height <= -120){
      console.log("More than 120");
      // ctx.fillStyle =l '#3B3644'; // Color of the bars
      // ctx.fillRect(bar_x, canvas.height, bar_width, -120);
      ctx.fillStyle = '#F36A90'; // Color of the bars
      ctx.fillRect(bar_x, 120, bar_width, bar_height+120);
    }
    else{
      ctx.fillStyle = '#3B3644'; // Color of the bars
		  ctx.fillRect(bar_x, canvas.height, bar_width, bar_height);
    }
	}
}