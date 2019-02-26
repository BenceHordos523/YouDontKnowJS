// HOISTING


// What is the result here?
a = 2;

var a;

console.log( a );
// var a is hoisted, so console.log(a) -> 2

// What's the result here?
console.log( a );

var a = 2;
// it's easy, undefined, why?
// Because this happens: the var a is hoisted to the top of the scope,
// but the assignment happens after the console log

// declarations hoisted to the top level of the scope

// hoisting per-scope
function foo() {
	var a;

	console.log( a ); // undefined

	a = 2;
}

foo();


// function expressions are not hoisted
foo(); // not ReferenceError, but TypeError!

var foo = function bar() {
	// ...
};
// TypeError because foo is hoisted and undefined, but it can't be called as a function

//Functions hoisted first!
foo(); // 1

var foo;

function foo() { //this is hoisted first
	console.log( 1 );
}

foo = function() { //this is hoisted later
	console.log( 2 );
};
//this is interpreted as:
function foo() {
	console.log( 1 );
}

foo(); // 1

foo = function() {
	console.log( 2 );
};


//multiple/duplicate var declarations are ignored, but function declarations override previous ones
foo(); // 3

function foo() {
	console.log( 1 );
}

var foo = function() {
	console.log( 2 );
};

function foo() { //overrides the above one!
	console.log( 3 );
}