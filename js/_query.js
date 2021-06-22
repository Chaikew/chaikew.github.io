function _(disc) {
    if (disc.startsWith("#")) {
        disc = disc.replace("#", "");
        let byId = document.getElementById(disc);
        return byId;
    } else if (disc.startsWith(".")) {
        disc = disc.replace(".", "");
        let byClassName = document.getElementsByClassName(disc);
        return byClassName;
    } else {
        let byTagName = document.getElementsByTagName(disc);
        let byName = document.getElementsByName(disc);
        if (byTagName) {
            return byTagName;
        } else {
            return byName;
        }
    }
}

HTMLElement.prototype.css = function(property, new_value) {
    this.style[property] = new_value;
}
