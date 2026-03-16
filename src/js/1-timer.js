import flatpickr from "flatpickr";
import iziToast from "izitoast";
import "flatpickr/dist/flatpickr.min.css"; 
import "izitoast/dist/css/iziToast.min.css";

const inputDate = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('[data-start]');
const daysShow = document.querySelector('[data-days]');
const hoursShow = document.querySelector('[data-hours]');
const minutesShow = document.querySelector('[data-minutes]');
const secondsShow = document.querySelector('[data-seconds]');

let userSelectedDate;
let leftTime;
    startBtn.disabled = true;

    flatpickr(inputDate, {
        enableTime: true,
        dateFormat: "Y-m-d H:i",
          time_24hr: true,
        defaultDate: new Date(),
        minuteIncrement: 1,
    
        onClose(selectedDates) {
            userSelectedDate = selectedDates[0];  
            const now = new Date();
            if (userSelectedDate <= now) {
                iziToast.show({
                    icon: 'ico-error',
                    title: 'Error',
                    message: 'Please choose a date in the future',
                    color: 'red',
                    position: 'topRight',
                    timeout: 3000,
                    close: true,
                });
                startBtn.disabled = true;
            } else {

                startBtn.disabled = false;
            }            
        }
    });

startBtn.addEventListener('click', () => {

    startBtn.disabled = true;
    inputDate.disabled = true;
    const timerId = setInterval(() => {
        
        leftTime = userSelectedDate - new Date();
        
        if (leftTime < 0) {
            clearInterval(timerId);
            inputDate.disabled = false;

            return;
        }

        let time = convertMs(leftTime);
        daysShow.textContent = addLeadingZero(time.days);
        hoursShow.textContent = addLeadingZero(time.hours);
        minutesShow.textContent = addLeadingZero(time.minutes);
        secondsShow.textContent = addLeadingZero(time.seconds);

        
    },1000)
});
function addLeadingZero(value) {
  return String(value).padStart(2, "0");
}

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


