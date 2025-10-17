# Countdown Timer Application

A modern, accessible countdown timer web application with pause/resume functionality and persistent storage.

## Features

- **Timer Input**: Set countdown duration in seconds (1-3600)
- **Timer Display**: Shows remaining time in MM:SS format
- **Timer Controls**: 
  - Start: Begin countdown
  - Pause: Pause/resume ongoing countdown
  - Reset: Stop timer and restore last set time
- **Accessibility**: ARIA-live announcements for screen readers
- **Persistence**: Remembers last set timer value using localStorage
- **Visual Feedback**: 
  - Color-coded timer states
  - Smooth animations
  - Responsive design

## Usage

1. Enter desired countdown duration in seconds
2. Click "Start Timer" to begin countdown
3. Use "Pause" to pause/resume the timer
4. Click "Reset" to stop and restore the initial time
5. Timer automatically saves your last used duration

## Technical Details

- Pure JavaScript (no frameworks)
- localStorage for data persistence
- ARIA-live regions for accessibility
- Responsive CSS with gradient backgrounds
- MM:SS time format display

## Browser Support

Works in all modern browsers that support:
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
