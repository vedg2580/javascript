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

// let currentAge = prompt('Enter your current age');

if(person.age > 18){
    console.log("Get a driving licencse already bro");
} else {
    console.log("you are under age please don't drive");
}

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
let i = 0;
while(i < 10) {
    console.log(++i);
}

const newArray = [1, 2, 3];
console.log(newArray);
// below line throws an error
// newArray = [10, 20, 30];
// but here's how to bypass this and still mutate the array
// newArray[0] = 10;
// newArray[1] = 20;
// newArray[2] = 30;
// here's how to stop it from being mutated completely
// use Object.freeze(objectName);
Object.freeze(newArray);
// now the below line will not throw an error but the value will also not be changed
newArray[0] = 10;
console.log(newArray);

// arrow function
let additionResult = (a, b) => {
    return a + b;
};

// function call
console.log(additionResult(242, 346));

const integerArray = [1, -23, 22, 3, 45, -34, -3];
// lets write a method to return an array of squares of all positive integers from integerArray
const squareList = (arr) => {
    return arr.filter(element => element > 0 && Number.isInteger(element)).map(element => element*element);
}

console.log(squareList(integerArray));

const isEven = (a) => {return a%2===0;}
console.log(isEven(45));
console.log(isEven(44));

console.log(notSelectedColors);

const addArrayElements = (arr) => {
    let initialValue = 0;
    return arr.reduce((accumulator, currentValue) => accumulator + currentValue, initialValue);
};

const maxElementInArray = (arr) => {
    let initialValue = arr[0];
    return arr.reduce((accumulator, currentValue) => Math.max(currentValue, accumulator), initialValue);
};

integerArray.push(100);
integerArray.pop();

console.log(integerArray);
console.log('all elements addition ' + addArrayElements(integerArray));
console.log(`max value from integerArray ${maxElementInArray(integerArray)}`);
