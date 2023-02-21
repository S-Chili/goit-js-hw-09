import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const dateTimePicker = document.querySelector('#datetime-picker');
const startButton = document.querySelector('[data-start]');
const daysField = document.querySelector('[data-days]');
const hoursField = document.querySelector('[data-hours]');
const minutesField = document.querySelector('[data-minutes]');
const secondsField = document.querySelector('[data-seconds]');

flatpickr(dateTimePicker, {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
  },
});

const convertMs = ms => {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
};

startButton.disabled = true;

dateTimePicker.addEventListener('change', event => {
  const selectedDate = new Date(event.target.value).getTime();
  const currentDate = new Date().getTime();

  if (selectedDate <= currentDate) {
    Notiflix.Notify.failure('Please choose a date in the future');
    startButton.disabled = true;
  } else {
    startButton.disabled = false;
  }
});

startButton.addEventListener('click', () => {
  const selectedDate = new Date(dateTimePicker.value).getTime();

  startButton.disabled = true;

  const timerId = setInterval(() => {
    const timeLeft = selectedDate - new Date().getTime();
    if (timeLeft <= 0) {
      clearInterval(timerId);
      daysField.textContent = '00';
      hoursField.textContent = '00';
      minutesField.textContent = '00';
      secondsField.textContent = '00';
      return;
    }

    const time = convertMs(timeLeft);
    daysField.textContent = time.days.toString().padStart(2, '0');
    hoursField.textContent = time.hours.toString().padStart(2, '0');
    minutesField.textContent = time.minutes.toString().padStart(2, '0');
    secondsField.textContent = time.seconds.toString().padStart(2, '0');
  }, 1000);
});
