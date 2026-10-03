# Zod Basics

### What is a Schema?

A schema is a formal blueprint or structure that defines the shape, type, constarints and rules of data.

Example:
User Schema

```md
Name: String
DOB: Date
Email: String
Password: String
```

### What is Schema Validation?

Schema validation is the process of verifying that incoming data matches the predefined schema before the application processes it.
Schema validation simply asks 'does the incoming data conform to the Schema?'

Example:
if user sends `email: 12345` this should fail. Hence we need schema validation

### Why Zod Exists?

Zod is a Typescript-first schema declaration and validation library used to define, validate, and infer the shape of JavaScript objects at runtime.

So insted of writing same validation logic 1000s of time we write it once and we put it in zod validation middleware so every request effectively goes through it. Thus it is easier to change also.

- Runtime Validation
  When does JavaScript know some parameter (say `company`) is missing? It doesn't actually. JavaScript is dynamically typed. It will happily accept `const company = undefined`. No error until runtime. (Runtime means while the program is executing).

  Runtime Validation is the process of validating data while the application is executing, before using the data in business logic.

- Type Saftey
  Type Saftey is the assurance that data confroms to its expected type before it is used.

### Creating Schema

import
`const { z } = require('zod');`

`z` is the library namespace.

Now we can use it like:
`const nameSchema = z.string();`
This means create a schema that accepts only strings.
`nameSchema` expects a string.

Now when we do `nameSchema.parse("Ved");` it returns success. But `nameSchema.parse(25);` throws an error.

The schema is reusable. Anywhere.

### parse()

`parse()` validates the input against a schema and throws an exception if validation fails.

`schemaName.parse(data);`
means validate this data according to the schema.

example:
`z.string().parse("Ved");`
returns "Ved"
but
`z.string().parse(25);`
throws `ZodError`

### safeParse()

`safeParse()` validates the input without throwing exceptions and returns a result object indicating success or failure.

Validation erros should not crash our backend. That is bad API Design.
So `schemaName.safeParse(data);`
returns

```json
{
    success: true,
    data: ...
}
```

Or

```json
{
    success: false,
    error: ...
}
```

sample usage:

```js
schemaName.safeParse(req.body);
if (!result.success) {
  // do something
}
```

### Primitives

- String
  `z.string()`

- Number
  `z.number()`

- Boolean
  `z.boolean()`

- Date
  `z.date()`

- BigInt
  `z.bigint()`

- Literal
  `z.literal("Applied")`
  means only 'Applied' is valid.

### Object Schema

example:

```js
const jobSchema = z.object({
  company: z.string(),
  status: z.string(),
});
```

The above example means that A Job must have a company and status. If any of the parameters is missing then it will throw an error.

```js
jobSchema.parse({
  company: "Google",
  status: "Applied",
});
```

We can also nest object schemas.
example:

```js
user: z.object({
  name: z.string(),
  age: z.number(),
});
```

### Arrays

`skills: z.array(z.string())`
means array of strings.

### Enum

Enumerator
`status: z.enum(["Applied", "Selected", "Rejected"])`
so if user sends "Pending" it gets rejected.
This is much cleaner and usable than multiple `if else`

### Optional Fields

`phone: z.string().optional()`
This means Phone number is optional but if present it should be a string

### Default Values

`status: z.string().default("Applied")`
If user sends nothing, Zod inserts 'Applied' automatically.

### Where does Zod fit?

```md
Request

↓

Authentication

↓

Validation (Zod)

↓

Controller

↓

Database
```

Now controller becomes more clear. As it assumes that the data is already valid.

