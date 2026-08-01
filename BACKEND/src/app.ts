import { Hono } from "hono";
import { serve } from "@hono/node-server";
import connectDB from "@/config/mongo.config";
import urlSchema from "@/models/shorturl.model";
import short_url from "@/routes/short_url.route";
// import dotenv from "dotenv";
// dotenv.config();

const app = new Hono();

connectDB();

app.route("/api/create", short_url);

app.get("/:id", async (c) => {
  const { id } = c.req.param();
  const urlData = await urlSchema.findOne({ short_url: id });
  
  if (urlData){
    return c.redirect(urlData.full_url);   
  } else {
    return c.json({ error: "URL not found" }, 404);
  }

});

serve({
  fetch: app.fetch,
  port: 3000,
});

console.log("Server is running on http://localhost:3000");

// get - redirection
// post - create short url
