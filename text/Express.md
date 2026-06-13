JavaScript is a programming language
A programming language is simple a set of rules used to write instructions for a computer. eg. JavaScript, Java, Python, C++

Node.js is a runtime
A runtime is an environment that executes code written in a language. JVM is a runtime for Java. For JS chrome's v8 engine is a runtime in browser and node.js is a runtime outside browser.

Express.js is a framework
A framework provides a predefined structure and control flow for building applications.
Ready-made blueprint.


gcc, javac are compiler
A compiler converts source code into machine code before execution.
For Js no compilation is needed morden JS engines do JIT compilation

Interpreter
Reads code and executes line by line

Scripting Language
A scripting language was designed primarily for automation and execution inside another environment.
Language that was originally meant to automate tasks.

API
API is just a contract defining how software components communicate.
API just boils down to a function call at the end.

const express = require('express');
const app = express();

app.get("/", (request, response) => {
    response.send("Hello Ved Brother");
});

app.listen(3000, () => {
    console.log("server is running");
});

understanding every line
importing express
`const express = require('express');`

creating a server object
`const app = express();`

Route
`app.get("/")`
when somebody visits `/`

Response
`response.send("Hello Ved Brother");`
send this as response

Listen
`app.listen(3000)`
start the server on port 3000

Routes decide what happens for different urls
app.get("/about", (req, res) => {
  res.send("About Page");
});

app.get("/contact", (req, res) => {
  res.send("Contact Page");
});


Request and Response
(req, res)
req
incoming request. contains url, parameters, data, etc
res
outgoing response. Used to send text, send JSON, send status codes, etc.

Send JSON
Most backend APIs return JSON
Frontend and Backend communicate using JSON all the time.
app.get("/first_page", (request, response) => {
    response.json({
        text: "this is the first page",
        page_number: 1
    });
});

Route Parameters
app.get("/users/:id", (request, response) => {
    response.send(request.params.id);
});

Query Parameters
app.get("/search", (request, response) => {
    response.send(request.query.name);
});
when we visit /search?name=Ved
the above route gets called