- Why is if(...) not scalable?
  Manual validation is not scalable because validation logic becomes duplicated across multiple endpoints, making maintenance difficult, increasing the probability of inconsistencies, and violating the DRY (Don't Repeat Yourself) principle.

- Why is a schema reusable?
  A schema becomes reusable because it centralizes validation rules in a single location, allowing multiple components to share the same data contract.

- Why is validation placed before the controller?
  Controllers should focus on Business Logic. NOT Validation. This follows another engineering principle.
  Single Responsibility Principle (SRP)
  One class, One function, One module, One responsibility.

Controllers shouldn't also become validators.

- If Mongoose already validates, why introduce Zod? Wouldn't that be duplicate validation?
  To detect errors early. (Fail Fast Principle)
  Fail Fast Principle means detecting and rejecting invalid input as early as possible before expensive operations are performed.
- Would you use parse() or safeParse() for an Express API?
  I prefer safeParse() because it returns a predictable result object, making API error handling simpler and avoiding exception-based control flow for expected validation failures.

### string

- `z.string()`: the value should be a string
- `z.string().min(3).max(8)`: string of min 3 length and maximum 8 length
- `z.string().length(10)`: exact length should be 10
- `z.string().email()`: only allows email
- `z.string().url()`: for url
- `z.string().uuid()`: for uuid
- `z.string().regex()`: custom patterns
- `z.string().trim()`: trims trailing and leading spaces
- `z.string().toLowerCase()`: converts string to **lowercase**
- `z.string().toUpperCase()`: converts string to **UPPERCASE**

### number

- `z.number()`: value should be a number
- `z.number().positive()`: the number should be > 0
- `z.number().negative()`: the number should be < 0
- `z.number().int()`: the number should be an **Integer**
- `z.number().min(18).max(60)`: 18 <= number => 60

### boolean

- `z.boolean()`: allows only boolean values
  generally used for flags

### object

- `z.object({name: z.string(), age: z.number().max(100)})`: allows only objects

### array

- `z.array(z.string())`: allows only arrays of a certain datatype (in this case array of strings)

### nullable

- `z.string().nullable()`: allows null values

### refine

- `z.string().refine(...)`: It just means I have my own custom rule

- **Imperative progamming**
  Imperative Programming describes how a task should be performed through explicit instructions
  example: `if`, `else`, `for`, `while`

- **Declarative Programming**
  Declarative Programming describes what the desired outcome is without specifying every execution step
  example: sql, html, css, zod

## Cross field validation

consider this scenario: In our jobTracker if the passwordRequired is true then we should make the passwordUsed field mandatory. And when the passwordRequired field is false at that time passwordUsed field should not contain any value.
Since we need some kind of relationship between two fields we are going to use **cross field validation**.
**Cross field validation** is the validation where the validity of one field depends on the value or presence of another field in the same data object.
examples:

```md
    password === confirmPassword
    startDate <= endDate
    minPrice <= maxPrice
    passwordRequired -> passwordUsed Required
```

This is where we use `.refine()` method.
Refinement functions should never throw. Instead they should return a falsy value to signal failure. Thrown errors are not caught by Zod.

In Zod `.refine()` takes two main arguments:

```js
    schema.refine(check, options?)
```

1. `check`
   A function that receives the parsed value and returns a truthy/falsy value:

```js
z.string().refine((value) => value.length >= 8);
```

2. `options?` (optional)
   An object describing the validation error:

```js
z.string().refine((value) => value.length >= 8, {
  message: "Password must be at least 8 characters",
});
```

example with an object schema:

```js
const schema = z
  .object({
    password: z.string(),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
```

Here:

- `data` -> the entire parsed object
- `message` -> validation error message
- `path` -> tells Zod which field the error should be associated with

So for our problem requirement

```js
    .refine((job) => {
        if(job.passwordRequired === true){
            return !!job.passwordUsed;
        }

        return !job.passwordUsed;
    })
```

With this we are enforcing:

```md
    true + password -> allowed
    true + no password -> not allowed
    false + password -> not allowed
    false + no password -> allowed
```

When we do `.refine(...)`
Zod will know that the entire object failed the refinement.
But we want the API response to tell the client:

> `passwordUsed` is required when passwordRequired is true

So we can specify:
```js
.refine(
    (job) => {
        if(job.passwordRequired) return !!job.passwordUsed; 
        return !job.passwordUsed;
    },
    {
        message: "passwordUsed is required when passwordRequired is true",
        path: ["passwordUsed"]
    }
);
```
but the above messages describes only one direction. (i.e passwordUsed === true then passwordRequired is required)

but If we have
```md
passwordRequired = false
passwordUsed = "some_password_1"
```
the messages isn't quite right.
In such a case a more precise implementation can be done using `superRefine()`.

## superRefine()
`superRefine()` is used when we need more control over the custom validation and potentially need to add one or more detailed issues to specific paths.

Basic syntax:
```js
schema.superRefine((value, ctx) => {
    if(some_validation_logic){
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "something is wrong",
            path: ["some path"];
        });
    }
});
```

The callback receives two parameters:
`(value, ctx)`
* value -> the already-parsed value
* ctx -> refinement context, which lets you add validation issues

So for our refinement problem:
```js
const jobSchema = z.object({
    company: z.string().trim().min(2),
    status: z.enum(JOB_STATUS),
    emailUsed: z.email().trim(),
    passwordRequired: z.boolean(),
    passwordUsed: z.string().trim().min(1).optional()
}).superRefine((value, ctx) => {
    if(job.passwordRequired && !job.passwordUsed) {
        ctx.addIssue({
            code: "custom",
            path: ["passwordUsed"],
            message: "passwordUsed needs to be present when passwordRequired is true"
        });
    }

    if(!job.passWordRequired && !!job.passwordUsed){
        ctx.addIssue({
            code: "custom",
            path: ["passwordUsed"],
            message: "passwordUsed should not be provided when passwordRequired is false"
        });
    }
});
```

* Don't pass raw `req.query` into mongodb. Instead create a filter. whitelist only the query params you want and then pass that filters object into mongodb.

## `.pick()`
means take these fields from the existing schema and make a new schema.
example:
```js
userSchema.pick({
  username: true,
  password: true
});
```