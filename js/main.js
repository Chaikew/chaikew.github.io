function checkIE() {
    var isIE = /MSIE|Triden/.test(navigator.userAgent);
    if (isIE) {
        document.open();
        document.close();

        top.document.title = "Oops"
        top.document.body.innerHTML = "<p>IE is not supported !!!<br>Please upgrade your browser !</p>";
    }
}

function checkIp() {
    let xhr = new XMLHttpRequest();
    xhr.open("GET", "http://httpbin.org/ip");
    xhr.send();
    xhr.onload = function () {
        if (xhr.readyState === xhr.DONE) {
            if (xhr.status === 200) {
                var md5Hash = MD5(JSON.parse(xhr.responseText).origin.toString());
                lastIpHash = localStorage.getItem("lastip")
                if (lastIpHash != null) {
                    if (lastIpHash != md5Hash) {
                        alert("Warning ! Your ip has changed !");
                        localStorage.setItem("lastip", md5Hash);
                    }
                } else {
                    localStorage.setItem("lastip", md5Hash);
                }
            }
        }
    };
}


function patchCSS() {
    function updateCSS() {
        _("#progress").css("width", window.innerWidth < 500 ? "90vw" : "500px"); //responsive sizing
    }
    updateCSS();

    window.addEventListener("resize", updateCSS, false);
}

document.onready(function() {
    checkIE();
    checkIp();
    patchCSS();
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
