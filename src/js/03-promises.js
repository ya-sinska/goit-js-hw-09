// Імпорт бібліотеки сповіщень
import { Notify } from 'notiflix/build/notiflix-notify-aio';
// Дістаю ссилки на поля вводу
const refs = {
  inputDelay : document.querySelector('input[name="delay"]'),
  inputStep : document.querySelector('input[name="step"]'),
  inputAmount: document.querySelector('input[name="amount"]'),
  btnSubmit: document.querySelector('button[type="submit"]'),
  form : document.querySelector ('.form')
}
// Кидаю слухач на форму
refs.form.addEventListener('submit', onFormSubmit);
// Функція для сабміту форми
function onFormSubmit(e) {
  // скидаю налаштування щоб при сабміті неперезавантажувати сторінку
  e.preventDefault();
  // при сабміті записую значення інпутів в перемінні
  let delay = Number(refs.inputDelay.value)
  let step = Number(refs.inputStep.value)
  let amount = Number(refs.inputAmount.value)
  // щоб викликати ф-цію створення промісів н разів застосовую фор
  for (let i = 0; i < amount; i += 1) {
    // виклик ф-ції промісів куди вказую нумерацію і затримку з врахуванням кроку
    createPromise(i+1, delay+i*step)
    .then(({ position, delay }) => {
    Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
    .catch(({ position, delay }) => {
      Notify.warning(`❌ Rejected promise ${position} in ${delay}ms`);
      });
  }
}
  
// функція для створення промісів
function createPromise(position, delay) {
  // вертаємо в зовнішній код проміс 
  return new Promise((resolve, reject) => {
    // роблю затримку для виконання промісу
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve({position, delay});
      } else {
        reject({position, delay});
      }
    }, delay);
  }
  )
}
