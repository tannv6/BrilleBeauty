/* eslint-disable react/no-unescaped-entities */
import Link from "next/link";
import { Fragment, useContext, useRef, useState } from "react";
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
import he from "he";
import { MyContext } from "@/pages/_app";
import { Swiper as SwiperCore } from 'swiper/types';
import ComboItem from "./ComboItem";


export default function Main({
  main_visual,
  combo,
  after_main_visual,
  main_middle,
  best_main,
  new_main,
  sale_main,
  review,
  middle,
}: any) {

  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);
  const [bestPrd, setBestPrd] = useState(best_main);
  const [comboPrd, setComboPrd] = useState(combo);
  const [newPrd, setNewPrd] = useState(new_main);
  const [salePrd, setSalePrd] = useState(sale_main);
  const [reviews, setReviews] = useState(review);
  const value: any = useContext(MyContext);
  const categoryList = JSON.parse(value?.category)?.data || [];

  

  const swiperRef = useRef<SwiperCore>();
  


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

  const getReview = async () => {
    const reviewDetail = await axios.get(
      "http://localhost:3000/api/review/list",
    );
    setReviews({
      ...reviewDetail.data,
      data: [...reviews.data, ...reviewDetail.data.data],
    });
  };

  const getCombo = async () => {
    const response6 = await axios.get(
      "http://localhost:3000/api/combo/list",
    );
    setComboPrd({
      ...response6.data,
      data: [...comboPrd.data, ...response6.data.data],
    });
  };



  const formatCreatedAt = (createdAt : any) => {
    const date = new Date(createdAt);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}.${month}.${day}`;
  };

  const renderTextOnly = (htmlContent: any) => {
    const decodedHtmlContent = he.decode(htmlContent);
    const filteredHtmlContent = decodedHtmlContent.replace(/<img[^>]*>/g, '');
    return (
        <div
            className="text-[16px] text-[#999] truncate overflow-hidden whitespace-pre-wrap line-clamp-2 min-h-[52px]"
            dangerouslySetInnerHTML={{ __html: filteredHtmlContent }}
        />
    );
};
  

  return (
    <div className="container-main">
       <div className="swiper-container relative overflow-hidden">
      <Swiper
        className=""
        loop={true}
        slidesPerView={1}
        modules={[Thumbs, Autoplay]}
        thumbs={{ swiper: thumbsSwiper }}
        autoplay={{
          delay: 5000,
          disableOnInteraction: true,
        }}
        spaceBetween={20}
        speed={800}
      >
      {main_visual?.map((e: any, i: any) => (
          <SwiperSlide key={i}>
          <Link
            href={e?.BannerLink ? e?.BannerLink : ""}
            target={e?.OpenNewTab == 1 ? "_blank" : ""}
            className={`main_visual w-full h-[882px] overflow-hidden relative block`}
          >
            <Image
              src={`${CDN_URL}${e?.BannerImg || ""}`}
              alt=""
              className="object-cover"
              fill
            />
          </Link>
          </SwiperSlide>
            ))}
      </Swiper>
      </div>
      <div className="inner-container-main">
        <div className="flex mt-[70px] items-center gap-[120px]">
          <div className="main_ttl min-w-[325px]">
            <h2 className="text-[34px] tracking-wide leading-[1.3] uppercase text-gray-700 font-bold mb-2.5">
            Need Mother's <br />
            Day <br />
            Inspiration?
            </h2>
          </div>
            <Swiper
                className="mt-[30px] relative"
                loop={true}
                slidesPerView={4}
                modules={[Thumbs, Autoplay]}
                thumbs={{ swiper: thumbsSwiper }}
                spaceBetween={20}
                onSwiper={(swiper) => {
                  swiperRef.current = swiper;
                }}
              >
                {comboPrd.data?.map((elm: any, idx: number) => (
                  <SwiperSlide key={idx}>
                    <ComboItem info={elm} />
                  </SwiperSlide>
                ))}
              </Swiper>
              <button className="absolute top-1/4 left-[450px] w-[36px] h-[37px] bg-[url('/product_rlt_arrow_prev.png')]" onClick={() => swiperRef.current?.slidePrev()}></button>
              <button className="absolute top-1/4 right-[-56px] w-[36px] h-[37px] bg-[url('/product_rlt_arrow_next.png')]" onClick={() => swiperRef.current?.slideNext()}></button>
        </div>
      </div>
      <div className="inner-container-main">
        <div className="main_banner flex my-6 relative">
          {after_main_visual?.map((e: any, i: number) => {
            return (
              <>
              <div
                  className={i === 0 ? "banner_img w-3/5 h-[725px] relative block" : "banner_img w-2/5 h-[725px] relative block"}
                  key={i}
                >
                  <Image
                    src={`${CDN_URL}${e?.BannerImg || ""}`}
                    alt=""
                    fill
                  />
                  <div className="absolute bottom-[-160px]">
                    <p className="text-[22px] font-bold mb-[15px]">
                      {e.BannerTitle}
                    </p>
                    <p className="text-[18px] text-[#000] font-medium mb-[20px] max-w-[610px]">
                      {e.BannerDes}
                    </p>
                    <Link
                      href={e?.BannerLink ? e?.BannerLink : ""}
                      target={e?.OpenNewTab == 1 ? "_blank" : ""}
                      key={i}
                      className="relative inline-block text-[14px] font-bold"
                      >
                      Shop now
                    </Link>
                    <div className="absolute bottom-[-3px] left-0 w-[68px] h-[1px] bg-black" />
                  </div>
                </div>
              </>
            );
          })}
        </div>
      </div>
      <div className="mt-[200px]">
        <div className="inner-container-main">
          <p className="text-[22px] tracking-wide leading-8 uppercase text-gray-700 font-bold mb-2.5">
            Shop by Category
          </p>
        </div>
        <Swiper
            className="mt-[30px]"
            loop={true}
            slidesPerView={4}
            modules={[Thumbs, Autoplay]}
            thumbs={{ swiper: thumbsSwiper }}
            spaceBetween={4}
            autoplay={{
              delay: 4000,
              disableOnInteraction: true,
            }}
            speed={800}
          >
            {categoryList?.map((e: any, i: any) => (
              <SwiperSlide key={i}>
                <Link
                    href={`/products/category/${e.CategoryID}`}
                    key={i}
                    >
                  <Image
                    src={`${CDN_URL}${e?.CategoryImage || ""}`}
                    alt=""
                    width={482}
                    height={640}
                  />
                  <p className="mt-[20px] text-[18px] text-center text-medium text-[#252525]">
                    {e.CategoryName}
                  </p>
                  </Link>
              </SwiperSlide>
            ))}
          </Swiper>

      </div>
      <div className="inner-container-main">
        <div className="flex mt-[70px] items-center gap-[120px]">
          <div className="main_ttl min-w-[325px]">
            <h2 className="text-[34px] tracking-wide leading-[1.3] uppercase text-gray-700 font-bold mb-2.5">
              BEST <br /> PRODUCTS
            </h2>
            <p className="text-[18px] mt-[45px] text-[#252525] text-medium">
              We've done the searching for you and handpicked the gifts she's guaranteed to love... 
            </p>
          </div>
            <Swiper
                className="mt-[30px] relative"
                loop={true}
                slidesPerView={4}
                modules={[Thumbs, Autoplay]}
                thumbs={{ swiper: thumbsSwiper }}
                spaceBetween={20}
                onSwiper={(swiper) => {
                  swiperRef.current = swiper;
                }}
              >
                {bestPrd.list?.map((elm: any, idx: number) => (
                  <SwiperSlide key={idx}>
                    <ProductItem info={elm} />
                  </SwiperSlide>
                ))}
              </Swiper>
              <button className="absolute top-1/4 left-[450px] w-[36px] h-[37px] bg-[url('/product_rlt_arrow_prev.png')]" onClick={() => swiperRef.current?.slidePrev()}></button>
              <button className="absolute top-1/4 right-[-56px] w-[36px] h-[37px] bg-[url('/product_rlt_arrow_next.png')]" onClick={() => swiperRef.current?.slideNext()}></button>
        </div>
        {/* {bestPrd.currentPage < bestPrd.totalPage && (
          <div className="btn flex items-center justify-center mt-[45px]">
            <button
              onClick={handleLoadMoreBest}
              type="button"
              className="btn_more py-[15px] px-[65px] text-[#f15981] text-18 border-[#f15981] border-[1px] rounded-md transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-f04b76"
            >
              See More
            </button>
          </div>
        )} */}
        <div className="main_ttl mt-[80px]">
          <p className="text-[22px] tracking-wide leading-8 uppercase text-gray-700 font-bold mb-2.5">
            NEW FOR YOU
          </p>
        </div>
        <>
          <Swiper
              className="mt-[30px]"
              loop={true}
              slidesPerView={6}
              modules={[Thumbs, Autoplay]}
              thumbs={{ swiper: thumbsSwiper }}
              spaceBetween={20}
            >
              {newPrd.list?.map((elm: any, idx: number) => (
                <SwiperSlide key={idx}>
                  <ProductItem info={elm} />
                </SwiperSlide>
              ))}
            </Swiper>
          </>
        {/* {newPrd.currentPage < newPrd.totalPage && (
          <div className="btn flex items-center justify-center mt-[45px]">
            <button
              onClick={handleLoadMoreNew}
              type="button"
              className="btn_more py-[15px] px-[65px] text-[#f15981] text-18 border-[#f15981] border-[1px] rounded-md transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-f04b76"
            >
              See More
            </button>
          </div>
        )} */}
      </div>
      {main_middle && main_middle.BannerImg && (
        <Link
          href={main_middle?.BannerLink ? main_middle?.BannerLink : ""}
          target={main_middle?.OpenNewTab == 1 ? "_blank" : ""}
          className="my-[80px] w-full h-[648px] relative block"
        >
          <Image
            src={`${CDN_URL}${main_middle?.BannerImg || ""}`}
            alt=""
            className="object-cover"
            fill
          />
        </Link>
      )}
      <div className="inner-container-main">
        <div className="flex mt-[70px] items-center gap-[120px]">
          <div className="main_ttl min-w-[325px]">
            <h2 className="text-[34px] tracking-wide leading-[1.3] uppercase text-gray-700 font-bold mb-2.5">
              BIG <br /> SALES
            </h2>
            <p className="text-[18px] mt-[45px] text-[#252525] text-medium">
              We've done the searching for you and handpicked the gifts she's guaranteed to love... 
            </p>
          </div>
          <>
            <Swiper
              className="mt-[30px]"
              loop={true}
              slidesPerView={4}
              modules={[Thumbs, Autoplay]}
              thumbs={{ swiper: thumbsSwiper }}
              spaceBetween={20}
            >
              {salePrd.list?.map((elm: any, idx: number) => (
                <SwiperSlide key={idx}>
                  <ProductItem info={elm} />
                </SwiperSlide>
              ))}
            </Swiper>
          </>
        </div>
        {/* {salePrd.currentPage < salePrd.totalPage && (
          <div className="btn flex items-center justify-center mt-[45px]">
            <button
              onClick={handleLoadMoreSale}
              type="button"
              className="btn_more py-[15px] px-[65px] text-[#f15981] text-18 border-[#f15981] border-[1px] rounded-md transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-f04b76"
            >
              See More
            </button>
          </div>
        )} */}
        <div className="main_ttl text-center mt-[100px]">
          <p className="text-[28px] tracking-wide leading-8 uppercase text-gray-700 font-bold mb-2.5">
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
            slidesPerView={6}
            modules={[Thumbs, Autoplay]}
            thumbs={{ swiper: thumbsSwiper }}
            autoplay={{
              delay: 3000,
              disableOnInteraction: true,
            }}
            spaceBetween={20}
          >
          {reviews.data?.map((e: any, i: any) => (
            <SwiperSlide key={i}>
              <Link
                href={`/review_detail/${e?.ReviewID}`}
                className="popular_product_element relative"
              >
                <div className="thumbnail relative">
                {e.Img1 ? (
                    <Image
                      src={`${CDN_URL}${e.Img1}`}
                      className="thumb_image w-[283px] h-[283px] object-cover border border-[#dbdbdb] rounded-t-2xl"
                      alt=""
                      width={283}
                      height={283}
                    />
                  ) : (
                    <Image
                      src="no_img.png"
                      className="thumb_image w-[283px] h-[283px] object-cover border border-[#dbdbdb] rounded-t-2xl"
                      alt=""
                      width={283}
                      height={283}
                    />
                  )}
                </div>
                <div className="product_props flex flex-col gap-4 px-5 py-5 border-[#dbdbdb] border-[1px] border-t-0">
                  <div className="flex items-center gap-2">
                    {Array.from({ length: Math.min(Math.max(0, e.Start), 5) }).map((_, index) => (
                      <i key={index} className="w-[17px] h-[17px] bg-[url('/product_detail/comment_star_ico_on.png')]"></i>
                    ))}
                    {Array.from({ length: Math.max(0, 5 - Math.min(Math.max(0, e.Start), 5)) }).map((_, index) => (
                      <i key={index + e.Start} className="w-[17px] h-[17px] bg-[url('/product_detail/comment_star_ico_off.png')]"></i>
                    ))}
                  </div>
                  <div className="text-[17px] color-25 font-bold white-space-nowrap overflow-hidden text-ellipsis line-height-21 line-clamp-1">
                      {e.Title}
                  </div>
                  <div className="text-[16px] text-[#999] truncate overflow-hidden whitespace-pre-wrap line-clamp-2 min-h-[52px]">
                    {renderTextOnly(e.ReviewDes)}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[15px] text-[#999]">{e.UserName && e.UserName}</span>
                    <span className="text-[13] text-[#999]">{formatCreatedAt(e.CreatedAt)}</span>
                  </div>
                </div>
              </Link>
            </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
      {middle && middle.BannerImg && (
      <>
          <Link
            href={middle?.BannerLink ? middle?.BannerLink : ""}
            target={middle?.OpenNewTab == 1 ? "_blank" : ""}
            className="my-[80px] w-full h-[316px] relative block"
          >
            <Image
              src={`${CDN_URL}${middle?.BannerImg || ""}`}
              alt=""
              className="object-cover"
              fill
            />
          </Link>
        </>
        )}
    </div>
  );
}
