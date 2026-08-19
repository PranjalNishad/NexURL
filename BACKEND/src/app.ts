import { Hono } from "hono";
import { serve } from "@hono/node-server";
import connectDB from "@/config/mongo.config";
import { getShortUrl } from "@/dao/short_url.dao";
import urlSchema from "@/models/shorturl.model";
import short_url from "@/routes/short_url.route";
import { redirectFromShortUrl } from "@/controller/short_url.controller";
import { errorHandler } from "./utils/errorHandler";
// import dotenv from "dotenv";
// dotenv.config();

const app = new Hono();

connectDB();

app.route("/api/create", short_url);

app.get("/:id", redirectFromShortUrl);

app.onError(errorHandler);

serve({
  fetch: app.fetch,
  port: 3000,
});

console.log("Server is running on http://localhost:3000");

// get - redirection
// post - create short url
