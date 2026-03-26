import dbConnect from "@/lib/dbConnect";
import Property from "@/models/property";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await dbConnect();
    const data = await req.json();
    const newProperty = await Property.create(data);
    return NextResponse.json(
      { message: "Property submitted for verification !", id: newProperty._id },
      { status: 201 },
    );
  } catch (error) {
    console.error("Upload error :", error);
    return NextResponse.json(
      {
        message: "Failed to submit property for verification",
        error: error.message,
      },
      { status: 500 },
    );
  }
}

export async function GET(req) {
  await dbConnect();
  try {
    const { searchParams } = new URL(req.url);
    const status = searchParams.get("Verification_status") || "pending";
    const listings = await Property.find({ Verification_status: status });

    return NextResponse.json(listings);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
