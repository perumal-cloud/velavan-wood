import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db';
import { Product } from '@/models/Product';
import { Enquiry } from '@/models/Enquiry';
import { Blog } from '@/models/Blog';
import { Gallery } from '@/models/Gallery';
import { Testimonial } from '@/models/Testimonial';

export async function GET() {
  try {
    await connectToDatabase();

    const [products, enquiries, blogs, gallery, testimonials] = await Promise.all([
      Product.countDocuments(),
      Enquiry.countDocuments(),
      Blog.countDocuments(),
      Gallery.countDocuments(),
      Testimonial.countDocuments(),
    ]);

    // Recent enquiries (last 5)
    const recentEnquiries = await Enquiry.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .lean();

    return NextResponse.json({
      success: true,
      data: {
        counts: { products, enquiries, blogs, gallery, testimonials },
        recentEnquiries,
      },
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
