/*
// old theme
const bubblesTheme = {
    numberOfBubbles: 100,
    bubbleSpawnInterval: 55,
    clearIntensity: 33,
    ballMinRadius: 12,
    ballMaxRadius: 32,
    ballMinVelocityX: 2,
    ballMaxVelocityX: 5,
    ballMinVelocityY: 2,
    ballMaxVelocityY: 7,
};*/

const bubblesTheme = {
    numberOfBubbles: // number of bubbles to fill the screen / 6
        Math.floor(
            (
                (
                    window.innerWidth * window.innerHeight
                ) / (
                    Math.PI * (32**2 /* ballMaxRadius² */) // max area of a ball
                )
            ) / 8 // for each 8 possible bubbles, we put one
        )
        ,
    bubbleSpawnInterval: 105,
    clearIntensity: 33,
    ballMinRadius: 12,
    ballMaxRadius: 32,
    ballMinVelocityX: 2,
    ballMaxVelocityX: 5,
    ballMinVelocityY: 2,
    ballMaxVelocityY: 7
};

export default bubblesTheme;
