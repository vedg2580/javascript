### JavaScript is a programming language

A programming language is simple a set of rules used to write instructions for a computer. eg. JavaScript, Java, Python, C++

### Node.js is a runtime

A runtime is an environment that executes code written in a language. JVM is a runtime for Java. For JS chrome's v8 engine is a runtime in browser and node.js is a runtime outside browser.

### Express.js is a framework

A framework provides a predefined structure and control flow for building applications.
Ready-made blueprint.

### gcc, javac are compiler

A compiler converts source code into machine code before execution.
For Js no compilation is needed morden JS engines do JIT compilation

### Interpreter

Reads code and executes line by line

### Scripting Language

A scripting language was designed primarily for automation and execution inside another environment.
Language that was originally meant to automate tasks.

### API

API is just a contract defining how software components communicate.
API just boils down to a function call at the end.

```javascript
const express = require("express");
const app = express();

app.get("/", (request, response) => {
  response.send("Hello Ved Brother");
});

app.listen(3000, () => {
  console.log("server is running");
});
```

### understanding every line

- importing express
  `const express = require('express');`

- creating a server object
  `const app = express();`

- Route
  `app.get("/")`
  when somebody visits `/`

- Response
  `response.send("Hello Ved Brother");`
  send this as response

- Listen
  `app.listen(3000)`
  start the server on port 3000

- Routes decide what happens for different urls

```javascript
app.get("/about", (req, res) => {
  res.send("About Page");
});

app.get("/contact", (req, res) => {
  res.send("Contact Page");
});
```

### Request and Response

(req, res)

- req
  incoming request. contains url, parameters, data, etc
- res
  outgoing response. Used to send text, send JSON, send status codes, etc.

### Send JSON

Most backend APIs return JSON
Frontend and Backend communicate using JSON all the time.

```javascript
app.get("/first_page", (request, response) => {
  response.json({
    text: "this is the first page",
    page_number: 1,
  });
});
```

### Route Parameters

```javascript
app.get("/users/:id", (request, response) => {
  response.send(request.params.id);
});
```

### Query Parameters

```javascript
app.get("/search", (request, response) => {
  response.send(request.query.name);
});
```

when we visit `/search?name=Ved`
the above route gets called

When user sends

```javascript
{
    "company": "Google",
    "status": "Applied"
}
```

This data arrives to backend in request body.

### `app.use(express.json());`

We have to use `app.use(express.json());` line before express can read JSON.
so full setup will look something like this:

```javascript
const express = require("express");
const app = express();
app.use(express.json());
```

- Why is `app.use(express.json())` is needed?
  Without it `req.body` will be `undefined`

```javascript
app.post("/jobs", (req, res) => {
  console.log(req.body);
  res.send("Job Received");
});
```

so when user sends

```javascript
{
    "company": "Google"
}
```

we can access it using `req.body.company`

### Middleware

A middleware is a function that runs during the request-response cycle and usually calls `next()` to pass control to the next middleware or route handler.

```javascript
app.use((req, res, next) => {
  console.log("Request received");
  next();
});
```

Here, the middleware logs a message and then lets Express continue processing the request.

### route handler

A route handler is the function that handles a specific route and typically sends the final response.

```javascript
app.get("/home", (req, res) => {
  res.send("Welcome Home");
});
```

#### request flow example

```javascript
app.use((req, res, next) => {
  console.log("Middleware 1");
  next();
});
app.use((req, res, next) => {
  console.log("Middleware 2");
  next();
});
app.get("/", (req, res) => {
  res.send("Hello");
});
```

When you visit /, Express runs:
Middleware 1
↓
Middleware 2
↓
Route Handler
↓
Response sent

## Request Object

various methods that can be used on `req` object

- `req.baseUrl`
  gives the URL path on which a router instance was mounted

- `req.body`
  contains key-value pair of data submitted in the request body. By default, it is `undefined`, and is populated when you use body-parsing middleware such as `express.json()`.

- `req.host`, `req.hostname`
  Contains the host, hostname derieved from the `Host` HTTP header

- `req.params`
  this is an object which contains parameters we send in url. eg `/user/:id`. `id` is send in params object and we can access it using `req.params.id`.

- `req.query`
  when then url looks like this `/search?name=Ved+bro&role=developer` then we can access the parameters `name` and `role` using `req.query.name` and `req.query.role`.

- `express.json([options])`
  It parses incoming requests with JSON payloads. We have to do `app.use(express.json());` in order to do `req.body` and access various keys sent from frontend by user.
  `[options]` is optional.

## Response Object

the `res` object represents the HTTP response that an Express app sends when it gets an HTTP request.

- `res.cookie(name, value[, options])`
  sets cookie `name` to `value`. The `value` parameter may be a string or object converted to JSON.
  This sends a `Set-Cookie` header to the browser:
  `Set-Cookie: username=john`
  `[,options]` is optional.
  the `[,options]` object. It will have keys such as `maxAge` of Number data type, or `expires` which we have to send a Date.

- `res.download(path [, filename] [, options] [, callback function])`
  It is used to send a file to a client as an attachment, which typically triggers the browser's download dialog.
  By default the `Content-Disposition` header `filename=` parameter is derived from the path argument, but can be overridden with the `filename` parameter.

- `res.json([body])`
  sends a JSON response. The parameter can be of any JSON type, including object, array, string, Boolean, number, or null.

- `res.redirect([status,] path)`
  Redirects to the URL derived from the specified `path`, with specified `status` (http status codes like 404, 200, 302, 500 etc. default status is 302 i.e found).

- `res.sendStatus(statusCode)`
  Sets the response HTTP status code to `statusCode`, and sends the registered status message as the text response body.

- `res.end([data [, encoding]] [, callback])`
  Ends the response process without any data.

- `res.status(code)`
  chainable alias of sendStatus.
  eg. `res.status(200).end();`, `res.status(404).json({"message": "Not Found"});`
