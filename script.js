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

    }
}


// Musical Memory!

let kickPattern = [0, 5, 9, 13, 17];



// Creating Patterns