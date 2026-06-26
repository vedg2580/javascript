* **dotenv**
`npm install dotenv`

Real backend architecture
Request -> Route -> Middleware -> Controller -> Database -> Response

Even better architecture
Request -> Route -> Controller -> Service -> Repository -> Database

* **Controllers**
skinny routes. fat controller.
controllers will have business logic.

* **Centralized Error Handler**
Currently every single route has try, catch, console.error(), and 500 response etc. This is code duplication.
When repository grows you'll have 1000s of try block, 1000s of catch blocks etc. This becomes tedious to maintain.
So, Instead of every route handling its own error, every route forwards the error and one middleware handles all errors.

So what is an error middleware?
just like normal middleware but error middleware has 4 a parameters.
```js
const errorHandler = (err, req, res, next) => {};
```
The `err` tells express that 'This middleware handles errors'.

errorHandler.js
```js
const errorHandler = (err, req, res, next) => {
    console.error(err);
    return res.status(500).json({
        "success": false,
        "message": "Internal Server Error"
    });
};

module.exports = errorHandler;
```

Inside `app.js` At the very bottom put this (after importing obviously):
`app.use(errorHandler);`

But how does express knows how to go there?
currently in the catch block you are writing
```js
console.error(error);
res.sendStatus(500);
```
instead we remove that from catch block and just put:
```js
next(error);
```

Now express starts looking for an error middleware and then it finds `app.use(errorHandler);` and calls `errorHandler(error, req, res, next);`

* **Async Wrapper**
Again the same problem. 1000s of try and catch block. Not a good programming practice.
Why do we need an async wrapper though?
Suppose, this line throws an error:
`await Job.find();`
Who catches this error? No one.
Express (especially Express 4) does not automatically catch rejected promises from async route handlers.
The server may log an unhandled rejection, and your error middleware won't be called unless you forward the error. Thats why we need a wrapper.
Instead of every route handling its own error. We let one function handler error for every route.

Now take a look at async handler:
```js
const asyncHandler = (fn) => {
    return (req, res, next) => {
        Promise.resolve(fn(req, res, next)).catch(next);
    };
};
```

lets break this down line by line
`const asyncHandler = (fn) => {`
This means: asyncHandler accepts another function.

`return (req, res, next) => {`
Instead of returning data, it returns another function.

`Promise.resolve(fn(req, res, next)).catch(next);`
calling `fn(req, res, next)` returns a Promise because its an async function. (The `fn` is asynchronus function).
we wrote controllers with only (req, res) but we are calling fn with (req, res, next). The `next` is unnecessary. Js just ignores extra arguments.
Since the controller we wrote is an async function it will return a promise.
So in `Promise.resolve(fn(req, res, next))` this line tries to resolve a promise. But if it fails for any reason i.e. Promise becomes rejected. It is caught using `.catch(next)`. 
`.catch(error)` means if any error happens call `next(error);`
`next()` means continue.
but
`next(error)` means - stop normal execution and jump directly to Express error middleware.