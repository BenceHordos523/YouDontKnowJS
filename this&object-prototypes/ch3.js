// Objects
// two forms: declerative (literal) and constructed form

// literal syntax:
var myObj = {
	key: value
	// ...
};

// constructed form:
var myObj = new Object();
myObj.key = value;


// built-in ,,functions"
var strPrimitive = "I am a string";
typeof strPrimitive;							// "string"
strPrimitive instanceof String;					// false

var strObject = new String( "I am a string" );
typeof strObject; 								// "object"
strObject instanceof String;					// true

// inspect the object sub-type
Object.prototype.toString.call( strObject );	// [object String]

// example for coercion
var strPrimitive = "I am a string";

console.log( strPrimitive.length );			// 13

console.log( strPrimitive.charAt( 3 ) );	// "m"
// explanation comes later


// example
var myObject = {
	a: 2
};

myObject.a;		// 2 // property access

myObject["a"];	// 2 // key access


// [".."] uses string's value to specify the location
var wantA = true;
var myObject = {
	a: 2
};

var idx;

if (wantA) {
	idx = "a";
}

// later

console.log( myObject[idx] ); // 2 // ===  myObject["a"]

var myObject = { };

myObject[true] = "foo"; // will be "true"
myObject[3] = "bar";
myObject[myObject] = "baz"; // converted to string -> coercion comes later

myObject["true"];				// "foo"
myObject["3"];					// "bar"
myObject["[object Object]"];	// "baz"

// computed property names
var prefix = "foo"; //

var myObject = {
  [prefix + "bar"]: "hello",  // you can specify an expression between the [ ] pair, in the key name position
	[prefix + "baz"]: "world"   // of an object-literal declaration
};

myObject["foobar"]; // hello
myObject["foobaz"]; // world

// arrays  -> special type of objects
var myArray = [ "foo", 42, "bar" ];

myArray.length;		// 3

myArray[0];			// "foo"

myArray[2];
// Arrays assume numeric indexing, which means that values are stored in locations,
// usually called indices, at non-negative integers, such as 0 and 42.

// special objects so we can add properties to it:
var myArray = [ "foo", 42, "bar" ]; // doesn't care about types at all!

myArray.baz = "baz";

myArray.length;	// 3

myArray.baz;	// "baz"

// you can still do this:
var myArray = [ "foo", 42, "bar" ];

// property names are strings -> even thou they are non-negative integers, see above
myArray["3"] = "baz";

myArray.length;	// 4

myArray[3];		// "baz"

// Copy or not copy, or what to copy, and infinite circular duplication problem?
function anotherFunction() { /*..*/ }

var anotherObject = {
	c: true
};

var anotherArray = [];

var myObject = {
	a: 2,
	b: anotherObject,	// reference, not a copy!
	c: anotherArray,	// another reference!
	d: anotherFunction
};

anotherArray.push( anotherObject, myObject );

// to copy an object:
var newObj = JSON.parse( JSON.stringify( someObj ) );
// first answer

// second answer
var newObj = Object.assign( {}, myObject );

newObj.a;						// 2
newObj.b === anotherObject;		// true
newObj.c === anotherArray;		// true
newObj.d === anotherFunction;	// true

// property descriptor
var myObject = {
	a: 2
};

Object.getOwnPropertyDescriptor( myObject, "a" );
// {
//    value: 2,
//    writable: true, // characteristics
//    enumerable: true,
//    configurable: true
// }


//add a new property, or modify an existing one (if it's configurable!), with the desired characteristics
var myObject = {};

Object.defineProperty( myObject, "a", {
	value: 2,
	writable: true,
	configurable: true,
	enumerable: true
} );

myObject.a; // 2

// Writable characteristics
var myObject = {};

Object.defineProperty( myObject, "a", {
	value: 2,
	writable: false, // not writable!
	configurable: true,
	enumerable: true
} );

myObject.a = 3; // will silently fail

myObject.a; // 2


// if we use strict mode, this will give us an error
"use strict";

var myObject = {};

Object.defineProperty( myObject, "a", {
	value: 2,
	writable: false, // not writable!
	configurable: true,
	enumerable: true
} );

myObject.a = 3; // TypeError
// because of strict mode !

// Configurable characteristic
var myObject = {
	a: 2
};

myObject.a = 3;
myObject.a;					// 3

Object.defineProperty( myObject, "a", {
	value: 4,
	writable: true,
	configurable: false,	// not configurable!
	enumerable: true
} );

myObject.a;					// 4
myObject.a = 5;
myObject.a;					// 5

// the configurable characteristic is false, so we can't modify the descriptor definitions
Object.defineProperty( myObject, "a", {
	value: 6,
	writable: true,
	configurable: true,
	enumerable: true
} ); // TypeError

// one more thing to configurable characteristic
var myObject = {
	a: 2
};

myObject.a;				// 2
delete myObject.a;
myObject.a;				// undefined

