String.prototype.removeLast = function (text) {
    if (!this.endsWith(text)) return this;
    return this.slice(0, this.length - text.length)
};

let current_path = "";
const tree = {
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
};

function clicked_link(clicked_path) {
    current_path += clicked_path;
    updateElements();
}

function updateElements() {
    document.getElementById("current_path").innerHTML = "Index of maven/" + current_path;

    Array.from(document.getElementsByTagName("li")).forEach(function (list_elem) {
        list_elem.remove();
    });


    let current_dir = tree;

    if (current_path.length > 0) {
        splited_current_path = current_path.removeLast("/").split("/");

        for (const elem of splited_current_path) {
            current_dir = current_dir[elem];
        }
    }

    let count = 0;

    if (current_dir.length) {
        // if its iterable, it means there are jar/pom files
        for (const file of current_dir) {
            let list_elem = document.createElement("LI");
            list_elem.className = count % 2 === 0 ? "dark" : "light";

            let link = document.createElement("A");
            link.href = `maven/${current_path}${file}`; // maven/fr/.../file
            link.innerHTML = `${file}`;
            link.download = `${file}`;

            list_elem.appendChild(link);
            document.getElementById("link_list").append(list_elem);

            count += 1;
        }
    } else {
        for (const dir of Object.keys(current_dir)) {
            let list_elem = document.createElement("LI");
            list_elem.className = count % 2 === 0 ? "dark" : "light";

            let link = document.createElement("A");
            link.href = `javascript:void(0)`;
            link.onclick = function() {
                clicked_link(this.innerHTML);
            }
            link.innerHTML = `${dir}/`;

            list_elem.appendChild(link);
            document.getElementById("link_list").append(list_elem);

            count += 1;
        }
    }
}

function setupBack() {
    function goBack() {
        if (current_path.length != 0) {
            let _path = current_path.removeLast("/");
            let splitted_path = _path.split("/");
            current_path = _path.removeLast(splitted_path[splitted_path.length - 1]);

            updateElements();
        } else {
            let current_location = new String(window.location);
            let new_location = current_location.removeLast("/maven");
            window.location = new_location;
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
