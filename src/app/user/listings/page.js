"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { MapPin, Loader2 } from "lucide-react";

export default function UserListingsPage() {
  const [assets, setAssets] = useState([]);
  const [loading, setLoading] = useState(true);

  // Inside your useEffect in UserListingsPage
  useEffect(() => {
    const fetchAssets = async () => {
      try {
        // FIX: Added ?Verification_status=verified to only show approved listings
        const res = await fetch(
          "/api/list-property?Verification_status=verified",
        );

        const data = await res.json();

        // Safety check to handle different response formats
        const list = Array.isArray(data) ? data : data.data || [];

        setAssets(list);
      } catch (err) {
        console.error("Sync Error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchAssets();
  }, []);

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white font-bold tracking-widest uppercase text-xs">
        <Loader2 className="animate-spin mr-3" size={18} />
        Loading Listings...
      </div>
    );

  return (
    <main className="relative min-h-screen w-full overflow-y-auto">
      {/* Background Image */}
      <div
        className="fixed inset-0 z-0"
        style={{
          backgroundImage: `url('/uploads/user_background.jpg')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "brightness(0.4)",
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-16">
        {/* Simple Heading */}
        <h1 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tighter mb-12 text-center">
          Our Listings
        </h1>

        {assets.length === 0 ? (
          <div className="bg-black/40 backdrop-blur-md border border-white/10 p-20 rounded-3xl text-center">
            <p className="text-white/50 font-bold uppercase tracking-widest text-sm">
              No properties available at the moment.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {assets.map((asset) => (
              <Link
                href={`/user/listings/${asset._id}`}
                key={asset._id}
                className="group bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden hover:bg-white transition-all duration-500 hover:-translate-y-2 shadow-2xl"
              >
                {/* Simplified Card Content */}
                <div className="aspect-video w-full overflow-hidden">
                  <img
                    src={asset.propertydetails?.image_url}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    alt="Property"
                  />
                </div>

                <div className="p-5">
                  <div className="flex justify-between items-start mb-2">
                    <h2 className="text-xl font-black text-white group-hover:text-black uppercase truncate pr-2">
                      {asset.propertydetails?.location}
                    </h2>
                    <span className="text-emerald-400 font-bold group-hover:text-emerald-600">
                      ₹{asset.propertydetails?.price}
                    </span>
                  </div>

                  <div className="flex items-center gap-1 text-white/50 group-hover:text-black/50 text-[10px] font-bold uppercase tracking-wider">
                    <MapPin size={10} />
                    {asset.personaldata?.city}, {asset.personaldata?.state}
                  </div>

                  <div className="mt-4 pt-4 border-t border-white/5 group-hover:border-black/5 flex justify-between items-center text-[9px] font-bold text-white/30 group-hover:text-black/30 uppercase tracking-[0.2em]">
                    <span>{asset.propertydetails?.property_size} SQ.FT</span>
                    <span className="italic">View Details</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
