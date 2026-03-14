import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const form = document.querySelector('.form');


form.addEventListener('submit', (event) => {
    event.preventDefault();

const delay = Number(form.elements.delay.value);
    const state = form.elements.state.value;


    const promise = new Promise((res,rej) => {
        setTimeout(() => {
            if (state === "fulfilled") {
                res();

            } else {
                rej();
            }
            }, delay)
    });
    
    
    function onFulfield() {
        iziToast.show({
            message: `✅ Fulfilled promise in ${delay}ms`,
            color: 'green',
            position: 'topRight',
        
        })
    };
    
    function onReject() {
        iziToast.show({
            message: `❌ Rejected promise in ${delay}ms`,
            color: 'red',
            position: 'topRight',

        });
        
        
    }
    
    promise.then(onFulfield, onReject);
})