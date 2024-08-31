import mongoose from "mongoose";

const { Schema } = mongoose;

const UserSchema = new Schema(
  {
    name: { type: String, required: true },
    userName: {
      type: String,
      required: true,
      unique: true,
      match: /.+\@.+\..+/,
    },
    mobileNo: { type: String, required: true, match: /^[0-9]{10}$/ },
    designation: {
      type: String,
      enum: ["HR", "Manager", "Developer"],
      required: true,
    },
    gender: { type: String, enum: ["M", "F"], required: true },
    courses: {
      type: [String],
      enum: ["MCA", "BCA", "B.Tech", "M.Tech"],
      required: true,
    }, // Multiple courses allowed
    image: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model("User", UserSchema);
