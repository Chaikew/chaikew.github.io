import Bubble from "./Bubble.js";

import bubblesTheme from "./theme.js";

import { clearCanvas } from "./Utils.js";
import { AnimationFrame } from "./AnimationUtils.js";

/**
 * The BubbleEngine class is the class that manages the bubbles of a canvas.
 */
class BubbleEngine { // TODO: lock the canvas (only 1 engine per canvas)
    /**
     * Whether the engine is running or not.
     * @type {boolean}
     */
    #isRunning;

    /**
     * The bubble.js of the engine.
     * @type {Bubble[]}
     */
    #bubbleInstances;

    /**
     * Whether all the bubble.js are visible or not.
     * @type {boolean}
     */
    #areAllBubblesShown;

    /**
     * The BubbleEngine canvas to draw on.
     * @type {HTMLCanvasElement}
     */
    #bubbleCanvas;

    /**
     * The BubbleEngine canvas context to draw on.
     * @type {CanvasRenderingContext2D}
     */
    #bubbleCanvasCtx;

    /**
     * The handle of the last animation frame.
     * @type {AnimationFrame}
     */
    #animationFrame;

    /**
     * The fps of the engine.
     * @type {number}
     */
    #fps;

    /**
     * Whether the engine.setup() method has been called or not.
     * @type {boolean}
     */
    #hasBeenSetUp;

    /**
     * The constructor of the BubbleEngine.
     * @param {HTMLCanvasElement} canvas The BubbleEngine canvas to draw on.
     * @param {number} fps The fps of the engine.
     */
    constructor(canvas, fps) {
        this.#isRunning = false;
        this.#bubbleInstances = [];

        this.#areAllBubblesShown = false;

        this.#bubbleCanvas = canvas;
        this.#bubbleCanvasCtx = this.#bubbleCanvas.getContext("2d");

        this.#animationFrame = 0;

        this.#fps = fps;

        this.#hasBeenSetUp = false;
    }

    /**
     * The function that will handle the window resize event.
     */
    #handleWindowResize() {
        console.debug("Window resized! Resizing canvas...");
        this.#resizeCanvas();
    }

    /**
     * The function used to resize the canvas (to the full screen).
     */
    #resizeCanvas() {
        this.#bubbleCanvas.width = window.innerWidth; // full width
        this.#bubbleCanvas.height = window.innerHeight; // full height
    }


    /**
     * Set-ups the engine
     * @param {boolean} shouldHandleCanvasResolution - whether the canvas resolution should be handled by the engine or not
     */
    setup({
      shouldHandleCanvasResolution,
    }) {
        if (this.#hasBeenSetUp) {
            console.warn("This BubbleEngine has already been setup! Ignoring...");
            return;
        }

        // if the canvas size should be handled by the engine
        if (shouldHandleCanvasResolution) {
            // add the resize listener
            window.addEventListener('resize', this.#handleWindowResize.bind(this), false);

            this.#resizeCanvas(); // call it once to set the initial size (full screen)
        }

        // create the bubble.js
        for (let i = 0; i < bubblesTheme.numberOfBubbles; i++) {
            this.#bubbleInstances[i] = new Bubble(this.#bubbleCanvas, this.#bubbleCanvasCtx, i);
        }

        this.#hasBeenSetUp = true;
    }


    /**
     * The animation function of the engine.
     * This function will be called "fsp" times per second and will dispatch the ticks.
     *
     * @see this.#start()   --- window.requestAnimationFrame(this.#draw.bind(this))
     */
    #draw() {
        if (this.#isRunning) {
            // clear the canvas with N intensity
            clearCanvas(this.#bubbleCanvas, this.#bubbleCanvasCtx, bubblesTheme.clearIntensity);

            // call tick() on all the bubble.js
            for (let i = 0; i < this.#bubbleInstances.length; i++) {
                this.#bubbleInstances[i].tick();
            }
        }
    }

    /**
     * Starts the drawing loop of the bubble.js.
     */
    start() {
        if (!this.#isRunning) {
            this.#isRunning = true;


            //this.#animationFrame = window.requestAnimationFrame(this.#draw.bind(this));
            this.#animationFrame = new AnimationFrame(this.#fps, this.#draw.bind(this));
            this.#animationFrame.start();

            if (!this.#areAllBubblesShown) {
                let index = 0;
                let loopShowBubbles = (function () {
                    if (index < bubblesTheme.numberOfBubbles) {
                        this.#bubbleInstances[index++].showBubble();
                        setTimeout(loopShowBubbles, bubblesTheme.bubbleSpawnInterval);
                    } else {
                        this.#areAllBubblesShown = true;
                    }
                }).bind(this);

                loopShowBubbles();
            }
        }
    }

    /**
     * Stops the drawing loop of the bubble.js.
     */
    stop() {
        if (this.#isRunning) {
            this.#isRunning = false;
            this.#animationFrame.stop();
        }
    }
}

export default BubbleEngine;
