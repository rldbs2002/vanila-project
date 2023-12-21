import mongoose from "mongoose";
const { Schema } = mongoose;

const addressSchema = new Schema({
  firstname: String,
  lastname: String,
  country: {
    label: String,
    value: String,
  },
  address: String,
  city: String,
  state: String,
  postal_code: String,
  phone: String,
});

const userSchema = new Schema(
  {
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
      default: "user",
    },
    address_info: addressSchema,

    arrived_info: { type: [addressSchema], required: false },
  },
  { timestamps: true }
);
export default mongoose.models.Users || mongoose.model("Users", userSchema);
