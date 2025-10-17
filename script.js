// Countdown Timer Application
(function() {
    'use strict';

    // Cache DOM elements
    const secondsInput = document.querySelector('#seconds-input');
    const timerOutput = document.querySelector('#timer-output');
    const timerStatus = document.querySelector('#timer-status');
    const startBtn = document.querySelector('#start-btn');
    const pauseBtn = document.querySelector('#pause-btn');
    const resetBtn = document.querySelector('#reset-btn');

    // Timer state
    let countdownInterval = null;
    let remainingSeconds = 0;
    let initialSeconds = 0;
    let isPaused = false;

    /**
     * Format seconds to MM:SS format
     * @param {number} seconds - Number of seconds to format
     * @returns {string} Formatted time string in MM:SS
     */
    function formatTimeMMSS(seconds) {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }

    /**
     * Update timer display and status
     * @param {number} seconds - Seconds to display
     */
    function updateDisplay(seconds) {
        if (seconds <= 0) {
            timerOutput.textContent = '00:00';
            timerStatus.textContent = 'Timer finished!';
            timerOutput.classList.add('done');
        } else {
            timerOutput.textContent = formatTimeMMSS(seconds);
            timerStatus.textContent = `${seconds} seconds remaining`;
            timerOutput.classList.remove('done');
        }
    }

    /**
     * Stop the countdown timer
     */
    function stopTimer() {
        if (countdownInterval) {
            clearInterval(countdownInterval);
            countdownInterval = null;
        }
        isPaused = false;
        updateButtonStates('stopped');
    }

    /**
     * Update button states based on timer state
     * @param {string} state - 'running', 'paused', or 'stopped'
     */
    function updateButtonStates(state) {
        switch(state) {
            case 'running':
                startBtn.disabled = true;
                pauseBtn.disabled = false;
                resetBtn.disabled = false;
                pauseBtn.textContent = 'Pause';
                secondsInput.disabled = true;
                break;
            case 'paused':
                startBtn.disabled = true;
                pauseBtn.disabled = false;
                resetBtn.disabled = false;
                pauseBtn.textContent = 'Resume';
                secondsInput.disabled = true;
                break;
            case 'stopped':
                startBtn.disabled = false;
                pauseBtn.disabled = true;
                resetBtn.disabled = true;
                pauseBtn.textContent = 'Pause';
                secondsInput.disabled = false;
                break;
        }
    }

    /**
     * Start the countdown timer
     */
    function startTimer() {
        stopTimer();
        
        const inputValue = parseInt(secondsInput.value, 10);
        
        if (isNaN(inputValue) || inputValue < 1 || inputValue > 3600) {
            alert('Please enter a valid number between 1 and 3600 seconds');
            return;
        }
        
        initialSeconds = inputValue;
        remainingSeconds = inputValue;
        
        // Save to localStorage
        localStorage.setItem('last-timer', initialSeconds.toString());
        
        updateDisplay(remainingSeconds);
        updateButtonStates('running');
        timerStatus.textContent = 'Timer started';
        
        countdownInterval = setInterval(() => {
            remainingSeconds--;
            updateDisplay(remainingSeconds);
            
            if (remainingSeconds <= 0) {
                stopTimer();
                timerStatus.textContent = 'Timer finished!';
            }
        }, 1000);
    }

    /**
     * Pause or resume the timer
     */
    function togglePause() {
        if (!countdownInterval && isPaused) {
            // Resume
            isPaused = false;
            updateButtonStates('running');
            timerStatus.textContent = 'Timer resumed';
            
            countdownInterval = setInterval(() => {
                remainingSeconds--;
                updateDisplay(remainingSeconds);
                
                if (remainingSeconds <= 0) {
                    stopTimer();
                    timerStatus.textContent = 'Timer finished!';
                }
            }, 1000);
        } else if (countdownInterval) {
            // Pause
            clearInterval(countdownInterval);
            countdownInterval = null;
            isPaused = true;
            updateButtonStates('paused');
            timerStatus.textContent = 'Timer paused';
        }
    }

    /**
     * Reset the timer to initial value
     */
    function resetTimer() {
        stopTimer();
        remainingSeconds = initialSeconds;
        updateDisplay(remainingSeconds);
        timerStatus.textContent = 'Timer reset';
    }

    /**
     * Load saved timer value from localStorage
     */
    function loadSavedTimer() {
        const savedTime = localStorage.getItem('last-timer');
        if (savedTime) {
            const seconds = parseInt(savedTime, 10);
            if (!isNaN(seconds) && seconds >= 1 && seconds <= 3600) {
                secondsInput.value = seconds;
                initialSeconds = seconds;
                updateDisplay(seconds);
            }
        } else {
            // Set default display
            updateDisplay(parseInt(secondsInput.value, 10));
        }
    }

    // Event listeners
    startBtn.addEventListener('click', startTimer);
    pauseBtn.addEventListener('click', togglePause);
    resetBtn.addEventListener('click', resetTimer);
    
    secondsInput.addEventListener('input', function() {
        const value = parseInt(this.value, 10);
        if (!isNaN(value) && value >= 1 && value <= 3600) {
            updateDisplay(value);
        }
    });

    // Initialize on load
    loadSavedTimer();
})();