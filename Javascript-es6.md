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

let is a new keywrd to declare variables, and the difference with var is that let is safer, when we define a let in a block, the let will only be accessible within the scope of the block.

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

4. arrow functions

It is a way to define a function without the keyword function, but usiong ```js () => {//logic}```, the difference is that an arrow function cares about the caller, so this keyword is the caller of the function, in the other hand, this keyword returns the scope of the function in the arrow function.
```js
const X = function() {
  // "this" here is the caller of X
};

const Y = () => {
  // "this" here is NOT the caller of Y
  // It's the same "this" found in Y's scope
};
/*
  
  Regular functions give access to their "calling" environment while arrow functions give access to their "defining" environment 
  
  
  The value of the "this" keyword inside a regular function depends on HOW the function was CALLED (the OBJECT that made the call).
  
  The value of the "this" keyword inside an arrow function depends on WHERE the function was DEFINED (the SCOPE that defined the function).
  
  */
```

5. Object literals

Objects are very used in java, they are used to manage and comunicate date, the difinition of objects can be made in different ways, but the most common is using object literal. they also support dynamic properties like in the example.
```js
const mystery = 'answer';
const InverseOfPI = 1 / Math.PI;

const obj = {
	p1: 10,
  p2: 20,
  f1() {},
  f2: () => {},
  [mystery]: 42,//This is a dynamic property.
  InverseOfPI, // this can have a shorter syntax of InverseOfPI: InverseOfPi,
};

console.log(obj.mystery) //this will print indefined, cause the mystery property will be evaluated, and whatever the mystery value is evaluated to will become the property.
console.log(obj.answer)//this will print 42, because the evaluated value of mystery is answer.
```

6.Desctructuring

Destructuring is a way of retrieving values of attributes from objects
```js
//Instead of retrieving values of Math.property like the following
const PI = Math.PI;
const E = Math.E;
const SQRT2 = Math.SQRT2;
//We can use destruction, and map the properties of the right object onto the left scope like so
const {PI, E, SQRT2}  = Math;

//Somewhere in a React App
const {Component, Fragment, useState} = require('react');
//now we can use the useState() methode directly like so
useState();

//here we define an object with 2 properties
const circle = {
  label: 'circleX',
  radius: 2,
};

//here we define a function with a destructered parameter, it will receive an object and destruct it properties to take only the property needed
//for the precision parameter, it will also destruct the object argument and if it doesn't find the precision attribute it will take a default value equals to 2
const circleArea = ({radius}, {precision = 2} = {}) =>
(PI * radius * radius).toFixed(precision);

console.log(
//now in the call, circle will be the object parameter of the method, and as defined, it will destructure the object and take the radius parameter from it
//the precision atribute, if not set, it will take the default value as defined above, and if specified like so, with a named argument, it will override the default  //specified value (5) value (2) and take the
 circleArea(circle, { precision: 5 })
);

const [first, second,, forth] = [10, 20, 30, 40];

const [value, setValue] = useState(initialValue);
```

7.Rest spread

We can destructure arrays, and that gives us a way to split the content of an array onto multiple variables or arrays
```js
const [first, ...restOfItems] = [10, 20, 30, 40];
//here we take the first element of the array on a variable
console.log(first); 
//here we take the rest of the elements of the array onto a new a array
console.log(restOfItems);

const data = {
	temp1: '001',
  temp2: '002',
  firstName: 'John',
  lastName: 'Doe',
};

//here destructure the object data into temp1 that will have data.temp1 and temp2 will have data.temp2 and the rest will be stored in a new object caclled person using the 3 dots (...person)
const {temp1, temp2, ...person} = data;

//here we create a copy all the elements of restOfItems into a new object called newArray
const newArray = [...restOfItems];

//here we destruct the key:value pairs of an object into a new object using the 3 dots (...)
const newObject = {
  ...person
}
```
```diff
- Note that the copies are shallow and the nested objects are shared between the copies
```

######8.Template Strings

In javaScript we can define strings using '' or "", they are equivalent. There's a new way of defining strings, and its the backtick `` (alt-gr + 7)
```js
//this is called a template string, they can be used as a template with dynamique values, they support interpolation, we can inject javascript dynamic expressions by using ${}. We can also have multiple lines in a String.
const html= `<div>${}</div>`
```

######9.Classes

JavaScript offers the Object Oriented Programing paradigme, es6 added support for the class syntax, where it is a template or blueprint for objects sharing methods and attributes. A class can extend another class.

```js
class Person {
  constructor(name) {
    this.name = name;
  }
  greet() {
    console.log(`Hello ${this.name}!`);
  }
}

class Student extends Person {
  constructor(name, level) {
    super(name);
    this.level = level;
  }
  greet() {
    console.log(`Hello ${this.name} from ${this.level}`);
  }
}

const o1 = new Person("Max");
const o2 = new Student("Tina", "1st Grade");
const o3 = new Student("Mary", "2nd Grade");
o3.greet = () => console.log('I am special!');

o1.greet();
o2.greet();
o3.greet();
```
######10.Promis
