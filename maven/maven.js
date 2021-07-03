String.prototype.removeLast = function (text) {
    let textLength = text.length;
    let originLen = this.length;
    if (textLength === 0) return this;

    let start = originLen - textLength;
    if (start < 0) {
        return this;
    }
    if (start === 0) {
        return "";
    }
    let i;
    let k;
    for (i = start; i >= 0; i--) {
        k = 0;
        while (this[i + k] === text[k]) {
            k++;
            if (k === textLength) break;
        }
        if (k === textLength) break;
    }
    //not founded
    if (k !== textLength) return this;

    //founded and i starts on correct and i+k is the first char after
    let end = this.substring(i + k, originLen);
    if (i === 0) return end;
    else {
        start = this.substring(0, i);
        return start + end;
    }
};


let current_path = "maven/";
const available_paths = {
    maven: {
        fr: {
            jmraich:{
                venomAgent: {
                    "0.1": [
                        "venomAgent-0.1-javadoc.jar",
                        "venomAgent-0.1-sources.jar",
                        "venomAgent-0.1.jar",
                        "venomAgent-0.1.pom"
                    ],
                    "0.2": [
                        "venomAgent-0.2-javadoc.jar",
                        "venomAgent-0.2-sources.jar",
                        "venomAgent-0.2.jar",
                        "venomAgent-0.2.pom"
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

    let dirs = eval('available_paths["' + current_path.removeLast("/").split("/").join('"]["') + '"]'); // avaible_paths["maven"]["fr"]...

    let count = 0;

    if (dirs.length) {
        // if its iterable, it means there are jar/pom files
        for (const dir of dirs) {
            let link = document.createElement("LI");
            link.className = count % 2 === 0 ? "dark" : "light";

            let clickable = document.createElement("A");
            clickable.href = `${current_path.replace("maven/", "")}${dir}`; // replace nedded or it'll result in maven/maven/fr/...
            clickable.innerHTML = `${dir}`;
            clickable.download = `${dir}`;

            link.appendChild(clickable);
            document.getElementById("link_handler").append(link);

            count += 1;
        }
    } else {
        for (const dir of Object.keys(dirs)) {
            let link = document.createElement("LI");
            link.className = count % 2 === 0 ? "dark" : "light";

            let clickable = document.createElement("A");
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
        if (current_path !== "maven/") {
            let _path = current_path.removeLast("/");
            let splitted_path = _path.split("/");
            current_path = _path.removeLast(splitted_path[splitted_path.length - 1]);

            updateElements();
        } else {
            window.location = window.location.removeLast(current_path);
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
