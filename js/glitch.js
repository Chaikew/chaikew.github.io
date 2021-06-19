const chars =
    "ʖᓵ↸ᒷ⎓⊣⍑╎⋮ꖌꖎᒲリ𝙹!¡ᑑ∷ᓭℸ ̣ ⚍⍊∴ ̇/||⨅" +
    "阿贝色德饿艾弗日阿什伊鸡卡艾勒艾马艾娜哦佩苦艾和艾丝特玉维独布勒维伊克斯伊格黑克贼德" +
    "ஹஸಳ್௮ಆಕ್ಷ್ఋனಠ್ಳ್பமஉஊఊௌொஇ௲ூஃஊஏஐஒஓஔஜஞిಔృూ" +
    "ప௯௮ிஞஜಋౡౠౖಱಯಮಭಬあかさたなはまやらわがざだtばぱおこそとのほもよろをんごぞどぼぽ" +
    "αβγδεζηθικλμνξοπρστυφχψωABΓ∆EZHΘIKΛMNΞOΠPΣTΥΦXΨ".split("");

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
                    if (randomIntFromInterval(0, randomIntFromInterval(8, 13)) == 1) {
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
    var target_glicthes = _(".glitch");
    for (i = 0; i < target_glicthes.length; i++) {
        glitch_instances[i] = new Glitch(target_glicthes[i]);
    }
}

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
    for (i = 0; i < glitch_instances.length; i++) {
        glitch_instances[i].glitch.element.innerHTML = glitch_instances[i].glitch.text;
        glitch_instances[i].glitch.running = false;
    }
}
