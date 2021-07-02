function checkIE() {
    var isIE = /MSIE|Triden/.test(navigator.userAgent);
    if (isIE) {
        document.open();
        document.close();

        top.document.title = "Oops";
        top.document.body.innerHTML = "<p>IE is not supported !!!<br>Please upgrade your browser !</p>";
    }
}

/* Function to handle Left-Side menu */
function updateNav() {
    let sideNavMenu =  document.getElementById("sideNavMenu");
    if (sideNavMenu.style.width == "260px") {
        sideNavMenu.style.width = "0px";
    } else {
        sideNavMenu.style.width = "260px";
    }
}

document.onready(function() {
    checkIE();
    document.getElementById("body").style.visibility = "hidden";

    //Standard syntax
    // Listener : "end of progress-bar animation"
    document.getElementById("progress-value").addEventListener("animationend", function end() {
        // Hide progress-bar div element
        document.getElementById("progress").style.visibility = "hidden";
        document.getElementById("body").style.visibility = "visible";
        setup_glitch();
        start_glitch();
    });
});
