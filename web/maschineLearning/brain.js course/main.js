// let net = new brain.NeuralNetwork();

// net.train([
//   { input: [0, 0, 0], output: [0] },
//   { input: [0, 0, 1], output: [0] },
//   { input: [0, 1, 0], output: [0] },
//   { input: [0, 1, 1], output: [0] },
//   { input: [1, 0, 0], output: [1] },
//   { input: [1, 0, 1], output: [1] },
//   { input: [1, 1, 0], output: [1] },
// ]);


// net.train([
//     { input: [1, 2], output: [1] },
//     { input: [1, 3], output: [1] },
//     { input: [2, 3], output: [0] },
//     { input: [2, 4], output: [1] },
//     { input: [1, 2], output: [0] },
//     { input: [1, 3], output: [0] },
//     { input: [3, 4], output: [0] },
// ]);

let network = new brain.recurrent.LSTM();

let tdata = data.map(item => ({
    input: item.text,
    output: item.category
}));

network.train(tdata, {
    iterations: 2000
})

let output = network.run("code");
console.log(output);