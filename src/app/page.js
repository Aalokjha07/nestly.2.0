"use client";

import Link from "next/link";

export default function LandingPage() {
  return (
    <main className="relative min-h-screen w-full flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url('/uploads/background.jpg')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "brightness(0.5)",
        }}
      />

      <div className="relative z-10 flex flex-col md:flex-row gap-4 p-6 w-full max-w-6xl">
        {/* SELLER CARD */}
        <Link
          href="/seller"
          className="flex-1 bg-black/40 backdrop-blur-md border border-white/20 p-12 group hover:bg-white transition-all duration-300"
        >
          <h2 className="text-4xl font-black uppercase tracking-tighter text-white group-hover:text-black transition-colors">
            Seller
          </h2>
          <div className="h-[2px] w-8 bg-sky-500 my-4 group-hover:w-full transition-all duration-500" />
          <p className="text-white/40 text-[10px] font-bold uppercase tracking-[0.3em] group-hover:text-black/60">
            list your property
          </p>
        </Link>

        {/* ADMIN CARD */}
        <Link
          href="/admin/verify"
          className="flex-1 bg-black/40 backdrop-blur-md border border-white/20 p-12 group hover:bg-white transition-all duration-300"
        >
          <h2 className="text-4xl font-black uppercase tracking-tighter text-white group-hover:text-black transition-colors">
            Admin
          </h2>
          <div className="h-[2px] w-8 bg-sky-500 my-4 group-hover:w-full transition-all duration-500" />
          <p className="text-white/40 text-[10px] font-bold uppercase tracking-[0.3em] group-hover:text-black/60">
            verify the listings
          </p>
        </Link>

        {/* USER CARD */}
        <Link
          href="/user/listings"
          className="flex-1 bg-black/40 backdrop-blur-md border border-white/20 p-12 group hover:bg-white transition-all duration-300"
        >
          <h2 className="text-4xl font-black uppercase tracking-tighter text-white group-hover:text-black transition-colors">
            User
          </h2>
          <div className="h-[2px] w-8 bg-sky-500 my-4 group-hover:w-full transition-all duration-500" />
          <p className="text-white/40 text-[10px] font-bold uppercase tracking-[0.3em] group-hover:text-black/60">
            view the listings
          </p>
        </Link>
      </div>
    </main>
  );
}
