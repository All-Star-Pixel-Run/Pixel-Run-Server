function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
    while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}

function randomRule() {
    const suitsRule = {
        batu: null, kertas: null, gunting: null
    };
    const multiply = shuffle([1, 2, 3]);
    suitsRule.batu = multiply[0];
    suitsRule.kertas = multiply[1];
    suitsRule.gunting = multiply[2];
    return suitsRule;
}

module.exports = randomRule;