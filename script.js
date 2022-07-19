// Audio + Pattern Defaults

let playState = false;

let snarePattern = [4, 12, 20, 28, 36, 44, 52, 60];
let kickPattern = [0, 16, 32, 48, 58];
let hatPattern = [0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32, 34, 36, 38, 40, 42, 44, 46, 48, 50, 52, 54, 60]
let stepLightPattern = [0, 4, 8, 12, 16, 20, 24, 28, 32, 36, 40, 44, 48, 52, 56, 60]
let bassPattern = [];
let pitchArray = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n'];

let kickArray = [
    './Big_Sister_Kick_DarkTechno_02.wav',
    './Big_Sister_Kick_HTJ_01.wav',
    './Big_Sister_Kick_Godseye_01.wav',
];

let snareArray = [
    './Big_Sister_Snare_Rim_Geef_01.wav',
    './Big_Sister_Snare_Clap_Squid_05.wav',
    './Big_Sister_Snare_Clap_LaserClap_05.wav',
];

let hatArray = [
    './HiHat 9.wav',
]


// each bass sound has 14 pitches, allowing for 1 octave + 1 semitone

let bassArray = [
    ['./Big_Sister_Bass_BeatingSine_E1.wav',
    './Big_Sister_Bass_BeatingSine_F1.wav',
    './Big_Sister_Bass_BeatingSine_Gb1.wav',
    './Big_Sister_Bass_BeatingSine_G1.wav',
    './Big_Sister_Bass_BeatingSine_Ab1.wav',
    './Big_Sister_Bass_BeatingSine_A1.wav',
    './Big_Sister_Bass_BeatingSine_Bb1.wav',
    './Big_Sister_Bass_BeatingSine_B1.wav',
    './Big_Sister_Bass_BeatingSine_C2.wav',
    './Big_Sister_Bass_BeatingSine_Db2.wav',
    './Big_Sister_Bass_BeatingSine_D2.wav',
    './Big_Sister_Bass_BeatingSine_Eb2.wav',
    './Big_Sister_Bass_BeatingSine_E2.wav',
    './',
    ],

    [,
    ]
];

let hotSample1 = './Wheel_Up_Signal.wav'
let hotSample2 = './lickshot_beep.wav'
let hotSample3 = './lickshot_laser.wav'
let hotSample4 = './lickshot_rewind.wav'

let snareIndex = 0;
let kickIndex = 0;
let hatIndex = 0;
let bassIndex = 0;
let currentKick = kickArray[kickIndex];
let currentSnare = snareArray[snareIndex];
let currentHat = hatArray[hatIndex];
let currentBass = bassArray[bassIndex];

let currentGhostKick = './Big_Sister_Kick_2ClickGhost_01.wav';
let currentGhostSnare = './Big_Sister_GSnare_GTech.wav';

// Pseudo-declaration of functions to handle scope well.
let startIntervalFunctions;
let startIntervalClock;

// Master Clock Default Parameters!

let clockPosition = 0;
let bpm = 174;
let milliseconds = (60000 / bpm / 4);
const sequenceLength = 63;

illuminateButtons();

// Master Control Functions

function play() {
    startIntervalFunctions = setInterval(tickingFunctions, milliseconds);
    startIntervalClock = setInterval(incrementClock, milliseconds);
    console.log('Playback was just started.')
}

function pause() {
    clearInterval(startIntervalFunctions);
    clearInterval(startIntervalClock);
    let clockPosition = 0;
    console.log('Playback was just paused.')
}

// Main Time-Based Logic Functions.

function incrementClock() {
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
    playHat();
    playBass();
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
        if (stepLightPattern.includes(clockPosition)) {
            myPlay(currentKick);
        } else {
            myPlay(currentGhostKick);
        }
    }
}

function playSnare() {
    if (snarePattern.includes(clockPosition)) {
        if (stepLightPattern.includes(clockPosition)) {
            myPlay(currentSnare);
        } else {
            myPlay(currentGhostSnare);
        }
    }
}

function playHat() {
    if (hatPattern.includes(clockPosition)) {
        myPlay(currentHat);
    }
}

function playBass() {

    for (let j = 0; j < 14; j++) {

        let momentaryPitch = pitchArray[j];
        let noteStepToCheck = `b${momentaryPitch}${clockPosition}`
        
        if (bassPattern.includes(noteStepToCheck)) {
            myPlay(currentBass[pitchArray.indexOf(momentaryPitch)]);
        }
    }
}

