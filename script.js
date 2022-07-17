// Master Clock Brain!

let clockPosition = 0;

setInterval(tickingFunctions, 86);
setInterval(incrementClock, 86);

function incrementClock() {
    console.log(clockPosition)
    if (clockPosition < 63) {
        clockPosition += 1;
    } else {
        clockPosition = 0;
    }
}


function tickingFunctions() {
    metronomeBlink();
    playKick();
}

// Child Functions!

function metronomeBlink() {
    if (Number.isInteger(clockPosition / 4)) {
        console.log('blink!');
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


// Pattern Memory!

let kickPattern = [0, 4, 8, 12, 16];

function myPlay(currentSoundAsString){
    var audio = new Audio(currentSoundAsString);
    audio.play();
}

// Sample Loading

let currentKick = './Big_Sister_Kick_HTJ_01.wav'

// let currentKick = document.getElementById('Kick1');



// Creating Patterns