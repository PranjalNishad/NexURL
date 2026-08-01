import type { Context } from "hono";
import { createShortUrlWithUserId, createShortUrlWithoutUserId } from "@/services/short_url.service";

export const createShortUrl = async (c: Context) => {
  const { url, userId } = await c.req.json();
  let shortUrl;
  if (userId) {
    shortUrl = await createShortUrlWithUserId(url, userId);
  } else {
    shortUrl = await createShortUrlWithoutUserId(url);
  }

  return c.text(process.env.APP_URL + shortUrl);
};
