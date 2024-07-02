import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const datetimePicker = document.getElementById('datetime-picker');
const startButton = document.querySelector('.js-btn');

let userSelectedDate;
let countdownInterval;
startButton.disabled = true;

const el = {
  daysValue: document.querySelector('.js-days'),
  hoursValue: document.querySelector('.js-hours'),
  minutesValue: document.querySelector('.js-minutes'),
  secondsValue: document.querySelector('.js-seconds'),
};

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];
    if (selectedDate <= new Date()) {
      iziToast.error({
        title: 'Error',
        message: 'Please choose a date in the future',
      });
      startButton.disabled = true;
    } else {
      userSelectedDate = selectedDate;
      startButton.disabled = false;
    }
  },
};

flatpickr(datetimePicker, options);

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

startButton.addEventListener('click', () => {
  startButton.disabled = true;
  datetimePicker.disabled = true;
  countdownInterval = setInterval(updateTimer, 1000);
});

function updateTimer() {
  const curentDate = new Date();
  const timeDifference = userSelectedDate - curentDate;

  if (timeDifference <= 0) {
    clearInterval(countdownInterval);
    datetimePicker.disabled = false;
    return;
  }

  const { days, hours, minutes, seconds } = convertMs(timeDifference);

  el.daysValue.textContent = addLeadingZero(days);
  el.hoursValue.textContent = addLeadingZero(hours);
  el.minutesValue.textContent = addLeadingZero(minutes);
  el.secondsValue.textContent = addLeadingZero(seconds);
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
