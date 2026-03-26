import dbConnect from "@/lib/dbConnect";
import Property from "@/models/property";
import { NextResponse } from "next/server";

export async function PATCH(req, { params }) {
  try {
    await dbConnect();

    // FIX: Change 'const { id } = params;' to:
    const { id } = await params;

    const { status } = await req.json();

    const updatedProperty = await Property.findByIdAndUpdate(
      id,
      { Verification_status: status },
      // Optional: Use returnDocument for Mongoose 8+ as per your console warning
      { returnDocument: "after" },
    );

    if (!updatedProperty) {
      return NextResponse.json(
        { message: "Property not found" },
        { status: 404 },
      );
    }

    return NextResponse.json(
      { message: "Success", data: updatedProperty },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Error", error: error.message },
      { status: 500 },
    );
  }
}
export async function DELETE(req, { params }) {
  try {
    await dbConnect();
    const { id } = params;
    const deletedProperty = await Property.findByIdAndDelete(id);
    if (!deletedProperty) {
      return NextResponse.json(
        { message: "Property not found" },
        { status: 404 },
      );
    }
    return NextResponse.json(
      { message: `Property deleted successfully`, data: deletedProperty },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to delete property", error: error.message },
      { status: 500 },
    );
  }
}

export async function GET(req, { params }) {
  try {
    await dbConnect();

    // CRITICAL: Await params in Next.js 15+
    const { id } = await params;

    const property = await Property.findById(id);

    if (!property) {
      return NextResponse.json({ message: "Asset not found" }, { status: 404 });
    }

    return NextResponse.json(property, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error", error: error.message },
      { status: 500 },
    );
  }
}
