// Master Clock Brain!

let clockPosition = 0;
let bpm = 174;
let milliseconds = bpm / 2;
const sequenceLength = 7;

setInterval(tickingFunctions, milliseconds);
setInterval(incrementClock, milliseconds);

// var startIntervalFunctions = setInterval(tickingFunctions, milliseconds);
// var startIntervalClock = setInterval(incrementClock, milliseconds);

// function play() {
//     startIntervalFunctions();
//     startIntervalClock(;)
// }

// function pause() {
//     clearInterval(startIntervalFunctions);
//     clearInterval(startIntervalClock);
// }

// play();



function incrementClock() {
    console.log(clockPosition)
    if (clockPosition < sequenceLength) {
        clockPosition += 1;
    } else {
        clockPosition = 0;
    }
}


function tickingFunctions() {
    metronomeBlink();
    illuminateButtons();
    playKick();
    playSnare();
}



// Child Functions!

function metronomeBlink() {
    if (Number.isInteger(clockPosition / 4)) {
        document.getElementById('metronomeLight').style.background = 'var(--litRed)';
    } else {
       document.getElementById('metronomeLight').style.background = 'var(--dimRed)';
    }

}

function playKick() {
    if (kickPattern.includes(clockPosition)) {
        myPlay(currentKick);
    }
}

function playSnare() {
    if (snarePattern.includes(clockPosition)) {
        myPlay(currentSnare);
    }
}

function illuminateButtons() {

    for (let i = 0; i < sequenceLength; i++) {
        let currentSnareId = `s${i}`;
        let currentKickId = `k${i}`;

        if (snarePattern.includes(i)) {
            document.getElementById(currentSnareId).style.background = 'var(--litCyan)';
        }

        if (kickPattern.includes(i)) {
            document.getElementById(currentKickId).style.background = 'var(--litCyan)';
        }

    }
}







// Pattern Memory!

let snarePattern = [4, 12, 20, 28, 36, 44, 52, 60];
let kickPattern = [0, 10, 16, 26, 32, 42, 48, 58];

function myPlay(currentSoundAsString){
    var audio = new Audio(currentSoundAsString);
    audio.play();
}

// Sample Loading

let currentKick = './Big_Sister_Kick_HTJ_01.wav'
let currentSnare = './Big_Sister_Snare_Rim_Geef_01.wav'

// let currentKick = document.getElementById('Kick1');



// Creating Patterns