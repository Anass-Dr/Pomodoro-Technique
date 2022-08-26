const activeBtn = document.querySelector(".active-btn");
const btns = document.querySelectorAll("li");
const timerSwitch = document.getElementById("timer-switch");
const circle = document.getElementById("circle");
const minutes = document.getElementById("minutes");
const seconds = document.getElementById("seconds");
let timerStatus = "off";
let timerCircle = 1;
let counter = 0;

// Micro Functions :
function timerControler(state, rmCircle = false) {
	if (state == "start") {
		timerSwitch.textContent = "PAUSE";
		timerStatus = "on";
		if (!rmCircle) circle.style.animationPlayState = "running";
		timer("on");
	} else {
		timerSwitch.textContent = "START";
		if (state == "pause") {
			circle.style.animationPlayState = "paused";
			timerStatus = "pause";
		} else {
			timerStatus = "off";
			circle.classList.remove("circle" + timerCircle);
			circle.style.animationPlayState = "";
		}
		timer("off");
	}
}

// Handle Buttons Cliks :
btns.forEach((e, i, arr) =>
	e.addEventListener("click", function () {
		if (timerStatus != "off") timerControler("off");
		timerCircle = i + 1;
		if (!e.classList.contains("active")) {
			arr.forEach((e) => e.classList.remove("active"));
			e.classList.add("active");
			seconds.textContent = "00";
			if (i === 0) {
				activeBtn.style.left = "0.5rem";
				minutes.textContent = "25";
			} else if (i === 1) {
				activeBtn.style.left = "calc(100% / 3)";
				minutes.textContent = "05";
			} else {
				activeBtn.style.left = "calc(100% * (2 / 3))";
				minutes.textContent = "60";
			}
		}
	})
);

// Start / Stop Timer :
timerSwitch.addEventListener("click", function () {
	if (timerStatus == "off") {
		circle.classList.add("circle" + timerCircle);
		timerControler("start", true);
	} else if (timerStatus == "on") {
		timerControler("pause");
	} else {
		timerControler("start");
	}
});

// Set the Timer Clock :
function timer(action, way = "forwards") {
	if (action == "on") {
		secondsInterval = setInterval(() => {
			if (minutes.textContent == "00" && seconds.textContent == "00") {
				counter += 1;
				timerStatus = "off";
				switchCircle(way);
			}
			s = seconds.textContent;
			m = minutes.textContent;
			if (s == "00") {
				seconds.textContent = 59;
				m -= 1;
				minutes.textContent = String(m).padStart(2, "0");
			} else {
				s -= 1;
				seconds.textContent = String(s).padStart(2, "0");
			}
		}, 1000);
	} else {
		clearInterval(secondsInterval);
	}
}

// Switch to the break :
function switchCircle(way) {
	timerControler("off");
	console.log(circle);
	if (counter < 4) {
		timerCircle = way === "forwards" ? 2 : 1;
	} else {
		timerCircle = 3;
		counter = 0;
	}
	btns.forEach((e) => e.classList.remove("active"));
	i = timerCircle - 1;
	btns[i].classList.add("active");
	// .......
	timerSwitch.textContent = "PAUSE";
	timerStatus = "on";
	circle.classList.add("circle" + timerCircle);
	// .......
	if (i === 0) {
		activeBtn.style.left = ".5rem";
		// minutes.textContent = "25";
		minutes.textContent = "01";
		timer("on");
	} else if (i === 1) {
		activeBtn.style.left = "calc(100% / 3)";
		// minutes.textContent = "05";
		minutes.textContent = "01";
		timer("on", "back");
	} else {
		activeBtn.style.left = "calc(100% * (2 / 3))";
		minutes.textContent = "60";
		timer("on");
	}
}
