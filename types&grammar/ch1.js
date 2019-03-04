// types

typeof undefined     === "undefined"; // true
typeof true          === "boolean";   // true
typeof 42            === "number";    // true
typeof "42"          === "string";    // true
typeof { life: 42 }  === "object";    // true

// added in ES6!
typeof Symbol()      === "symbol";    // true

// the special one
typeof null === "object"; // true


// how to test if null is the type of the value
var a = null;

(!a && typeof a === "object"); // true

// gives back function? why? there is no function primitive...
typeof function a(){ /* .. */ } === "function"; // true