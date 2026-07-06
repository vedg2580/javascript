HTTP
HyperText Transfer Protocol, simply put is a language that two computers use to communicate.

# REST
REST is an architectural style.
REST tries to make APIs simple, predictable, consistent. 

`GET` means read
`POST` means create
`PUT` means replace
`PATCH` means partial update
`DELETE` means destroy

REST Constraint 1: Statelessness
after a request is processed and response is sent the server should forget about that previous request. It should not carry context of that request. so every request must contain everything necessary for that request to be processed successfully.
Instead of remembering a user just send the token everytime.
Different request goes to different servers and if context of first server is required then everything breaks, this is the reason statelessness is required.

SAFE METHODS
GET method should always only be used for read operations and not any other operations like create, delete or update.
llry other methods should only do task they are meant to do and nothing else. 

RESTful web API implementation is a web API that employs Representational State Transfer (REST) architectural principles to achieve a stateless, loosley coupled interface between a client and service.

* Idempotency
    When we do `DELETE /users/12`
    It deletes user 12.
    Again if we call the same endpoint nothing happens.
    It is idempotent

    When we do `POST /users`
    Three times create three users
    Not Idempotent

    When we do `PUT /users/12`
    same request 100 times even then the final state remains the same. This is Idempotent.

    When we do `GET`
    1000 times nothing changes. This is idempotent.

    Basically an action performed should not affect the concerned thing more than once. This is Idempotency.

* REST Request Lifecycle
```md
Client

↓

POST /jobs

↓

Express Route

↓

Authentication

↓

Validation

↓

Controller

↓

MongoDB

↓

Response
```

* API Contract
API Contract is an agreement between frontend and backend which standardises communication between them. We'll have a basic set of rules about how frontend and backend will talk and respond to each others.

* REST says 'Represent everything as a resource, Identify them with URIs, manipulate them using standard HTTP methods, and keep requests stateless.'