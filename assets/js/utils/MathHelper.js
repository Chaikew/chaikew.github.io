/**
 * Calculates a random int between two given ones ("min" and "max")
 * @param {number} min - the min number
 * @param {number} max - the max number
 * @returns {number} - the random int
 */
function randomIntFromInterval(min, max) { // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min)
}

export { randomIntFromInterval };
