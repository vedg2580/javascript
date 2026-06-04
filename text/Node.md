What exactly is Node.js?
Before Node.js, JavaScript could run only in browser: Chrome, Firefox, etc. Mostly frontend.
Then came Node.js, Now JS can run: On your computer, On servers, In backend applications, etc.
JavaScript is a Language, Node.js is Engine/runtime that executes JS outside browser.

What is npm?
npm = node package manager
Used to: install libraries, manage dependencies
Imagine you want to build a backend, You need: Express, MongoDB Library, Authentication Library, Password Hashing Library. We don't want to spend our time on writing all these libraries from scratch so we just install them. That is where npm comes into picture.

npm is like playstore for backend packages
example: Express, MongoDB library, JWT auth library

when we do
module.exports = add;
I am saying, I'm making this function available to other files.
This is the thing I want to expose from this file.
and when in app.js we do
const addHere = require('./math');
I am saying, Go to math.js and give me whatever it exported.
Load that file and give me whatever it exported.

Real life analogy
I created a toolbox with hammer in it.
in app.js we say Bring me the hammer from toolbox. and then we use it.


When we do
npm init -y
npm created a file named package.json
Think of this file as an identity card of your project.

package.json
package.json does not contain code. It contains project metadata, dependencies, scripts, configuration.
Lets decode my package.json
PS D:\Workspace\Programming Workspace\2026\JavaScript> npm init -y
Wrote to D:\Workspace\Programming Workspace\2026\JavaScript\package.json:

{
  "name": "javascript",
  "version": "1.0.0",
  "description": "This repository I will use to keep track of my JavaScript learnings.",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "repository": {
    "type": "git",
    "url": "git+https://github.com/vedg2580/javascript.git"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "type": "commonjs",
  "bugs": {
    "url": "https://github.com/vedg2580/javascript/issues"
  },
  "homepage": "https://github.com/vedg2580/javascript#readme"
}

"name": "javascript"
project name; later if you publish package to npm, this becomes its name.
For now its just the project's identifier.

"main": "index.js"
This tells node 'This is the default entry file'
If somebody imports your project (using require('my-project-name')), node will look at index.js

"scripts": {
  "test": "echo \"Error: no test specified\" && exit 1"
}
instead of typing: node app.js
we can just do: 'npm start' OR 'npm run dev' using scripts

"repository": {
  ...
}
has github information

"keywords": []
Used when publishing packages.

"author": ""
Package creator.

`"type": "commonjs"`
when we do: `const add = require("./math");` This is called CommonJS. This is Node's older module system.
Because: `"type": "commonjs"` node allows `require(...)` AND `module.exports`
Later we'll learn `import` and `export` which is a newer sytem.

