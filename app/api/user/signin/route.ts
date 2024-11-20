import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "./db";
import { connectToDatabase } from "@/app/lib/mongodb";

// Middleware to ensure database connection
async function ensureDatabaseConnection() {
  await connectToDatabase();
  console.log("hello it is connected");
}

// Secret key for JWT (store securely, e.g., in environment variables)
const JWT_SECRET = process.env.JWT_SECRET || "your_secret_key";

// POST: Handle user signup and signin
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

    // Find the user and validate password
    const user = await User.findOne({ username });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
    }

    // Generate JWT token
    const token = jwt.sign({ id: user._id, username: user.username }, JWT_SECRET, { expiresIn: "1h" });
    return NextResponse.json({ message: "Sign-in successful", token });
  }


