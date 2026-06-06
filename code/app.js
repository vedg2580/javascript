console.log("Hello from Node");

const name = "Ved";
console.log("Hello " + name);

const a = 10;
const b = 20;
console.log(a+b);

for(let i = 0; i < 6 ; i++){
    console.log(i);
}

// const addHere = require('./math');
// console.log(addHere(10, 20));

// const data = require('./math');
// console.log(data);

// const user = require('./math');
// console.log(user.name);
// console.log(user.age);

const math = require('./math');
console.log(math.add(10, 20));
console.log(math.multiply(10, 20));
console.log(math.name);
console.log(math.user);
console.log(math.user.age);
console.log(math.user.name);

const cowsay = require('cowsay');
console.log(cowsay.say({text: "Hello Ved"}));

