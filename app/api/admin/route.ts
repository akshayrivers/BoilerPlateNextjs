import { connectToDatabase } from '@/app/lib/mongodb';
import { NextResponse } from 'next/server';
import { Blog, Product } from './db';


// Ensure database connection
async function ensureDatabaseConnection() {
  await connectToDatabase();
  console.log("Database connected successfully");
}

// GET: Fetch admin details, products, and blog posts
export async function GET() {
  await ensureDatabaseConnection();

  // Fetch blog posts and products
  const blogPosts = await Blog.find().sort({ createdAt: -1 });  // Sort blogs by latest
  const products = await Product.find();

  return NextResponse.json({
    admin: { username: "admin", email: "admin@example.com" },
    blogPosts,
    products,
  });
}

// POST: Create a new product or blog post
export async function POST(req: Request) {
  await ensureDatabaseConnection();

  const { type, name, price, description, title, content, author } = await req.json();

  // Handle product creation
  if (type === "product") {
    if (!name || !price || !description) {
      return NextResponse.json({ message: "All product fields are required" }, { status: 400 });
    }

    const newProduct = new Product({ name, price, description });
    await newProduct.save();

    return NextResponse.json({ message: "Product added successfully" }, { status: 201 });
  }

  // Handle blog post creation
  if (type === "blog") {
    if (!title || !content || !author) {
      return NextResponse.json({ message: "Title, content, and author are required" }, { status: 400 });
    }

    const newBlog = new Blog({ title, content, author });
    await newBlog.save();

    return NextResponse.json({ message: "Blog post added successfully" }, { status: 201 });
  }

  return NextResponse.json({ message: "Invalid request type" }, { status: 400 });
}

// PUT: Update a product or blog post
export async function PUT(req: Request) {
  await ensureDatabaseConnection();

  const { id, type, title, content, name, price, description } = await req.json();

  // Handle product update
  if (type === "product") {
    if (!id || !name || !price || !description) {
      return NextResponse.json({ message: "All product fields are required" }, { status: 400 });
    }

    const updatedProduct = await Product.findByIdAndUpdate(id, { name, price, description }, { new: true });
    if (!updatedProduct) {
      return NextResponse.json({ message: "Product not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Product updated successfully" });
  }

  // Handle blog post update
  if (type === "blog") {
    if (!id || !title || !content) {
      return NextResponse.json({ message: "Title and content are required" }, { status: 400 });
    }

    const updatedBlog = await Blog.findByIdAndUpdate(id, { title, content }, { new: true });
    if (!updatedBlog) {
      return NextResponse.json({ message: "Blog post not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Blog post updated successfully" });
  }

  return NextResponse.json({ message: "Invalid request type" }, { status: 400 });
}

// DELETE: Delete a product or blog post
export async function DELETE(req: Request) {
  await ensureDatabaseConnection();

  const { id, type } = await req.json();

  // Handle product deletion
  if (type === "product") {
    if (!id) {
      return NextResponse.json({ message: "Product ID is required" }, { status: 400 });
    }

    const deletedProduct = await Product.findByIdAndDelete(id);
    if (!deletedProduct) {
      return NextResponse.json({ message: "Product not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Product deleted successfully" });
  }

  // Handle blog post deletion
  if (type === "blog") {
    if (!id) {
      return NextResponse.json({ message: "Blog post ID is required" }, { status: 400 });
    }

    const deletedBlog = await Blog.findByIdAndDelete(id);
    if (!deletedBlog) {
      return NextResponse.json({ message: "Blog post not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Blog post deleted successfully" });
  }

  return NextResponse.json({ message: "Invalid request type" }, { status: 400 });
}