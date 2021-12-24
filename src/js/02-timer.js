import flatpickr from "flatpickr";
import 'flatpickr/dist/flatpickr.min.css';

const refs = {
    btnStart: document.querySelector('button')
}
// Об єкт для властивостей бібліотеки flatpickr (пікер з календаря)
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
    onClose(selectedDates) {
        if (selectedDates[0]>options.defaultDate) {
            console.log('робимо активним старт');
            refs.btnStart.disabled = '';
        } else {
            alert("Please choose a date in the future")
            refs.btnStart.disabled = 'disabled';
            console.log('старт відхилено не вірно вказана дата');
        }
  },
};

// ініціалізація flatpickr в проекті
flatpickr("#datetime-picker", options);

// Таймер
const timer = {
    start() {
        const startTime = Date.now()
    
    setInterval(() => {
        const currentTime = Date.now()
        const deltaTime = currentTime-startTime
        const { days, hours, minutes, seconds } = convertMs(deltaTime)
        console.log(`${days}:${hours}:${minutes}:${seconds }`)
    }, 1000)
    }
}

// timer.start()

// функція яка форматує дату до формату хх:хх:хх
function addLeadingZero(value) {
    return String(value).padStart(2, '0');
}

// функція для підрахунку часу з юнікс
function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60; 
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}
