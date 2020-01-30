"use strict";
// classes
// class User {
//     constructor(username, email, password) {
//         this.username = username;
//         this.email = email;
//         this.password = password;
//     }

//     static countUsers() {
//         console.log("There are 50 users");
//     }

//     register() {
//         console.log(this.username + " is registred!");
//     }
// }

// class Member extends User {
//     constructor(username, email, password, memberPackage) {
//         super(username, email, password);
//         this.package = memberPackage;
//     }

//     getPackage() {
//         console.log(this.username + " is subscribed to the " + this.package);
//     }
// }

// let bob = new User("bob", "bob@gmail.com", "12345");
// bob.register();
// User.countUsers();

// let mike = new Member("mike", "mike@gmail.com", "123", "standard");
// mike.getPackage();
// mike.register();

// Template literal
// let name = "John";
// function makeUppercase(word) {
//     return word.toUpperCase();
// }
// let template = `<h1>${makeUppercase("Hello")}, ${name}</h1>
// <p>This is a simple template in JavaScript</p>`;
// document.getElementById("template").innerHTML = template;

// string and numbers
// let theString = "Hello, my name is Brad and I love JS";

// console.log(theString.startsWith("Hello"));
// console.log(theString.endsWith(" JS"));
// console.log(theString.includes("is Brad"));

// console.log(0xff);
// console.log(0b101011);
// console.log(0o543);

// console.log(Number.isFinite(Infinity));
// console.log(Number.isNaN(NaN));
// console.log(Number.isInteger(-2));

// Default parameter
// function greet($greeting = "Hello world") {
//     console.log($greeting);
// }
// greet();
// greet("Hola chica");

// Spread operator (bed example doesn't change anything here)
// let args1 = [1, 2, 3];
// let args2 = [4, 5, 6];

// function test() {
//     console.log(args1 + ", " + args2);
// }
// test.apply(null, args);
// test(...args1, ...args2);

// Sets and Maps
// let myArray = [11, 22, 34, 65, 34];
// let mySet = new Set(myArray);

// mySet.add("100");
// mySet.add({ a: 1, b: 2 });
// mySet.delete(22);
// // mySet.clear(); to delete everything
// console.log(mySet);
// mySet.forEach(function(val) {
//     console.log(val);
// });

// let myMap = new Map([
//     ["a1", "Hello"],
//     ["b2", "Goodby"]
// ]);

// myMap.set("c3", "Hola");
// myMap.delete("a1");
// console.log(myMap);

// you also hava WeakMap
// let carWeakSet = new WeakSet();

// let car1 = {
//     make: "Honda",
//     model: "Civic"
// };
// carWeakSet.add(car1);

// let car2 = {
//     make: "Toyota",
//     model: "Camry"
// };
// carWeakSet.add(car2);

// carWeakSet.delete(car1);

// console.log(carWeakSet);

// Arrow function
// function Prefixer(prefix) {
//     this.prefix = prefix;
// }

// // same but without the arrow function -> can use this
// // Prefixer.prototype.prefixArray = function(arr) {
// //     let that = this;
// //     return arr.map(function(x) {
// //         console.log(that.prefix + x);
// //     });
// // };
// Prefixer.prototype.prefixArray = function(arr) {
//     return arr.map((x) => {
//         console.log(this.prefix + x);
//     });
// };

// let pre = new Prefixer("Hello ");
// pre.prefixArray(["Brad", "Jeff"]);

// // let add = function(a, b) {
// //     let sum = a + b;
// //     console.log(sum);
// //     return false;
// // };

// let add = (a, b) => {
//     let sum = a + b;
//     console.log(sum);
//     return false;
// };

// add(22, 2);

// Immediatyley Resolved
// var myPromise = Promise.resolve("Foo");
// myPromise.then((res) => console.log(res));

// var myPromise = new Promise(function(resolve, reject) {
//     setTimeout(() => resolve(4), 2000);
// });
// myPromise.then((res) => {
//     res += 3;
//     console.log(res);
// });

// function getData(method, url) {
//     return new Promise(function(resolve, reject) {
//         var xhr = new XMLHttpRequest();
//         xhr.open(method, url);
//         xhr.onload = function() {
//             if (this.status >= 200 && this.status < 300) {
//                 resolve(xhr.response);
//             } else {
//                 console.log("err1");
//                 reject({
//                     status: this.status,
//                     statusText: xhr.statusText
//                 });
//             }
//         };
//         xhr.onerror = function() {
//             console.log("err1");
//             reject({
//                 status: this.status,
//                 statusText: xhr.statusText
//             });
//         };
//         xhr.send();
//     });
// }

// getData("GET", "https://jsonplaceholder.typicode.com/todos")
//     .then(function(data) {
//         let todos = JSON.parse(data);
//         let output = "";
//         for (let todo of todos) {
//             output += `
//                 <div>
//                     <h3>${todo.title}</h3>
//                     <p>${todo.completed}</p>
//                 </div>
//             `;
//         }
//         document.getElementById("template").innerHTML = output;
//     })
//     .catch(function(e) {
//         console.log(e);
//     });

// Generator we can go trough the function in steps using yield && * && .next()
// function* g1() {
//     console.log("Hello");
//     yield "Yield 1 Ran..";
//     console.log("World");
//     yield "Yield 2 Ran..";
//     return "Returned..";
// }

// var g = g1();

// console.log(g.next().value);
// console.log(g.next().value);
// console.log(g.next().value);

// // for (let val of g) {
// //     console.log(val);
// // }
