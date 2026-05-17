import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db';
import { Product } from '@/models/Product';
import { Category } from '@/models/Category';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get('category');
    const featured = searchParams.get('featured');
    const sort = searchParams.get('sort') || '-createdAt';
    const limit = parseInt(searchParams.get('limit') || '0');
    
    await connectToDatabase();
    
    let query: any = {};
    if (category) {
      const cat = await Category.findOne({ slug: category });
      if (cat) query.category = cat._id;
    }
    if (featured) {
      query.featured = featured === 'true';
    }

    let mongooseQuery = Product.find(query).populate('category');
    
    if (sort) {
      const sortStr = sort.split(',').join(' ');
      mongooseQuery = mongooseQuery.sort(sortStr);
    }
    
    if (limit > 0) {
      mongooseQuery = mongooseQuery.limit(limit);
    }

    const products = await mongooseQuery;
    return NextResponse.json({ success: true, count: products.length, data: products });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    await connectToDatabase();
    const product = await Product.create(body);
    return NextResponse.json({ success: true, data: product }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 400 });
  }
}
