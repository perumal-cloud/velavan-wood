import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db';
import { Blog } from '@/models/Blog';

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    await connectToDatabase();
    const item = await Blog.findById(id);
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
    const item = await Blog.findByIdAndUpdate(id, body, { new: true, runValidators: true });
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
    const item = await Blog.findByIdAndDelete(id);
    if (!item) return NextResponse.json({ success: false, message: 'Resource not found' }, { status: 404 });
    return NextResponse.json({ success: true, data: {} });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
