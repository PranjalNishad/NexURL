import { saveShortUrl } from "@/dao/short_url.dao";
import urlSchema from "@/models/shorturl.model";
import { generateNanoid } from "@/utils/helper";

export const createShortUrlWithUserId = async (url: string, userId: string) => {
  const shortUrl = generateNanoid(7);
  await saveShortUrl(url, shortUrl, userId);
  return shortUrl;
};

export const createShortUrlWithoutUserId = async (url: string) => {
  const shortUrl = generateNanoid(7);
  await saveShortUrl(url, shortUrl, null); // Pass null for userId if not available
  return shortUrl;
}