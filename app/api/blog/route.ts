import { NextRequest, NextResponse } from "next/server";

import { Blog} from "../admin/db";
import { connectToDatabase } from "@/app/lib/mongodb";

async function ensureDatabaseConnection() {
    await connectToDatabase();
  }
export async function GET(req: NextRequest) {
    await ensureDatabaseConnection();
      const blogs = await Blog.find();
      return NextResponse.json(blogs);
  }


