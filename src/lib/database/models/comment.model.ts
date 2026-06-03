import { model, models, Schema } from "mongoose";

const commnetSchema = new Schema(
  {
    user: {
      type: String,
      required: [true, "user is required"],
    },
    commnet: {
      type: String,
      required: [true, "comment is required"],
      minLength: 1,
    },

    date: {
      type: Date,
      default: () => Date.now(),
    },
    newsCommented: {
      type: String,
    },
  },

  {
    timestamps: true,
  },
);

const Comment = models.Comment || model("Comment", commnetSchema);

export default Comment;
