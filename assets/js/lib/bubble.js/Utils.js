/**
 * Clears the canvas.
 * @param {HTMLCanvasElement} canvas - the canvas element to clear.
 * @param {CanvasRenderingContext2D} ctx - the canvas context to clear.
 * @param {number} intensityPercent - the intensity of the clear (from 0% to 100%).
 */
function clearCanvas(canvas, ctx, intensityPercent) {
    // save the old fill style
    let oldFillStyle = ctx.fillStyle;

    // change fill style
    ctx.fillStyle = 'rgba(0,0,0,' + intensityPercent / 100 + ')';

    // fill the canvas with the new fill style
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // restore the old fill style
    ctx.fillStyle = oldFillStyle;
}


/**
 * Call a function when the DOM is ready.
 * @param {Function} fn - the function to call once the DOM is ready.
 */
function onReady(fn) {
    if (document.readyState !== "loading") {
        document.addEventListener("DOMContentLoaded", fn);
    } else {
        fn();
    }
}


/**
 * Returns whether the handle has been set or not.
 * @param {Function<boolean>} fn - the function to handle the event (isHidden) => {...}
 * @returns {boolean} Whether the listener has been added or not.
 */
function onVisibilityChange(fn) {
    if (typeof document.addEventListener === "undefined") return false;


    let compatibilityProps = {
        hidden: "visibilitychange",
        msHidden: "msvisibilitychange",
        webkitHidden: "webkitvisibilitychange"
    };

    let listenerHasBeenAdded = false;

    // for each hidden property, if it exists, add the listener and then return.
    Object.keys(compatibilityProps).every(function(key) {
        if (key in document) {
            document.addEventListener(compatibilityProps[key], () => {
                fn.call(null, document[key]);
            }, false);
            listenerHasBeenAdded = true;
            return false;
        }

        return true;
    });

    return listenerHasBeenAdded;
}

export { clearCanvas, onReady, onVisibilityChange };
