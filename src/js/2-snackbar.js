// Описаний у документації
import iziToast from "izitoast";
// Додатковий імпорт стилів
import "izitoast/dist/css/iziToast.min.css";

const form = document.querySelector(".form");

form.addEventListener("submit", function (event) {
    event.preventDefault();
    
    //яке число ввів користувач?
    const delay = parseInt(event.target.elements.delay.value);
    //який статус промісу?
    const state = event.target.elements.state.value;

    setTimeout(() => {
        new Promise((resolve, reject) => {
        if (state === "fulfilled") {
            resolve(delay);
        } else {
            reject(delay);   
        }
        })
            .then((data) => { 
                iziToast.success({
                    message: `✅ Fulfilled promise in ${data}ms`,
                    position: 'topRight', 
                    balloon: true,
                });
            })
            .catch((error) => { 
                iziToast.error({
                    message: `❌ Rejected promise in ${error}ms`,
                    position: 'topRight', 
                    balloon: true,
                });
            })
    }, delay);
})