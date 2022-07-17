import Bubble from "./Bubble.js";
import { FpsControllingMode } from "./Enums.js";

import bubbles_theme from "./theme.js";

import { clearCanvas } from "./Utils.js";

class BubbleEngine {
    /**
     * Whether the engine is running or not.
     * @type {boolean}
     */
    #is_running;

    /**
     * The bubble.js of the engine.
     * @type {Bubble[]}
     */
    #bubble_instances;

    /**
     * Whether all the bubble.js are visible or not.
     * @type {boolean}
     */
    #all_bubbles_are_shown;

    /**
     * The BubbleEngine canvas to draw on.
     * @type {HTMLCanvasElement}
     */
    #bubble_canvas;

    /**
     * The BubbleEngine canvas context to draw on.
     * @type {CanvasRenderingContext2D}
     */
    #bubble_canvas_ctx;

    /**
     * The handle of the last animation frame.
     * @type {number}
     */
    #animation_handle;

    /**
     * The fps of the engine.
     * @type {number}
     */
    #fps;

    /**
     * The fps controlling mode.
     * @type {"ENGINE"|"BROWSER"}
     */
    #fsp_controlling_mode;

    /**
     * Whether the engine.setup() method has been called or not.
     * @type {boolean}
     */
    #has_been_setup;

    /**
     * The handle of the setInterval() function.
     * @type {number}
     */
    #engine_rendering_handle;

    /**
     * The constructor of the BubbleEngine.
     * @param {HTMLCanvasElement} canvas The BubbleEngine canvas to draw on.
     * @param {number} fps The fps of the engine.
     */
    constructor(canvas, fps) {
        this.#is_running = false;
        this.#bubble_instances = [];

        this.#all_bubbles_are_shown = false;

        this.#bubble_canvas = canvas;
        this.#bubble_canvas_ctx = this.#bubble_canvas.getContext("2d");

        this.#animation_handle = 0;

        this.#fps = fps;

        this.#has_been_setup = false;

        this.#engine_rendering_handle = 0;
    }

    #handleWindowResize() {
        console.debug("Window resized! Resizing canvas...");
        this.#resizeCanvas();
    }

    #resizeCanvas() {
        this.#bubble_canvas.width = window.innerWidth; // full width
        this.#bubble_canvas.height = window.innerHeight; // full height
    }


    /**
     * Set-ups the engine
     * @param {boolean} shouldHandleCanvasResolution - whether the canvas resolution should be handled by the engine or not
     * @param {"ENGINE"|"BROWSER"} fpsControllingMode - the fps controlling mode
     */
    setup({
      shouldHandleCanvasResolution,
      fpsControllingMode
    }) {
        if (this.#has_been_setup) {
            console.warn("This BubbleEngine has already been setup! Ignoring...");
            return;
        }

        // if the canvas size should be handled by the engine
        if (shouldHandleCanvasResolution) {
            // add the resize listener
            window.addEventListener('resize', this.#handleWindowResize.bind(this), false);

            this.#resizeCanvas(); // call it once to set the initial size (full screen)
        }

        this.#fsp_controlling_mode = fpsControllingMode??FpsControllingMode.ENGINE;


        // create the bubble.js
        for (let i = 0; i < bubbles_theme.numberOfBubbles; i++) {
            this.#bubble_instances[i] = new Bubble(this.#bubble_canvas, this.#bubble_canvas_ctx, i);
        }

        this.#has_been_setup = true;
    }


    /**
     * The animation function of the engine.
     * This function will be called "fsp" times per second and will dispatch the ticks.
     *
     * @see this.#start()   --- window.requestAnimationFrame(this.#draw.bind(this))
     */
    #draw() {
        if (this.#is_running) {
            // clear the canvas with N intensity
            clearCanvas(this.#bubble_canvas, this.#bubble_canvas_ctx, bubbles_theme.clearIntensity);

            // call tick() on all the bubble.js
            for (let i = 0; i < this.#bubble_instances.length; i++) {
                this.#bubble_instances[i].tick();
            }

            if (this.#fsp_controlling_mode === FpsControllingMode.BROWSER) {
                this.#animation_handle = window.requestAnimationFrame(this.#draw.bind(this));
            } else {
                this.#engine_rendering_handle = setTimeout(this.#draw.bind(this), 1000 / this.#fps);
            }
        }
    }

    /**
     * Starts the drawing loop of the bubble.js.
     */
    start() {
        if (!this.#is_running) {
            this.#is_running = true;

            this.#animation_handle = window.requestAnimationFrame(this.#draw.bind(this));

            if (!this.#all_bubbles_are_shown) {
                let index = 0;
                let loopShowBubbles = (function () {
                    if (index < bubbles_theme.numberOfBubbles) {
                        this.#bubble_instances[index++].showBubble();
                        setTimeout(loopShowBubbles, bubbles_theme.bubbleSpawnInterval);
                    } else {
                        this.#all_bubbles_are_shown = true;
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
        if (this.#is_running) {
            this.#is_running = false;
            window.cancelAnimationFrame(this.#animation_handle);
            clearTimeout(this.#engine_rendering_handle);
        }
    }
}

export default BubbleEngine;
