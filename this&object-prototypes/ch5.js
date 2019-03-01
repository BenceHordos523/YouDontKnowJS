// ch4 is just talking
// PROTOTYPES!!!


// the default [[Get]] operation follows the [[Prototype]] link of the object
// if it cannot find the requested property on that object directly
var anotherObject = {
	a: 2
};

// create an object linked to `anotherObject`
var myObject = Object.create( anotherObject );

myObject.a; // 2


// for..in loop uses the [[Prototype]] chain
var anotherObject = {
	a: 2
};

// create an object linked to `anotherObject`
var myObject = Object.create( anotherObject );

for (var k in myObject) {
	console.log("found: " + k);
}
// found: a

("a" in myObject); // true

// lets see this:
// 3. If a foo is found higher on the [[Prototype]] chain and it's a setter (see Chapter 3),
// then the setter will always be called. No foo will be added to (aka, shadowed on) myObject,
// nor will the foo setter be redefined.
var anotherObject = {
	// define a getter for `a`
	get a() {
		return this._a_;
	},

	// define a setter for `a`
	set a(val) {
		this._a_ = val;
	}
};

var myObject = Object.create( anotherObject );

myObject.a = 2

console.log(myObject.a);  // 2 // returns

myObject.hasOwnProperty("_a_") // true
myObject.hasOwnProperty("a") // false

// shadowing
var anotherObject = {
	a: 2
};

var myObject = Object.create( anotherObject );

anotherObject.a; // 2
myObject.a; // 2

anotherObject.hasOwnProperty( "a" ); // true
myObject.hasOwnProperty( "a" ); // false

myObject.a++; // oops, implicit shadowing!

anotherObject.a; // 2
myObject.a; // 3

myObject.hasOwnProperty( "a" ); // true

// class as functions -> misconception
function Foo() {
	// ...
}

Foo.prototype; // { }

function Foo() {
	// ...
}

var a = new Foo();

// a references to Foo.prototype which is this: { }
Object.getPrototypeOf( a ) === Foo.prototype; // true
// When a is created by calling new Foo(), one of the things (see Chapter 2 for all four steps) that happens
// is that a gets an internal [[Prototype]] link to the object that Foo.prototype is pointing at.


// Object.create(..)
// second argument -> add properties of the parameter objcet to the newly created object
var anotherObject = {
	a: 2
};

var myObject = Object.create( anotherObject, {
	b: {
		enumerable: false,
		writable: true,
		configurable: false,
		value: 3
	},
	c: {
		enumerable: true,
		writable: false,
		configurable: false,
		value: 4
	}
} );

myObject.hasOwnProperty( "a" ); // false
myObject.hasOwnProperty( "b" ); // true
myObject.hasOwnProperty( "c" ); // true

myObject.a; // 2
myObject.b; // 3
myObject.c; // 4

