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

function createPost(post){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            posts.push(post);
            const error = false;
            if(!error){
                resolve();
            } else {
                reject('Error: Something Went Wrong');
            }
        }, 2000);
    });
}

createPost({"title": 'Post Four', "body": 'This is post four'})
.then(getPosts)
.catch(err => console.log(err));

function delayAnAction(ms){
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Async Await
async function init() {
    await delayAnAction(5000);
    console.log("5 seconds are completed");
    await createPost({"title": 'Post Five', "body": 'This is post five'}).then(getPosts);
    console.log('This line is executed before the await is finished.')
    getPosts();
}

init();
setTimeout(() => console.log('This line I put after init function.'), 3000);

// // Random Extra
// const promise1 = Promise.resolve("Hello World");
// const promise2 = 10;
// const promise3 = new Promise((resolve, reject) => {
//     setTimeout(resolve, 2000, 'Goodbye');
// });

// const promise4 = fetch('https://jsonplaceholder.typicode.com/users')
// .then((response) => response.json());

// Promise.all([promise1, promise2, promise3, promise4])
// .then((values) => console.log(values));