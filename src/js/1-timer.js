// Описаний в документації
import flatpickr from "flatpickr";
// Додатковий імпорт стилів
import "flatpickr/dist/flatpickr.min.css";

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
      if (selectedDates[0] > options.defaultDate) {
        userSelectedDate = selectedDates[0];
        startButton.disabled = false;
    }
      else {
        window.alert("Please choose a date in the future");
        startButton.disabled = true;
    }
  },
};

//після валідації в методі onClose() на минуле/майбутнє запиши обрану дату в цю let змінну
let userSelectedDate;
const startButton = document.querySelector("button");

startButton.addEventListener("click", function () {
  //кнопки start & input стають неактивними
  startButton.disabled = true;
  let countdown = convertMs(userSelectedDate);
  console.log(countdown);
});


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

  return { days, hours, minutes, seconds };
}