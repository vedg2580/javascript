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

