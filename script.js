let hoursInput,
  minutesInput,
  secondsInput,
  timer,
  btn_start,
  btn_stop,
  btn_reset,
  container;
const audio = new Audio("sound/Radar-iPhone.mp3");

window.onload = function () {
  hoursInput = document.getElementById("hours");
  hoursInput.value = "00";
  minutesInput = document.getElementById("minutes");
  minutesInput.value = "00";
  secondsInput = document.getElementById("seconds");
  secondsInput.value = "00";
  btn_start = document.getElementById("btn_start");
  btn_stop = document.getElementById("btn_stop");
  btn_reset = document.getElementById("btn_reset");
  container = document.getElementById("container");

  btn_start.addEventListener("click", start);
  btn_stop.addEventListener("click", stop);
  btn_reset.addEventListener("click", reset);
};

function start() {
  let hours = parseInt(hoursInput.value) || 0;
  let minutes = parseInt(minutesInput.value) || 0;
  let seconds = parseInt(secondsInput.value) || 0;

  if (hours == 0 && minutes == 0 && seconds == 0) {
    alert("Entrez une durée supérieure à zéro.");
    return;
  }

  let totalSeconds = hours * 3600 + minutes * 60 + seconds;

  timer = setInterval(function () {
    if (totalSeconds <= 0) {
      clearInterval(timer);
      hoursInput.value = "00";
      minutesInput.value = "00";
      secondsInput.value = "00";

      btn_start.disabled = false;
      audio.loop = true;
      audio.play();
      container.appendChild("audio");
      alert("Terminé");
      return;
    }

    let hoursRemaining = Math.floor(totalSeconds / 3600);
    let minutesRemaining = Math.floor((totalSeconds % 3600) / 60);
    let secondsRemaining = totalSeconds % 60;

    hoursInput.value = String(hoursRemaining).padStart(2, "0");
    minutesInput.value = String(minutesRemaining).padStart(2, "0");
    secondsInput.value = String(secondsRemaining).padStart(2, "0");

    totalSeconds--;

    btn_start.disabled = true;
  }, 1000);
}

function stop() {
  clearInterval(timer);

  btn_start.disabled = false;
  audio.pause();
  audio.currentTime = 0;
}

function reset() {
  clearInterval(timer);

  hoursInput.value = "00";
  minutesInput.value = "00";
  secondsInput.value = "00";

  btn_start.disabled = false;
}
