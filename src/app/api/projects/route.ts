import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db';
import { Project } from '@/models/Project';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const sort = searchParams.get('sort') || '-createdAt';
    const limit = parseInt(searchParams.get('limit') || '0');

    await connectToDatabase();
    
let query: any = {};

    let mongooseQuery = Project.find(query);
    
    if (sort) {
      const sortStr = sort.split(',').join(' ');
      mongooseQuery = mongooseQuery.sort(sortStr);
    }
    
    if (limit > 0) {
      mongooseQuery = mongooseQuery.limit(limit);
    }

    const items = await mongooseQuery;
    return NextResponse.json({ success: true, count: items.length, data: items });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    await connectToDatabase();
    const item = await Project.create(body);
    return NextResponse.json({ success: true, data: item }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 400 });
  }
}
