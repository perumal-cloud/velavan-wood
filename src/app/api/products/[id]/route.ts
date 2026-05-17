import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db';
import { Product } from '@/models/Product';

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    await connectToDatabase();
    const item = await Product.findById(id).populate('category');
    if (!item) return NextResponse.json({ success: false, message: 'Resource not found' }, { status: 404 });
    return NextResponse.json({ success: true, data: item });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await req.json();
    await connectToDatabase();
    const item = await Product.findByIdAndUpdate(id, body, { new: true, runValidators: true });
    if (!item) return NextResponse.json({ success: false, message: 'Resource not found' }, { status: 404 });
    return NextResponse.json({ success: true, data: item });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 400 });
  }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    await connectToDatabase();
    const item = await Product.findByIdAndDelete(id);
    if (!item) return NextResponse.json({ success: false, message: 'Resource not found' }, { status: 404 });
    return NextResponse.json({ success: true, data: {} });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
