import { model, models, Schema } from "mongoose";

const newsViewSchema = new Schema(
  {
    slug: {
      type: String,
      required: [true, "slug is required"],
    },
    views: {
      type: Number,
      default: 0,
    },
    date: {
      type: Date,
      default: () => Date.now(),
    },
  },

  {
    timestamps: true,
  },
);

const NewsView = models.NewsView || model("NewsView", newsViewSchema);

export default NewsView;
