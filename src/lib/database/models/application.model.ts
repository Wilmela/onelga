import { model, models, Schema } from "mongoose";

const applicationSchema = new Schema(
  {
    applicationId: {
      type: String,
      required: [true, "application Id is required"],
    },
    firstName: {
      type: String,
      required: [true, "first name is required"],
    },
    lastName: {
      type: String,
      required: [true, "last name is required"],
    },
    middleName: {
      type: String,
    },

    cv: {
      type: String,
    },

    position: {
      type: String,
      required: [true, "position is required"],
      lowercase: true,
    },
    qualification: {
      type: String,
      required: [true, "qualification is required"],
      lowercase: true,
    },
    passport: {
      type: String,
    },
    invite: {
      type: Boolean,
      default: false,
    },
  },

  {
    timestamps: true,
  },
);

const Application =
  models.Application || model("Application", applicationSchema);

export default Application;
