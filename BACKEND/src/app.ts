import { Hono } from "hono";
import { serve } from "@hono/node-server";
import { nanoid } from "nanoid";
import connectDB from "./config/mongo.config";
import dotenv from "dotenv";
dotenv.config()

const app = new Hono();

connectDB();

app.post("/api/create", async (c) => {
  // Parse JSON body
  const {url} = await c.req.json();

  console.log(url);

  return c.text(nanoid(7));
});

serve({
  fetch: app.fetch,
  port: 3000,
});

console.log("Server is running on http://localhost:3000");

// get - redirection 
// post - create short url 