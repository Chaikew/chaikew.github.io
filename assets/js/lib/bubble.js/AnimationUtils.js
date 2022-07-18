class AnimationFrame {
    /**
     * AnimationFrame constructor
     * @param {number} fps - the frames per second
     * @param {Function} animationFunc - the function to call to animate
     */
    constructor(fps = 60, animationFunc) {
        this.requestID = 0;
        this.fps = fps;
        this.animate = animationFunc;
    }

    /**
     * Start the animation
     */
    start() {
        let then = performance.now();
        const interval = 1000 / this.fps;
        const tolerance = 0.1;

        const animateLoop = (now) => {
            this.requestID = requestAnimationFrame(animateLoop); // loop
            const delta = now - then;

            if (delta >= interval - tolerance) {
                then = now - (delta % interval);
                this.animate(delta);
            }
        };

        // start the loop
        this.requestID = requestAnimationFrame(animateLoop);
    }

    /**
     * Stop the animation by cancelling the last requestID of requestAnimationFrame
     */
    stop() {
        cancelAnimationFrame(this.requestID);
    }
}

export { AnimationFrame };
