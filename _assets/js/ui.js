(function(){
	var canvas = document.getElementById("solar_system"),
		controlpanel = document.getElementById("control-panel"),
		hours_hand = document.getElementById("hours"),
		minutes_hand = document.getElementById("minutes"),
		time_toggle = document.getElementById("time"),
		time_message = document.getElementById("time-message"),
		trails_slider = document.getElementById("trails_slider"),
		trails_off = document.getElementById("options-off"),
		trails_inf = document.getElementById("options-inf"),

		//Timers
		debounce_resize,

		//Int
		window_w,
		window_h,
		timescale = 10,

		//Bool
		traveling_forward = true,

		//Animation timelines
		hours = new TimelineMax({repeat:-1}),
		minutes = new TimelineMax({repeat:-1}),

	//Functions
	query_window_dimensions = function(){
		window_w = window.innerWidth || document.body.clientWidth;
		window_h = window.innerHeight || document.body.clientHeight;
	},

	size_canvas = function(){
		query_window_dimensions();
		canvas.width = window_w;
		canvas.height = window_h;
	},

	init_controlpanel = function(){
		TweenMax.set(controlpanel, {
			x: -300
		})
	};

	//Animations
	hours.set(hours_hand, {
		rotation: 180
	})
	hours.to(hours_hand, timescale, {
		rotation: 540,
		transformOrigin: "0px 0px",
		ease:Linear.easeNone
	})

	minutes.set(minutes_hand, {
		rotation: -90
	})
	minutes.to(minutes_hand, timescale*60, {
		rotation: 270,
		transformOrigin: "0px 0px",
		ease:Linear.easeNone
	})

	//init
	size_canvas();
	init_controlpanel();

	//Events
	window.onresize = function(e){
		clearTimeout(debounce_resize);
		debounce_resize = setTimeout(function() {
			size_canvas();
		}, 100);
	};

	time_toggle.onclick = function(){
		if(traveling_forward){
			time_message.innerHTML = "backward";
			hours.reverse();
			minutes.reverse();
			traveling_forward = false;
		} else {
			time_message.innerHTML = "forward";
			hours.play();
			minutes.play();
			traveling_forward = true;
		}
	}

	trails_slider.onmouseup = function(){
		if(trails_slider.value == 0){
			trails_off.className = "active";
		} else if (trails_slider.value == 100){
			trails_inf.className = "active";
		} else {
			trails_off.className = "";
			trails_inf.className = "";
		}
	}
})();
