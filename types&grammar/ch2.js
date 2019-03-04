// arrays

// arrays are containers for any type of value
var a = [ 1, "2", [3] ];

a.length;		// 3
a[0] === 1;		// true
a[2][0] === 3;	// true


// dont have to presize your array, just add values to it
var a = [ ];

a.length;	// 0

a[0] = 1;
a[1] = "2";
a[2] = [ 3 ];

a.length;	// 3


// be careful about creating sparse array (empty/missing slots)
var a = [ ];

a[0] = 1;
// no `a[1]` slot set here
a[2] = [ 3 ];

a[1];		// undefined

a.length;	// 3

// arrays can have string properties, because they are objects!
// doesn't count in length
var a = [ ];

a[0] = 1;
a["foobar"] = 2;

a.length;		// 1
a["foobar"];	// 2
a.foobar;		// 2

// gotcha here
// if the key can be coerced to base-10 number, then it is assumed that you wanted to use it as a number
// rather than as a string key
var a = [ ];

a["13"] = 42;

a.length; // 14


// strings
// strings are arrays of characters?
var a = "foo";
var b = ["f","o","o"];

a.length;							// 3
b.length;							// 3

a.indexOf( "o" );					// 1
b.indexOf( "o" );					// 1

var c = a.concat( "bar" );			// "foobar"
var d = b.concat( ["b","a","r"] );	// ["f","o","o","b","a","r"]

a === c;							// false
b === d;							// false

a;									// "foo"
b;									// ["f","o","o"]

// same-same but different!

a[1] = "O";
b[1] = "O";

a; // "foo"
b; // ["f","O","o"]
// this is where they differ from each other
// strings are immutable

// array methonds modify in place, while string methods
// are creating new strings and return them
c = a.toUpperCase();
a === c;	// false
a;			// "foo"
c;			// "FOO"

b.push( "!" );
b;			// ["f","O","o","!"]

// you can borrow functions from arrays
// a is a string ("foo")
a.join;			// undefined
a.map;			// undefined

var c = Array.prototype.join.call( a, "-" );
var d = Array.prototype.map.call( a, function(v){
	return v.toUpperCase() + ".";
} ).join( "" );

c;				// "f-o-o"
d;				// "F.O.O."

// reverse a string
var c = a
	// split `a` into an array of characters
	.split( "" )
	// reverse the array of characters
	.reverse()
	// join the array of characters back to a string
	.join( "" );

c; // "oof"

// ugly but it works

// can't do this
Array.prototype.reverse.call( a );
// still returns a String object wrapper (see Chapter 3)
// for "foo" :(


// Numbers
var a = 42;
var b = 42.3;

// the leading portion of a decimal value, if 0 is optional
var a = 0.42;
var b = .42;

// trailing portion can be optional too
var a = 42.0;
var b = 42.;

// these will be outputted as base-10 decimals, with trailing fractional 0's removed
var a = 42.300;
var b = 42.0;

a; // 42.3
b; // 42

// very large or very small number's will be outputted in exponent form
var a = 5E10;
a;					// 50000000000
a.toExponential();	// "5e+10"

var b = a * a;
b;					// 2.5e+21

var c = 1 / a;
c;					// 2e-11

// boxing, number -> Number, so number values can have access to methods
// that are built into the Number.prototype
var a = 42.59;

a.toFixed( 0 ); // "43"
a.toFixed( 1 ); // "42.6"
a.toFixed( 2 ); // "42.59"
a.toFixed( 3 ); // "42.590"
a.toFixed( 4 ); // "42.5900"

// be careful with the . operator -> the . operator is a valid numeric character
// invalid syntax:
42.toFixed( 3 );	// SyntaxError

// these are all valid:
(42).toFixed( 3 );	// "42.000"
0.42.toFixed( 3 );	// "0.420"
42..toFixed( 3 );	// "42.000"

// another work-around
42 .toFixed(3); // "42.000"

// small decimals
// beauty
0.1 + 0.2 === 0.3; // false
// 0.3 == 0.30000000000000004

// void operator
var a = 42;

console.log( void a, a ); // undefined 42


// NaN -> Not a Number -> still a Number tho...hmmm
var a = 2 / "foo";		// NaN

typeof a === "number";	// true


// not reflexive
var a = 2 / "foo";

a == NaN;	// false
a === NaN;	// false

// soo, how to test if the number is NaN?
var a = 2 / "foo";

isNaN( a ); // true
// yeee

// another bug in javascript
var a = 2 / "foo";
var b = "foo";

a; // NaN
b; // "foo"

window.isNaN( a ); // true
window.isNaN( b ); // true -- ouch!

// Infinities
var a = 1 / 0;	// Infinity
var b = -1 / 0;	// -Infinity

// negative zero?
var a = 0 / -3; // -0
var b = 0 * -3; // -0

// special equality in ES6
var a = 2 / "foo";
var b = -3 * 0;

Object.is( a, NaN );	// true
Object.is( b, -0 );		// true

Object.is( b, 0 );		// false


