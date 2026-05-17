import mongoose, { Schema, model, models } from 'mongoose';

const GallerySchema = new Schema(
  {
    image: { type: String, required: true },
    title: { type: String },
  },
  { timestamps: true }
);

GallerySchema.index({ createdAt: -1 });

export const Gallery = models.Gallery || model('Gallery', GallerySchema);
