import { model, models, Schema } from "mongoose";

const jobPostingSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "title Id is required"],
      unique: true,
    },
    position: {
      type: String,
      required: [true, "position is required"],
    },
    description: {
      type: String,
      required: [true, "description is required"],
    },
    requirements: {
      type: String,
    },
  },

  {
    timestamps: true,
  },
);

const JobPosting = models.JobPosting || model("JobPosting", jobPostingSchema);

export default JobPosting;
