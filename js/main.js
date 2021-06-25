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
    xhr.open("GET", "https://httpbin.org/ip");
    xhr.send();
    xhr.onload = function() {
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

function checkIframe() {
    var isInIframe;
    try {
        isInIframe = (window.self !== window.top);
    } catch (e) {
        isInIframe = true;
    }
    if (isInIframe) {
        document.open();
        document.close();

        document.title = "Error"
        document.body.innerHTML = "<p>[SECURITY] Page loaded in IFRAME<br>[SECURITY] Don't trust anything here !</p>";
    }
}

/* Functions to handle Left-Side menu */
function openNav() {
    document.getElementById("sidenavMenu").style.width = "260px";
}

function closeNav() {
    document.getElementById("sidenavMenu").style.width = "0";
}

document.onready(function() {
    checkIE();
    checkIframe();
    checkIp();
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
