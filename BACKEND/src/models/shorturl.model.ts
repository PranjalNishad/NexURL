import mongoose from "mongoose";

const shortUrlSchema = new mongoose.Schema({
  full_url: {
    type: String,
    required: true,
  },
  short_url: {
    type: String,
    required: true,
    index: true,
    unique: true,
  },
  clicks: {
    type: mongoose.Schema.Types.Number,
    // ref: "user",
    default: 0,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    // required: false,
  },
});

const shortUrl = mongoose.model("shortUrl", shortUrlSchema);

export default shortUrl;
