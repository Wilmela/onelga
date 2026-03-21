import { model, models, Schema } from "mongoose";

const newsSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "title is required"],
    },
    excerpt: {
      type: String,
      required: [true, "email is required"],
    },
    banner: {
      type: String,
      required: [true, "banner is required"],
    },
    author: {
      type: String,
      // required: [true, "author is required"],
      default: "Hospital Team",
    },
    content: {
      type: String,
      required: [true, "content is required"],
      default: "",
    },
    isPublished: {
      type: Boolean,
      default: false,
    },
    category: {
      type: String,
      required: [true, "category is required"],
      default: "general",
      toLowerCase: true,
    },
    date: {
      type: Date,
      default: () => Date.now(),
    },
    readTime: {
      type: String,
    },
    slug: {
      type: String,
      required: [true, "slug is required"],
      lowercase: true,
    },
    shots: [
      {
        _id: false,
        id: { type: String },
        link: { type: String },
      },
    ],
  },

  {
    timestamps: true,
  },
);

const News = models.News || model("News", newsSchema);

export default News;
