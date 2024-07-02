// Описаний у документації
import iziToast from 'izitoast';
// Додатковий імпорт стилів
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('form');

form.addEventListener('submit', e => {
  e.preventDefault();
  const delay = e.target.delay.value;
  const state = e.target.state.value;

  const promise = new Promise((res, rej) => {
    if (state === 'fulfilled') {
      res(delay);
    } else {
      rej(delay);
    }
  }, delay);

  promise
    .then(delay => {
      iziToast.success({
        title: '',
        message: ` Fulfilled promise in ${delay}ms`,
        position: 'topRight',
      });
    })
    .catch(delay => {
      iziToast.error({
        title: '',
        message: ` Rejected promise in ${delay}ms`,
        position: 'topRight',
      });
    });

  form.reset();
});
