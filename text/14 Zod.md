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

* Runtime Validation
    When does JavaScript know some parameter (say `company`) is missing? It doesn't actually. JavaScript is dynamically typed. It will happily accept `const company = undefined`. No error until runtime. (Runtime means while the program is executing).

    Runtime Validation is the process of validating data while the application is executing, before using the data in business logic.

* Type Saftey
Type Saftey is the assurance that data confroms to its expected type before it is used.

### Creating Schema
import
`const { z } = require('zod');`

`z` is the library namespace.

Now we can use it like:
`const nameSchema = z.string();`
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
if(!result.success){
    // do something
}
```

### Primitives
* String
`z.string()`

* Number
`z.number()`

* Boolean
`z.boolean()`

* Date
`z.date()`

* BigInt
`z.bigint()`

* Literal
`z.literal("Applied")`
means only 'Applied' is valid.

### Object Schema
example:
```js
const jobSchema = z.object({
    company: z.string(),
    status: z.string()
});
```
The above example means that A Job must have a company and status. If any of the parameters is missing then it will throw an error.
```js
jobSchema.parse({
    company: "Google",
    status: "Applied"
});
```
We can also nest object schemas.
example:
```js
user: z.object({
    name: z.string(),
    age: z.number()
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

* Why is if(...) not scalable?
    Manual validation is not scalable because validation logic becomes duplicated across multiple endpoints, making maintenance difficult, increasing the probability of inconsistencies, and violating the DRY (Don't Repeat Yourself) principle.

* Why is a schema reusable?
    A schema becomes reusable because it centralizes validation rules in a single location, allowing multiple components to share the same data contract.

* Why is validation placed before the controller?
    Controllers should focus on Business Logic. NOT Validation. This follows another engineering principle.
    Single Responsibility Principle (SRP)
    One class, One function, One module, One responsibility.

Controllers shouldn't also become validators.
* If Mongoose already validates, why introduce Zod? Wouldn't that be duplicate validation?
    To detect errors early. (Fail Fast Principle)
    Fail Fast Principle means detecting and rejecting invalid input as early as possible before expensive operations are performed.
* Would you use parse() or safeParse() for an Express API?
    I prefer safeParse() because it returns a predictable result object, making API error handling simpler and avoiding exception-based control flow for expected validation failures.