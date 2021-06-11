function randomIntFromInterval(min, max) { // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min)
}

function updateCSS() {
  $('#progress').css('width', (window.innerWidth < 900 ? "90vw" : "45vw")); //responsive sizing
}

$(document).ready(function(){
  updateCSS();
  $("#body").hide();

  //Standard syntax
  document.querySelector('#progress-value').addEventListener("animationend", function end(){ // Listener : "end of progress-bar animation"
    $('#progress').css('visibility', 'hidden'); // Destoy progress-bar-div element
    $("#body").show();
    setup_glitch();
    start_glitch();
  });
});
