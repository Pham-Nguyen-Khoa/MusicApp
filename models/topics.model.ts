import mongoose from "mongoose";

const topicSchema = new mongoose.Schema({
  title: String,
  avatar: String,
  description: String,
  status: String,
  slug: String,
  deleted: {
    type: Boolean,
    default: false
  },
  deletedAt: Date
},{
    timestamps: true
});
const Topics = mongoose.model("Topics", topicSchema, "topics");

export default  Topics;


