import { model, models, Schema } from "mongoose";

const announcementSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "title is required"],
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

    date: {
      type: Date,
      default: () => Date.now(),
    },
  },

  {
    timestamps: true,
  },
);

const Announcement =
  models.Announcement || model("Announcement", announcementSchema);

export default Announcement;
