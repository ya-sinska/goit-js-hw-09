import flatpickr from "flatpickr";
import 'flatpickr/dist/flatpickr.min.css';

const refs = {
    btnStart: document.querySelector('button'),
    inputCalendar: document.querySelector('input'),
    days: document.querySelector('span[data-days]'),
    hours: document.querySelector('span[data-hours]'),
    minutes: document.querySelector('span[data-minutes]'),
    seconds: document.querySelector('span[data-seconds]'),
}

let start;
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
            start = selectedDates[0].getTime();
            // Слухач для кнопки
            refs.btnStart.addEventListener('click', onBtnStartClick)
        } else {
            alert("Please choose a date in the future")
            console.log('старт відхилено не вірно вказана дата');
        }
  },
};

// ініціалізація flatpickr в проекті
flatpickr("#datetime-picker", options);

// При кліку по кнопці запускаємо таймер
function onBtnStartClick() {
    timer.start(start)
    // роблю не активним старт після запуску таймера
    refs.btnStart.disabled = 'disabled';
}
// Створила клас таймер модель підрахунку часу
class Timer {
    constructor({onTick}) {
        this.isActive = false;
        this.intervalID = null;
        this.onTick = onTick;
    }
    // функція старту таймера
    start(startTime) {
        if (this.isActive) {
            return;
        }
        this.isActive = true;

        this.intervalID = setInterval(() => {
        const currentTime = Date.now()
        const deltaTime = startTime - currentTime
        const timerTime = this.convertMs(deltaTime)
        console.log(timerTime)
        if (deltaTime<1000) {
            clearInterval(this.intervalID);
            this.isActive = false;
        } 
        this.onTick(timerTime)    
        }, 1000)
    }
    // функція яка форматує дату до формату хх:хх:хх
    addLeadingZero(value) {
    return String(value).padStart(2, '0');
    }

// функція для підрахунку часу з юнікс
    convertMs(ms) {
  // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60; 
    const hour = minute * 60;
    const day = hour * 24;

    // Remaining days
    const days = this.addLeadingZero(Math.floor(ms / day));
    // Remaining hours
    const hours = this.addLeadingZero(Math.floor((ms % day) / hour));
    // Remaining minutes
    const minutes = this.addLeadingZero(Math.floor(((ms % day) % hour) / minute));
    // Remaining seconds
    const seconds = this.addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

    return { days, hours, minutes, seconds };
    }
}
// Створила екземпляр таймера
const timer = new Timer({
    onTick: updateClock
});

// функція для роботи з візуалом
function updateClock({ days, hours, minutes, seconds }) {
    refs.days.textContent = `${days}`;
    refs.hours.textContent = `${hours}`;
    refs.minutes.textContent = `${minutes}`;
    refs.seconds.textContent = `${seconds}`;
   
}
// ======== до створення класу таймера ========
// Таймер для відрахунку часу назад 
// const timer = {
//     isActive: false,
//     intervalID: null,

//     start(startTime) {
//         if (this.isActive) {
//             return;
//         }
//         this.isActive = true;

//         this.intervalID = setInterval(() => {
//         const currentTime = Date.now()
//         const deltaTime = startTime - currentTime
//         const timerTime = convertMs(deltaTime)
//         console.log(timerTime)
//         if (deltaTime<1000) {
//             clearInterval(this.intervalID);
//             this.isActive = false;
//         } 
//         updateClock(timerTime)    
//         }, 1000)
//     }
// }

// функція яка форматує дату до формату хх:хх:хх
// function addLeadingZero(value) {
//     return String(value).padStart(2, '0');
// }

// функція для підрахунку часу з юнікс
// function convertMs(ms) {
//   // Number of milliseconds per unit of time
//   const second = 1000;
//   const minute = second * 60; 
//   const hour = minute * 60;
//   const day = hour * 24;

//   // Remaining days
//   const days = addLeadingZero(Math.floor(ms / day));
//   // Remaining hours
//   const hours = addLeadingZero(Math.floor((ms % day) / hour));
//   // Remaining minutes
//   const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
//   // Remaining seconds
//   const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

//   return { days, hours, minutes, seconds };
// }

