String.prototype.removeLast = function (text) {
    let origin = this;
    textLenght = text.length;
    originLen = origin.length;
    if (textLenght == 0) return origin;

    start = originLen - textLenght;
    if (start < 0) {
        return origin;
    }
    if (start == 0) {
        return "";
    }
    for (i = start; i >= 0; i--) {
        k = 0;
        while (origin[i + k] == text[k]) {
            k++;
            if (k == textLenght) break;
        }
        if (k == textLenght) break;
    }
    //not founded
    if (k != textLenght) return origin;

    //founded and i starts on correct and i+k is the first char after
    end = origin.substring(i + k, originLen);
    if (i == 0) return end;
    else {
        start = origin.substring(0, i);
        return start + end;
    }
};


var current_path = "maven/";
const avaible_paths = {
    maven: {
        fr: {
            jmraich:{
                venomAgent: {
                    "0.1": [
                      "venomAgent-0.1-javadoc.jar",
                      "venomAgent-0.1-sources.jar",
                      "venomAgent-0.1.jar",
                      "venomAgent-0.1.pom"
                    ]
                }
            }
        }
    }
};

function clicked_link(clicked_path) {
    current_path += clicked_path;
    updateElements();
}

function updateElements() {
    document.getElementById("current_path").innerHTML = "Index of " + current_path;
    let links = document.getElementsByTagName("li");
    while (links.length > 0) {
        links[0].remove();
    }

    var dirs = eval('avaible_paths["' + current_path.removeLast("/").split("/").join('"]["') + '"]'); // avaible_paths["maven"]["fr"]...

    let count = 0;

    if (dirs.length) {
        // if its iterable, it means there are jar/pom files
        for (i = 0; i < dirs.length; i++) {
            let dir = dirs[i];

            var link = document.createElement("LI");
            link.className = count % 2 === 0 ? "dark" : "light";

            var clickable = document.createElement("A");
            clickable.href = `${current_path.replace("maven/", "")}${dir}`; // replace nedded or it'll result in maven/maven/fr/...
            clickable.innerHTML = `${dir}`;
            clickable.download = `${dir}`;

            link.appendChild(clickable);
            document.getElementById("link_handler").append(link);

            count += 1;
        }
    } else {
        for (const dir of Object.keys(dirs)) {
            let splitted_name = dir.split("/");

            var link = document.createElement("LI");
            link.className = count % 2 === 0 ? "dark" : "light";

            var clickable = document.createElement("A");
            clickable.href = `javascript:clicked_link("${dir}/")`;
            clickable.innerHTML = `${dir}`;

            link.appendChild(clickable);
            document.getElementById("link_handler").append(link);

            count += 1;
        }
    }
}

function setupBack() {
    function goBack() {
        if (current_path != "maven/") {
            let _path = current_path.removeLast("/");
            let splitted_path = _path.split("/");
            current_path = _path.removeLast(splitted_path[splitted_path.length - 1]);

            updateElements();
        } else {
            window.location = new String(window.location).removeLast(current_path);
        }
    }

    window.onload = function () {
        if (typeof history.pushState === "function") {
            history.pushState("jibberish", null, null);
            window.onpopstate = function () {
                history.pushState("newjibberish", null, null);
                // Handle the back (or forward) buttons here
                // Will NOT handle refresh, use onbeforeunload for this.
                goBack();
            };
        }
    };
}

window.addEventListener("DOMContentLoaded", (event) => {
    updateElements();
    setupBack();
});