import { model, models, Schema } from "mongoose";

const birthcertSchema = new Schema(
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
      required: [true, "middle name is required"],
    },
    fatherName: {
      type: String,
      required: [true, "father's name is required"],
    },
    motherName: {
      type: String,
      required: [true, "mother's name is required"],
      default: "",
    },

    homeTown: {
      type: String,
      required: [true, "home town is required"],
      default: "general",
    },
    dob: {
      type: Date,
      default: () => Date.now(),
    },

    placeOfBirth: {
      type: String,
      required: [true, "place of birth is required"],
    },
    address: {
      type: String,
      required: [true, "address is required"],
    },
    certId: {
      type: String,
      required: [true, "cert Id is required"],
      trim: true,
      unique: true,
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

const Birthcert = models.Birthcert || model("Birthcert", birthcertSchema);

export default Birthcert;
