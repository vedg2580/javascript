What is JavaScript?
JavaScript is most popular and most widely used programming language.
Js is used in frontend, backend and fullstack

What can we do with Js?
interactive web pages
full blown web/ mobile apps
real time networking applications
command line tools
games
etc

Where does Js code run?
Originally designed to run in browser. Every browser has a Js Engine this can execute Js code. Js Engine of Firefox and Chrome are called Spidermonkey and v8 respectively.
In 2009, Ryan Dahl took open source Js Engine in chrome and embedded it inside a C++ program he called that program Node. The Node is a C++ program that includes googles v8 Js engine. Now with this we can run our Js code outside our browser. So we can pass our Js code for execution and this means with Js we can build the backend for our web and mobile application.
Browser and Node provides a runtime environment for our Js code.

JavaScript vs ECMAScript
ECMAScript is a specification and Js is a programming language that confirms to this specification.

.

console.log('hello world');

Code editor: VSCode

we can add <script> element in head and body (best practice put at end of body structure. Why though? Browser might take too much time if script is in head section. Its better user experience to show the page first and the Js happen at the end)

To run a Js code using node. On the terminal navigate to the folder where the .js file is stored. write: $ node filename.js
Node is a runtime environment for runnig Js Code.

Variables
used to store data temporarily.
by default any variable we declare in Js has the type undefined.
rules for naming variable.
The variable name cannot be a reserved keyword
give meaningful name to variables always
cannot start with a number
cannot contain a space or hyphen
use camelNotation for variable declaration
variables are case sensitive in Js

Constants
when you don't want the value of variable to change. then use the keyword const. This will throw an error when the const variable is reassgined.

Primitive Types
Boolean, Undefined, Big Int, Numbers, Null, String (BUBNNS)

Symbol is Non Primitive (Reference Type)

let name = "Ved";
let age = 25;
let isApproved = true;

Js is a dynamically typed language

Object
like a dictionary in Python
key value pair
let person = {
    "name": "Ved",
    "age": 25
}

accessing key in Object
console.log(person.name);
console.log(person['name']);

you can also set new things in object using the same two statements above.
person.school = "School of Scholars";

Array
let selectedColors = [];
let notSelectedColors = ['red', 'blue', 344];
// heterogenous arrays allowed in java;
array is a data structure that we used to represent a list of items

Functions
a set of statements that performs certain task
'function' keyword is used
function greet(){
    console.log('good evening sir');
}

function greet(name){
    console.log('good evening ' + name + ' sir');
}

parameter is what we have in function
arguement is what value we supply at the time of calling the function
