import mongoose from "mongoose";
const { Schema } = mongoose;

const noticeSchema = new Schema({
  writer: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Notice || mongoose.model("Notice", noticeSchema);
