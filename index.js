const STORAGE_KEY = "pomodoroMinutes";
const DEFAULT_MINUTES = 25;
const MIN_MINUTES = 1;
const MAX_MINUTES = 60;

function getStoredMinutes() {
  const stored = parseInt(localStorage.getItem(STORAGE_KEY), 10);
  if (Number.isInteger(stored) && stored >= MIN_MINUTES && stored <= MAX_MINUTES) {
    return stored;
  }
  return DEFAULT_MINUTES;
}

const DEFAULT_TIME = getStoredMinutes() * 60;

let timeLeft = DEFAULT_TIME;
let timerId = null;

const timeDisplay = document.getElementById("time-display");

function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
}

function updateDisplay() {
  timeDisplay.textContent = formatTime(timeLeft);
}

function tick() {
  if (timeLeft <= 0) {
    clearInterval(timerId);
    timerId = null;
    return;
  }
  timeLeft -= 1;
  updateDisplay();
}

function startTimer() {
  if (timerId !== null) return;
  timerId = setInterval(tick, 1000);
}

function resetTimer() {
  clearInterval(timerId);
  timerId = null;
  timeLeft = DEFAULT_TIME;
  updateDisplay();
}

updateDisplay();