function illuminateButtons() {

    // checks every button to see if its in the pattern
    for (let i = 0; i <= sequenceLength; i++) {
        let currentSnareId = `s${i}`;
        let currentKickId = `k${i}`;
        let currentHatId = `h${i}`;

        if (snarePattern.includes(i)) {
            document.getElementById(currentSnareId).style.background = 'var(--litCyan)';
        } else if (!snarePattern.includes(i)) {
            document.getElementById(currentSnareId).style.background = 'var(--dimCyan)';
        }

        if (kickPattern.includes(i)) {
            document.getElementById(currentKickId).style.background = 'var(--litCyan)';
        } else if (!kickPattern.includes(i)) {
            document.getElementById(currentKickId).style.background = 'var(--dimCyan)';
        }

        if (hatPattern.includes(i)) {
            document.getElementById(currentHatId).style.background = 'var(--litCyan)';
        } else if (!hatPattern.includes(i)) {
            document.getElementById(currentHatId).style.background = 'var(--dimGreen)';
        }

        // check the bass pattern

        let currentBassStepId = bassPattern.slice(2);

        if (i < 32) {

            for (let j = 0; j < 14; j++) {

                let momentaryPitch = pitchArray[j];
                let noteStepToCheck = `b${momentaryPitch}${i * 2}`

                // console.log(noteStepToCheck);
                let idToChange = convertBassEigthsToId(noteStepToCheck);
                // console.log(idToChange);
    
                if (bassPattern.includes(noteStepToCheck)) {
                    document.getElementById(idToChange).style.background = 'var(--litRed)';
                } else if (!bassPattern.includes(noteStepToCheck)) {
                    document.getElementById(idToChange).style.background = 'var(--dimRed)';
                }
    
    
            }

        }

    }
}

// Utility Function (Allows JS to dynamically recall audio paths and play them.)

function myPlay(currentSoundAsString){
    var audio = new Audio(currentSoundAsString);
    audio.play();
}

// Functions that update the "memory" arrays.


function updatePattern(patternArray, stepId) {
    // console.log(patternArray)

    // check if this is the bassArray
    if (patternArray === bassPattern) {
        // console.log('i think im updating the bass pattern')

        if (patternArray.includes(stepId)) {
            // console.log('i found an array item to delete');
            // delete the step value from the array
            let momentaryIndex = patternArray.indexOf(stepId);
            patternArray.splice(momentaryIndex, 1);
        } else {
            // add the step to the array
            patternArray.push(stepId);
        }

    }
    // console.log('pattern before update: ' + patternArray);
    // console.log('stepId is' + stepId);
    // if the stepNumber is in the pattern, do something
    else {
        // console.log('i think im updating the kick or pattern')

        if (patternArray.includes(parseInt(stepId))) {
            // console.log('i found an array item to delete');
            // delete the step value from the array
            let momentaryIndex = patternArray.indexOf(parseInt(stepId));
            patternArray.splice(momentaryIndex, 1);
        } else {
            // add the step to the array
            patternArray.push(parseInt(stepId));
        }
        // console.log('pattern after update: ' + patternArray);

    }
}

function changeSnare() {
    let momentarySnareIndex = snareArray.indexOf(currentSnare);
    let newSnareIndex = (momentarySnareIndex + 1);
    console.log(`changing snare to #${newSnareIndex}`);

    if (snareArray.indexOf(currentSnare) < snareArray.length - 1) {
        currentSnare = snareArray[newSnareIndex];
    } else {
        currentSnare = snareArray[0];
        // console.log('snare rotation restarting');
    }
}

function changeKick() {
    let momentaryKickIndex = kickArray.indexOf(currentKick);
    let newKickIndex = (momentaryKickIndex + 1);
    console.log(`changing kick to #${newKickIndex}`);

    if (kickArray.indexOf(currentKick) < kickArray.length - 1) {
        currentKick = kickArray[newKickIndex];
    } else {
        currentKick = kickArray[0];
        // console.log('kick rotation restarting');
    }
}

// COMING SOON!
//
// function changeBass() {
//     let momentaryKickIndex = kickArray.indexOf(currentKick);
//     let newKickIndex = (momentaryKickIndex + 1);
//     console.log(`changing kick to #${newKickIndex}`);

