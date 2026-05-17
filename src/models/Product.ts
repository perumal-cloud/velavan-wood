import mongoose, { Schema, model, models } from 'mongoose';

const ProductSchema = new Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true, index: true },
    description: { type: String, required: true },
    category: { type: Schema.Types.ObjectId, ref: 'Category', required: true, index: true },
    images: [{ type: String }],
    price: { type: Number, index: true },
    featured: { type: Boolean, default: false, index: true },
    specifications: [{ key: String, value: String }],
  },
  { timestamps: true }
);

// Compound index for sorting by creation date
ProductSchema.index({ createdAt: -1 });

export const Product = models.Product || model('Product', ProductSchema);
