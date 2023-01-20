
function GetRandom(min, max) {
    return Math.ceil(Math.random() * (max - min + 1) + min - 1)
}

module.exports = {
    GetRandom
}