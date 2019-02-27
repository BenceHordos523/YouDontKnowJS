// this is a binding made for each function invocation, based entirely on it's call-site

function baz() {
  // call-stack is: `baz`
  // so, our call-site is in the global scope

  console.log( "baz" );
  bar(); // <-- call-site for `bar`
}

function bar() {
  // call-stack is: `baz` -> `bar`
  // so, our call-site is in `baz`

  console.log( "bar" );
  foo(); // <-- call-site for `foo`
}

function foo() {
  // call-stack is: `baz` -> `bar` -> `foo`
  // so, our call-site is in `bar`

  console.log( "foo" );
}

baz(); // <-- call-site for `baz`

// Default binding
function foo() {
	console.log( this.a ); // this refers to the global object
}

var a = 2;

foo(); // 2 // plain, un-decorated function call

// Implicit Binding
function foo() { // function declared here
	console.log( this.a ); // this means nothing here YET!
}

// var obj = {
	a: 2,
	foo: foo // function reference to the foo function
};

// calling foo as the property function of the obj (it's in the context of obj)
// the obj ,,owns" or ,,contains" the function reference at the time, when the function is called
obj.foo(); // 2 // does the call site have a context object? yes -> implicit bindig

function foo() {
	console.log( this.a );
}

var obj2 = {
	a: 42,
	foo: foo
};

var obj1 = {
	a: 2,
	obj2: obj2
};

obj1.obj2.foo(); // 42
// only the top/last level of an object property reference chain matters to the call-site



// What's happening here?
function foo() { // function
	console.log( this.a ); // this reference
}

var obj = { // obj
	a: 2,
	foo: foo // function reference to the foo
};

var bar = obj.foo; // function reference/alias! THIS IS JUST A REFERENCE

var a = "oops, global"; // `a` also property on global object

bar(); // "oops, global"
// look at the call site -> bar is called as a plain, un-decorated function -> default binding applies
// bar was only referencing to the same foo function as the obj.foo, it's just the reference
// what matters is how is it called!

// Be aware of callback functions with implicit binding
function foo() {
	console.log( this.a );
}

function doFoo(fn) { // function reference!
	// `fn` is just another reference to `foo`

	fn(); // <-- call-site! default binding applies!
}

var obj = {
	a: 2,
	foo: foo
};

var a = "oops, global"; // `a` also property on global object

doFoo( obj.foo ); // "oops, global"

//how to controll this? (bind, apply, call (comes later))

// Explicit Binding
function foo() {
	console.log( this.a );
}

var obj = {
	a: 2
};

foo.call( obj ); // 2 // we explicitly say that the function should be called with the obj as this
// call takes 1 parameter, an object, which then will be referenced as this

// Hard binding (explicit, but harder :D)
function foo() {
	console.log( this.a );
}

var obj = {
	a: 2
};

var bar = function() { // function expression
  foo.call( obj ); // when it's called, the foo will have obj as this
  // this is the call site, this will always be explicitly binded
};

bar(); // 2 // so whenever bar is called, the implicit binding will always happen, no matter what
setTimeout( bar, 100 ); // 2 // eventho we just give the bar as a function reference, when it's called it will
// explicitly bind the obj to the foo as this

// `bar` hard binds `foo`'s `this` to `obj`
// so that it cannot be overriden
bar.call( window ); // 2

// hard binding with arguments
function foo(something) {
	console.log( this.a, something );
	return this.a + something;
}

var obj = {
	a: 2
};

var bar = function() {
	return foo.apply( obj, arguments ); // obj explicitly binded
};

var b = bar( 3 ); // 2 3 (the 3 = arguments)
console.log( b ); // 5


// bind helper
function foo(something) {
	console.log( this.a, something );
	return this.a + something;
}

// simple `bind` helper
function bind(fn, obj) {
	return function() {
		return fn.apply( obj, arguments );
	};
}

var obj = {
	a: 2
};

var bar = bind( foo, obj ); // explicitly binds obj to foo and retuns a function

var b = bar( 3 ); // 2 3 // same as before
console.log( b ); // 5

// what's happening here?
// constructor calls in javascript with new operator

function foo(a) {
	this.a = a;
}

var bar = new foo( 2 ); // creates a new object, set that new object as the this for the call of foo().
console.log( bar.a ); // 2
// this is new Binding!

