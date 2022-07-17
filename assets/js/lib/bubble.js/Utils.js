/**
 * Clears the canvas.
 * @param {HTMLCanvasElement} canvas The canvas element to clear.
 * @param {CanvasRenderingContext2D} ctx The canvas context to clear.
 * @param {number} intensityPercent The intensity of the clear (from 0% to 100%).
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
 * @param {Function<>} fn The function to call once the DOM is ready.
 */
function on_ready(fn) {
    if (document.readyState !== "loading") {
        document.addEventListener("DOMContentLoaded", fn);
    } else {
        fn();
    }
}


/**
 * Returns whether the handle has been set or not.
 * @param {Function<boolean>} fn The function to handle the event (isHidden) => {...}
 * @returns {boolean} Whether the handle has been set or not.
 */
function on_visibility_change(fn) {
    let hidden;
    let visibilityChange;

    // Set the name of the hidden property and the change event for visibility
    if (typeof document.hidden !== "undefined") { // Opera 12.10 and Firefox 18 and later support
        hidden = "hidden";
        visibilityChange = "visibilitychange";
    } else if (typeof document.msHidden !== "undefined") {
        hidden = "msHidden";
        visibilityChange = "msvisibilitychange";
    } else if (typeof document.webkitHidden !== "undefined") {
        hidden = "webkitHidden";
        visibilityChange = "webkitvisibilitychange";
    }

    if (typeof document.addEventListener !== "undefined" || hidden !== undefined) {
        document.addEventListener(visibilityChange, () => {
            fn.call(null, document[hidden]);
        }, false);
        return true;
    } else {
        return false;
    }
}

export { clearCanvas, on_ready, on_visibility_change };
