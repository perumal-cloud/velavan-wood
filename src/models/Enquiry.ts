import mongoose, { Schema, model, models } from 'mongoose';

const EnquirySchema = new Schema(
  {
    name: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    message: { type: String, required: true },
    productInterest: { type: String, index: true },
    budget: { type: String },
  },
  { timestamps: true }
);

EnquirySchema.index({ createdAt: -1 });

export const Enquiry = models.Enquiry || model('Enquiry', EnquirySchema);
