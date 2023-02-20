const startBtn = document.querySelector('button[data-start]');
const stopBtn = document.querySelector('button[data-stop]');

let intervalId;

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

startBtn.addEventListener('click', () => {
  startBtn.disabled = true;

  intervalId = setInterval(() => {
    const randomColor = getRandomHexColor();
    document.body.style.backgroundColor = randomColor;
  }, 1000);
  stopBtn.disabled = false;
});

stopBtn.addEventListener('click', () => {
  stopBtn.disabled = true;

  clearInterval(intervalId);
  startBtn.disabled = false;
});
