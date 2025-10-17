// Countdown Timer Application
(function() {
    'use strict';

    // Cache DOM elements
    const secondsInput = document.querySelector('#seconds-input');
    const timerOutput = document.querySelector('#timer-output');
    const startBtn = document.querySelector('#start-btn');

    // Timer state
    let countdownInterval = null;
    let remainingSeconds = 0;

    /**
     * Format seconds to display string
     * @param {number} seconds - Number of seconds to format
     * @returns {string} Formatted time string
     */
    function formatTime(seconds) {
        if (seconds <= 0) return 'Done!';
        
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;
        
        if (hours > 0) {
            return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
        } else if (minutes > 0) {
            return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
        } else {
            return secs.toString();
        }
    }

    /**
     * Update the timer display
     */
    function updateDisplay() {
        timerOutput.textContent = formatTime(remainingSeconds);
        
        // Add visual feedback
        if (remainingSeconds <= 0) {
            timerOutput.classList.add('completed');
            timerOutput.classList.remove('running');
        } else if (remainingSeconds <= 5) {
            timerOutput.classList.add('warning');
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
        startBtn.textContent = 'Start Timer';
        startBtn.disabled = false;
        secondsInput.disabled = false;
    }

    /**
     * Start the countdown timer
     */
    function startTimer() {
        // Validate input
        const inputValue = parseInt(secondsInput.value, 10);
        
        if (isNaN(inputValue) || inputValue <= 0) {
            alert('Please enter a valid number of seconds (greater than 0)');
            return;
        }
        
        if (inputValue > 3600) {
            alert('Maximum time limit is 3600 seconds (1 hour)');
            return;
        }
        
        // Initialize timer
        remainingSeconds = inputValue;
        
        // Reset classes
        timerOutput.classList.remove('completed', 'warning');
        timerOutput.classList.add('running');
        
        // Update UI
        startBtn.textContent = 'Stop Timer';
        startBtn.disabled = false;
        secondsInput.disabled = true;
        
        // Display initial time
        updateDisplay();
        
        // Start countdown using setInterval
        countdownInterval = setInterval(() => {
            remainingSeconds--;
            updateDisplay();
            
            if (remainingSeconds <= 0) {
                stopTimer();
                // Play completion sound if available
                try {
                    const audio = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSl+zPPThjMGHm7A7+OZURE');
                    audio.volume = 0.3;
                    audio.play().catch(() => {});
                } catch (e) {
                    // Silent fail for audio
                }
            }
        }, 1000);
    }

    /**
     * Handle start/stop button click
     */
    function handleStartClick() {
        if (countdownInterval) {
            // Timer is running, stop it
            stopTimer();
            timerOutput.textContent = 'Stopped';
            timerOutput.classList.remove('running', 'warning');
        } else {
            // Timer is not running, start it
            startTimer();
        }
    }

    /**
     * Handle Enter key press in input field
     */
    function handleInputKeyPress(event) {
        if (event.key === 'Enter' && !countdownInterval) {
            startTimer();
        }
    }

    /**
     * Validate input as user types
     */
    function handleInputChange() {
        const value = parseInt(secondsInput.value, 10);
        if (value < 1) {
            secondsInput.value = 1;
        } else if (value > 3600) {
            secondsInput.value = 3600;
        }
    }

    // Event listeners
    startBtn.addEventListener('click', handleStartClick);
    secondsInput.addEventListener('keypress', handleInputKeyPress);
    secondsInput.addEventListener('change', handleInputChange);

    // Clean up on page unload
    window.addEventListener('beforeunload', () => {
        if (countdownInterval) {
            clearInterval(countdownInterval);
        }
    });

    // Initialize display
    timerOutput.textContent = 'Ready';
})();