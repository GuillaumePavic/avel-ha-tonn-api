module.exports = (data) => {
    return Math.round((data + Number.EPSILON) * 1000000) / 1000000;
}