import dbConnect from "@/lib/dbConnect";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET() {
  await dbConnect();
  const dbName = mongoose.connection.name;
  const collections = await mongoose.connection.db.listCollections().toArray();

  return NextResponse.json({
    current_database: dbName,
    collections_found: collections.map((c) => c.name),
  });
}
