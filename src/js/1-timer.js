// Описаний в документації
import flatpickr from "flatpickr";
// Додатковий імпорт стилів
import "flatpickr/dist/flatpickr.min.css";

// Описаний у документації
import iziToast from "izitoast";
// Додатковий імпорт стилів
import "izitoast/dist/css/iziToast.min.css";

let userSelectedDate;
const startButton = document.querySelector("button[data-start]");
const calendar = document.querySelector("#datetime-picker");
startButton.disabled = true;

const timerDays = document.querySelector('span[data-days]');
const timerHours = document.querySelector('span[data-hours]');
const timerMinutes = document.querySelector('span[data-minutes]');
const timerSeconds = document.querySelector('span[data-seconds]');

let intervalId = null;

startButton.addEventListener("click", function () {
  //кнопки start & input стають неактивними
  startButton.disabled = true;
  calendar.disabled = true;
  
  intervalId = setInterval(() => {
    const time = userSelectedDate - Date.now();
    if (time <= 0) {
      clearInterval(intervalId);
      calendar.disabled = false;
      return
    }
    const countdown = convertMs(time);
    populateTime(countdown);
  }, 1000);
});

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
      if (selectedDates[0] > Date.now()) {
        userSelectedDate = selectedDates[0].getTime();
        startButton.disabled = false;
    }
      else {
        iziToast.error({
          
          message: 'Please choose a date in the future',
          position: 'topRight', 
          balloon: true,
        });
        startButton.disabled = true;
    }
  },
};

flatpickr(calendar, options);

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

function populateTime({ days, hours, minutes, seconds }) {
  timerDays.innerHTML = String(days).padStart(2, "0");
  timerHours.innerHTML = String(hours).padStart(2, "0");
  timerMinutes.innerHTML = String(minutes).padStart(2, "0");
  timerSeconds.innerHTML = String(seconds).padStart(2, "0");
}