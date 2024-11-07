let startTime, elapsedTime = 0, timerInterval;
const display = document.getElementById("display");
const startBtn = document.getElementById("startBtn");
const stopBtn = document.getElementById("stopBtn");
const resetBtn = document.getElementById("resetBtn");
const lapBtn = document.getElementById("lapBtn");
const lapTimes = document.getElementById("lapTimes");

// Format time as HH:MM:SS:ms
function formatTime(ms) {
    let totalMilliseconds = ms;
    let totalSeconds = Math.floor(ms / 1000);
    let hours = String(Math.floor(totalSeconds / 3600)).padStart(2, '0');
    let minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, '0');
    let seconds = String(totalSeconds % 60).padStart(2, '0');
    let milliseconds = String(totalMilliseconds % 1000).padStart(3, '0');
    return `${hours}:${minutes}:${seconds}:${milliseconds}`;
}

// Update the display
function updateDisplay() {
    display.textContent = formatTime(elapsedTime);
}

// Start the timer
startBtn.onclick = () => {
    if (!timerInterval) {
        startTime = Date.now() - elapsedTime;
        timerInterval = setInterval(() => {
            elapsedTime = Date.now() - startTime;
            updateDisplay();
        }, 10); // Update every 10 milliseconds
    }
};

// Stop the timer
stopBtn.onclick = () => {
    clearInterval(timerInterval);
    timerInterval = null;
};

// Reset the timer
resetBtn.onclick = () => {
    clearInterval(timerInterval);
    timerInterval = null;
    elapsedTime = 0;
    updateDisplay();
    lapTimes.innerHTML = "";  // Clear lap times
};

// Record a lap time
lapBtn.onclick = () => {
    if (timerInterval) {
        const lapTime = document.createElement("li");
        lapTime.textContent = formatTime(elapsedTime);
        lapTimes.appendChild(lapTime);
    }
};

// Initial display update
updateDisplay();
