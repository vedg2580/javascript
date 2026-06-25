# JWT

JSON web tokens
used for authentication
we send a payload, we get a token. We use this token everytime we request something that requires authentication.

`npm install jsonwebtoken`

auth.js

```js
const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader)
    return res.status(401).json({ message: "No Token Provided" });

  try {
    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, "SECRET_KEY");

    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid Token" });
  }
};

module.exports = auth;
```

auth.js has a middleware function called auth. we pass this function whenever we want only authenticated user to access.

`jwt.verify` method decodes the token to the original payload using secret key

`jwt.sign` method converts a payload to token using the same secret key

```js
const auth = require("../middelware/auth");
router.get("/", auth, async (req, res) => {
  try {
    const jobs = await Job.find(req.query);
    return res.json(jobs);
  } catch (error) {
    console.error(error);
    return res.sendStatus(500);
  }
});
```

so when the route handler gets request it first passes it to the auth middleware. Then the auth middleware passes it back to route handler's handler function using the `next()` method.

The normal flow is:
user logs in using username and password
we authenticate if the combination is correct or not. When it is correct we send a JWT and the frontend keeps this token somewhere in local storage. And when the user wishes to do something that requires authentication it sends this token in the request headers under authorization property. Backend will have an auth middleware which will decode and check if the provided token is valid. If it is action is allowed otherwise unauthroized access is sent as response.
