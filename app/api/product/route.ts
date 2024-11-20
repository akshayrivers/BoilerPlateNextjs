import { NextRequest, NextResponse } from "next/server";

import { Product } from "../admin/db";
import { connectToDatabase } from "@/app/lib/mongodb";

async function ensureDatabaseConnection() {
    await connectToDatabase();
  }
export async function GET(req: NextRequest) {
    await ensureDatabaseConnection();
      const products = await Product.find();
      return NextResponse.json(products);
  }


