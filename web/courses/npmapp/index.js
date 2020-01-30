const _ = require("lodash");

const numbers = [33, 35, 92, 491, 28, 2, 41, 22];

_.each(numbers, function(number, i) {
    console.log(number);
});
