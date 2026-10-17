const themeToggle=document.getElementById("themeToggle");
const modeBtn=document.getElementById("mode-btn");
const analogClock=document.getElementById("analog-clock");
const digitalClock=document.getElementById("digital-clock");

let isDigital=false;

themeToggle.addEventListener("click",()=>{
    const isDark=document.body.dataset.theme==="dark";
    document.body.dataset.theme=isDark?"light":"dark";
    themeToggle.querySelector("i").className=`fa-solid fa-${isDark?"moon":"sun"}`;
});

modeBtn.addEventListener("click",()=>{
    isDigital=!isDigital;
    if(isDigital){
        analogClock.classList.remove("active");
        digitalClock.classList.add("active");
        modeBtn.innerText="SWITCH TO ANALOG";
    }else{
        digitalClock.classList.remove("active");
        analogClock.classList.add("active");
        modeBtn.innerText="SWITCH TO DIGITAL";
    }
});

const hourHand=document.querySelector(".hour");
const minuteHand=document.querySelector(".minute");
const secondHand=document.querySelector(".second");

const hourVal=document.getElementById("hour-val");
const minuteVal=document.getElementById("minute-val");
const hourWrapper=document.getElementById("hour-wrapper");
const minuteWrapper=document.getElementById("minute-wrapper");

let lastHour=null;
let lastMinute=null;

let currentHourHue=Math.floor(Math.random()*360);
let currentMinuteHue=Math.floor(Math.random()*360);

document.getElementById("hour-note").style.setProperty("--note-h",currentHourHue);
document.getElementById("minute-note").style.setProperty("--note-h",currentMinuteHue);

function updateClock(){
    const now=new Date();
    const h=now.getHours();
    const m=now.getMinutes();
    const s=now.getSeconds();

    const secondDegree=(s/60)*360;
    const minuteDegree=(m/60)*360+(s/60)*6;
    const hourDegree=(h%12/12)*360+(m/60)*30;

    secondHand.style.transform=`rotate(${secondDegree}deg)`;
    minuteHand.style.transform=`rotate(${minuteDegree}deg)`;
    hourHand.style.transform=`rotate(${hourDegree}deg)`;

    const displayH=h<10?"0"+h:h;
    const displayM=m<10?"0"+m:m;

    if(lastMinute!==displayM){
        triggerDropNote(minuteWrapper,minuteVal,displayM,"minute");
        lastMinute=displayM;
    }

    if(lastHour!==displayH){
        triggerDropNote(hourWrapper,hourVal,displayH,"hour");
        lastHour=displayH;
    }
}

function triggerDropNote(wrapper,textElement,newValue,type){
    if(textElement.innerText==="--"||textElement.innerText===newValue){
        textElement.innerText=newValue;
        return;
    }

    const currentNote=textElement.parentElement;
    const fallingNote=currentNote.cloneNode(true);
    fallingNote.classList.add("falling");

    fallingNote.removeAttribute("id");
    fallingNote.querySelector(".note-text").removeAttribute("id");

    wrapper.appendChild(fallingNote);

    textElement.innerText=newValue;

    if(type==="hour"){
        currentHourHue=(currentHourHue+137.5)%360;
        currentNote.style.setProperty("--note-h",currentHourHue);
    }else{
        currentMinuteHue=(currentMinuteHue+137.5)%360;
        currentNote.style.setProperty("--note-h",currentMinuteHue);
    }

    setTimeout(()=>{
        fallingNote.remove();
    },900);
}

setInterval(updateClock,1000);
updateClock();