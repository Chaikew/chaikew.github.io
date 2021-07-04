document.onready = function (fn) {
    // see if DOM is already available
    if (document.readyState === "complete" || document.readyState === "interactive") {
        // call on next available tick
        setTimeout(fn, 1);
    } else {
        document.addEventListener("DOMContentLoaded", fn);
    }
};

document.onready(function() {
    // check if browser is IE
    let isIE = /MSIE|Triden/.test(navigator.userAgent);
    if (isIE) {
        // clear document
        document.open();
        document.close();

        // show a beautiful message to tell user that his browser is outdated
        top.document.title = "Oops";
        top.document.body.innerHTML = "<p>IE is not supported !!!<br>Please upgrade your browser !</p>";
    }
});
