let startTime;
let isRunning = false;
let lapCounter = 1;

const display = document.querySelector('.display');
const startPauseButton = document.getElementById('startPause');
const resetButton = document.getElementById('reset');
const lapButton = document.getElementById('lap');
const lapList = document.getElementById('lapList');

startPauseButton.addEventListener('click', startPause);
resetButton.addEventListener('click', reset);
lapButton.addEventListener('click', lap);

function startPause() {
    if (isRunning) {
        pause();
    } else {
        start();
    }
}

function start() {
    if (!isRunning) {
        isRunning = true;
        startTime = new Date().getTime() - (lapCounter > 1 ? lapCounter - 1 : 0) * 1000;
        startPauseButton.textContent = 'Pause';
        updateDisplay();
        timerInterval = setInterval(updateDisplay, 1000);
    }
}

function pause() {
    if (isRunning) {
        isRunning = false;
        clearInterval(timerInterval);
        startPauseButton.textContent = 'Resume';
    }
}

function reset() {
    pause();
    lapCounter = 1;
    display.textContent = '00:00:00';
    lapList.innerHTML = '';
}

function lap() {
    if (isRunning) {
        const lapTime = calculateElapsedTime();
        const lapItem = document.createElement('li');
        lapItem.textContent = `Lap ${lapCounter}: ${lapTime}`;
        lapList.appendChild(lapItem);
        lapCounter++;
    }
}

function updateDisplay() {
    const elapsedMilliseconds = calculateElapsedTime();
    const formattedTime = formatTime(elapsedMilliseconds);
    display.textContent = formattedTime;
}

function calculateElapsedTime() {
    return new Date().getTime() - startTime;
}

function formatTime(milliseconds) {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const seconds = totalSeconds % 60;
    const minutes = Math.floor(totalSeconds / 60) % 60;
    const hours = Math.floor(totalSeconds / 3600);
    return `${padNumber(hours)}:${padNumber(minutes)}:${padNumber(seconds)}`;
}

function padNumber(number) {
    return number.toString().padStart(2, '0');
}
