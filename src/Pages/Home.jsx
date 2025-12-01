import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import { useProduct } from "../Contexts/ProductContext";

function Home() {
  const { allproduct } = useProduct();
  

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center">
      {/* 🔹 70–80% of page space */}
      <div className="w-full h-[90vh] max-w-7xl">
        <Swiper
          modules={[Navigation, Autoplay]}
          slidesPerView={1}
          loop={allproduct.length > 1}
          navigation
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          className="w-full h-full"
        >
          {allproduct.slice(0,8).map((product, index) => (
            <SwiperSlide key={product._id ?? index} className="w-full h-full">
              {/* Slide content container */}
              <div className="w-full h-full bg-slate-900 rounded-3xl overflow-hidden flex shadow-2xl border border-slate-800">
                {/* LEFT: text section */}
                <div className="basis-1/2 h-full p-8 md:p-10 flex flex-col justify-center gap-4">
                  <span className="inline-block text-xs font-medium uppercase tracking-[0.25em] text-sky-400">
                    {product.category || "Featured"}
                  </span>

                  <h2 className="text-2xl md:text-3xl font-semibold text-white">
                    {product.product_name || "Product Name"}
                  </h2>

                  <p className="text-sm md:text-base text-slate-300 leading-relaxed line-clamp-4">
                    {product.description ||
                      "This is a short description of the product. You can explain features, benefits, or any highlight here."}
                  </p>

                  <div className="mt-4 flex items-center gap-3">
                    {/* Example CTA buttons */}
                    <button className="px-4 py-2 rounded-full bg-sky-500 text-sm font-medium text-slate-950 hover:bg-sky-400 transition">
                      View details
                    </button>
                    <button className="px-4 py-2 rounded-full border border-slate-600 text-sm text-slate-200 hover:bg-slate-800 transition">
                      Add to cart
                    </button>
                  </div>
                </div>

                {/* RIGHT: image as background */}
                <div className="basis-1/2 h-full relative">
                  {/* Background image */}
                  <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{
                      backgroundImage: `url(${
                        product.main_image ||
                        "https://images.pexels.com/photos/3965545/pexels-photo-3965545.jpeg"
                      })`,
                    }}
                  />

                  {/* Dark gradient overlay (optional, for contrast) */}
                  <div className="absolute inset-0 bg-linear-to-l from-slate-950/60 via-slate-950/10 to-transparent" />
                </div>
              </div>
            </SwiperSlide>
          ))}

          {/* Optional: if products still loading, show fallback slide */}
          {allproduct.length === 0 && (
            <SwiperSlide className="w-full h-full">
              <div className="w-full h-full bg-slate-900 rounded-3xl flex items-center justify-center text-slate-300 border border-slate-800">
                Loading products...
              </div>
            </SwiperSlide>
          )}
        </Swiper>
      </div>

    </div>
  );
}

export default Home;
