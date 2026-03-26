"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  MapPin,
  Phone,
  User,
  Briefcase,
  ChevronLeft,
  Globe,
  Maximize,
  Tag,
} from "lucide-react";

export default function PropertyDetail() {
  const { id } = useParams();
  const router = useRouter();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const res = await fetch(`/api/list-property/${id}`);
        if (!res.ok) {
          setProperty(null);
          return;
        }
        const data = await res.json();
        setProperty(data);
      } catch (err) {
        console.error("Fetch Error:", err);
        setProperty(null);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchProperty();
  }, [id]);

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a] text-white font-medium italic">
        Loading property details...
      </div>
    );

  if (!property)
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a] text-white uppercase tracking-widest">
        Property Not Found
      </div>
    );

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white">
      {/* 1. Header Navigation */}
      <nav className="p-6 flex items-center gap-4 bg-black/50 sticky top-0 z-20 backdrop-blur-md border-b border-white/5">
        <button
          onClick={() => router.back()}
          className="p-2 hover:bg-white/10 rounded-full transition-colors"
        >
          <ChevronLeft size={24} />
        </button>
        <h1 className="text-lg font-bold tracking-tight">Property Overview</h1>
      </nav>

      {/* 2. Top Rectangular Image */}
      <section className="w-full h-[40vh] md:h-[60vh] relative overflow-hidden bg-black">
        <img
          src={property.propertydetails?.image_url}
          className="w-full h-full object-cover"
          alt="Property View"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] to-transparent opacity-60" />
      </section>

      {/* 3. Main Content Area */}
      <div className="max-w-5xl mx-auto px-6 -mt-16 relative z-10 pb-20">
        {/* Title and Price Card */}
        <div className="bg-[#141414] border border-white/10 rounded-3xl p-8 shadow-2xl mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <span className="text-sky-400 text-xs font-bold uppercase tracking-widest block mb-2">
                {property.propertydetails?.property_type}
              </span>
              <h2 className="text-4xl md:text-5xl font-black mb-3">
                {property.propertydetails?.location}
              </h2>
              <p className="flex items-center gap-2 text-white/50 text-sm">
                <MapPin size={16} /> {property.personaldata?.city},{" "}
                {property.personaldata?.state}
              </p>
            </div>
            <div className="text-left md:text-right">
              <p className="text-white/40 text-xs uppercase font-bold mb-1">
                Asking Price
              </p>
              <p className="text-4xl font-black text-emerald-400">
                ₹{property.propertydetails?.price}
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: Systematized Specs */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-[#141414] border border-white/5 rounded-3xl p-6">
              <h3 className="text-white/30 text-xs font-bold uppercase tracking-[0.2em] mb-6">
                Specifications
              </h3>
              <div className="grid grid-cols-2 gap-6">
                <div className="flex items-center gap-4">
                  <div className="bg-white/5 p-3 rounded-2xl">
                    <Maximize size={20} />
                  </div>
                  <div>
                    <p className="text-white/40 text-[10px] uppercase font-bold">
                      Square Feet
                    </p>
                    <p className="font-bold">
                      {property.propertydetails?.property_size} sqft
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="bg-white/5 p-3 rounded-2xl">
                    <Tag size={20} />
                  </div>
                  <div>
                    <p className="text-white/40 text-[10px] uppercase font-bold">
                      Category
                    </p>
                    <p className="font-bold uppercase">
                      {property.propertydetails?.property_type}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-[#141414] border border-white/5 rounded-3xl p-6">
              <h3 className="text-white/30 text-xs font-bold uppercase tracking-[0.2em] mb-4">
                Location Details
              </h3>
              <p className="text-white/70 leading-relaxed italic">
                {property.personaldata?.address},{" "}
                {property.personaldata?.country}
              </p>
            </div>
          </div>

          {/* Right: Systematic Owner Details */}
          <div className="space-y-6">
            <div className="bg-[#141414] border border-white/10 rounded-3xl p-6">
              <h3 className="text-white/30 text-xs font-bold uppercase tracking-[0.2em] mb-6">
                Owner Information
              </h3>
              <div className="flex items-center gap-4 mb-8">
                <div className="w-14 h-14 bg-sky-500 rounded-2xl flex items-center justify-center text-2xl font-black text-black">
                  {property.personaldata?.name[0]}
                </div>
                <div>
                  <p className="text-xl font-bold">
                    {property.personaldata?.name}
                  </p>
                  <p className="text-white/40 text-xs flex items-center gap-1">
                    <Briefcase size={12} /> {property.personaldata?.profession}
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="w-full flex flex-col items-center justify-center gap-1 bg-white text-black py-4 rounded-2xl font-bold shadow-lg">
                  <div className="flex items-center gap-2">
                    <Phone size={18} />
                    <span className="uppercase tracking-tight">
                      Contact Owner
                    </span>
                  </div>
                  <span className="text-sm font-black tracking-widest text-sky-600">
                    +91 {property.personaldata?.contact_info}
                  </span>
                </div>
                <div className="flex items-center justify-center gap-2 text-white/40 text-xs font-medium py-2">
                  <Globe size={14} /> Nestly verified
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
