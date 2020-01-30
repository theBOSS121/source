import "./module2";

console.log("Hi");

const values = { a: 1, b: 2 };

const newValues = {
    ...values,
    c: 3
};

console.log(newValues);
