import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import * as dotenv from 'dotenv';
dotenv.config();

import { User } from './src/models/User';
import { Category } from './src/models/Category';
import { Product } from './src/models/Product';
import { Gallery } from './src/models/Gallery';
import { Testimonial } from './src/models/Testimonial';
import { Blog } from './src/models/Blog';
import { Project } from './src/models/Project';
import { Enquiry } from './src/models/Enquiry';

const MONGODB_URI = "mongodb://pr657122:paJbbwqxoDHNWikA@ac-kk221na-shard-00-00.8efgpto.mongodb.net:27017,ac-kk221na-shard-00-01.8efgpto.mongodb.net:27017,ac-kk221na-shard-00-02.8efgpto.mongodb.net:27017/velavan-wooden?ssl=true&replicaSet=atlas-sl2xb6-shard-0&authSource=admin&retryWrites=true&w=majority";

if (!MONGODB_URI) {
  throw new Error('MONGODB_URI is not defined in .env');
}

async function seed() {
  try {
    await mongoose.connect(MONGODB_URI as string);
    console.log('Connected to MongoDB');

    // 1. Create Admin User
    const existingUser = await User.findOne({ email: 'admin@velavanwood.com' });
    if (!existingUser) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash('admin123', salt);
      await User.create({
        name: 'Super Admin',
        email: 'admin@velavanwood.com',
        password: hashedPassword,
        role: 'admin',
      });
      console.log('Admin user created (admin@velavanwood.com / admin123)');
    }

    // 2. Create Categories
    const categories = ['Teak Wood Doors', 'Designer Doors', 'Main Entrance Doors', 'Carved Doors', 'Bedroom Doors', 'Custom Doors'];
    const createdCategories = [];
    for (const cat of categories) {
      const slug = cat.toLowerCase().replace(/ /g, '-');
      let category = await Category.findOne({ slug });
      if (!category) {
        category = await Category.create({ name: cat, slug });
        console.log(`Category created: ${cat}`);
      }
      createdCategories.push(category);
    }

    // 3. Create a Dummy Product
    if (createdCategories.length > 0) {
      const existingProduct = await Product.findOne({ slug: 'royal-teak-entrance' });
      if (!existingProduct) {
        await Product.create({
          title: 'The Royal Teak Entrance',
          slug: 'royal-teak-entrance',
          description: 'Experience the grandeur of our signature Teak Entrance door. Handcrafted with precision, it features elegant golden handles and a rich mahogany finish.',
          category: createdCategories[2]._id,
          images: ['/images/door-1.png'],
          price: 2500,
          featured: true,
          specifications: [
            { key: 'Material', value: '100% Solid Teak Wood' },
            { key: 'Hardware', value: 'Premium Brass' }
          ]
        });
        console.log('Dummy product created');
      }
    }

    // 4. Create Gallery item
    const existingGallery = await Gallery.findOne({ title: 'Luxury Master Bedroom' });
    if (!existingGallery) {
      await Gallery.create({
        image: '/images/hero-bg.png',
        title: 'Luxury Master Bedroom'
      });
      console.log('Gallery item created');
    }

    // 5. Create Testimonial
    const existingTestimonial = await Testimonial.findOne({ name: 'Jane Smith' });
    if (!existingTestimonial) {
      await Testimonial.create({
        name: 'Jane Smith',
        message: 'The craftsmanship on our new entrance door is absolutely stunning. Velavan Wood exceeded our expectations!',
        rating: 5
      });
      console.log('Testimonial created');
    }

    // 6. Create Blog
    const existingBlog = await Blog.findOne({ slug: 'caring-for-teak-wood' });
    if (!existingBlog) {
      await Blog.create({
        title: 'How to Care for Teak Wood Doors',
        slug: 'caring-for-teak-wood',
        content: '<p>Teak wood is incredibly durable, but it requires proper maintenance to retain its rich color...</p>',
        coverImage: '/images/door-1.png',
        metaTitle: 'Teak Wood Door Maintenance Guide',
        metaDescription: 'Learn how to properly care for and maintain your luxury teak wood doors.'
      });
      console.log('Blog article created');
    }

    // 7. Create Project
    const existingProject = await Project.findOne({ title: 'Beverly Hills Mansion' });
    if (!existingProject) {
      await Project.create({
        title: 'Beverly Hills Mansion',
        description: 'A complete interior woodwork project featuring custom-carved mahogany doors and wall paneling.',
        images: ['/images/door-1.png', '/images/hero-bg.png']
      });
      console.log('Project showcase created');
    }

    // 8. Create Enquiry
    const existingEnquiry = await Enquiry.findOne({ email: 'test@example.com' });
    if (!existingEnquiry) {
      await Enquiry.create({
        name: 'Test Customer',
        phone: '+1 555-0192',
        email: 'test@example.com',
        message: 'I am interested in a custom carved door for my living room.',
        productInterest: 'Custom Design',
        budget: '$3,000 - $5,000'
      });
      console.log('Test enquiry created');
    }

    console.log('Database seeding and table creation completed successfully.');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seed();
