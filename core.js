var container = document.getElementById("container");


//Standard syntax
document.querySelector('.progress-value').addEventListener("animationend", function end(){ // Listener : "end of progress-bar animation"
	container.removeChild($( ".progress" )); // Destoy progress-bar-div element


	var mainText = document.createElement("H1");
	mainText.innerHTML = "Dev by <span>JMimosa#2495</span>";
	mainText.className = "shadowSpan hoverScale timeTransform BRW";
	container.appendChild(mainText);


	var descText = document.createElement("H2");
	descText.innerHTML = "This web site use <span>HTML DOM</span>";
	descText.className = "shadowSpan resizeContent hoverScale timeTransform BRW";
	container.appendChild(descText);


	var iframe = document.createElement("IFRAME");
	iframe.className = "resizeContent hoverScale timeTransform";
	iframe.src = "https://github-readme-stats.vercel.app/api?username=JMimosaDev&count_private=true&show_icons=true&title_color=922cc9&icon_color=922cc9&bg_color=ffffff";
	container.appendChild(iframe);
}); 