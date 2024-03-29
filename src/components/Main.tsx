/* eslint-disable react/no-unescaped-entities */
import Link from "next/link";
import { useState } from "react";
import ProductItem from "@/components/ProductItem";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Thumbs } from "swiper/modules";
import "swiper/css";
import "swiper/css/thumbs";
import "@/app/globals.css";
import "swiper/swiper-bundle.css";
import Image from "next/image";
import { CDN_URL } from "@/utils/constants";
import axios from "axios";

export default function Main({
  main_visual,
  after_main_visual,
  main_middle,
  best_main,
  new_main,
  sale_main,
}: any) {
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);
  const [bestPrd, setBestPrd] = useState(best_main);
  const [newPrd, setNewPrd] = useState(new_main);
  const [salePrd, setSalePrd] = useState(sale_main);

  const handleLoadMoreBest = async () => {
    const response3 = await axios.get(
      "http://localhost:3000/api/products/main_product",
      {
        params: {
          page: Number(bestPrd.currentPage) + 1,
          pageSize: 8,
          type: "IsBest",
        },
      }
    );
    setBestPrd({
      ...response3.data,
      list: [...bestPrd.list, ...response3.data.list],
    });
  };

  const handleLoadMoreNew = async () => {
    const response4 = await axios.get(
      "http://localhost:3000/api/products/main_product",
      {
        params: {
          page: Number(newPrd.currentPage) + 1,
          pageSize: 8,
          type: "IsNew",
        },
      }
    );
    setNewPrd({
      ...response4.data,
      list: [...newPrd.list, ...response4.data.list],
    });
  };

  const handleLoadMoreSale = async () => {
    const response5 = await axios.get(
      "http://localhost:3000/api/products/main_product",
      {
        params: {
          page: Number(salePrd.currentPage) + 1,
          pageSize: 8,
          type: "IsBigSale",
        },
      }
    );
    setSalePrd({
      ...response5.data,
      list: [...salePrd.list, ...response5.data.list],
    });
  };

  return (
    <div className="container-main">
      <Link
        href={main_visual?.BannerLink ? main_visual?.BannerLink : ""}
        target={main_visual?.OpenNewTab == 1 ? "_blank" : ""}
        className={`main_visual w-full h-[663px] overflow-hidden relative block`}
      >
        <Image
          src={`${CDN_URL}${main_visual?.BannerImg || ""}`}
          alt=""
          className="object-cover"
          fill
        />
      </Link>
      <div className="inner-container">
        <div className="main_banner flex custom-gap-30 my-6">
          {after_main_visual?.map((e: any, i: number) => {
            return (
              <Link
                href={e?.BannerLink ? e?.BannerLink : ""}
                target={e?.OpenNewTab == 1 ? "_blank" : ""}
                className="banner_img w-[585px] h-[170px] relative block"
                key={i}
              >
                <Image
                  src={`${CDN_URL}${e?.BannerImg || ""}`}
                  alt=""
                  fill
                  className="object-cover"
                />
              </Link>
            );
          })}
        </div>
        <div className="main_ttl text-center">
          <p className="text-[22px] tracking-wide leading-8 uppercase text-gray-700 font-bold mb-2.5">
            BEST PRODUCTS
          </p>
        </div>
        <div className="grid grid-cols-4 gap-x-5 gap-y-[30px] mt-10">
          {bestPrd.list?.map((elm: any, idx: number) => {
            return <ProductItem key={idx} info={elm} />;
          })}
        </div>
        {bestPrd.currentPage < bestPrd.totalPage && (
          <div className="btn flex items-center justify-center mt-[45px]">
            <button
              onClick={handleLoadMoreBest}
              type="button"
              className="btn_more py-[15px] px-[65px] text-[#f15981] text-18 border-[#f15981] border-[1px] rounded-md transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-f04b76"
            >
              See More
            </button>
          </div>
        )}
        <div className="main_ttl text-center mt-[80px]">
          <p className="text-[22px] tracking-wide leading-8 uppercase text-gray-700 font-bold mb-2.5">
            NEW PRODUCTS
          </p>
        </div>
        <div className="grid grid-cols-4 gap-x-5 gap-y-[30px] mt-10">
          {newPrd.list?.map((elm: any, idx: number) => {
            return <ProductItem key={idx} info={elm} />;
          })}
        </div>
        {newPrd.currentPage < newPrd.totalPage && (
          <div className="btn flex items-center justify-center mt-[45px]">
            <button
              onClick={handleLoadMoreNew}
              type="button"
              className="btn_more py-[15px] px-[65px] text-[#f15981] text-18 border-[#f15981] border-[1px] rounded-md transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-f04b76"
            >
              See More
            </button>
          </div>
        )}
        <Link
          href={main_middle?.BannerLink ? main_middle?.BannerLink : ""}
          target={main_middle?.OpenNewTab == 1 ? "_blank" : ""}
          className="my-[80px] w-[1201px] h-[140px] relative block"
        >
          <Image
            src={`${CDN_URL}${main_middle?.BannerImg || ""}`}
            alt=""
            className="object-cover"
            fill
          />
        </Link>
        <div className="main_ttl text-center">
          <p className="text-[22px] tracking-wide leading-8 uppercase text-gray-700 font-bold mb-2.5">
            BIG SALE
          </p>
        </div>
        <div className="grid grid-cols-4 gap-x-5 gap-y-[30px] mt-10">
          {salePrd.list?.map((elm: any, idx: number) => {
            return <ProductItem key={idx} info={elm} />;
          })}
        </div>
        {salePrd.currentPage < salePrd.totalPage && (
          <div className="btn flex items-center justify-center mt-[45px]">
            <button
              onClick={handleLoadMoreSale}
              type="button"
              className="btn_more py-[15px] px-[65px] text-[#f15981] text-18 border-[#f15981] border-[1px] rounded-md transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-f04b76"
            >
              See More
            </button>
          </div>
        )}
        <div className="main_ttl text-center mt-[100px]">
          <p className="text-[22px] tracking-wide leading-8 uppercase text-gray-700 font-bold mb-2.5">
            Review Board{" "}
          </p>
          <span className="text-[18px] tracking-wide leading-5 text-gray-500">
            Write a review and get 10 points
          </span>
        </div>
        <div className="swiper-container relative overflow-hidden">
          <Swiper
            className="mt-[45px] mb-[115px] select-none"
            loop={true}
            slidesPerView={4}
            modules={[Thumbs, Autoplay]}
            thumbs={{ swiper: thumbsSwiper }}
            autoplay={{
              delay: 3000,
              disableOnInteraction: true,
            }}
            spaceBetween={20}
          >
            <SwiperSlide>
              <Link
                href="/review_list"
                className="popular_product_element relative"
              >
                <div className="thumbnail relative">
                  <Image
                    className="thumb_image w-[283px] h-[283px] object-cover"
                    src="/review_img01.png"
                    alt=""
                    width={283}
                    height={283}
                  />
                </div>
                <div className="product_props flex flex-col gap-4 px-5 py-5 border-[#dbdbdb] border-[1px] border-t-0">
                  <div className="flex items-center gap-2">
                    <Image
                      className="icon_star"
                      src="/start_ic.png"
                      alt=""
                      width={18}
                      height={18}
                    />
                    <Image
                      className="icon_star"
                      src="/start_ic.png"
                      alt=""
                      width={18}
                      height={18}
                    />
                    <Image
                      className="icon_star"
                      src="/start_ic.png"
                      alt=""
                      width={18}
                      height={18}
                    />
                    <Image
                      className="icon_star"
                      src="/start_ic.png"
                      alt=""
                      width={18}
                      height={18}
                    />
                    <Image
                      className="icon_star"
                      src="/start_g_ic.png"
                      alt=""
                      width={18}
                      height={18}
                    />
                  </div>
                  <div className="text-[17px] color-25 font-bold white-space-nowrap overflow-hidden text-ellipsis line-height-21 line-clamp-1">
                    Contour Powder
                  </div>
                  <div className="text-[16px] text-[#999] white-space-nowrap overflow-hidden text-ellipsis line-clamp-2 line-height-36">
                    Ive been absolutely obsessed with this lip stain lately. 16
                    Baked
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[13px] text-[#999]">wls****</span>
                    <span className="text-[13] text-[#999]">2020.08.11</span>
                  </div>
                </div>
              </Link>
            </SwiperSlide>
            <SwiperSlide>
              <Link
                href="review_list"
                className="popular_product_element relative w-[283px]"
              >
                <div className="thumbnail relative">
                  <Image
                    className="thumb_image w-[283px] h-[283px] object-cover"
                    src="/review_img02.png"
                    alt=""
                    width={283}
                    height={283}
                  />
                </div>
                <div className="product_props flex flex-col gap-4 px-5 py-5 border-[#dbdbdb] border-[1px] border-t-0">
                  <div className="flex items-center gap-2">
                    <Image
                      className="icon_star"
                      src="/start_ic.png"
                      alt=""
                      width={18}
                      height={18}
                    />
                    <Image
                      className="icon_star"
                      src="/start_ic.png"
                      alt=""
                      width={18}
                      height={18}
                    />
                    <Image
                      className="icon_star"
                      src="/start_ic.png"
                      alt=""
                      width={18}
                      height={18}
                    />
                    <Image
                      className="icon_star"
                      src="/start_ic.png"
                      alt=""
                      width={18}
                      height={18}
                    />
                    <Image
                      className="icon_star"
                      src="/start_g_ic.png"
                      alt=""
                      width={18}
                      height={18}
                    />
                  </div>
                  <div className="text-[17px] color-25 font-bold white-space-nowrap overflow-hidden text-ellipsis line-height-21 line-clamp-1">
                    Contour Powder
                  </div>
                  <div className="text-[16px] text-[#999] white-space-nowrap overflow-hidden text-ellipsis line-clamp-2 line-height-36">
                    Ive been absolutely obsessed with this lip stain lately. 16
                    Baked
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[13px] text-[#999]">wls****</span>
                    <span className="text-[13] text-[#999]">2020.08.11</span>
                  </div>
                </div>
              </Link>
            </SwiperSlide>
            <SwiperSlide>
              <Link
                href="review_list"
                className="popular_product_element relative w-[283px]"
              >
                <div className="thumbnail relative">
                  <Image
                    className="thumb_image w-[283px] h-[283px] object-cover"
                    src="/review_img03.png"
                    alt=""
                    width={283}
                    height={283}
                  />
                </div>
                <div className="product_props flex flex-col gap-4 px-5 py-5 border-[#dbdbdb] border-[1px] border-t-0">
                  <div className="flex items-center gap-2">
                    <Image
                      className="icon_star"
                      src="/start_ic.png"
                      alt=""
                      width={18}
                      height={18}
                    />
                    <Image
                      className="icon_star"
                      src="/start_ic.png"
                      alt=""
                      width={18}
                      height={18}
                    />
                    <Image
                      className="icon_star"
                      src="/start_ic.png"
                      alt=""
                      width={18}
                      height={18}
                    />
                    <Image
                      className="icon_star"
                      src="/start_ic.png"
                      alt=""
                      width={18}
                      height={18}
                    />
                    <Image
                      className="icon_star"
                      src="/start_g_ic.png"
                      alt=""
                      width={18}
                      height={18}
                    />
                  </div>
                  <div className="text-[17px] color-25 font-bold white-space-nowrap overflow-hidden text-ellipsis line-height-21 line-clamp-1">
                    Contour Powder
                  </div>
                  <div className="text-[16px] text-[#999] white-space-nowrap overflow-hidden text-ellipsis line-clamp-2 line-height-36">
                    Ive been absolutely obsessed with this lip stain lately. 16
                    Baked
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[13px] text-[#999]">wls****</span>
                    <span className="text-[13] text-[#999]">2020.08.11</span>
                  </div>
                </div>
              </Link>
            </SwiperSlide>
            <SwiperSlide>
              <Link
                href="review_list"
                className="popular_product_element relative w-[283px]"
              >
                <div className="thumbnail relative">
                  <Image
                    className="thumb_image w-[283px] h-[283px] object-cover"
                    src="/review_img04.png"
                    alt=""
                    width={283}
                    height={283}
                  />
                </div>
                <div className="product_props flex flex-col gap-4 px-5 py-5 border-[#dbdbdb] border-[1px] border-t-0">
                  <div className="flex items-center gap-2">
                    <Image
                      className="icon_star"
                      src="/start_ic.png"
                      alt=""
                      width={18}
                      height={18}
                    />
                    <Image
                      className="icon_star"
                      src="/start_ic.png"
                      alt=""
                      width={18}
                      height={18}
                    />
                    <Image
                      className="icon_star"
                      src="/start_ic.png"
                      alt=""
                      width={18}
                      height={18}
                    />
                    <Image
                      className="icon_star"
                      src="/start_ic.png"
                      alt=""
                      width={18}
                      height={18}
                    />
                    <Image
                      className="icon_star"
                      src="/start_g_ic.png"
                      alt=""
                      width={18}
                      height={18}
                    />
                  </div>
                  <div className="text-[17px] color-25 font-bold white-space-nowrap overflow-hidden text-ellipsis line-height-21 line-clamp-1">
                    Contour Powder
                  </div>
                  <div className="text-[16px] text-[#999] white-space-nowrap overflow-hidden text-ellipsis line-clamp-2 line-height-36">
                    Ive been absolutely obsessed with this lip stain lately. 16
                    Baked
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[13px] text-[#999]">wls****</span>
                    <span className="text-[13] text-[#999]">2020.08.11</span>
                  </div>
                </div>
              </Link>
            </SwiperSlide>
            <SwiperSlide>
              <Link
                href="review_list"
                className="popular_product_element relative w-[283px]"
              >
                <div className="thumbnail relative">
                  <Image
                    className="thumb_image w-[283px] h-[283px] object-cover"
                    src="/review_img02.png"
                    alt=""
                    width={283}
                    height={283}
                  />
                </div>
                <div className="product_props flex flex-col gap-4 px-5 py-5 border-[#dbdbdb] border-[1px] border-t-0">
                  <div className="flex items-center gap-2">
                    <Image
                      className="icon_star"
                      src="/start_ic.png"
                      alt=""
                      width={18}
                      height={18}
                    />
                    <Image
                      className="icon_star"
                      src="/start_ic.png"
                      alt=""
                      width={18}
                      height={18}
                    />
                    <Image
                      className="icon_star"
                      src="/start_ic.png"
                      alt=""
                      width={18}
                      height={18}
                    />
                    <Image
                      className="icon_star"
                      src="/start_ic.png"
                      alt=""
                      width={18}
                      height={18}
                    />
                    <Image
                      className="icon_star"
                      src="/start_g_ic.png"
                      alt=""
                      width={18}
                      height={18}
                    />
                  </div>
                  <div className="text-[17px] color-25 font-bold white-space-nowrap overflow-hidden text-ellipsis line-height-21 line-clamp-1">
                    Contour Powder
                  </div>
                  <div className="text-[16px] text-[#999] white-space-nowrap overflow-hidden text-ellipsis line-clamp-2 line-height-36">
                    Ive been absolutely obsessed with this lip stain lately. 16
                    Baked
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[13px] text-[#999]">wls****</span>
                    <span className="text-[13] text-[#999]">2020.08.11</span>
                  </div>
                </div>
              </Link>
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
    </div>
  );
}
