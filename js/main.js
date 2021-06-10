function randomIntFromInterval(min, max) { // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min)
}

$(document).ready(function(){
  $("#body").hide();
  var container = document.body

  var progress_bar_div = document.createElement("DIV"); //creating  <div class="progress"></div>
  progress_bar_div.id = "progress";
  container.appendChild(progress_bar_div);

  var progress_bar_value = document.createElement("DIV"); //creating  <div class="progress-value"></div>
  progress_bar_value.id = "progress-value";
  progress_bar_div.appendChild(progress_bar_value);



  //Standard syntax
  document.querySelector('#progress-value').addEventListener("animationend", function end(){ // Listener : "end of progress-bar animation"
    container.removeChild(progress_bar_div); // Destoy progress-bar-div element
    $("#body").show();

    var target_glicthes = document.getElementsByClassName('glitch')
    for (i = 0; i < target_glicthes.length; i++) {
      glitch_instances[i] = new Glitch(target_glicthes[i]);
    }
    requestAnimationFrame(start_glitch);
  });
});
