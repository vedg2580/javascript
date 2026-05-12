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

function createPost(post, callback){
    setTimeout(() => {
        posts.push(post);
        callback();
    }, 2000);
}

createPost({"title": 'Post Three', "body": 'This is post three'}, getPosts);