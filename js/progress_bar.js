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
  });
});
