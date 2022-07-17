// Master Clock!

let clockPosition = '1';

setInterval(incrementClock, 86);

function incrementClock() {
    if (clockPosition < 64) {
        clockPosition += 1;
    } else {
        clockPosition = 1;
    }
    // console.log(clockPosition)
}