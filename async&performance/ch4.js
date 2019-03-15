// Generators

// yield!
var x = 1;

function* foo() {
  x++;
  yield; // pause!
  console.log("x:", x);
}

function bar() {
  x++;
}

// how to use it
// construct an iterator `it` to control the generator
var it = foo();

// start `foo()` here!
it.next();
x;						// 2
bar();
x;						// 3
it.next();


// two-way message passing system during the execution of the generator
function* foo(x) {
  var y = x * (yield "Hello");	// <-- yield a value!
  return y;
}

var it = foo(6);

var res = it.next();	// first `next()`, don't pass anything
res.value;				// "Hello"

res = it.next(7);		// pass `7` to waiting `yield`
res.value;				// 42

// each time you construct an iterator, you are implicitly constructing
// an instance of the generator which that iterator will control

function* foo() {
  var x = yield 2;
  z++;
  var y = yield (x * z);
  console.log(x, y, z);
}

var z = 1;

var it1 = foo();
var it2 = foo();

var val1 = it1.next().value;			// 2 <-- yield 2
var val2 = it2.next().value;			// 2 <-- yield 2

val1 = it1.next(val2 * 10).value;		// 40  <-- x:20,  z:2
val2 = it2.next(val1 * 5).value;		// 600 <-- x:200, z:3

it1.next(val2 / 2);					// y:300
// 20 300 3
it2.next(val1 / 4);					// y:10
// 200 10 3

var a = 1;
var b = 2;

function* foo() {
  a++;
  yield;
  b = b * a;
  a = (yield b) + 3;
}

function* bar() {
  b--;
  yield;
  a = (yield 8) + b;
  b = a * (yield 2);
}

function step(gen) {
  var it = gen();
  var last;

  return function () {
    // whatever is `yield`ed out, just
    // send it right back in the next time!
    last = it.next(last).value;
  };
}

a = 1;
b = 2;

var s1 = step(foo);
var s2 = step(bar);

s2();		// b--;
s2();		// yield 8
s1();		// a++;
s2();		// a = 8 + b;
// yield 2
s1();		// b = b * a;
// yield b
s1();		// a = b + 3;
s2();		// b = a * 2;

a = 12
b = 9