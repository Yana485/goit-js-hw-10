// Описаний в документації
import flatpickr from "flatpickr";
// Додатковий імпорт стилів
import "flatpickr/dist/flatpickr.min.css";

let userSelectedDate;
const startButton = document.querySelector("button");
startButton.disabled = true;
  
startButton.addEventListener("click", function () {
  //кнопки start & input стають неактивними
  //console.log(userSelectedDate);
  let time = userSelectedDate - Date.now();
  let countdown = convertMs(time);
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
        window.alert("Please choose a date in the future");
        startButton.disabled = true;
    }
  },
};

flatpickr("#datetime-picker", options);

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
  
  console.log(`seconds:${seconds}; minutes:${minutes}; hours:${hours}; days: ${days}`);
  
  return { days, hours, minutes, seconds };
}