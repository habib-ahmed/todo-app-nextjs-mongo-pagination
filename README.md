# Todo App:

## Packages installed:

```bash
yarn add lucide-react
yarn add react-quill
yarn add mongoose
```

## MongoDB Atlas Database Connect:

- Go "cloud.mongodb.com" -> Database Access -> Add new user
- Go "cloud.mongodb.com" -> Network Access -> Add IP "0.0.0.0/0"
- Go "cloud.mongodb.com" -> Database -> Connect -> Compass
- Then Copy the connection string and paste it ".env" file

## Content of ".env.local":

```bash
MONGODB_URI=mongodb+srv://habib:Ha237814@cluster0.7zggeps.mongodb.net/
```

## Content of "@/lib/db.js" fot Connect Database:

```js
import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

let cached = global.mongoose || { conn: null, promise: null };

export const connectToDatabase = async () => {
  if (cached.conn) return cached.conn;

  if (!MONGODB_URI) throw new Error("MongoDB_URI is missing");

  cached.promise =
    cached.promise ||
    mongoose.connect(MONGODB_URI, {
      dbName: "todo",
      bufferCommands: false,
    });

  cached.conn = await cached.promise;

  return cached.conn;
};
```

## Content of "":

```js

```
