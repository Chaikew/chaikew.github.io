import bubblesTheme from "./theme.js";
import { DrawingModes } from "./Enums.js";

import { randomIntFromInterval } from "../../utils/MathHelper.js";

class Bubble {
    /**
     * The canvas element to draw the bubble on.
     * @type {HTMLCanvasElement}
     */
    #canvas;

    /**
     * The context to draw the bubble on.
     * @type {CanvasRenderingContext2D}
     */
    #ctx;

    /**
     * The id of the bubble.
     * @type {number}
     */
    #bubbleId;

    /**
     * The bubble drawing mode (Fill or Stroke).
     * @type {"FILL"|"STROKE"}
     */
    #drawingMode;

    /**
     * Whether the bubble is visible or not.
     * @type {boolean}
     */
    #visible;

    /**
     * The radius of the bubble.
     * @type {number}
     */
    #radius;

    /**
     * The x coordinate of the bubble.
     * @type {number}
     */
    #x;

    /**
     * The y coordinate of the bubble.
     * @type {number}
     */
    #y;

    /**
     * The velocity of the bubble on X axis
     * @type {number}
     */
    #vx;

    /**
     * The velocity of the bubble on Y axis
     * @type {number}
     */
    #vy;

    /**
     * The constructor of the Bubble class.
     * @param {HTMLCanvasElement} canvas - the canvas element to draw the bubble on.
     * @param {CanvasRenderingContext2D} ctx - the canvas context to draw the bubble on.
     * @param {number} bubbleId - the id of the bubble.
     */
    constructor(canvas, ctx, bubbleId) {
        this.#canvas = canvas;
        this.#ctx = ctx;

        this.#bubbleId = bubbleId;

        this.#drawingMode = randomIntFromInterval(1, 2) === 1 ? DrawingModes.FILL : DrawingModes.STROKE;
        this.#vx = randomIntFromInterval(bubblesTheme.ballMinVelocityX, bubblesTheme.ballMaxVelocityX);
        this.#vy = randomIntFromInterval(bubblesTheme.ballMinVelocityY, bubblesTheme.ballMaxVelocityY);
        this.#radius = randomIntFromInterval(bubblesTheme.ballMinRadius, bubblesTheme.ballMaxRadius);
        this.#visible = false;
    }

    /**
     * Teleports the bubble to a random location.
     */
    #randomTeleport() { // TODO: fix bubble getting (sometimes) out of bounds when showBubble() is called
        this.#x = randomIntFromInterval(this.#canvas.height / (6 + randomIntFromInterval(3, 11)), this.#canvas.height / 2);
        this.#y = randomIntFromInterval(this.#canvas.width / (7 + randomIntFromInterval(2, 13)), this.#canvas.width / 2);
    }


    /**
     * Shows the bubble.
     */
    showBubble() {
        if (!this.#visible) {
            this.#visible = true;
            this.#randomTeleport();
        }
    }

    /**
     * Hides the bubble.
     */
    hideBubble() {
        if (this.#visible) {
            this.#visible = false;
        }
    }


    /**
     * Draws the bubble.
     */
    draw() {
        switch (this.#drawingMode) {
            case DrawingModes.FILL:
                this.Fill();
                break;
            case DrawingModes.STROKE:
                this.Stroke();
                break;
        }
    }

    /**
     * "Stroke" draws the bubble.
     */
    Stroke() {
        if (this.#visible) {
            this.#ctx.beginPath();
            this.#ctx.arc(this.#x, this.#y, this.#radius, 0, Math.PI * 2, true);
            this.#ctx.closePath();
            this.#ctx.strokeStyle = '#FFFFFF';
            this.#ctx.stroke();
        }
    }

    /**
     * "Fill" draws the bubble.
     */
    Fill() {
        if (this.#visible) {
            this.#ctx.beginPath();
            this.#ctx.arc(this.#x, this.#y, this.#radius, 0, Math.PI * 2, true);
            this.#ctx.closePath();
            this.#ctx.fillStyle = '#FFFFFF';
            this.#ctx.fill();
        }
    }


    /**
     * Updates the bubble.
     * Called every tick.
     */
    tick() {
        if (this.#visible) {
            this.draw();

            // check if the bubble is out of bounds
            let maxTolerance = this.#radius * 2; // the tolerance is the diameter of the bubble
            if (
                (this.#y - maxTolerance) > this.#canvas.height ||
                (this.#y + maxTolerance) < 0 ||
                (this.#x - maxTolerance) > this.#canvas.width ||
                (this.#x + maxTolerance) < 0
            ) {
                // if the bubble is out of bounds, teleport it back into the bounds
                console.debug(`Bubble #${this.#bubbleId} out of bounds! random teleporting...`);
                this.#randomTeleport();
            } else {
                // if the bubble is in bounds, move it
                // why not move it anyway? FOR PERFORMANCE REASONS

                // update the bubble position

                // add the velocity to the bubble position
                this.#x += this.#vx; // add the velocity of the "X axis" to the "X coordinate"
                this.#y += this.#vy; // add the velocity of the "Y axis" to the "Y coordinate"

                if (this.#y + this.#vy > this.#canvas.height || this.#y + this.#vy < 0) {
                    this.#vy = -this.#vy;
                }
                if (this.#x + this.#vx > this.#canvas.width || this.#x + this.#vx < 0) {
                    this.#vx = -this.#vx;
                }
            }
        }
    }
}

export default Bubble;
