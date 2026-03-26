"use client";

import { useState } from "react";
import { Loader2, CheckCircle2, Upload } from "lucide-react";
import Link from "next/link";

export default function SellerPage() {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Updated to match your exact Mongoose Schema requirements
  const [formData, setFormData] = useState({
    name: "",
    contact_info: "",
    profession: "",
    address: "",
    city: "",
    state: "Maharashtra", // Defaulting for ease
    country: "India",
    property_type: "Apartment",
    property_size: "",
    location: "",
    price: "",
    image_url: "",
  });

  const handlePost = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/list-property", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          personaldata: {
            name: formData.name,
            contact_info: Number(formData.contact_info),
            profession: formData.profession,
            address: formData.address,
            city: formData.city,
            state: formData.state,
            country: formData.country,
          },
          propertydetails: {
            property_type: formData.property_type,
            property_size: Number(formData.property_size),
            location: formData.location,
            price: Number(formData.price),
            image_url:
              formData.image_url ||
              "https://images.unsplash.com/photo-1560518883-ce09059eeffa",
          },
          Verification_status: "pending",
        }),
      });

      if (res.ok) {
        setSubmitted(true);
      } else {
        const errorData = await res.json();
        alert(`Error: ${errorData.message || "Listing failed."}`);
      }
    } catch (err) {
      alert("Network Error: Connection failed.");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <main className="relative min-h-screen flex items-center justify-center p-6">
        <div
          className="fixed inset-0 z-0"
          style={{
            backgroundImage: `url('/uploads/seller_background.jpg')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            filter: "brightness(0.4)",
          }}
        />
        <div className="relative z-10 bg-black/60 backdrop-blur-xl border border-white/10 p-12 rounded-[2rem] text-center max-w-sm w-full">
          <CheckCircle2 className="text-emerald-500 mx-auto mb-6" size={64} />
          <h2 className="text-2xl font-black text-white uppercase tracking-tighter mb-2">
            Listing Deployed
          </h2>
          <p className="text-white/40 text-[10px] font-bold mb-8 uppercase tracking-[0.2em]">
            Queue: Pending Verification
          </p>
          <button
            onClick={() => setSubmitted(false)}
            className="w-full bg-white text-black py-4 rounded-xl font-black uppercase text-[10px] tracking-widest hover:bg-sky-500 hover:text-white transition-all"
          >
            List Another
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="relative min-h-screen w-full flex items-center justify-center p-6 py-20">
      <div
        className="fixed inset-0 z-0"
        style={{
          backgroundImage: `url('/uploads/seller_background.jpg')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "brightness(0.3)",
        }}
      />

      <div className="relative z-10 w-full max-w-2xl">
        <p className="text-[10px] font-bold text-white/40 uppercase tracking-[0.5em] text-center mb-2">
          Protocol: Seller_Entry
        </p>
        <h1 className="text-4xl font-black text-white uppercase tracking-tighter text-center mb-10">
          List Properties
        </h1>

        <form
          onSubmit={handlePost}
          className="bg-black/40 backdrop-blur-xl border border-white/10 p-10 rounded-[2rem] space-y-6"
        >
          {/* Section 1: Personal Data */}
          <div className="space-y-4">
            <h3 className="text-[10px] font-black text-sky-500 uppercase tracking-widest border-b border-white/5 pb-2">
              01. Personal Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                required
                className="form-input"
                placeholder="FULL NAME"
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
              <input
                required
                type="number"
                className="form-input"
                placeholder="CONTACT NUMBER"
                onChange={(e) =>
                  setFormData({ ...formData, contact_info: e.target.value })
                }
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                required
                className="form-input"
                placeholder="PROFESSION"
                onChange={(e) =>
                  setFormData({ ...formData, profession: e.target.value })
                }
              />
              <input
                required
                className="form-input"
                placeholder="CITY"
                onChange={(e) =>
                  setFormData({ ...formData, city: e.target.value })
                }
              />
            </div>
            <input
              required
              className="form-input"
              placeholder="COMPLETE ADDRESS"
              onChange={(e) =>
                setFormData({ ...formData, address: e.target.value })
              }
            />
          </div>

          {/* Section 2: Property Details */}
          <div className="space-y-4 pt-4">
            <h3 className="text-[10px] font-black text-sky-500 uppercase tracking-widest border-b border-white/5 pb-2">
              02. Property Specifications
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <select
                className="form-input appearance-none"
                onChange={(e) =>
                  setFormData({ ...formData, property_type: e.target.value })
                }
              >
                <option value="Apartment">APARTMENT</option>
                <option value="Villa">VILLA</option>
                <option value="Commercial">COMMERCIAL</option>
              </select>
              <input
                required
                className="form-input"
                placeholder="LOCATION / AREA NAME"
                onChange={(e) =>
                  setFormData({ ...formData, location: e.target.value })
                }
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                required
                type="number"
                className="form-input"
                placeholder="PRICE (₹)"
                onChange={(e) =>
                  setFormData({ ...formData, price: e.target.value })
                }
              />
              <input
                required
                type="number"
                className="form-input"
                placeholder="SIZE (SQ.FT)"
                onChange={(e) =>
                  setFormData({ ...formData, property_size: e.target.value })
                }
              />
            </div>
            <input
              className="form-input"
              placeholder="IMAGE URL (OPTIONAL)"
              onChange={(e) =>
                setFormData({ ...formData, image_url: e.target.value })
              }
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-white text-black font-black uppercase py-5 rounded-xl mt-4 hover:bg-sky-500 hover:text-white transition-all flex items-center justify-center gap-2 tracking-[0.2em] text-[11px] disabled:opacity-50"
          >
            {loading ? (
              <Loader2 className="animate-spin" size={16} />
            ) : (
              <Upload size={16} />
            )}
            Initiate Deployment
          </button>
        </form>

        <div className="text-center mt-8">
          <Link
            href="/"
            className="text-[9px] font-bold text-white/20 uppercase tracking-widest hover:text-white transition-colors"
          >
            ← Cancel Session
          </Link>
        </div>
      </div>

      <style jsx>{`
        .form-input {
          width: 100%;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 0.75rem;
          padding: 1rem 1.25rem;
          color: white;
          font-size: 11px;
          font-weight: 700;
          outline: none;
          transition: all 0.3s;
        }
        .form-input:focus {
          border-color: #0ea5e9;
          background: rgba(255, 255, 255, 0.08);
        }
        .form-input::placeholder {
          color: rgba(255, 255, 255, 0.2);
          letter-spacing: 0.1em;
        }
      `}</style>
    </main>
  );
}
