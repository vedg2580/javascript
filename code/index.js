console.log('This is from the index.js file we created');
// before ES6 we used var
// after ES6 we use let keyword to declare a variable

let name = "Ved";
console.log(name);

const interestRate = 0.3;
console.log(interestRate);
// the below lines give error
// interestRate = 1;
// console.log(interestRate);

let sum = 0;
let a = 5;
sum += a;
a = 9;
sum += a;
console.log("sum " + sum);

console.log(typeof sum);
sum = "this is a string now";
console.log(typeof sum);

let tempVariableForTypeOf = undefined; // this is equivalent to let tempVariableForTypeOf;
console.log(typeof tempVariableForTypeOf);

let person = {
    "name": "Ved",
    "age": 25
};

console.log(person);
console.log(person.name);
person.school = "School of Scholars";

console.log(person);

let selectedColors = [];
let notSelectedColors = ['red', 'blue', 344];

console.log(selectedColors);
notSelectedColors[4] = true; // doing this places something like 1 empty item at index 3.
// this is of type undefined
console.log(notSelectedColors);
console.log(typeof notSelectedColors[3]);
console.log(notSelectedColors.length);

// function greet(){
//     console.log('good evening sir');
// }
// greet();

function greet(name){
    console.log('good evening ' + name + ' sir');
}

greet("Ved");

// this function calculates something so we need to return something
function square(number){
    return number*number;
}

console.log(square(5));