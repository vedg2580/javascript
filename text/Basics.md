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


if(condition){
    // code to execute
} esle if(condition){
    // code to execute
} else {
    // code to execute
}

Switch case
switch case compares values not expressions. remember that.
so when you do
function switchCaseDemo(a){
    switch(a){
        case 18:
            console.log('UNDERAGE');
            break;
        case 25:
            console.log('you are still young. hustle harder so you can chill later for the rest of your life in luxury');
            break;
        default:
            console.log('good you hustled in your twenties now you can rest');
            break;
    }
}

switchCaseDemo(person.age);
and age = 25 it checks a === 25 ? yes or no
if you put expression say case a > 35 this will result into true and switch will interpret this as 25 === true which is false

Taking input
// this works only on browser
let currentAge = prompt('Enter your current age');

for taking input on node we have to do something different

Arrays
arrayName.push(element); // is used to push element into array
arrayName.length; // gives the length of array
const newArray = [1, 2, 3];
when you try to do:
newArray = [10, 20, 30]; // this will give an error
but there is still a way to mutate the array by doing the following
newArray[0] = 10;
newArray[1] = 20;
newArray[2] = 30;
console.log(newArray); // doesn't throw any error now and the array is printed with new values

Arrow Functions
let result = (a, b) => {
    return a+b;
};

function call
console.log(result(24, 224));

const integerArray = [1, -23, 22, 3, 45, -34, -3];
// lets write a method to return an array of squares of all positive integers from integerArray
const squareList = (arr) => {
    return arr.filter(element => element > 0 && Number.isInteger(element)).map(element => element*element);
}

console.log(squareList(integerArray));