import { Hono } from "hono";
import { serve } from "@hono/node-server";
import { nanoid } from "nanoid";
import connectDB from "./config/mongo.config";
import urlSchema from "./models/shorturl.model";
import dotenv from "dotenv";
dotenv.config();

const app = new Hono();

connectDB();

app.post("/api/create", async (c) => {
  const { url } = await c.req.json();
  const shortUrl = nanoid(7);

  const newUrl = new urlSchema({
    full_url: url,
    short_url: shortUrl,
  });

  await newUrl.save();
  return c.json({ short_url: shortUrl });
});

serve({
  fetch: app.fetch,
  port: 3000,
});

console.log("Server is running on http://localhost:3000");

// get - redirection
// post - create short url
