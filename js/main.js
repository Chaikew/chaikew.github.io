function checkIE() {
    var isIE = /MSIE|Triden/.test(navigator.userAgent);
    if (isIE) {
        var doc = document.getElementsByTagName("html")[0];
        doc.getElementsByTagName("head")[0].innerHTML = "<title>Oops</title>";
        doc.getElementsByTagName("body")[0].innerHTML = "<p>IE is not supported !!!<br>Please upgrade your browser !</p>";
    }
}

function patchCSS() {
    function updateCSS() {
        _("#progress").style.width = window.innerWidth < 500 ? "90vw" : "500px"; //responsive sizing
    }
    updateCSS();
    
    window.addEventListener("resize", updateCSS, false);
}

document.onready(function () {
    checkIE();
    patchCSS();
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
