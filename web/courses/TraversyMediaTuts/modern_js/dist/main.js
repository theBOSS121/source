/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval(" // classes\n// class User {\n//     constructor(username, email, password) {\n//         this.username = username;\n//         this.email = email;\n//         this.password = password;\n//     }\n//     static countUsers() {\n//         console.log(\"There are 50 users\");\n//     }\n//     register() {\n//         console.log(this.username + \" is registred!\");\n//     }\n// }\n// class Member extends User {\n//     constructor(username, email, password, memberPackage) {\n//         super(username, email, password);\n//         this.package = memberPackage;\n//     }\n//     getPackage() {\n//         console.log(this.username + \" is subscribed to the \" + this.package);\n//     }\n// }\n// let bob = new User(\"bob\", \"bob@gmail.com\", \"12345\");\n// bob.register();\n// User.countUsers();\n// let mike = new Member(\"mike\", \"mike@gmail.com\", \"123\", \"standard\");\n// mike.getPackage();\n// mike.register();\n// Template literal\n// let name = \"John\";\n// function makeUppercase(word) {\n//     return word.toUpperCase();\n// }\n// let template = `<h1>${makeUppercase(\"Hello\")}, ${name}</h1>\n// <p>This is a simple template in JavaScript</p>`;\n// document.getElementById(\"template\").innerHTML = template;\n// string and numbers\n// let theString = \"Hello, my name is Brad and I love JS\";\n// console.log(theString.startsWith(\"Hello\"));\n// console.log(theString.endsWith(\" JS\"));\n// console.log(theString.includes(\"is Brad\"));\n// console.log(0xff);\n// console.log(0b101011);\n// console.log(0o543);\n// console.log(Number.isFinite(Infinity));\n// console.log(Number.isNaN(NaN));\n// console.log(Number.isInteger(-2));\n// Default parameter\n// function greet($greeting = \"Hello world\") {\n//     console.log($greeting);\n// }\n// greet();\n// greet(\"Hola chica\");\n// Spread operator (bed example doesn't change anything here)\n// let args1 = [1, 2, 3];\n// let args2 = [4, 5, 6];\n// function test() {\n//     console.log(args1 + \", \" + args2);\n// }\n// test.apply(null, args);\n// test(...args1, ...args2);\n// Sets and Maps\n// let myArray = [11, 22, 34, 65, 34];\n// let mySet = new Set(myArray);\n// mySet.add(\"100\");\n// mySet.add({ a: 1, b: 2 });\n// mySet.delete(22);\n// // mySet.clear(); to delete everything\n// console.log(mySet);\n// mySet.forEach(function(val) {\n//     console.log(val);\n// });\n// let myMap = new Map([\n//     [\"a1\", \"Hello\"],\n//     [\"b2\", \"Goodby\"]\n// ]);\n// myMap.set(\"c3\", \"Hola\");\n// myMap.delete(\"a1\");\n// console.log(myMap);\n// you also hava WeakMap\n// let carWeakSet = new WeakSet();\n// let car1 = {\n//     make: \"Honda\",\n//     model: \"Civic\"\n// };\n// carWeakSet.add(car1);\n// let car2 = {\n//     make: \"Toyota\",\n//     model: \"Camry\"\n// };\n// carWeakSet.add(car2);\n// carWeakSet.delete(car1);\n// console.log(carWeakSet);\n// Arrow function\n// function Prefixer(prefix) {\n//     this.prefix = prefix;\n// }\n// // same but without the arrow function -> can use this\n// // Prefixer.prototype.prefixArray = function(arr) {\n// //     let that = this;\n// //     return arr.map(function(x) {\n// //         console.log(that.prefix + x);\n// //     });\n// // };\n// Prefixer.prototype.prefixArray = function(arr) {\n//     return arr.map((x) => {\n//         console.log(this.prefix + x);\n//     });\n// };\n// let pre = new Prefixer(\"Hello \");\n// pre.prefixArray([\"Brad\", \"Jeff\"]);\n// // let add = function(a, b) {\n// //     let sum = a + b;\n// //     console.log(sum);\n// //     return false;\n// // };\n// let add = (a, b) => {\n//     let sum = a + b;\n//     console.log(sum);\n//     return false;\n// };\n// add(22, 2);\n// Immediatyley Resolved\n// var myPromise = Promise.resolve(\"Foo\");\n// myPromise.then((res) => console.log(res));\n// var myPromise = new Promise(function(resolve, reject) {\n//     setTimeout(() => resolve(4), 2000);\n// });\n// myPromise.then((res) => {\n//     res += 3;\n//     console.log(res);\n// });\n// function getData(method, url) {\n//     return new Promise(function(resolve, reject) {\n//         var xhr = new XMLHttpRequest();\n//         xhr.open(method, url);\n//         xhr.onload = function() {\n//             if (this.status >= 200 && this.status < 300) {\n//                 resolve(xhr.response);\n//             } else {\n//                 console.log(\"err1\");\n//                 reject({\n//                     status: this.status,\n//                     statusText: xhr.statusText\n//                 });\n//             }\n//         };\n//         xhr.onerror = function() {\n//             console.log(\"err1\");\n//             reject({\n//                 status: this.status,\n//                 statusText: xhr.statusText\n//             });\n//         };\n//         xhr.send();\n//     });\n// }\n// getData(\"GET\", \"https://jsonplaceholder.typicode.com/todos\")\n//     .then(function(data) {\n//         let todos = JSON.parse(data);\n//         let output = \"\";\n//         for (let todo of todos) {\n//             output += `\n//                 <div>\n//                     <h3>${todo.title}</h3>\n//                     <p>${todo.completed}</p>\n//                 </div>\n//             `;\n//         }\n//         document.getElementById(\"template\").innerHTML = output;\n//     })\n//     .catch(function(e) {\n//         console.log(e);\n//     });\n// Generator we can go trough the function in steps using yield && * && .next()\n// function* g1() {\n//     console.log(\"Hello\");\n//     yield \"Yield 1 Ran..\";\n//     console.log(\"World\");\n//     yield \"Yield 2 Ran..\";\n//     return \"Returned..\";\n// }\n// var g = g1();\n// console.log(g.next().value);\n// console.log(g.next().value);\n// console.log(g.next().value);\n// // for (let val of g) {\n// //     console.log(val);\n// // }\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ })

/******/ });