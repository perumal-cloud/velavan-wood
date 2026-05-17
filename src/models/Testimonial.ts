import mongoose, { Schema, model, models } from 'mongoose';

const TestimonialSchema = new Schema(
  {
    name: { type: String, required: true },
    message: { type: String, required: true },
    rating: { type: Number, required: true, min: 1, max: 5, index: true },
  },
  { timestamps: true }
);

TestimonialSchema.index({ createdAt: -1 });

export const Testimonial = models.Testimonial || model('Testimonial', TestimonialSchema);
