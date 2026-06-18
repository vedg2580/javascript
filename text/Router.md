Express.Router() is a modular, mountable route handler.
Express Router lets you split routes into separate files.

When the app grows:
```javascript
app.get("/users", ...)
app.post("/users", ...)
app.get("/users/:id", ...)

    app.get("/products", ...)
    app.post("/products", ...)
    app.get("/products/:id", ...)

    app.get("/orders", ...)
    app.post("/orders", ...)
    ```
    soon app.js becomes 1000+ lines long. This is where Express router helps.

    When we have router:
    users.routes.js
    ```javascript
    const router = express.Router();
    router.get("/", getUsers);
    router.post("/", createUsers);
    router.delete("/:id", deleteUser);
    module.exports = router;
    // getUser, createUser, deleteUser are callbacks defined somewhere
    ```
    app.js
    ```javascript
    const userRoutes = require("./user.routes");
    app.use("/user", userRoutes); // read as for any requests starting with /users, hand control to userRoutes
    ```
    Now:
    ```markdown
    GET /users
    ```
    maps to:
    ```js
    router.get("/");
    ```
    because `/users` was already attached in `app.use();`.
