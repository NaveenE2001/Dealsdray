import mongoose, { Schema } from "mongoose";
const AuthSchema = new Schema(
  {
    name: { type: String, required: true },
    userName: {
      type: String,
      required: true,
      unique: true,
      match: /.+\@.+\..+/,
    },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("Auth1", AuthSchema);
