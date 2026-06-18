# Middleware
Express is a routing and middleware web framework that has minimal functionality of its own: An Express app is essentially a series of middleware function calls. 

Middleware functions are the functions that have access to the request object (`req`), the response object (`res`), and the next middleware function in the application's request-response cycle. The next middleware function is commonly denoted by a variable named `next`.

Middleware functions can perform the following tasks:
- Execute any code
- Make changes to the request and the response objects
- End the request-response cycle
- Call the next middlware function in the stack

If the current middleware function does not end the request response cycle, it must call `next()` to pass control to the next middleware function. Otherwise the request will be left hanging.

### Types of middlware
- Application-Level Middleware
- Router-Level Middleware
- Error-handling Middleware
- Built-in Middleware
- Thirdy-party Middleware

* Middleware is simply a function that runs between receiving a request and sending a response.
When express receives a request, that request can pass through multiple middleware functions before reaching your route handler.

```javascript
app.use((req, res, next) => {
    console.log("Request received");
    next();
});

app.get("/", (req, res) => {
    res.send("Hello");
});
```

### Why do we need Middleware?
Without middleware:
```javascript
app.get("/users", ...);
app.get("/products", ...);
app.get("/orders", ...);
```
you would repeat some code pieces everywhere:
```javascript
app.get("/users", ...);
app.get("/products", ...);
app.get("/orders", ...);
```
Middleware lets you write it once:
```javascript
app.use(checkAuth);
app.use(logRequest);
```
Now every request automatically goes through them.

- Middleware can inspect, modify, block, or forward requests before they reach the route handler.
- Common use cases include authentication, logging, validation, error handling, and request parsing.

## **1. Application-level middleware**
These are middleware attached directly to the Express application (i.e. bind to an instance of app object by using the app.use() and app.METHOD() functions. METHOD is GET, POST, PUT in lowercase).

- Middleware function with no mount path. 
    ```javascript
    const express = require('express');
    const app = express();

    app.use((req, res, next) => {
        console.log("Time: ", Date.now());
    });
    ```
    This function is executed **everytime** the app recieves a request.

- Middleware function mounted on the `/user/:id` path.
    ```javascript
    app.use('/user/:id', (req, res, next) => {
        console.log("Request Type: ", req.method);
        next();
    });
    ```
    This function is executed for any type of HTTP request on the `/user/:id` path.

- Route and its handler function(middleware system).
    ```javascript
    app.get('/users/:id', (req, res, next) => {
        res.send('Hello User');
    });
    ```
    flow goes like this:
    Request `GET /users`

    Execution:
    ```markdown
    Request
    ↓
    Application Middleware
    ↓
    Route Handler
    ```

* Real life usage of Application-level Middleware
    Logging, Authentication, Request Timing, Validation, Request parsing and monitoring.

## **2. Router-level Middleware**
Router middleware is used to apply middleware only to a specific group of routes.
Load router-level middleware using the `router.use()` and `rotuer.METHOD()` functions.

Router creation:
```js
const router = express.Router();
```
Router Middleware:
```js
router.use((req, res, next) => {
    console.log("User Router Middleware");
    next();
});
```
Mount Router
```js
app.use("/users", router);
```
Flow:
Request
```md
GET /users/profile
```
Execution
```md
Request
   ↓
Application Middleware
   ↓
User Router Middleware
   ↓
Route Handler
```

But when a request is coming for endpoint `GET /products` User router middleware won't run.

In a real express project, `router.use(someMiddlewareName);` is usually placed inside the router file that owns those routes.
Example project Structure:
```md
src/
├── app.js
├── routes/
│   ├── userRoutes.js
│   ├── productRoutes.js
│   └── orderRoutes.js
├── middleware/
│   └── authMiddleware.js
└── controllers/
    └── userController.js
```
authMiddleware.js
```js
function authMiddleware(req, res, next) {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({
            message: "Unauthorized"
        });
    }

    next();
}

module.exports = authMiddleware;
```
userRoutes.js
This is where you'd typically put `router.use(authMiddleware);`
```js
const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.use(authMiddleware);

router.get("/profile", (req, res) => {
    res.send("User Profile");
});

router.get("/orders", (req, res) => {
    res.send("User Orders");
});

module.exports = router;
```
What happens is `GET /users/profile` -> `authMiddleware` -> `/profile route handler`

App.js
Then you mount the router:
```js
const express = require("express");
const userRoutes = require("./routes/userRoutes");

const app = express();

app.use("/users", userRoutes);
```

We put it in userRoutes.js because every user route might need authentication.
Example:
```js
const express = require('express');
const app = express();
const router = express.Router();

// a middleware function with no mount path. This code is executed for every request to the router
router.use((req, res, next) => {
  console.log('Time:', Date.now());
  next();
});

// a middleware sub-stack shows request info for any type of HTTP request to the /user/:id path
router.use(
  '/user/:id',
  (req, res, next) => {
    console.log('Request URL:', req.originalUrl);
    next();
  },
  (req, res, next) => {
    console.log('Request Type:', req.method);
    next();
  }
);

// a middleware sub-stack that handles GET requests to the /user/:id path
router.get(
  '/user/:id',
  (req, res, next) => {
    // if the user ID is 0, skip to the next router
    if (req.params.id === '0') next('route');
    // otherwise pass control to the next middleware function in this stack
    else next();
  },
  (req, res, next) => {
    // render a regular page
    res.render('regular');
  }
);

// handler for the /user/:id path, which renders a special page
router.get('/user/:id', (req, res, next) => {
  console.log(req.params.id);
  res.render('special');
});

// mount the router on the app
app.use('/', router);
```

** To skip the rest of the router's middleware functions, call `next('router')` to pass control back out of the router instance. **

## ** 3. Built-In Middleware **
Express already ships with some middleware.
Built-in Middleware is provided by Express itself and handles common tasks like JSON parsing, form parsing and serving static files.
`express.json()` is one of the most important built-in middleware.
Without this middleware:
`console.log(req.body);` will just ouput `undefined`.
Why?
Because incoming data is raw bytes. Express doesn't know its JSON.

## ** 4. Third-Party Middleware **
Middleware written by other developers. Installed using npm.
examples: morgan, cors, helmet, compression.
You don't have to reinvent the wheel everytime.

## ** 5. Error-Handling Middleware **
Normal middleware has 3 arguements `(req, res, next)`.
Error-Handling Middleware has 4 arguements `(err, req, res, next)`.
Example:
Route handler
```js
app.get("/", (req, res) => {
    //assuming some error has occured so we throw an error
    throw new Error("Database failed");
});
```
Error Middleware
```js
app.use((err, req, res, next) => {
    console.log(err.message);
    res.status(500).json({
        message: err.message;
    });
});
```
Flow
```md
Request
   ↓
Route Handler
   ↓
Error Occurs
   ↓
Error Middleware
   ↓
Response
```

* A production express backend often looks like: third-party middleware -> built-in middleware -> application-level middleware -> router middleware -> error middleware.
