const refs = {
    body: document.querySelector("body"),
    startBtn: document.querySelector('button[data-start]'),
    stopBtn: document.querySelector('button[data-stop]'),
}
let intervalID;

refs.startBtn.addEventListener('click', onStartClick)
refs.stopBtn.addEventListener('click', onStopClick)

function onStartClick(e) {
    console.log('click start')
    refs.startBtn.disabled = 'disabled';
    refs.stopBtn.disabled = '';
    intervalID = setInterval (changeBGC, 1000)
}
function changeBGC() {
 refs.body.style.backgroundColor = `${getRandomHexColor()}`
}

function onStopClick(e) {
    console.log('click stop')
    refs.startBtn.disabled = '';
    refs.stopBtn.disabled = 'disabled';
    clearInterval(intervalID )
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}