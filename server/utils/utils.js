module.exports = {
    randomTenDigitNumber: function () {
        let start = [];
        for (i = 0; i < 10; i++) {
            const rand = Math.round(Math.random() * 9);
            start.push(rand);
        }
        return start.join("");
        // return 2343432423;
        // return Math.round(Math.random() * 1);
    },

    checkUniqueTagId: function (tagArray, id) {
        // should return true/false

    }
}