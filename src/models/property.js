import mongoose from "mongoose";

const PropertySchema = new mongoose.Schema({
  personaldata: {
    name: { type: String, required: true },
    contact_info: { type: Number, required: true },
    profession: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    country: { type: String, required: true },
  },
  propertydetails: {
    property_type: { type: String, required: true },
    property_size: { type: Number, required: true },
    location: { type: String, required: true },
    price: { type: Number, required: true },
    image_url: {
      type: String,
      default: "https://images.unsplash.com/photo-1560518883-ce09059eeffa",
    },
  },
  Verification_status: {
    type: String,
    enum: ["pending", "verified", "rejected"],
    default: "pending",
  },
  createdAt: { type: Date, default: Date.now },
});
export default mongoose.models.Property ||
  mongoose.model("Property", PropertySchema, "nestly_data");
