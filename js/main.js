document.onready = function (fn) {
    // see if DOM is already available
    if (document.readyState === "complete" || document.readyState === "interactive") {
        // call on next available tick
        setTimeout(fn, 1);
    } else {
        document.addEventListener("DOMContentLoaded", fn);
    }
}

function randomIntFromInterval(min, max) { // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min)
}

function updateCSS() {
  document.getElementById("progress").style.width = (window.innerWidth < 900 ? "90vw" : "500px"); //responsive sizing
}

document.onready(function(){
  updateCSS();
  document.getElementById("body").style.visibility = "hidden";

  //Standard syntax
  document.querySelector('#progress-value').addEventListener("animationend", function end(){ // Listener : "end of progress-bar animation"
    document.getElementById("progress").style.visibility = "hidden"; // Destoy progress-bar-div element
    document.getElementById("body").style.visibility = "visible"
    setup_glitch();
    start_glitch();
  });
});
