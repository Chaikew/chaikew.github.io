import BubbleEngine from "./lib/bubble.js/BubbleEngine.js";
import { onReady, onVisibilityChange } from "./lib/bubble.js/Utils.js";

/**
 * The main function of the website.
 */
function main() {
    /**
     * The BubbleEngine instance.
     * @type {BubbleEngine}
     */
    let engine = new BubbleEngine(document.getElementById('bubbles'), 60);

    // set up the engine
    engine.setup({
        shouldHandleCanvasResolution: true, // tell the engine to handle the canvas resolution (auto-resize)
    });

    engine.start(); // start the engine

    // set up the visibility change listener (to pause the engine when the tab is not visible)
    let eventListenerSet = onVisibilityChange(function(isHidden) {
        if (!isHidden) {
            console.debug("Page shown! Resuming engine...");
            engine.start();
        } else {
            console.debug("Page hidden! Pausing engine...");
            engine.stop();
        }
    });

    // if the listener fails to set up, show an error message
    if (!eventListenerSet) console.error("Could not add event listener for visibility change!");
}

onReady(main.bind(this));