function foo(a) {
	this.a = a;
	return {
		a: 5 // this object will equal to the ,,this"
  }
}

var bar = new foo( 2 ); // creates a new object, set that new object as the this for the call of foo().
// UNLESS the foo returns its own alternate object, then the this will equal to the returned object
console.log( bar.a ); // 5

// sooo, what's the order?
function foo() {
	console.log( this.a );
}

var obj1 = {
	a: 2,
	foo: foo
};

var obj2 = {
	a: 3,
	foo: foo
};

obj1.foo(); // 2 // implicit binding
obj2.foo(); // 3 // implicit binding

obj1.foo.call( obj2 ); // 3 // explicit over implicit
obj2.foo.call( obj1 ); // 2 // explicit over implicit

// so: explicit is stronger than implicit

// current rank:
// 1. explicit
// 2. implicit
// 3. default

function foo(something) {
	this.a = something;
}

var obj1 = {
	foo: foo
};

var obj2 = {};

obj1.foo( 2 );
console.log( obj1.a ); // 2

obj1.foo.call( obj2, 3 );
console.log( obj2.a ); // 3

var bar = new obj1.foo( 4 ); // creates a new object, binds that object to the foo call -> so bar.a = 4
console.log( obj1.a ); // 2 //stays the same, nothing changed it
console.log( bar.a ); // 4 // whoa, new Binding over implicit binding

// so: new Binding is stronger than implicit

// current rank:
// 1. explicit - new Binding
// 2. implicit
// 3. default

// which one is stronger explicit or new Binding?
function foo(something) {
	this.a = something;
}

var obj1 = {};

var bar = foo.bind( obj1 ); // hard binding -> going strong against new Binding
bar( 2 );
console.log( obj1.a ); // 2

var baz = new bar( 3 ); // creates a new object, binds that object to the bar call -> so baz.a = 3
console.log( obj1.a ); // 2
console.log( baz.a ); // 3
// it is working like this because of the built-in bind function
// the built in bind function determinates whether or not the hard-bound function was called with
// the new operator, and if so, it uses that newly created this, rather than the hard bounded this

// why is this helpful?
function foo(p1,p2) {
	this.val = p1 + p2;
}

// using `null` here because we don't care about
// the `this` hard-binding in this scenario, and
// it will be overridden by the `new` call anyway!
var bar = foo.bind( null, "p1" ); // saves the p1 so it can be used later, like in currying

var baz = new bar( "p2" );

baz.val; // p1p2
// something like currying

// soo, the rank in the end looks like this:
// 1. new Binding
// 2. explicit
// 3. implicit
// 4. default

// ignored this?
function foo() {
	console.log( this.a );
}

var a = 2;

foo.call( null ); // 2
// yaay, default binding at it again!

// But, why?
function foo(a,b) {
	console.log( "a:" + a + ", b:" + b );
}

// spreading out array as parameters
foo.apply( null, [2, 3] ); // a:2, b:3

// currying with `bind(..)`
var bar = foo.bind( null, 2 );
bar( 3 ); // a:2, b:3
// in older times, they were spreading out arrays like this, use spread operator nowadays pls!
// and do something like curryingshh


// safer this
function foo(a,b) {
	console.log( "a:" + a + ", b:" + b );
}

// our DMZ empty object
var ø = Object.create( null );

// spreading out array as parameters
foo.apply( ø, [2, 3] ); // a:2, b:3 //don't go the global object

// currying with `bind(..)`
var bar = foo.bind( ø, 2 );
bar( 3 ); // a:2, b:3
// it's much safer, because the global object is not used, we wont get a conflict there


// lexical this

function foo() {
	// return an arrow function
	return (a) => {
		// `this` here is lexically adopted from `foo()`
		console.log( this.a );
	};
}

var obj1 = {
	a: 2
};

var obj2 = {
	a: 3
};

var bar = foo.call( obj1 ); // the lexical this has a = 2
bar.call( obj2 ); // 2, not 3!
// The arrow-function created in foo() lexically captures whatever foo()s this is at its call-time.

// useful use-case
function foo() {
	setTimeout(() => {
		// `this` here is lexically adopted from `foo()`
		console.log( this.a );
	},100);
}

var obj = {
	a: 2
};

foo.call( obj ); // 2