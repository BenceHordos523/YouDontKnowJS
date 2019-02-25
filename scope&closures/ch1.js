// scope & closures

//RHS
console.log( a ); //we're looking-up to retrieve the value of a, so that the value can be passed to console.log(..)

//LHS
a = 2; //we simply want to find the variable as a target for the = 2 assignment operation

function foo(a) { //LHS
	console.log( a ); //RHS
}

foo( 2 ); //RHS



function foo(a) { //LHS
	var b = a; // LHS + RHS
	return a + b; //RHS + RHS
}

var c = foo( 2 ); //LHS + RHS


//this doesn't work:
function foo(a) {
	console.log( a + b ); //RHS look-up on b, can't find it anywhere so this results in a ReferenceError
	b = a;
}

foo( 2 ); //Uncaught ReferenceError: b is not defined

//this works:
function foo(a) {
  b = a; //b variable declared in the global scope, thanks to LHS
	console.log( a + b );

}

foo( 2 ); //4