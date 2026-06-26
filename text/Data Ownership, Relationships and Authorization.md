Job.js
```js
"user": {
    "type": mongoose.Schema.Types.ObjectId,
    "ref": "User",
    "required": true
}
```

The `user` field creates a relationship between `Job` Document and `User` Document.

* `"type": mongoose.Schema.Types.ObjectId`
This means that the field stores a MongoDB ObjectId, which is typically the `_id` of another document.

* `"ref": "User"`
This tells mongoose that the ObjectId stored in this field refers to documents in the `User` model.
Without `ref`, Mongoose would just see it as a random ObjectId.
With `ref`, you can use `populate()` to automatically fetch the related user. The user document will be populated when using `populate()`.
This is called reference relationship, similar to foreign key in SQL.