document.onready = function (fn) {
    // see if DOM is already available
    if (document.readyState === "complete" || document.readyState === "interactive") {
        // call on next available tick
        setTimeout(fn, 1);
    } else {
        document.addEventListener("DOMContentLoaded", fn);
    }
};

function checkIE() {
    let isIE = /MSIE|Triden/.test(navigator.userAgent);
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
    if (sideNavMenu.style.width === "260px") {
        sideNavMenu.style.width = "0px";
    } else {
        sideNavMenu.style.width = "260px";
    }
}

document.onready(function() {
    checkIE();
});