Object.defineProperty( myObject, "a", {
	value: 2,
	writable: true,
	configurable: false, // prevents the ability to use the delete operator on an existing property
	enumerable: true
} );

myObject.a;				// 2
delete myObject.a;  // can't use this
myObject.a;		// 2

// Immutability - Object Constant
var myObject = {};

Object.defineProperty( myObject, "FAVORITE_NUMBER", {
	value: 42,
	writable: false,
	configurable: false
} ); // this is like a constant in the object!

// Immutability - Prevent Extensions
var myObject = {
	a: 2
};

Object.preventExtensions( myObject );

myObject.b = 3;
myObject.b; // undefined // can't add more properties to it
// in strict mode it throws a TypeError

// Immutability - Seal
Object.seal(..)
// Immutability - Freeze
Object.freeze(..)


// getters and setters
var myObject = {
	// define a getter for `a`
	get a() {
		return 2;
	}
};

Object.defineProperty(
	myObject,	// target
	"b",		// property name
	{			// descriptor
		// define a getter for `b`
		get: function(){ return this.a * 2 },

		// make sure `b` shows up as an object property
		enumerable: true
	}
);

myObject.a; // 2

myObject.b; // 4

// getter for a is present
var myObject = {
	// define a getter for `a`
	get a() {
		return 2;
	}
};

// since there is a getter, and there is no setter, we can't change the value
// of the property through the [[PUT]] operation (RULE FROM ABOVE)
myObject.a = 3; // not an error, but it wil silently fail

// and it is hard coded, so it wont even work with a setter either
myObject.a; // 2

// define getter and setter together
var myObject = {
	// define a getter for `a`
	get a() {
		return this._a_;
	},

	// define a setter for `a`
	set a(val) {
		this._a_ = val * 2;
	}
};

myObject.a = 2; // set val = 2 -> _a_ = val * 2

myObject.a; // 4

// in operator and hasOwnProperty function
var myObject = {
	a: 2
};

// traverses through the [[Prototype]] chain
// checks if the a property exists in the myObject object
("a" in myObject);				// true
("b" in myObject);				// false

// does not traverse through the [[Prototype]] chain
// same goal as above, but with less care
myObject.hasOwnProperty( "a" );	// true
myObject.hasOwnProperty( "b" );	// false

// Enumeration is revisited
var myObject = { };

Object.defineProperty(
	myObject,
	"a",
	// make `a` enumerable, as normal
	{ enumerable: true, value: 2 }
);

Object.defineProperty(
	myObject,
	"b",
	// make `b` NON-enumerable
	{ enumerable: false, value: 3 } // this makes me invisible in the for...in loop!
);

myObject.b; // 3
("b" in myObject); // true
myObject.hasOwnProperty( "b" ); // true

// .......

for (var k in myObject) {
	console.log( k, myObject[k] );
}
// "a" 2


// check if the property is enumerable
var myObject = { };

Object.defineProperty(
	myObject,
	"a",
	// make `a` enumerable, as normal
	{ enumerable: true, value: 2 }
);

Object.defineProperty(
	myObject,
	"b",
	// make `b` non-enumerable
	{ enumerable: false, value: 3 }
);

myObject.propertyIsEnumerable( "a" ); // true -> this checks if this property is enumerable
myObject.propertyIsEnumerable( "b" ); // false -> this checks if this property is enumerable

Object.keys( myObject ); // ["a"]
Object.getOwnPropertyNames( myObject ); // ["a", "b"]


// iterating over values
var myArray = [ 1, 2, 3 ];

for (var v of myArray) { // looks neat!
	console.log( v );
}
// 1
// 2
// 3


// iterator object
var myArray = [ 1, 2, 3 ];
var it = myArray[Symbol.iterator](); // gives back and iterator object with the next() functionality

it.next(); // { value:1, done:false } // gives back and object, has the value and a done property
it.next(); // { value:2, done:false } // if the done is false it keeps going
it.next(); // { value:3, done:false } // still done
it.next(); // { done:true } // there are no more values in the object, so the done is true, means no more steps


// How to define your own iterator for your own object?
var myObject = {
	a: 2,
	b: 3
};

// creates Symbol.iterator, with data descriptors
Object.defineProperty( myObject, Symbol.iterator, {
	enumerable: false,
	writable: false,
	configurable: true,
	value: function() {
		var o = this;
		var idx = 0;
		var ks = Object.keys( o );
		return {
			next: function() {
				return {
					value: o[ks[idx++]],
					done: (idx > ks.length)
				};
			}
		};
	}
} );

// iterate `myObject` manually
var it = myObject[Symbol.iterator](); // value() -> returns an object with { next: function(..) ...}
it.next(); // { value:2, done:false } // returns this object
it.next(); // { value:3, done:false }
it.next(); // { value:undefined, done:true }

// iterate `myObject` with `for..of`
for (var v of myObject) {
	console.log( v ); // implicitly called
}
// 2
// 3