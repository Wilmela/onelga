import { model, models, Schema } from "mongoose";

const councilorSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "name is required"],
    },
    position: {
      type: String,
      required: [true, "position is required"],
    },
    role: {
      type: String,
      required: [true, "role is required"],
    },
    bio: {
      type: String,
      required: [true, "bio is required"],
    },
    tenure: {
      type: String,
      required: [true, "tenure is required"],
    },
    image: {
      type: String,
    },
    isPast: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

const Councilor = models.Councilor || model("Councilor", councilorSchema);

export default Councilor;
