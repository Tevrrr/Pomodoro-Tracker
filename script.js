const setting        = document.getElementById("setting"); 
const conteiner      = document.getElementById("conteiner");
const time           = document.getElementById("time");
const start          = document.getElementById("start");
const controlButtons = document.getElementsByClassName("controlButton");

let idInterval;
let timeModeList     = [];
let currentMode      = 0;
let cycleCounter     = 0;
let limitingCycles   = 3;
let autoStart        = true;
let bgCollorList     = ["workCollor", "shortBreakCollor", "longBreakCollor"]



function timer() {
    if (time.textContent == "00:00"){
        switchModeAuto();
    }
    else if(parseInt(time.textContent.substring(3,5))>0){
        time.textContent = time.textContent.substring(0,3) + 
                           ("00" + (parseInt(time.textContent.substring(3,5))-1)).slice(-2);
    }
    else{
        time.textContent = ("00" + (time.textContent.substring(0,2)-1)).slice(-2) + ":59";
    }
}

function setTime() {
    time.textContent = timeModeList[currentMode];
    time.textContent = ("00" + timeModeList[currentMode]).slice(-2) + ":00";    
}

function switchMode(i) {
    start.textContent = "start";
    clearInterval(idInterval);    
    controlButtons[currentMode].classList.remove("active");
    conteiner.classList.remove(bgCollorList[currentMode]);
    currentMode = i;

    controlButtons[currentMode].classList.add("active");
    conteiner.classList.add(bgCollorList[currentMode]);
    setTime();
}

function switchModeAuto() {
    if(cycleCounter >= limitingCycles){
        switchMode(2);
        cycleCounter = 0;
    }
    else if(currentMode == 0){
        switchMode(1);
        cycleCounter++;
    }
    else{
        switchMode(0);
    }
    if(autoStart) start.onclick();
}



function openSetting() {
    setting.classList.remove("delete-block");
}

function closeSetting() {
    if(setSetting()){
        setTime();
        setting.classList.add("delete-block");
    }
}

function setSetting() {
    let inputs = document.getElementsByClassName("setting__input-number");
    for (let i = 0; i < inputs.length; i++) {
        if(inputs[i].value <= 0 || inputs[i].value >= 100 ){
            return false;
        }
        timeModeList[i] = inputs[i].value;
    }
    inputs = document.getElementsByClassName("setting__input-checkbox");
    autoStart = inputs[0].checked;
    return true;
}




start.onclick = function () {
    if(start.textContent == "stop"){
        start.textContent = "start";
        clearInterval(idInterval);
    }
    else{
        start.textContent = "stop";
        idInterval = setInterval(timer,1000);
    }
}



setSetting();
    














