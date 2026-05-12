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

Asynchronus is when something is going on but you don't want to wait till it finishes. You want to do other things while that thing finishes.
Asynchronus programming is relevant to Js because we'll often make requests to server for some data which will take a couple of seconds but we wont want our program to wait.

setTimeout(callback, timeInMs, arg1, arg2...);
setTimeout takes atleast two arguements, first one is a function and second is time and the following are arguements that you want to pass to the callback. This time is used to delay the execution of the function by the given amount of time. So the function will start executing after given time. 
Here's soemthing interesting about setTimeout function
function greet(firstName, lastName){
    console.log(`hello ${firstName} ${lastName}`);
}

1. setTimeout(greet('Ved', 'G'), 1000);
2. setTimeout(greet, 1000, 'Ved', 'G');
3. setTimeout(() => greet('Ved', 'G'), 1000);
4. setTimeout((firstName, lastName) => console.log(`hello ${firstName} ${lastName}`), 1000, 'Ved', 'G');

1. setTimeout(greet('Ved', 'G'), 1000);
Js starts reading arguments from left to right before invocation. so greet('Ved', 'G') is evaluated first.
The Js interprets it as CallExpression and thus the function call gets executed immediately. and the delay we use in this is useless

2. setTimeout(greet, 1000, 'Ved', 'G');
When Js starts reading left to right here it gets a FunctionReference. Host environment in this case gets and stores {callback: greet, args: ['Ved', 'G'], delay: 1000}.
So setTimeout in this case works as expected.

3. setTimeout(() => greet('Ved', 'G'), 1000) &&
4. setTimeout((firstName, lastName) => console.log(`hello ${firstName} ${lastName}`), 1000, 'Ved', 'G');
When Js starts reading from left to right it creates an arrow function but it does not get executed. and the setTimeout works as expected.


Callbacks:
Lets take an example
const posts = [
    {"title": 'Post One', "body": 'This is post one'},
    {"title": 'Post two', "body": 'This is post two'},
];

function getPosts(){
    setTimeout(() => {
        let output = '';
        posts.forEach((post, index) => {
            output += `<li>${post.title}</li>`
        })
        document.getElementById('all_posts').innerHTML = output;
    }, 1000)
}

getPosts();

function createPost(post){
    setTimeout(() => {
        posts.push(post);
    }, 2000);
}

createPost({"title": 'Post Three', "body": 'This is post three'});

as you can figure out the 'Post Three' wont be visible on screen as createPost got triggered later (but in case of real apis think createPost request returned later than getPost)
So this is how we work around it:
// note: callback in the below code is just a variable name we can name it anything
function createPost(post, callback){
    setTimeout(() => {
        posts.push(post);
        callback();
    }, 2000);
}

createPost({"title": 'Post Three', "body": 'This is post three'}, getPosts);


Promise:
The promise takes in a callback as its first parameter. In this example the arrow function is a callback. this callback takes two parameter resolve and reject. If you want to resovle a promise. you call resolve. if something goes wrong you reject the promise;
Since promise is returned we can now do .then and .catch
.then() and .catch() both take a callback (callback means a function call) as its first arguement
the callback in .then() will be executed when the promise is resolved
the callback in .catch() will be executed when the promise is rejected

function createPost(post){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            posts.push(post);
            const error = false; // this is just simulation. usually we'll do some error checking
            if(!error){
                resolve();
            } else {
                reject('Error: Something Went Wrong');
            }
        }, 2000);
    });
}

createPost({"title": 'Post Four', "body": 'This is post four'})
.then(getPosts) // here getPosts is a callback. we could also put another callback here. or an arrow function also works.as long as it is a callback it works
.catch(err => console.log(err));

Async/Await
we can use await only inside a async function
function delayAnAction(ms){
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Async Await
async function init() {
    await delayAnAction(5000);
    console.log("5 seconds are completed");
    await createPost({"title": 'Post Five', "body": 'This is post five'}).then(getPosts);
    console.log('This line is executed before the await is finished.');
    getPosts();
}

init();
setTimeout(() => console.log('This line I put after init function gets executed first'), 3000);

the await waits for the given line to be executed only after that it will allow the rest of the code below it to get executed. So in the example above when we call init function and the execution reaches the line `await delayAnAction(5000);` the execution of init function pauses on that line and everything below it is not executed. meanwhile when the init() pauses anything below the init() gets executed. so this `console.log('This line is executed before the await is finished.');` line gets executed before this `console.log("5 seconds are completed");` line.
