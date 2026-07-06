Currently we have validations like `if(!req.body.company?.trim())`. When we have many api endpoints we will have to repeat these kind of validations for each endpoint. This is why validation libraries exist.

### Why validation exists?
Suppose the frontend has a field called `Name` and React put a validation saying 'Hey, Minimum length of this field should be 3'.
But the thing is We can still send `name: ""` using postman, python (`requests.post(...)`), cURL, etc. In all these react never gets involved.
**Your backend never knows who send the request**, Backend sees only **HTTP**. **Backend must never trust the client**.

**Never trust the client**
**Frontend validation is just User Experience**
**Backend validation is Security**

### Trust Boundary
Internet -> HTTP request -> Backend
Everything outside your backend is **Untrusted**, everything inside your backend is **Trusted**. The line between those two worlds is called **Trust Boundary**. Every request crossing that boundary must be validated.
Eg. POST /users/signup -> Validate -> Business Logic -> Database.
**Validation happens before business logic. Always.**

### Validation vs Sanitization
Validation asks 'Is this data acceptable?'.
eg. Age -> 25 -> Valid, Age -> -50 -> Invalid, Email -> abc@gmail.com -> Valid, Email -> abc@@gmail -> Invalid.

Sanitization asks 'Should I modify this data?'
eg. "    Ved    " -> "Ved", "APPLE" -> "apple"

Validation says YES/NO.
Sanitization says Lets clean it.

### API Contract
Imagine we have a frontend developer and I am working in backend. Frontend developer asks 'What does your signup API accept?'
We say {name: String, username: String, password: String}
Now he asks 'What happens if username already exists?' I reply `409`. Good.
'What if password is missing?'. I reply `400`. Good.
'What do I get if successful?'. {token: "..."}. 
This is an API Contract.

An API Contract answers: Input, Output, Errors, Status codes, Authentication required?. Everything.
**Backend must never randomly change this contract. Otherwise frontend breaks.**

### Layers
Request -> Validation -> Authentication -> Authorization -> Business Logic -> Database -> Response.

### Schema Validation
Instead of writing many manual validations using `if(...)` everywhere, everytime. We will write one schema. So for every api we can use the same schema. **One source of truth**.

### Where should Validation Happens?
Frontend Validates -> Backend Validates -> MongoDB Validates.
Why three times?
Frontend -> Purpose: User Experience -> Instant Feedback
Backend -> Purpose: Security -> Reject Invalid requests
Database -> Purpose: Last line of defence -> Protect data integrity.

## Zod

## HTTP Response Status Codes
* **200 OK**
The request succeeded

* **201 Created**
The request succeeded, and a new resource was created as a result.
This is typically the response after `POST` requests.

* **202 Accepted**
The request has been received but not yet acted upon.
Intended for cases where anotehr process or server handles the request, or for batch processing.

* **204 No Content**
There is no content to send for this request, but the headers are useful.

* **400 Bad Request**
The server cannot or will not process the request due to something that is perceived to be a client error (e.g., malformed request syntax, invalid request message framing, deceptive request routing etc.)

* **401 Unauthorized**
Means unauthenticated. The client must authenticate itself to get the requested response.
Clients Identity is not known to the server.

* **403 Forbidden**
The client does not have access rights to the content; that is, it is unauthorised, so the server is refusing to give the requested response.
Here the clients identity is known to the server. 

* **404 Not Found**
The server cannot find the requested resource. In browser, this means the url is not recognied.
In an API, this can also mean that the endpoint is valid but the resource itself does not exist.

* **422 Unprocessable Content**
The request was well-formed but was unable to be followed due to semantic errors.

* **500 Internal Server Error**
The server has encountered a situtation it does not know how to handle. 