function checkIE() {
    var isIE = /MSIE|Triden/.test(navigator.userAgent);
    if (isIE) {
        document.open();
        document.close();

        top.document.title = "Oops"
        top.document.body.innerHTML = "<p>IE is not supported !!!<br>Please upgrade your browser !</p>";
    }
}

/* Function to handle Left-Side menu */
function updateNav() {
    let sidenavMenu =  _("#sidenavMenu");
    if (sidenavMenu.style.width == "260px") {
        sidenavMenu.css("width", "0px");
    } else {
        sidenavMenu.css("width", "260px");
    }
}

document.onready(function() {
    checkIE();
    _("#body").css("visibility", "hidden");

    //Standard syntax
    // Listener : "end of progress-bar animation"
    _("#progress-value").addEventListener("animationend", function end() {
        // Hide progress-bar div element
        _("#progress").css("visibility", "hidden");
        _("#body").css("visibility", "visible");
        setup_glitch();
        start_glitch();
    });
});
