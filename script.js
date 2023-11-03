const url = 'https://api.adviceslip.com/advice';

const adviceId = document.querySelector('.id');
const adviceText = document.querySelector('.advice-text');
const diceAdvice = document.querySelector('.icon-dice');
const dividerAdvice = document.querySelector('.divider');

dividerAdvice.addEventListener('click', () => {
    adviceText.classList.contains('pause') ? dividerAdvice.classList.remove('pause') : dividerAdvice.classList.add('pause'); 
    adviceText.classList.toggle('pause');
});

async function fetchURL(url) {
    adviceId.innerHTML = '';
    adviceText.innerHTML = '';
    adviceText.classList.remove('pause');
    dividerAdvice.classList.remove('pause');
    diceAdvice.disabled = true;
    const resp = await fetch(url);
    const data = await resp.json();
    adviceId.innerHTML = data.slip.id;
    let i = 0;
    const timing = setInterval(() => {
        if(i < data.slip.advice.length) {
            if(!adviceText.classList.contains('pause')) {
                adviceText.innerHTML += data.slip.advice[i];
                i++
            }
        } else {
            diceAdvice.disabled = false;
            clearInterval(timing);
        }
    }, 50);
    console.log(data.slip.advice);
} 

diceAdvice.addEventListener('click', () => {
    fetchURL(url);
});

fetchURL(url);