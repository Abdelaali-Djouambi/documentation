# JavaScript ecma6

In this document we will have a synthese of new features of modern javascript crash course exposed in pluralsight course React: getting started

# New features

1. Nested block scopes:

{{{}}} these are nested block scopes, it applies to if blocks or loop blocks, it is different from functions blocks, and the difference is that if we define a var in a function block, it can't be accessible outside of the function scope. But the unique thing, is that if we define a var in a block scope (not a function block), this variable is accessible outside of the scope.

```js
if (true) {
  // Block Scope
  var l='test';
}
l //This prints test
```

2. let key word
let is a new keyword to declare variables, and the difference with var is that let is safer, when we define a let in a block, the let will only be accessible within the scope of the block.
3. const key word
const keyword behaves like let, we use const when the reference assigned to a variable, wont change. We talk about the reference not the value, cause the value is not immutable, it just means constant reference to our object. Integers and strings are immutable in javascript, but arrays are not, so if we assigne an array to a const, the reference to the array stays the samem, but the content may change.
```js
const answer1 = 42;

/*
	A big program here...
*/

answer1; // is still 42;



// vs



let answer2 = 42;

/*
	A big program here...
*/

answer2; // might have changed;
```
