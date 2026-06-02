"use client";

import { Calendar, Home, Search, User } from "lucide-react";
import HomeContainer from "@/components/layout/home/HomeContainer";

export default function HomeHero() {
  return (
    <section
      className="min-h-[500px] bg-cover bg-center md:min-h-[560px]"
      style={{
        backgroundImage:
          "linear-gradient(rgba(6,18,34,0.55), rgba(6,18,34,0.45)), url('https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=2000&q=80')",
      }}
    >
      <HomeContainer className="py-10 md:py-[72px]">

        {/* Heading */}
        <div className="mb-6 text-center md:mb-7">
          <h1 className="mb-2 text-[40px] font-bold leading-[1.03] text-white md:text-[64px]">
            Khám phá nơi ở
            <br />
            <span className="text-brand">tuyệt vời</span> tại Việt Nam
          </h1>
          <p className="text-sm text-white/88 md:text-[19px]">
            Hàng nghìn căn hộ, biệt thự và homestay độc đáo đang chờ đón bạn
          </p>
        </div>

        {/* Search bar */}
        <div className="overflow-hidden rounded-[18px] border border-white/20 bg-[rgba(12,17,26,0.92)] md:rounded-full">
          <div className="flex flex-wrap items-center md:flex-nowrap">
            <div className="flex flex-1 flex-col border-b border-white/14 px-4 py-3 md:border-b-0 md:border-r">
              <span className="text-[10px] uppercase tracking-[0.8px] text-white/66">Địa điểm</span>
              <div className="flex items-center gap-1.5">
                <Home size={14} className="text-brand" />
                <span className="text-sm text-white">Bạn muốn đi đâu?</span>
              </div>
            </div>
            <div className="flex flex-1 flex-col border-b border-white/14 px-4 py-3 md:border-b-0 md:border-r">
              <span className="text-[10px] uppercase tracking-[0.8px] text-white/66">Nhận phòng</span>
              <div className="flex items-center gap-1.5">
                <Calendar size={14} className="text-brand" />
                <span className="text-sm text-white">dd/mm/yyyy</span>
              </div>
            </div>
            <div className="flex flex-1 flex-col border-b border-white/14 px-4 py-3 md:border-b-0 md:border-r">
              <span className="text-[10px] uppercase tracking-[0.8px] text-white/66">Trả phòng</span>
              <div className="flex items-center gap-1.5">
                <Calendar size={14} className="text-brand" />
                <span className="text-sm text-white">dd/mm/yyyy</span>
              </div>
            </div>
            <div className="flex flex-1 flex-col px-4 py-3 md:border-r border-white/14">
              <span className="text-[10px] uppercase tracking-[0.8px] text-white/66">Khách</span>
              <div className="flex items-center gap-1.5">
                <User size={14} className="text-brand" />
                <span className="text-sm text-white">1 khách</span>
              </div>
            </div>
            <div className="flex justify-end px-3 pb-3 md:py-0">
              <button className="flex h-[52px] w-[52px] items-center justify-center rounded-full bg-brand-dark text-white transition-colors hover:bg-brand">
                <Search size={20} />
              </button>
            </div>
          </div>
        </div>

      </HomeContainer>
    </section>
  );
}
