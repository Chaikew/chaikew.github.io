const chars =
    "阿贝色德饿艾弗日什伊鸡卡勒马娜哦佩苦和丝特玉维独布克斯格黑贼" +
    "ஹஸಳ್௮ಆಕಷఋனಠபமஉஊఊௌொஇ௲ூஃஏஐஒஓஔஜஞిಔృూ" +
    "ప௯௮ிஞஜಋౡౠౖಱಯಮಭಬあかさたなはまやらわがざだtばぱおこそとのほもよろをんごぞどぼぽ".split("");

var glitch_instances = [];
class Glitch {
    constructor(element) {
        this.glitch = {
            element: element,
            text: element.innerHTML,
            len: element.innerHTML.length,
            output: "",
            progress: 0,
            running: true,
            glitch: function () {
                if (!(this.progress >= this.len)) {
                    var randomNums = Math.floor(Math.random() * chars.length);
                    if (randomIntFromInterval(0, randomIntFromInterval(3, 5)) == 1) {
                        this.output += this.text[this.progress];
                        this.element.innerHTML = `${this.output}`;
                        this.progress++;
                    } else {
                        this.element.innerHTML = `${this.output}${chars[randomNums]}`;
                    }
                } else {
                    this.running = false;
                }
            },
        };
    }
}

function setup_glitch() {
    var target_glicthes = document.getElementsByClassName("glitch");
    for (i = 0; i < target_glicthes.length; i++) {
        glitch_instances[i] = new Glitch(target_glicthes[i]);
    }
}


// TODO: optimization
function start_glitch() {
    for (i = 0; i < glitch_instances.length; i++) {
        if (glitch_instances[i].glitch.running) {
            glitch_instances[i].glitch.glitch();
        } else {
            glitch_instances.splice(i, 1);
        }
    }
    if (Object.keys(glitch_instances).length) {
        requestAnimationFrame(start_glitch);
    } else {
        console.log("[EVENT] Glitch Annimation End");
    }
}

function stop_glitch() {
    for (const glitch_instance of glitch_instances) {
        glitch_instance.glitch.element.innerHTML = glitch_instance.glitch.text;
        glitch_instance.glitch.running = false;
    }
}
