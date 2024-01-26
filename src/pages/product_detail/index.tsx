import { useState } from "react";
import Layout from "@/components/Layout";
import SubNav from "@/components/SubNav";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Thumbs } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/thumbs';
import "@/app/globals.css";
import Dropdown from "@/components/Dropdown";
import ProductDetailNav from "@/components/ProductDetailNav";
import Image from "next/image";
import Pagi from "@/components/Pagi";
import ProductRelated from "@/components/ProductRelated";
export default function Face() {
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);
  const [NumProduct, setNumProduct] = useState(1);
  const [isHeart, setIsHeart] = useState<boolean>(true);
  return (
    <>
      <Layout>
        <div id="main">
          <SubNav title="Damage Care Perfect Serum Original (New) - 80ml"/>
          <div className="inner-container mt-[70px] mb-[60px]">
            <div className="flex flex-row justify-between">
              <div className="basis-[556px]">
                <Swiper
                  className="w-[556px] select-none"
                  loop={true}
                  slidesPerView={1}
                  modules={[Thumbs, Autoplay]}
                  thumbs={{ swiper: thumbsSwiper }}
                >
                  <SwiperSlide><div><Image src="/product_detail/product_img_01.png" alt="" width={556} height={555} /></div></SwiperSlide>
                  <SwiperSlide><div><Image src="/product_detail/product_img_01.png" alt="" width={556} height={555} /></div></SwiperSlide>
                  <SwiperSlide><div><Image src="/product_detail/product_img_01.png" alt="" width={556} height={555} /></div></SwiperSlide>
                  <SwiperSlide><div><Image src="/product_detail/product_img_01.png" alt="" width={556} height={555} /></div></SwiperSlide>
                  <SwiperSlide><div><Image src="/product_detail/product_img_01.png" alt="" width={556} height={555} /></div></SwiperSlide>
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
                    <SwiperSlide><div className="rounded cursor-pointer"><Image src="/product_detail/product_img_01.png" alt="" width={104} height={104} /></div></SwiperSlide>
                    <SwiperSlide><div className="rounded cursor-pointer"><Image src="/product_detail/product_img_01.png" alt="" width={104} height={104} /></div></SwiperSlide>
                    <SwiperSlide><div className="rounded cursor-pointer"><Image src="/product_detail/product_img_01.png" alt="" width={104} height={104} /></div></SwiperSlide>
                    <SwiperSlide><div className="rounded cursor-pointer"><Image src="/product_detail/product_img_01.png" alt="" width={104} height={104} /></div></SwiperSlide>
                    <SwiperSlide><div className="rounded cursor-pointer"><Image src="/product_detail/product_img_01.png" alt="" width={104} height={100} /></div></SwiperSlide>
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
                      <button className="rounded-l w-[33px] h-[33px] bg-[url('/product_detail/product_number_desc_btn.png')]" onClick={() => { setNumProduct(Math.max((NumProduct - 1), 0)) }}></button>
                      <input type="number" value={NumProduct} onChange={(e) => { setNumProduct(Number(e.target.value)) }} className="pt-1 border border-x-0 text-center min-w-[46px] max-w-[46px] h-[33px] outline-0" />
                      <button className="rounded-r w-[33px] h-[33px] bg-[url('/product_detail/product_number_asc_btn.png')]" onClick={() => { setNumProduct(NumProduct + 1) }}></button>
                    </div>
                    <div className="flex flex-row items-center gap-2">
                      <p className="text-xl font-bold">A$16.25</p>
                      <button className="rounded w-[33px] h-[33px] bg-[url('/product_detail/product_del_btn.png')]"></button>
                    </div>
                  </div>
                </div>
                <hr />
                <div className="pt-5">
                  <div className="flex justify-between items-center">
                    <p>
                      <span className="text-lg">Total</span>
                      <span className="text-[#757575] pl-1">(Quantity)</span>
                    </p>
                    <p className="text-[28px] font-bold text-[#ef426f]">A$16.25</p>
                  </div>
                  <div className="flex gap-3 pt-5">
                    <button
                      className={`w-14 h-14 shrink-0 rounded ${isHeart ? "bg-[url('/product_detail/product_heart_on_btn.png')]" : "bg-[url('/product_detail/product_heart_btn.png')]"}`}
                      onClick={() => { setIsHeart(!isHeart) }}
                    >
                    </button>
                    <button className="basis-full rounded border border-[#252525]">Add To Cart</button>
                    <button className="basis-full rounded bg-[#ef426f] text-[#ffffff]">Buy Now</button>
                  </div>
                </div>
              </div>
            </div>
            <div id="product_in4" className="mt-[175px] mb-[60px]">
              <ProductDetailNav tab="1"></ProductDetailNav>
            </div>
            <div className="flex justify-center">
              <Image src="/product_detail/description_content_img.png" alt="" width={860} height={860} />
            </div>
            <div id="product_rvw" className="mt-[120px] mb-[60px]">
              <ProductDetailNav tab="2"></ProductDetailNav>
            </div>
            <div className="">
              <div className="flex justify-between pb-5">
                <p className="text-xl">
                  <span className="font-bold">PRODUCT REVIEWS</span>
                  <span className="text-[#757575]">(12)</span>
                </p>
                <button className="w-[130px] h-[35px] border border-[#ef426f] rounded text-[#ef426f] font-medium">Write review</button>
              </div>
              <hr />

              <div className="">
                <div className="py-5 flex flex-row">
                  <div className="flex flex-col basis-[80%] ml-5 gap-y-3">
                    <div className="flex gap-0.5">
                      <i className="w-[17px] h-[17px] bg-[url('/product_detail/comment_star_ico_on.png')]"></i>
                      <i className="w-[17px] h-[17px] bg-[url('/product_detail/comment_star_ico_on.png')]"></i>
                      <i className="w-[17px] h-[17px] bg-[url('/product_detail/comment_star_ico_on.png')]"></i>
                      <i className="w-[17px] h-[17px] bg-[url('/product_detail/comment_star_ico_on.png')]"></i>
                      <i className="w-[17px] h-[17px] bg-[url('/product_detail/comment_star_ico_off.png')]"></i>
                    </div>
                    <p className="text-xl font-medium">CONTOUR POWDER</p>
                    <p className="text-[#999999]">Ive been absolutely obsessed with this lip stain lately. 16 Baked...
                    </p>
                    <p>
                      <span className="font-medium text-[17px]">uwa***</span>
                      <span className="text-[15px] text-[#999999] pl-3">2022.11.15</span>
                    </p>
                    <div className="flex gap-[10px]">
                      <div className="w-[110px] h-[110px] bg-[#eeeeee] rounded-[5px]"></div>
                      <div className="w-[110px] h-[110px] bg-[#eeeeee] rounded-[5px]"></div>
                    </div>
                    <div className="flex gap-[10px]">
                      <button className="w-[140px] h-[36px] bg-[url('/product_detail/comment_show_btn.png')] rounded-[5px] text-[15px] text-[#757575] pl-3 pt-0.5">COMMENT</button>
                      <button className="w-[140px] h-[36px] rounded-[5px] text-[15px] text-[#757575] border">WRITE COMMENT</button>
                    </div>
                  </div>
                  <div className="flex basis-[20%] items-start justify-end gap-[10px]">
                    <button className="w-[100px] h-7 text-[15px] text-[#999999] border rounded">EDIT</button>
                    <button className="w-[100px] h-7 text-[15px] text-[#999999] border rounded">DELETE</button>
                  </div>
                </div>
                <hr />
                <div className="flex items-center justify-center h-[123px] bg-[#f9f9f9] border-b">
                  <div className="flex w-[1131px] h-[82px]">
                    <textarea placeholder="Please enter your comment." className="focus:outline-none placeholder:text-lg p-5 pt-3 border rounded-l-[5px] grow resize-none" />
                    <button className="w-[120px] rounded-r bg-[#ef426f] text-lg text-[#ffffff]">OK</button>
                  </div>
                </div>
              </div>

              <Pagi></Pagi>

            </div>
            <div id="product_rlt" className="mt-[120px] mb-[60px]">
              <ProductDetailNav tab="3"></ProductDetailNav>
            </div>
            <p className="text-xl mb-[30px] font-bold">RELATED PRODUCTS</p>
            <ProductRelated></ProductRelated>
          </div>
        </div>
      </Layout>
    </>
  );
}
