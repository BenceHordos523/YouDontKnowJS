// Function vs block scope

function foo(a) {
	var b = 2;

	// some code

	function bar() {
		// ...
	}

	// more code

	var c = 3;
}
// It doesn't matter where in the scope a declaration appears,
// the variable or function belongs to the containing scope bubble, regardless.

//so these must fail:
bar(); // fails

console.log( a, b, c ); // all 3 fail
// these are not in the global scope,
// these variables belong to the foo's scope, they are not accessible outside of foo(...)


// this technique doesn't hide variables and functions, dangerous
//both functions and variable is declared in the global scope, can be accessed by anyone -> bad principle
function doSomething(a) {
	b = a + doSomethingElse( a * 2 );

	console.log( b * 3 );
}

function doSomethingElse(a) {
	return a - 1;
}

var b;

doSomething( 2 ); // 15

//instead hide everything you can, don't get exposed:
function doSomething(a) { //hides doSomethingElse and b
	function doSomethingElse(a) {
		return a - 1;
	}

	var b;

	b = a + doSomethingElse( a * 2 );

	console.log( b * 3 );
}

doSomething( 2 ); // 15

// benefits of function scope, avoiding collision

// function scope could help here
function foo() {
	function bar(a) {
		i = 3; // changing the `i` in the enclosing scope's for-loop
		console.log( a + i );
	}

	for (var i=0; i<10; i++) {
		bar( i * 2 ); // oops, infinite loop ahead! i will always be 3
	}
}

foo();

// solution #1:
function foo() {
	function bar(a) {
		var i = 3; //shadowing the enclosing scope's i variable
		console.log( a + i );
	}

	for (var i=0; i<10; i++) {
		bar( i * 2 ); //this will work just fine, because of shadowing
	}
}

foo();

// solution #2:
function foo() {
	function bar(a) {
		var j = 3; // change the name of the variable
		console.log( a + j  );
	}

	for (var i=0; i<10; i++) {
		bar( i * 2 );
	}
}

foo();


// problems with funcions as scopes
var a = 2;

function foo() { // <-- insert this

	var a = 3;
	console.log( a ); // 3

} // <-- and this
foo(); // <-- and this

console.log( a ); // 2

// foo -> pollutes global scope
// have to call foo(...) to execute the code

// what's the solution?

var a = 2;

(function foo(){ // <-- insert this

	var a = 3;
	console.log( a ); // 3

})(); // <-- and this

console.log( a ); // 2

//IIFE's! YEA!

// always name your inline function expressions
setTimeout( function timeoutHandler(){ // <-- Look, I have a name!
	console.log( "I waited 1 second!" );
}, 1000 );
//Providing a name for your function expression quite effectively addresses all the draw-backs,

// you can pass arguments to iife-s:
var a = 2;

(function IIFE( global ){

	var a = 3;
	console.log( a ); // 3
	console.log( global.a ); // 2

})( window ); //execute iife with parameter from outside

console.log( a ); // 2


undefined = true; // setting a land-mine for other code! avoid! This has only effect outside of the IIFE

(function IIFE( undefined ){ //this will be undefined no matter what

	var a;
	if (a === undefined) {
		console.log( "Undefined is safe here!" );
	}

})(); //nothing is passed

// BLOCK SCOPES

for (var i=0; i<10; i++) {
	console.log( i );
}
// we want to use i within the context of the for-loop

//try/catch uses block scope!
try {
	undefined(); // illegal operation to force an exception!
}
catch (err) {
	console.log( err ); // works!
}

console.log( err ); // ReferenceError: `err` not found

//let for the rescue
var foo = true;

if (foo) {
	let bar = foo * 2; //only available in the if(){...} block
	bar = something( bar );
	console.log( bar );
}

console.log( bar ); // ReferenceError

{
  console.log( bar ); // ReferenceError!
  let bar = 2; //not hoisted -> bar can only be seen if the execution is over the declaration
}


// someReallyBigData is not needed after process
function process(data) {
	// do something interesting
}

var someReallyBigData = { .. };

process( someReallyBigData ); //someReallyBigData is not needed after process, can be garbage collected

var btn = document.getElementById( "my_button" );

btn.addEventListener( "click", function click(evt){
	console.log("button clicked");
}, /*capturingPhase=*/false );
//but it wont be garbage collected, because click has closure over the enclosing scope, so the data stays!

function process(data) {
	// do something interesting
}

// anything declared inside this block can go away after!
{
	let someReallyBigData = { .. };

	process( someReallyBigData );
}
//solution for garbage collection -> we explicitly say, this can go away after process

var btn = document.getElementById( "my_button" );

btn.addEventListener( "click", function click(evt){
	console.log("button clicked");
}, /*capturingPhase=*/false );


//where let shines
for (let i=0; i<10; i++) { //re-binds it in each iteration
	console.log( i );
}

console.log( i ); // ReferenceError

//this is happening here exactly:
{
	let j;
	for (j=0; j<10; j++) {
		let i = j; // re-bound for each iteration!
		console.log( i );
	}
}


//const is also block-scoped, but it's value is fixed (constant), any attempt to change will result in error
var foo = true;

if (foo) {
	var a = 2;
	const b = 3; // block-scoped to the containing `if`

	a = 3; // just fine!
	b = 4; // error!
}

console.log( a ); // 3
console.log( b ); // ReferenceError!