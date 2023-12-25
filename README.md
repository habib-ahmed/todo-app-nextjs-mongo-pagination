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

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
