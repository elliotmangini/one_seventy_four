// Initialize Parameters!

let snarePattern = [4, 12, 20, 28, 36, 44, 52, 60];
let kickPattern = [0, 16, 32, 48, 58];

let currentKick = './Big_Sister_Kick_HTJ_01.wav'
let currentSnare = './Big_Sister_Snare_Rim_Geef_01.wav'

// declaring the important function names so that pause can access them.
let startIntervalFunctions;
let startIntervalClock;


// Master Clock Brain Memories!

let clockPosition = 0;
let bpm = 174;
let milliseconds = bpm / 2;
const sequenceLength = 63;


function play() {
    startIntervalFunctions = setInterval(tickingFunctions, milliseconds);
    startIntervalClock = setInterval(incrementClock, milliseconds);
}

function pause() {
    clearInterval(startIntervalFunctions);
    clearInterval(startIntervalClock);
}

play();
// pause();



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



function myPlay(currentSoundAsString){
    var audio = new Audio(currentSoundAsString);
    audio.play();
}



// let currentKick = document.getElementById('Kick1');



// Creating Patterns