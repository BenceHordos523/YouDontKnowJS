// Grammar

// didn't know about this!
var a = 42, b;
b = ( a++, a );

// a++ -> returns the value, then increments it
// ++a -> increments the value, then returns it

a;	// 43
b;	// 43

// c first, side effect, then b, side effect, then a, side effect
var a, b, c;

a = b = c = 42;

// it's working
{
	foo: bar()
}
// and it's not an object

// precedence
var a = 42;
var b = "foo";
var c = false;

var d = a && b || c ? c || b ? a : c && b : a;

d;		// ??
// whoa