"use client";

import { useEffect, useState } from "react";
import { Check, X, Loader2 } from "lucide-react";

export default function AdminVerifyPage() {
  const [pendingList, setPendingList] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPending = async () => {
    try {
      const res = await fetch("/api/list-property?Verification_status=pending");
      const data = await res.json();
      setPendingList(Array.isArray(data) ? data : data.data || []);
    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPending();
  }, []);

  const updateStatus = async (id, newStatus) => {
    try {
      const response = await fetch(`/api/list-property/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        // Ensure you are sending the status string ("verified" or "rejected")
        body: JSON.stringify({ status: newStatus }),
      });

      const result = await response.json();

      if (response.ok) {
        // Refresh the UI by filtering out the updated item
        setPendingList((prev) => prev.filter((item) => item._id !== id));
        alert(`Property ${newStatus}!`);
      } else {
        console.error("Update failed:", result.message);
      }
    } catch (error) {
      console.error("Network error:", error);
    }
  };
  if (loading)
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center font-bold tracking-widest uppercase text-[10px]">
        <Loader2 className="animate-spin mr-2" size={14} />
        Loading Terminal...
      </div>
    );

  return (
    <main className="relative min-h-screen w-full overflow-y-auto">
      {/* Background Image */}
      <div
        className="fixed inset-0 z-0"
        style={{
          backgroundImage: `url('/uploads/admin_background.jpg')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "brightness(0.4)",
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto px-6 py-20">
        {/* Simple Heading Tag */}
        <p className="text-[10px] font-bold text-white/40 uppercase tracking-[0.5em] text-center mb-2">
          Admin Portal
        </p>
        <h1 className="text-4xl font-black text-white uppercase tracking-tighter text-center mb-16">
          Verify the Listings
        </h1>

        <div className="grid grid-cols-1 gap-4">
          {pendingList.length === 0 ? (
            <div className="bg-black/40 backdrop-blur-md border border-white/10 p-16 rounded-3xl text-center">
              <p className="text-white/30 font-bold uppercase tracking-widest text-[10px]">
                No pending requests
              </p>
            </div>
          ) : (
            pendingList.map((item) => (
              <div
                key={item._id}
                className="bg-black/40 backdrop-blur-xl border border-white/10 p-5 rounded-2xl flex flex-col md:flex-row items-center gap-6"
              >
                {/* Small Image Square */}
                <div className="w-24 h-24 rounded-xl overflow-hidden shrink-0 border border-white/10">
                  <img
                    src={item.propertydetails?.image_url}
                    className="w-full h-full object-cover"
                    alt=""
                  />
                </div>

                {/* Info Area */}
                <div className="flex-1 text-center md:text-left">
                  <h2 className="text-xl font-black text-white uppercase tracking-tight">
                    {item.propertydetails?.location}
                  </h2>
                  <p className="text-white/40 text-[10px] font-bold uppercase tracking-widest mt-1">
                    ₹{item.propertydetails?.price} — {item.personaldata?.name}
                  </p>
                </div>

                {/* Simple Circle Buttons */}
                <div className="flex gap-3">
                  <button
                    onClick={() => updateStatus(item._id, "verified")}
                    className="w-12 h-12 bg-white text-black rounded-full flex items-center justify-center hover:bg-emerald-500 hover:text-white transition-all active:scale-90 shadow-xl"
                  >
                    <Check size={20} />
                  </button>
                  <button
                    onClick={() => updateStatus(item._id, "rejected")}
                    className="w-12 h-12 bg-white/10 text-white rounded-full flex items-center justify-center hover:bg-rose-500 hover:text-white border border-white/10 transition-all active:scale-90"
                  >
                    <X size={20} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </main>
  );
}
