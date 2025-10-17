# Countdown Timer Application

A modern, accessible countdown timer application with pause/resume functionality and persistent storage.

## Features

- **Countdown Timer**: Set a timer from 1 to 3600 seconds
- **Visual Display**: Shows remaining time in MM:SS format
- **Controls**: Start, pause, and reset timer functionality
- **Persistent Storage**: Remembers your last set time using localStorage
- **Accessibility**: ARIA-live announcements for screen readers
- **Responsive Design**: Works on all device sizes

## Usage

1. Enter the desired number of seconds in the input field
2. Click "Start Timer" to begin the countdown
3. Use "Pause" to temporarily stop the timer
4. Click "Resume" to continue from where you paused
5. Use "Reset" to stop the timer and restore the last set time

## Technical Details

- Pure HTML, CSS, and JavaScript (no frameworks)
- localStorage integration for persistence
- ARIA-live regions for accessibility
- Responsive design with mobile-first approach

## Browser Support

Works on all modern browsers that support:
- ES6 JavaScript
- localStorage API
- CSS Grid and Flexbox

## Round 2 Updates
### New Requirements:
Enhance the countdown timer: add pause (#pause-btn) and reset (#reset-btn) buttons; display the remaining time in MM:SS format inside #timer-output; use aria-live='polite' on #timer-status to announce updates; persist last set time in localStorage under 'last-timer' and restore on page load.

### New Checks:
- document.querySelector('#timer-status').getAttribute('aria-live') === 'polite'
- !!document.querySelector('#pause-btn')
- !!document.querySelector('#reset-btn')
- !!document.querySelector('script').textContent.includes('localStorage.setItem("last-timer"')
- !!document.querySelector('script').textContent.includes('localStorage.getItem("last-timer"')
- document.querySelector('#timer-output').textContent.match(/\d{2}:\d{2}/)
