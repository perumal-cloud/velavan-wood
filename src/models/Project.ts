import mongoose, { Schema, model, models } from 'mongoose';

const ProjectSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    images: [{ type: String }],
  },
  { timestamps: true }
);

ProjectSchema.index({ createdAt: -1 });

export const Project = models.Project || model('Project', ProjectSchema);