//     if (kickArray.indexOf(currentKick) < kickArray.length - 1) {
//         currentKick = kickArray[newKickIndex];
//     } else {
//         currentKick = kickArray[0];
//         // console.log('kick rotation restarting');
//     }
// }


// Sequencer Click Events - EventListener related code

const bigSequencerButtons = document.querySelectorAll('.seqButton');
const smallSequencerButtons = document.querySelectorAll('.sequenceSixteenths');
const hatSequencerButtons = document.querySelectorAll('.hatSeqButton');
const bassSequencerButtons = document.querySelectorAll('.bassSeqButton');

smallSequencerButtons.forEach(button => {
        button.addEventListener('click', (e)=>{
            e.stopPropagation();
            console.log('small sequencer button clicked')
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
    console.log('big sequencer button clicked')
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

// hat updater

hatSequencerButtons.forEach(button => {
    button.addEventListener('click', (e)=>{
    console.log('hat button clicked')
    let stepId = button.id.slice(1);
    updatePattern(hatPattern, stepId);
    illuminateButtons();

    });
});

// bass updater

// timing utilities defined here

function convertBassIdToEigths (stepId) {
    let noteInfo = stepId.slice(0, 2);
    let stepNumber = parseInt(stepId.slice(2));
    let convertedStepNumber = (stepNumber * 2);
    let convertedId= `${noteInfo}${convertedStepNumber}`;
    return convertedId;
}

function convertBassEigthsToId (patternItem) {
    let noteInfo = patternItem.slice(0, 2);
    let stepNumber = parseInt(patternItem.slice(2));
    let convertedStepNumber = (stepNumber / 2);
    // console.log(convertedStepNumber);
    let convertedId= `${noteInfo}${convertedStepNumber}`;
    return convertedId;

}

// bass sequencer button events

bassSequencerButtons.forEach(button => {
    button.addEventListener('click', (e)=>{
    console.log('bass sequencer button clicked')
    let stepId = button.id.slice(0);
    updatePattern(bassPattern, convertBassIdToEigths(stepId));
    illuminateButtons();

    });
});


// Handles blinking of step metronome.

function stepLightBlink() {
    if (stepLightPattern.includes(clockPosition)) {
        document.getElementById('l' + `${clockPosition}`).style.background = 'var(--litRed)';
    } else if (stepLightPattern.includes(clockPosition - 1)) {
        document.getElementById('l' + `${clockPosition - 1}`).style.background = 'var(--dimRed)';
    }
}


// hot sampler playback

const samplerElement1 = document.getElementById('sampler1')
samplerElement1.addEventListener("click", e => {
    myPlay(hotSample1);
    console.log('Playing hot sample 1');
})

const samplerElement2 = document.getElementById('sampler2')
samplerElement2.addEventListener("click", e => {
    myPlay(hotSample2);
    console.log('Playing hot sample 2');
})

const samplerElement3 = document.getElementById('sampler3')
samplerElement3.addEventListener("click", e => {
    myPlay(hotSample3);
    console.log('Playing hot sample 3');
})

// special rewinder button

const samplerElement4 = document.getElementById('sampler4')
samplerElement4.addEventListener("click", e => {

    if (playState === false) {
        myPlay(hotSample4);
        console.log('NOW IS NOT THE TIME FOR A WHEEL UP!');
    }
    if (playState === true) {
        myPlay(hotSample4);
        playPause();
        clockPosition = 0;
        console.log('REEEEWWIIINNNDDDD');
    }
})

// play pause button + spacebar

function playPause() {
    if (playState === false) {
        document.getElementById('playPause').style.background = 'var(--yellow)';
        play();
        playState = true;
    } else if (playState === true) {
        document.getElementById('playPause').style.background = 'var(--white)';
        pause();
        playState = false;
    }
}

// this makes the playing and pausing button reactive

const playPauseElement = document.getElementById('playPause')
playPauseElement.addEventListener("click", e => {
    playPause();
})

document.addEventListener('keyup', event => {
    if (event.code === 'Space') {
        playPause();
    }
  })


  
  
// make sound-bank buttons call the function to rotate through samples

const snareBankButton = document.getElementById('snareBank')
  snareBankButton.addEventListener("click", e => {
    changeSnare();
})

const kickBankButton = document.getElementById('kickBank')
  kickBankButton.addEventListener("click", e => {
    changeKick();
})


