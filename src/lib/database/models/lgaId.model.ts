import { model, models, Schema } from "mongoose";

const lgaIdSchema = new Schema(
  {
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

    homeTown: {
      type: String,
      required: [true, "home town is required"],
      default: "general",
    },

    placeOfBirth: {
      type: String,
      required: [true, "place of birth is required"],
      lowercase: true,
    },
    address: {
      type: String,
      required: [true, "address is required"],
      lowercase: true,
    },
    imageUrl: {
      type: String,
    },
    lgaCardId: {
      type: String,
      required: [true, "LGA Card Id is required"],
    },
    isProcessed: {
      type: Boolean,
      default: false,
    },
  },

  {
    timestamps: true,
  },
);

const LgaIdCard = models.LgaIdCard || model("LgaIdCard", lgaIdSchema);

export default LgaIdCard;
