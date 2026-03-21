import { model, models, Schema } from "mongoose";

const projectSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "title is required"],
    },
    description: {
      type: String,
      required: [true, "description is required"],
    },
    location: {
      type: String,
      required: [true, "location is required"],
    },
    date: {
      type: String,
      required: [true, "date is required"],
      default: () => new Date(),
    },
    imageUrl: {
      type: String,
    },
    status: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

const Project = models.Project || model("Project", projectSchema);

export default Project;
