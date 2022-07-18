/*
// old theme
const bubbles_theme = {
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

const bubbles_theme = {
    numberOfBubbles: // number of bubbles to fill the screen / 6
        Math.floor(
            (
                (
                    window.innerWidth * window.innerHeight
                ) / (
                    Math.PI * (32**2 /* ballMaxRadius² */) // max area of a ball
                )
            ) / 6 // for each 5 possible bubbles, we put one
        )
        ,
    bubbleSpawnInterval: 55,
    clearIntensity: 33,
    ballMinRadius: 12,
    ballMaxRadius: 32,
    ballMinVelocityX: 2,
    ballMaxVelocityX: 5,
    ballMinVelocityY: 2,
    ballMaxVelocityY: 7
}

export default bubbles_theme;
