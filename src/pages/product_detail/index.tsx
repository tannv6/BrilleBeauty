import { useState } from "react";
import Layout from "@/components/Layout";
import SubNav from "@/components/SubNav";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Thumbs } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/thumbs';
import "@/app/globals.css";
export default function Face() {
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);


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
                  modules={[Thumbs]}
                  thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
                >
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
                  </Swiper>
                </div>
              </div>
              <div className="basis-[580px]"></div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}
