function add(a, b){
    return a+b;
}

// module.exports = add;

const name = "Dev"

// module.exports = name;

const user = {
    name: 'Ved',
    age: 24
};

// module.exports = user;

function multiply(a, b){
    return a*b;
}

module.exports = {
    add,
    multiply, 
    name,
    user
};