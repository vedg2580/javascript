# Mongoose
Express doesn't directly communicate with MongoDB
so we use a communicator called Mongoose.
Mongoose.js is a Javascript Library used with Node.js to work with MongoDB Databases more easily.
It acts as an ODM (Object Data Modelling) tool, which means it helps you define the structure of your data and interact with MongoDB using Javascript objects instead of raw database queries.

We were doing `jobs = []` but this is not a good way to store data since the array exists in memory and all the data stored in jobs will be lost once the program finishes executing. That is why we store data in a permanent store like MongoDB.

We first create a database connection.
db.js
```js
const mongoose = require('mongoose'); // importing mongoose
const connectDB = async () = {
    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/jobTracker"); // creating connection between Node.js and MongoDB
        console.log("MongoDB Connected");
    } catch (error){
        consol.error(error);
    }
};

module.exports = connectDB; // exporting the function so that we can call when we need to create a MongoDB connection
```

Now, This is how we use the connection
app.js
```js
const connectDB = require('./config/db'); // importing by giving filepath
connectDB(); // calling the function to establish a connection
// placed just before app.listen(3000);
```

After this we create a schema
models/Job.js
```js
const mongoose = require('mongoose');
const jobSchema = new mongoose.Schema({
    "company": {
        "type": String, 
        "required": true
    }, 
    "status": {
        "type": String,
        "required": true
    }
});

module.exports = mongoose.model('Job', jobSchema);
```
The model name here is Job. By default mongoose converts the model name to lowercase and pluralises it. So `mongoose.model('Job', jobSchema);` maps to mongoDB collection named `jobs`.

## Schema
Everything in Mongoose starts with Schema. Each Schema maps to a MongoDB collection and defines the shape of the documents within that collection.
```js
import mongoose from 'mongoose';
const { Schema } = mongoose;

const blogSchema = new Schema({
  title: String, // String is shorthand for {type: String}
  author: String,
  body: String,
  comments: [{ body: String, date: Date }],
  date: { type: Date, default: Date.now },
  hidden: Boolean,
  meta: {
    votes: Number,
    favs: Number
  }
});
```
If you want to add additional keys later, use Schema#add method.
Each key in our code `blogSchema` defines a property in our documents which will be cast to its associated SchemaType.
Keys may also be assigned nested objects contaning further key/type definitions.

* Creating a model
To use our schema definition, we need to convert our `blogSchema` into a **Model** we can work with. To do so, we pass it into `mongoose.model(modelName, schema)`:
```js
const Blog = mongoogle.model('Blog', blogSchema);
```


## Models
Models are fancy contructors compiled from `Schema` definitions. An instance of model is called a document.
When you call `mongoose.model()` on a schema, Mongoose compiles a model for you.
`mongoose.model('modelName', schema);`
The first argument is the _singular_ name of the collection your model is for. Mongoose automatically looks for the plural, lowercased version of your model name.

* **Inserting documents**
`await Modelname.create({"key": value, "key1": valueA});`
`await Modelname.insertMany([]); // takes and array of objects`

* **Querying**
`await Job.find({company: "Google"}).where('status').eq("Shortlisted").exec();`
`await Job.find(); // return all documents`
similarly,
`findById`, `findOne` are also used.

* **Deleting**
`deleteOne()`, `deleteMany()`
`await Job.deleteOne({company: "Vegrow"});`

* **Updating**
`updateOne()`, `updateMany()`


