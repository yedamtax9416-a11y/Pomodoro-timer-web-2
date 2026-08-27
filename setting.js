const STORAGE_KEY = "pomodoroMinutes";
const DEFAULT_MINUTES = 25;
const MIN_MINUTES = 1;
const MAX_MINUTES = 60;

const timerInput = document.getElementById("timer-input");
const saveBtn = document.getElementById("save-btn");

function getStoredMinutes() {
  const stored = parseInt(localStorage.getItem(STORAGE_KEY), 10);
  if (Number.isInteger(stored) && stored >= MIN_MINUTES && stored <= MAX_MINUTES) {
    return stored;
  }
  return DEFAULT_MINUTES;
}

function isValidInput() {
  if (timerInput.value.trim() === "") return false;
  const value = Number(timerInput.value);
  return Number.isInteger(value) && value >= MIN_MINUTES && value <= MAX_MINUTES;
}

function handleInput() {
  saveBtn.disabled = !isValidInput();
}

function saveSettings() {
  if (!isValidInput()) return;
  localStorage.setItem(STORAGE_KEY, timerInput.value);
}

timerInput.value = getStoredMinutes();
handleInput();
