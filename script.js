const url = 'https://api.adviceslip.com/advice';

const adviceId = document.querySelector('.id');
const adviceText = document.querySelector('.advice-text');
const diceAdvice = document.querySelector('.icon-dice');
const dividerAdvice = document.querySelector('.divider');

dividerAdvice.addEventListener('click', () => {
    adviceText.classList.toggle('pause');
});

async function fetchURL(url) {
    adviceId.innerHTML = '';
    adviceText.innerHTML = '';
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
            clearInterval(timing);
        }
    }, 50);
    console.log(data.slip.advice);
} 

diceAdvice.addEventListener('click', () => {
    fetchURL(url);
});

fetchURL(url);