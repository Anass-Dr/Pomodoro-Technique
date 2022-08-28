const activeBtn = document.querySelector(".active-btn");
const btns = document.querySelectorAll(".link");
const timerSwitch = document.getElementById("timer-switch");
const circle = document.getElementById("circle");
const minutes = document.getElementById("minutes");
const seconds = document.getElementById("seconds");
const settingsBtn = document.querySelector(".fa-gear");
const xmark = document.querySelector(".fa-xmark");
const settings = document.querySelector(".settings");
const shadow = document.querySelector(".shadow");
const numberInputs = document.querySelectorAll(".num-input");
const stepUpBtns = document.querySelectorAll(".step-up");
const stepDownBtns = document.querySelectorAll(".step-down");
const fontItems = document.querySelectorAll(".font-item");
const colorItems = document.querySelectorAll(".color-item");
const applyBtn = document.getElementById("settings-btn");
const countdownAudio = new Audio("./sounds/countdown.wav");
let timerStatus = "off";
let timerCircle = 1;
let counter = 0;
let timer1 = 25;
let timer2 = 05;
let timer3 = 15;
let duration = [timer1, timer2, timer3];
const availableFonts = [
	"'Fira Sans', sans-serif",
	"'Inter', sans-serif",
	"'Lora', serif",
];
const availableColors = ["#f14949", "cyan", "#d981f8"];

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
			countdownAudio.pause();
		} else {
			timerStatus = "off";
			circle.classList.remove("circle" + timerCircle);
			circle.style.animationPlayState = "";
			countdownAudio.load();
		}
		timer("off");
	}
}

// Handle Buttons Cliks :
btns.forEach((e, i, arr) =>
	e.addEventListener("click", function () {
		if (timerStatus != "off") timerControler("off");
		timerCircle = i + 1;
		circle.style.animationDuration = duration[i] * 60 + "s";
		if (!e.classList.contains("active")) {
			arr.forEach((e) => e.classList.remove("active"));
			e.classList.add("active");
			seconds.textContent = "00";
			if (i === 0) {
				activeBtn.style.left = "0.5rem";
				minutes.textContent = timer1;
			} else if (i === 1) {
				activeBtn.style.left = "calc(100% / 3)";
				minutes.textContent = String(timer2).padStart(2, "0");
			} else {
				activeBtn.style.left = "calc(100% * (2 / 3))";
				minutes.textContent = timer3;
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
				timerStatus = "off";
				counter = way === "back" ? (counter += 1) : counter;
				switchCircle(way);
			}
			if (minutes.textContent == "00" && seconds.textContent <= "10") {
				countdownAudio.play();
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

// Switch Between Circles :
function switchCircle(way) {
	timerControler("off");
	if (counter == 4) {
		timerCircle = 3;
	} else {
		timerCircle = way === "forwards" ? 2 : 1;
	}
	i = timerCircle - 1;
	circle.style.animationDuration = duration[i] * 60 + "s";
	btns.forEach((e) => e.classList.remove("active"));
	btns[i].classList.add("active");
	// .......
	timerSwitch.textContent = "PAUSE";
	timerStatus = "on";
	setTimeout(() => circle.classList.add("circle" + timerCircle), 20);
	// .......
	if (i === 0) {
		activeBtn.style.left = ".5rem";
		minutes.textContent = timer1;
		timer("on");
	} else if (i === 1) {
		activeBtn.style.left = "calc(100% / 3)";
		minutes.textContent = String(timer2).padStart(2, "0");
		timer("on", "back");
	} else {
		activeBtn.style.left = "calc(100% * (2 / 3))";
		minutes.textContent = timer3;
		timer("on");
	}
}

// Hide the Settings popup :
hideSettings = () => {
	settings.classList.add("hidden");
	shadow.classList.add("hidden");
};
xmark.onclick = hideSettings;

// Show the Settings popup :
settingsBtn.onclick = () => {
	settings.classList.remove("hidden");
	shadow.classList.remove("hidden");
};

document.addEventListener("click", function (e) {
	if (e.target == shadow) {
		hideSettings();
	}
});

// Config the Input Arrows :
stepUpBtns.forEach((e, i) =>
	e.addEventListener("click", () => {
		n = Number(numberInputs[i].value);
		numberInputs[i].value = n + 1;
	})
);

stepDownBtns.forEach((e, i) =>
	e.addEventListener("click", () => {
		n = numberInputs[i].value;
		n = n >= 1 ? (n -= 1) : 0;
		numberInputs[i].value = n;
	})
);

// Config the Fonts items :
fontItems.forEach((e, i, arr) =>
	e.addEventListener("click", () => {
		arr.forEach((e) => e.classList.remove("active-font"));
		e.classList.add("active-font");
	})
);

// Config the Color items :
colorItems.forEach((e, i, arr) =>
	e.addEventListener("click", () => {
		arr.forEach((e) => e.classList.remove("active-color"));
		e.classList.add("active-color");
	})
);

// Apply Settings :
applyBtn.addEventListener("click", () => {
	// Change the Timer && Circle Duration :
	timer1 = Number(numberInputs[0].value);
	timer2 = Number(numberInputs[1].value);
	timer3 = Number(numberInputs[2].value);
	duration = [timer1, timer2, timer3];
	minutes.textContent = String(duration[timerCircle - 1]).padStart(2, "0");
	circle.style.animationDuration = duration[timerCircle - 1] * 60 + "s";

	// Change the Color of the Pomodoro :
	colorItems.forEach((e, i) => {
		if (e.classList.contains("active-color"))
			document.documentElement.style.setProperty(
				"--SalmonColor",
				availableColors[i]
			);
	});

	// Change The Font for the Pomodoro :
	fontItems.forEach((e, i) => {
		if (e.classList.contains("active-font"))
			document.querySelector("body").style.fontFamily = availableFonts[i];
	});

	// Reset the Counter :
	counter = 0;

	// Stop the Timer :
	timerControler("off");
	seconds.textContent = "00";

	// .
	hideSettings();
});
