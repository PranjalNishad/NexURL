import { saveShortUrl } from "@/dao/short_url.dao";
import urlSchema from "@/models/shorturl.model";
import { generateNanoid } from "@/utils/helper"; 

export const createShortUrlWithUser = async (url: string, userId: string) => {
  const shortUrl = await generateNanoid(7);
  
  if (!shortUrl) throw new Error("Failed to generate short URL");
  
  await saveShortUrl(url, shortUrl, userId);
  return shortUrl;
};

export const createShortUrlWithoutUser = async (url: string) => {
  const shortUrl = await generateNanoid(7);
  await saveShortUrl(url, shortUrl, null); // Pass null for userId if not available
  return shortUrl;
};
