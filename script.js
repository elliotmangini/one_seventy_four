// Audio + Pattern Defaults

let snarePattern = [4, 12, 20, 28, 36, 44, 52, 60];
let kickPattern = [0, 16, 32, 48, 58];
let stepLightPattern = [0, 4, 8, 12, 16, 20, 24, 28, 32, 36, 40, 44, 48, 52, 56, 60]

let currentKick = './Big_Sister_Kick_HTJ_01.wav'
let currentSnare = './Big_Sister_Snare_Rim_Geef_01.wav'

let hotSample1 = './Wheel_Up_Signal.wav'
let hotSample2 = './Wheel_Up_Signal.wav'
let hotSample3 = './Wheel_Up_Signal.wav'
let hotSample4 = './Wheel_Up_Signal.wav'

// Pseudo-declaration of functions to handle scope well.
let startIntervalFunctions;
let startIntervalClock;

// Master Clock Parameters!

let clockPosition = 0;
let bpm = 174;
let milliseconds = (60000 / bpm / 4);
const sequenceLength = 63;

// Master Control Functions

function play() {
    startIntervalFunctions = setInterval(tickingFunctions, milliseconds);
    startIntervalClock = setInterval(incrementClock, milliseconds);
}

function pause() {
    clearInterval(startIntervalFunctions);
    clearInterval(startIntervalClock);
}

// Manual Controls for use in development.

illuminateButtons();
play();
// pause();

// Main Time-Based Logic Functions.

function incrementClock() {
    // console.log(clockPosition)
    if (clockPosition < sequenceLength) {
        clockPosition += 1;
    } else {
        clockPosition = 0;
    }
}


function tickingFunctions() {
    metronomeBlink();
    stepLightBlink();
    illuminateButtons();
    playKick();
    playSnare();
}


// Child Functions (Called Over & Over By The Clock)!

function metronomeBlink() {
    if (Number.isInteger(clockPosition / 8)) {
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

    for (let i = 0; i <= sequenceLength; i++) {
        let currentSnareId = `s${i}`;
        let currentKickId = `k${i}`;

        if (snarePattern.includes(i)) {
            document.getElementById(currentSnareId).style.background = 'var(--litCyan)';
        } else if (!snarePattern.includes(i)) {
            document.getElementById(currentSnareId).style.background = 'var(--dimCyan)';
        }

        if (kickPattern.includes(i)) {
            document.getElementById(currentKickId).style.background = 'var(--litCyan)';
        } else if (!kickPattern.includes(i)) {
            document.getElementById(currentKickId).style.background = 'var(--dimCyan)'
        }

    }
}

// Utility Functions (Allows JS to dynamically recall audio paths and play them.)

function myPlay(currentSoundAsString){
    var audio = new Audio(currentSoundAsString);
    audio.play();
}

// Function that updates the pattern arrays.


function updatePattern(patternArray, stepId) {
    // console.log('pattern before update: ' + patternArray);
    // console.log('stepId is' + stepId);
    // if the stepNumber is in the pattern, do something
    if (patternArray.includes(parseInt(stepId))) {
        // console.log('i found an array item to delete');
        // delete the step value from the array
        let momentaryIndex = patternArray.indexOf(parseInt(stepId));
        patternArray.splice(momentaryIndex, 1);
    } else {
        // add the step to the array
        patternArray.push(parseInt(stepId));
    }
    console.log('pattern after update: ' + patternArray);
}

// Button Click Events

const bigSequencerButtons = document.querySelectorAll('.seqButton');
const smallSequencerButtons = document.querySelectorAll('.sequenceSixteenths');

smallSequencerButtons.forEach(button => {
        button.addEventListener('click', (e)=>{
            e.stopPropagation();
            console.log('button clicked')
        let stepId = button.id.slice(1);
        let patternArray = [];

            if (button.id[0] === 's') {
                patternArray = snarePattern;
            } else if (button.id[0] === 'k') {
                patternArray = kickPattern;
            }

        updatePattern(patternArray, stepId);
        illuminateButtons();

        });
});

bigSequencerButtons.forEach(button => {
    button.addEventListener('click', (e)=>{
    console.log('button clicked')
    let stepId = button.id.slice(1);
    let patternArray = [];

        if (button.id[0] === 's') {
            patternArray = snarePattern;
        } else if (button.id[0] === 'k') {
            patternArray = kickPattern;
        }

    updatePattern(patternArray, stepId);
    illuminateButtons();

    });
});


// Changes colors of step sequencer lights.

function stepLightBlink() {
    if (stepLightPattern.includes(clockPosition)) {
        document.getElementById('l' + `${clockPosition}`).style.background = 'var(--litRed)';
    } else if (stepLightPattern.includes(clockPosition - 1)) {
        document.getElementById('l' + `${clockPosition - 1}`).style.background = 'var(--dimRed)';
    }
}


// hot sampler playback

const samplerElement1 = document.getElementById('sampler1')
console.log(samplerElement1)
samplerElement1.addEventListener("click", e => {
    myPlay(hotSample1);
})

const samplerElement2 = document.getElementById('sampler2')
console.log(samplerElement2)
samplerElement2.addEventListener("click", e => {
    myPlay(hotSample2);
})

const samplerElement3 = document.getElementById('sampler3')
console.log(samplerElement3)
samplerElement3.addEventListener("click", e => {
    myPlay(hotSample3);
})

const samplerElement4 = document.getElementById('sampler4')
console.log(samplerElement4)
samplerElement4.addEventListener("click", e => {
    myPlay(hotSample4);
})