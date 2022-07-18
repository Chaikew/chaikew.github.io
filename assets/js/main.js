import BubbleEngine from "./lib/bubble.js/BubbleEngine.js";

import { on_ready, on_visibility_change } from "./lib/bubble.js/Utils.js";



on_ready(function() {
    let engine = new BubbleEngine(document.getElementById('bubbles'), 60);
    engine.setup({
        shouldHandleCanvasResolution: true,
    });
    engine.start();

    on_visibility_change(function(isHidden) {
        if (!isHidden) {
            console.debug("Page shown! Resuming engine...");
            engine.start();
        } else {
            console.debug("Page hidden! Pausing engine...");
            engine.stop();
        }
    });


});
