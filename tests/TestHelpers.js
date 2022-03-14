// Author: Rahul Hegde
// Date: 3/13/2022

//--------------
// Helpers
//--------------
function getRandomNumber(min, max) {
  return Math.random() * (max - min) + min
}

function getRandomInt(min, max) {
  return Math.round(Math.random() * (max - min) + min)
}

module.exports = {
  getRandomNumber,
  getRandomInt,
}
