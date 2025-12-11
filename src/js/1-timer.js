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
      console.log(selectedDates[0]);
      console.log(this.defaultDate);
      if (selectedDates[0] > this.defaultDate) {
          userSelectedDate = selectedDates[0];
      }
  },
};

//після валідації в методі onClose() на минуле/майбутнє запиши обрану дату в цю let змінну
let userSelectedDate;

/*Якщо користувач вибрав дату в минулому, покажи window.alert() з текстом "Please choose a date in the future" 
і зроби кнопку «Start» не активною.*/

/*
Якщо користувач вибрав валідну дату (в майбутньому), кнопка «Start» стає активною.
Кнопка «Start» повинна бути неактивною доти, доки користувач не вибрав дату в майбутньому. Зверни увагу, що при обранні валідної дати, не запуску таймера і обранні потім невалідної дати, кнопка після розблокування має знову стати неактивною.
Натисканням на кнопку «Start» починається зворотний відлік часу до обраної дати з моменту натискання. */

////// const calendar = document.querySelector("#datetime-picker");

flatpickr("#datetime-picker",options);