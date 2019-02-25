function foo(a) { // a is here

	var b = a * 2; //b is here

	function bar(c) { //c is here
		console.log( a, b, c ); //looking for a, b, c
	}

	bar(b * 3);
}

foo( 2 ); // 2 4 12

// HOW DOES THIS WORK?
// looking for a: goes up one level, finds it
// looking for b, goes up one level, finds it
// looking for c, c is there, doesn't go anywhere else
// Scope look-up stops once it finds the first match.