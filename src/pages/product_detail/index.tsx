import { useState } from "react";
import Layout from "@/components/Layout";
import SubNav from "@/components/SubNav";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Thumbs } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/thumbs';
import "@/app/globals.css";
import Dropdown from "@/components/Dropdown";
export default function Face() {
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);
  const [NumProduct, setNumProduct] = useState(1);

  return (
    <>
      <Layout>
        <div id="main">
          <SubNav />
          <div className="inner-container mt-[70px]">
            <div className="flex flex-row justify-between">
              <div className="basis-[556px]">
                <Swiper
                  className="w-[556px] select-none"
                  loop={true}
                  slidesPerView={1}
                  modules={[Thumbs, Autoplay]}
                  thumbs={{ swiper: thumbsSwiper }}
                  autoplay={{
                    delay: 2500,
                    disableOnInteraction: true,
                  }}
                >
                  <SwiperSlide><div className=""><img src="/product_detail/product_img_01.png" alt="" /></div></SwiperSlide>
                  <SwiperSlide><div className=""><img src="/product_detail/product_img_01.png" alt="" /></div></SwiperSlide>
                  <SwiperSlide><div className=""><img src="/product_detail/product_img_01.png" alt="" /></div></SwiperSlide>
                  <SwiperSlide><div className=""><img src="/product_detail/product_img_01.png" alt="" /></div></SwiperSlide>
                  <SwiperSlide><div className=""><img src="/product_detail/product_img_01.png" alt="" /></div></SwiperSlide>
                </Swiper>
                <div className="mt-[10px] mx-auto">
                  <Swiper
                    className="w-[556px] select-none"
                    modules={[Thumbs]}
                    watchSlidesProgress
                    onSwiper={setThumbsSwiper}
                    slidesPerView={5}
                    spaceBetween={10}
                  >
                    <SwiperSlide><div className="rounded"><img src="/product_detail/product_img_01.png" alt="" /></div></SwiperSlide>
                    <SwiperSlide><div className="rounded"><img src="/product_detail/product_img_01.png" alt="" /></div></SwiperSlide>
                    <SwiperSlide><div className="rounded"><img src="/product_detail/product_img_01.png" alt="" /></div></SwiperSlide>
                    <SwiperSlide><div className="rounded"><img src="/product_detail/product_img_01.png" alt="" /></div></SwiperSlide>
                    <SwiperSlide><div className="rounded"><img src="/product_detail/product_img_01.png" alt="" /></div></SwiperSlide>
                  </Swiper>
                </div>
              </div>
              <div className="basis-[580px] flex flex-col">
                <div className="pb-5">
                  <p className="text-[32px] font-bold">Damage Care Perfect Serum
                    Original (New) - 80ml
                  </p>
                  <p className="pt-2">
                    <span className="text-[28px] font-bold text-[#ef426f]">A$16.25</span>
                    <span className="line-through text-lg text-[#999999] pl-3">A$19.65</span>
                  </p>
                </div>
                <hr />
                <div className="py-5">
                  <p className="flex">
                    <span className="text-lg min-w-[190px]">Color</span>
                    <span className="text-lg text-[#757575]">Orange</span>
                  </p>
                  <p className="flex pt-4">
                    <span className="text-lg min-w-[190px]">Version</span>
                    <span className="text-lg text-[#757575]">2022 Version</span>
                  </p>
                </div>
                <hr />
                <div className="py-5">
                  <p className="flex">
                    <span className="text-lg min-w-[190px]">Product Highlight</span>
                    <span className="text-lg text-[#757575]">Repair your hair within 3 days with miracle oil serum.
                      Mise en scène Perfect Serum is an oil-infused hair
                      serum that provides intensive damage care...</span>
                  </p>
                </div>
                <hr />
                <div className="py-5">
                  <div className="flex items-center">
                    <span className="text-lg min-w-[190px]">Volume / Weight</span>
                    <Dropdown
                      className="w-[397px] bg-[url('/dropdown_bg_long.png')] text-[#757575]"
                      options={[
                        { id: 1, name: "80ml" },
                        { id: 2, name: "100ml" },
                      ]}
                      onChange={() => { }}
                      activeItem={1}
                    />
                  </div>
                </div>
                <hr />
                <div className="py-5">
                  <div className="flex items-center justify-between">
                    <div className="max-w-[200px]">
                      <p className="text-[#454545]">Damage Care Perfect Serum
                        Original (New) - 80ml</p>
                      <p className="text-[15px] text-[#999999] pt-1">- [Required selection]</p>
                    </div>
                    <div className="flex flex-row">
                      <button className="rounded-l w-[33px] h-[33px] bg-[url('/product_detail/product_number_desc_btn.png')]" onClick={()=>{setNumProduct(Math.max((NumProduct-1),1))}}></button>
                      <input type="number" value={NumProduct} onChange={(e)=> {setNumProduct(Number(e.target.value))}} className="pt-1 border border-x-0 text-center min-w-[46px] max-w-[46px] h-[33px] outline-0"/>
                      <button className="rounded-r w-[33px] h-[33px] bg-[url('/product_detail/product_number_asc_btn.png')]" onClick={()=>{setNumProduct(NumProduct+1)}}></button>
                    </div>
                    <div className="flex flex-row items-center gap-2">
                      <p className="text-xl font-bold">A$16.25</p>
                      <button className="rounded w-[33px] h-[33px] bg-[url('/product_detail/product_del_btn.png')]"></button>
                    </div>
                  </div>
                </div>
                <hr />
                <div className="py-5">
                  <div className="flex justify-between">
                    <p>
                      <span>Total</span>
                      <span>Quantity</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}
