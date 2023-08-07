import mongoose from "mongoose";

const BlogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// ERROR --- OverwriteModelError --- SOLVED
var Blog = mongoose.models.blogs || mongoose.model("blogs", BlogSchema);
// its mongoose.models.blogs  (extra s)
// and mongoose.model('blogs),BlogSchema

export default Blog;
