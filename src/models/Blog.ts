import mongoose, { Schema, model, models } from 'mongoose';

const BlogSchema = new Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true, index: true },
    content: { type: String, required: true },
    coverImage: { type: String },
    metaTitle: { type: String },
    metaDescription: { type: String },
  },
  { timestamps: true }
);

BlogSchema.index({ createdAt: -1 });

export const Blog = models.Blog || model('Blog', BlogSchema);
