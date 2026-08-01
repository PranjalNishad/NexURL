import urlSchema from "@/models/shorturl.model";
import { generateNanoid } from "@/utils/helper";

export const saveShortUrl = async (
  longUrl: string,
  shortUrl: string,
  userId: any,
) => {
  const newUrl = new urlSchema({
    full_url: longUrl,
    short_url: shortUrl,
  });

  if (userId) {
    newUrl.user = userId;
  }
  await newUrl.save();
};
