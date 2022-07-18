// !!! Initializing Parameters !!!


// Audio + Pattern Defaults

let snarePattern = [4, 12, 20, 28, 36, 44, 52, 60];
let kickPattern = [0, 16, 32, 48, 58];

let currentKick = './Big_Sister_Kick_HTJ_01.wav'
let currentSnare = './Big_Sister_Snare_Rim_Geef_01.wav'

// Pseudo-declaration of functions to handle scope well.
let startIntervalFunctions;
let startIntervalClock;

// Master Clock Parameters!

let clockPosition = 0;
let bpm = 174;
let milliseconds = bpm / 2;
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
    illuminateButtons();
    playKick();
    playSnare();
}


// Child Functions (Called Over & Over By The Clock)!

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


// Clicking Sequencer Buttons To Update the Pattern Arrays.

// here's what I need this part to do:
// javascript needs to know when the user clicks on a div
// i think i do this by "appending" an event listener to every "button-div".
// when the div is clicked, the update pattern function is called with relevant arguments,
// the updatePattern function checks if the button's id (pattern number) is
// currently in the pattern array or not,
// then it adds or removes the number accordingly.
// everything else should happen automatically once the pattern array is updated.

// define a function that updates the pattern array


function updatePattern(patternArray, stepId) {
    console.log('pattern before update: ' + patternArray);
    console.log('stepId is' + stepId);
    // if the stepNumber is in the pattern, do something
    if (patternArray.includes(parseInt(stepId))) {
        console.log('i found an array item to delete');
        // delete the step value from the array
        let momentaryIndex = patternArray.indexOf(parseInt(stepId));
        patternArray.splice(momentaryIndex, 1);
    } else {
        // add the step to the array
        patternArray.push(parseInt(stepId));
    }
    console.log('pattern after update: ' + patternArray);
}

// add lots of event listeners???
// a template literal could help convert information about the grabbed element to the
// updatePattern function

// i might need to start by "identifying" the element i want to attach the listener to

// this is almost working, but it thinks im clicking on the big buttons when im clicking
// the small ones

const bigSequencerButtons = document.querySelectorAll('.seqButton');
const smallSequencerButtons = document.querySelectorAll('.sequenceSixteenths');

// lets try logging those variables to see what they are (NodeLists?)

// console.log(bigSequencerButtons);
// console.log(smallSequencerButtons);

// the following logs when a big button is clicked

// bigSequencerButtons.forEach(bigButton => 
//     bigButton.addEventListener('click', (e)=> {
//         console.log('big button clicked');
//     })
// )

[bigSequencerButtons, smallSequencerButtons].forEach(list => {
    list.forEach(button => {
        button.addEventListener('click', (e)=>{
        let stepId = button.id.slice(1);
        let patternArray = [];
        if (button.id[0] === 's') {
            patternArray = snarePattern;
        } else if (button.id[0] === 'k') {
            patternArray = kickPattern;
        }
        updatePattern(patternArray, stepId);
        illuminateButtons();

        // console.log('buttons being updated?', button) sean helped me debug this
        });
    })
 });

// the listener has to say "okay ive been clicked! im running my shit now"
// that listener must call the update pattern function and give it
// the right arguments

// element.addEventListener('click', updatePattern(PROVIDETHERIGHTARGUMENTS));

// document.getElementsByClassName('seqButton')[0]
//         .addEventListener('click', function (event) {
//             // do something
//         });