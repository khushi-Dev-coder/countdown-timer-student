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
    let isPaused = false;
    let initialSeconds = 0;

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
     * Update the timer display
     * @param {number} seconds - Seconds to display
     */
    function updateDisplay(seconds) {
        timerOutput.textContent = formatTimeMMSS(seconds);
    }

    /**
     * Update timer status for accessibility
     * @param {string} message - Status message
     */
    function updateStatus(message) {
        timerStatus.textContent = message;
    }

    /**
     * Save the last timer value to localStorage
     * @param {number} seconds - Seconds to save
     */
    function saveToLocalStorage(seconds) {
        localStorage.setItem('last-timer', seconds.toString());
    }

    /**
     * Load the last timer value from localStorage
     * @returns {number} Last saved timer value or 10 as default
     */
    function loadFromLocalStorage() {
        const saved = localStorage.getItem('last-timer');
        return saved ? parseInt(saved, 10) : 10;
    }

    /**
     * Enable/disable buttons based on timer state
     */
    function updateButtonStates(isRunning, isPaused) {
        startBtn.disabled = isRunning && !isPaused;
        pauseBtn.disabled = !isRunning || (isRunning && isPaused);
        resetBtn.disabled = !isRunning && remainingSeconds === 0;
        
        // Update pause button text
        if (isPaused) {
            pauseBtn.textContent = 'Resume';
        } else {
            pauseBtn.textContent = 'Pause';
        }
    }

    /**
     * Start the countdown timer
     */
    function startTimer() {
        const inputValue = parseInt(secondsInput.value, 10);
        
        if (isNaN(inputValue) || inputValue < 1 || inputValue > 3600) {
            alert('Please enter a value between 1 and 3600 seconds');
            return;
        }

        // Save to localStorage
        saveToLocalStorage(inputValue);
        
        // Initialize timer
        initialSeconds = inputValue;
        remainingSeconds = inputValue;
        isPaused = false;
        
        // Update display
        updateDisplay(remainingSeconds);
        updateStatus(`Timer started: ${formatTimeMMSS(remainingSeconds)}`);
        
        // Clear any existing interval
        if (countdownInterval) {
            clearInterval(countdownInterval);
        }
        
        // Update button states
        updateButtonStates(true, false);
        
        // Start countdown
        countdownInterval = setInterval(() => {
            if (!isPaused) {
                remainingSeconds--;
                updateDisplay(remainingSeconds);
                
                if (remainingSeconds <= 0) {
                    clearInterval(countdownInterval);
                    countdownInterval = null;
                    timerOutput.textContent = 'Done!';
                    updateStatus('Timer completed!');
                    updateButtonStates(false, false);
                    remainingSeconds = 0;
                } else if (remainingSeconds === 10) {
                    updateStatus('10 seconds remaining');
                } else if (remainingSeconds === 5) {
                    updateStatus('5 seconds remaining');
                }
            }
        }, 1000);
    }

    /**
     * Pause or resume the timer
     */
    function togglePause() {
        if (countdownInterval && remainingSeconds > 0) {
            isPaused = !isPaused;
            updateButtonStates(true, isPaused);
            
            if (isPaused) {
                updateStatus('Timer paused');
            } else {
                updateStatus('Timer resumed');
            }
        }
    }

    /**
     * Reset the timer
     */
    function resetTimer() {
        // Clear interval
        if (countdownInterval) {
            clearInterval(countdownInterval);
            countdownInterval = null;
        }
        
        // Reset state
        isPaused = false;
        remainingSeconds = 0;
        
        // Restore last saved value
        const lastValue = loadFromLocalStorage();
        secondsInput.value = lastValue;
        updateDisplay(lastValue);
        
        // Update UI
        updateStatus('Timer reset');
        updateButtonStates(false, false);
    }

    /**
     * Initialize the application
     */
    function init() {
        // Load last saved value
        const lastValue = loadFromLocalStorage();
        secondsInput.value = lastValue;
        updateDisplay(lastValue);
        
        // Set up event listeners
        startBtn.addEventListener('click', startTimer);
        pauseBtn.addEventListener('click', togglePause);
        resetBtn.addEventListener('click', resetTimer);
        
        // Handle Enter key on input
        secondsInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                startTimer();
            }
        });
        
        // Update display when input changes
        secondsInput.addEventListener('input', (e) => {
            const value = parseInt(e.target.value, 10);
            if (!isNaN(value) && value > 0 && value <= 3600) {
                updateDisplay(value);
            }
        });
        
        // Initialize button states
        updateButtonStates(false, false);
    }

    // Start the application
    init();
})();