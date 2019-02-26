// scope closures

//this is not about closures, but RHS look-ups instead
function foo() {
	var a = 2;

	function bar() { //has access to variable a
		console.log( a ); // 2
	}

  //has a closure over the scope of foo()
	bar();
}

foo();
// though it has something to do to closures!

// let's see the closure in work:
function foo() {
	var a = 2;

  // has lexical scope access to the inner scope of foo()
	function bar() { //has closure over foo() -> has access to a
		console.log( a );
	}

	return bar; // returning function reference
}

var baz = foo(); // returned a function reference

// function reference called
// the reference was nested in foo() -> so it has closure over foo() -> remembers it's lexical scope -> has access to variables
baz(); // 2 -- Whoa, closure was just observed, man.
// bar executed outside of it's declared lexical scope

// what's happening here?
function foo() {
	var a = 2;

	function baz() {
		console.log( a ); // 2
	}

  //bar is callable because of RHS, foo and bar in the same scope
	bar( baz ); // function reference -> closure -> has access to foo lexical scope
}

function bar(fn) {
	fn(); // look ma, I saw closure!
}


// where is the closure?
function wait(message) {

	setTimeout( function timer(){
		console.log( message ); // message accessable because timer has access to the wait lexical scope (sees message)
	}, 1000 );

}

wait( "Hello, closure!" );

// loop + closure
// what's happening here?
for (var i=1; i<=5; i++) {
	setTimeout( function timer(){
		console.log( i );
	}, i*1000 );
}

// the timer function has access to the lexical scope of the global context
// where there is a variable called i
// the timer is called after one second
// BUT! the loop ends faster, so the i will be 6
// 1 second later, the timer is called -> still has access to i -> but i is 6
// 2 seconds later, the timer is called -> still has acces to i -> i is still 6 -> it prints out 6
// and so on, it prints out 6 five times!
// all timer functions are closed over the same shared global scope -> there is one i in it

// why does this still not work?
for (var i=1; i<=5; i++) {
  //creates 5 scopes, but nothing in it
	(function(){
    //nothing is here, so it goes one level up to find i! there is still only one i in the global scope so it uses it
		setTimeout( function timer(){
			console.log( i );
		}, i*1000 );
	})();
}
// more lexical scope, but it's empty!

// what is the solution to this?
for (var i=1; i<=5; i++) {
  // creates 5 (different) scope, with different i values
	(function(){
		var j = i; // in each scope save the current i value to the current scope! the own copy of the i
		setTimeout( function timer(){
			console.log( j );
		}, j*1000 );
	})();
}

// the solution looks nice, but there is a better one!


// block scope and closure works hand-in-hand!
for (let i=1; i<=5; i++) { // the i will be declared for each iteration -> let -> block scope!
	setTimeout( function timer(){
		console.log( i );
	}, i*1000 );
}
// thanks to block scope it will have 5 different scope, each of them will have an own copy of i, so it works like the
// code snippet above, but with less and understandable code!
// beauty!

// Module pattern
function CoolModule() {
	var something = "cool";
	var another = [1, 2, 3];

	function doSomething() { //has closure over CoolModule
		console.log( something );
	}

	function doAnother() { //has closure over CoolModule
		console.log( another.join( " ! " ) );
	}

	return {
		doSomething: doSomething, //reference (closure) over the CoolModule scope
		doAnother: doAnother //reference (closure) over the CoolModule scope
	};
}

var foo = CoolModule(); // without this the creation of the inner scope and the closures would not occur!

// sees the variables in the CoolModule scope
foo.doSomething(); // cool ->
foo.doAnother(); // 1 ! 2 ! 3

// hides private variables
// works with lexical scope
// works with closure
// and its a beauty!

// whenever CoolModule() is called it creates new module instances -> each function will now the scope it references to


// here we only want to create only one instance!
var foo = (function CoolModule() {
	var something = "cool";
	var another = [1, 2, 3];

	function doSomething() {
		console.log( something );
	}

	function doAnother() {
		console.log( another.join( " ! " ) );
	}

	return {
		doSomething: doSomething,
		doAnother: doAnother
	};
})();

foo.doSomething(); // cool
foo.doAnother(); // 1 ! 2 ! 3


//like a public API!
var foo = (function CoolModule(id) {
	function change() {
		// modifying the public API
		publicAPI.identify = identify2;
	}

	function identify1() {
		console.log( id );
	}

	function identify2() {
		console.log( id.toUpperCase() );
	}

	var publicAPI = {
		change: change,
		identify: identify1
	};

	return publicAPI;
})( "foo module" );

foo.identify(); // foo module
foo.change();
foo.identify(); // FOO MODULE

// Future modules

// into bar.js
//this is al ike a module
function hello(who) {
	return "Let me introduce: " + who;
}

// this has closure over the bar js file, as before
export hello; // exporting function // module

// into foo.js
// import only `hello()` from the "bar" module
import hello from "bar"; // importing hello function from bar js

var hungry = "hippo";

function awesome() {
	console.log(
		hello( hungry ).toUpperCase() // using hello from bar js
	);
}
// has closure over foo js file, sees the hungry variable
export awesome; //exporting function

// into main.js
// import the entire "foo" and "bar" modules
module foo from "foo";
module bar from "bar";

console.log(
	bar.hello( "rhino" )
); // Let me introduce: rhino

foo.awesome(); // LET ME INTRODUCE: HIPPO