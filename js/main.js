document.onready = function (fn) {
    // see if DOM is already available
    if (document.readyState === "complete" || document.readyState === "interactive") {
        // call on next available tick
        setTimeout(fn, 1);
    } else {
        document.addEventListener("DOMContentLoaded", fn);
    }
};

function randomIntFromInterval(min, max) {
    // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function updateCSS() {
    _("#progress").style.width = window.innerWidth < 500 ? "90vw" : "500px"; //responsive sizing
}

document.onready(function () {
    updateCSS();
    _("#body").style.visibility = "hidden";

    //Standard syntax
    // Listener : "end of progress-bar animation"
    _("#progress-value").addEventListener("animationend", function end() {
        // Hide progress-bar div element
        _("#progress").style.visibility = "hidden";
        _("#body").style.visibility = "visible";
        setup_glitch();
        start_glitch();
    });
});
