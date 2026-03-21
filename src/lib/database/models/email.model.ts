import { model, models, Schema } from "mongoose";

const emailSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, "email is required"],
    },
  },
  {
    timestamps: true,
  }
);

const Email = models.Email || model("Email", emailSchema);

export default Email;
