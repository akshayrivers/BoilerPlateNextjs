import { connectToDatabase } from "@/app/lib/mongodb";
import bcrypt from "bcryptjs";

import { NextRequest, NextResponse } from "next/server";
import { User } from "../signin/db";

// Middleware to ensure database connection
async function ensureDatabaseConnection() {
  await connectToDatabase();
}

// POST: Handle user signup
export async function POST(req: NextRequest) {
  await ensureDatabaseConnection();

  const body = await req.json();
  const { username, password } = body;

  if (!username || !password) {
    return NextResponse.json(
      { message: "Username and password are required" },
      { status: 400 }
    );
  }

  // Check if user already exists
  const existingUser = await User.findOne({ username });
  if (existingUser) {
    return NextResponse.json({ message: "User already exists" }, { status: 409 });
  }

  // Hash the password and create a new user
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({ username, password: hashedPassword });
  await newUser.save();

  return NextResponse.json({ message: "User created successfully" }, { status: 201 });
}