
export const GetRandom = function (min, max) {
    return Math.ceil(Math.random() * (max - min + 1) + min - 1)
}