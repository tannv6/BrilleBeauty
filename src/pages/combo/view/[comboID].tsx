import { useRef, useState } from "react";
import Layout from "@/components/Layout";
import SubNav from "@/components/SubNav";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Thumbs } from "swiper/modules";
import "swiper/css";
import "swiper/css/thumbs";
import "@/app/globals.css";
import Dropdown from "@/components/Dropdown";
import ComboDetailNav from "@/components/ComboDetailNav";
import Image from "next/image";
import Pagi from "@/components/Pagi";
import Link from "next/link";
import axios from "axios";
import { parse } from "cookie";
import { getWebSetting } from "@/lib/functions";
import { getSession } from "next-auth/react";
import { log } from "console";
import he from "he";
import { Swiper as SwiperCore } from "swiper/types";
import ReviewDetail from "../../review_detail";

const CDN_URL = process.env.NEXT_PUBLIC_CDN_URL;
export const getServerSideProps = async (context: {
  params: any;
  query: any;
  req: any;
}) => {
  const { params, query } = context;
  const { comboID, reviewID } = params;
  const comboDetail = await axios.get(
    `http://localhost:3000/api/combo/detail`,
    {
      params: { comboID },
    }
  );

  const result1 = await axios.get(
    "http://localhost:3000/api/combo_category/list"
  );

  const result2 = await axios.get("http://localhost:3000/api/season/list");

  return {
    props: {
      comboDetail: comboDetail.data,
      categoryList: result1.data.data.map((e: any) => ({
        id: e.CategoryID,
        name: e.CategoryName,
        IsSeasonal: e.IsSeasonal || 0,
      })),
      seasonList: result2.data.data.map((e: any) => ({
        id: e.SeasonID,
        name: e.SeasonName,
      })),
    },
  };
};
type Props = {
  comboDetail: {
    ComboID: any;
    ComboName: any;
    Description: any;
    InitPrice: any;
    SellPrice: any;
    Quantity: any;
    ComboImage: any;
    CategoryID: any;
    CreatedAt: any;
    UpdatedAt: any;
    DeletedAt: any;
    SaleDate: any;
    SaleEndDate: any;
    IsBigSale: any;
    IsBest: any;
    IsNew: any;
    SeasonID: any;
    Images: any[];
    Highlight: any;
  };
  categoryList: any;
  seasonList: any;
};
export default function Face({ comboDetail, categoryList, seasonList }: Props) {
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);
  const [isHeart, setIsHeart] = useState<boolean>(true);
  const [numProduct, setNumProduct] = useState<number>(1);

  const calculateNewPrice = (price: number, numProduct: number) => {
    return price * numProduct;
  };

  const handleUpdateNumProduct = (type: "plus" | "minus") => {
    if (type === "plus") {
      setNumProduct(numProduct + 1);
    } else {
      setNumProduct(numProduct - 1);
    }
  };

  async function handleAddCart() {
    const response = await axios.get("http://localhost:3000/api/cart/write", {
      params: { ComboID: comboDetail?.ComboID },
    });

    if (response.status === 201) {
      alert("Add to cart successfully!");
    } else {
      alert("Add to cart failed");
      return;
    }
  }

  const comboImages = comboDetail?.Images;

  return (
    <Layout>
      <div id="main">
        <SubNav title1={comboDetail?.ComboName} />
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
                {comboImages?.map((image: any, index: number) => (
                  <SwiperSlide key={index}>
                    <div>
                      <Image
                        src={`${CDN_URL}${image.ImageURL}`}
                        alt=""
                        width={556}
                        height={555}
                      />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
              <div className="mt-[10px] mx-auto">
                <Swiper
                  className="w-[556px] select-none swiper_two"
                  modules={[Thumbs]}
                  watchSlidesProgress
                  onSwiper={setThumbsSwiper}
                  slidesPerView={5}
                  spaceBetween={10}
                >
                  {comboImages?.map((image: any, index: number) => {
                    return (
                      <SwiperSlide key={index}>
                        <div>
                          <Image
                            src={`${CDN_URL}${image.ImageURL}`}
                            alt=""
                            width={556}
                            height={555}
                          />
                        </div>
                      </SwiperSlide>
                    );
                  })}
                </Swiper>
              </div>
            </div>
            <div className="basis-[580px] flex flex-col">
              <div className="pb-5">
                <p className="text-[32px] font-bold">
                  {comboDetail?.ComboName}
                </p>
                <p className="pt-2">
                  <span className="text-[28px] font-bold text-[#ef426f]">
                    A${comboDetail?.InitPrice}
                  </span>
                  <span className="line-through text-lg text-[#999999] pl-3">
                    A${comboDetail?.SellPrice}
                  </span>
                </p>
              </div>
              <hr />
              <div className="py-5">
                <div className="flex">
                  <span className="text-lg min-w-[190px]">Highlight</span>
                  <div className="flex-1">{comboDetail?.Highlight}</div>
                </div>
              </div>
              <hr />
              <div className="py-5">
                <div className="flex items-center justify-between">
                  <div className="max-w-[200px]">
                    <p className="text-[#454545] min-w-[60px]">Quantity</p>
                  </div>
                  <div className="flex flex-row">
                    <button
                      onClick={() => handleUpdateNumProduct("minus")}
                      className="rounded-l w-[33px] h-[33px] bg-[url('/product_detail/product_number_desc_btn.png')]"
                    ></button>
                    <input
                      type="number"
                      value={numProduct}
                      className="pt-1 border border-x-0 text-center min-w-[46px] max-w-[46px] h-[33px] outline-0"
                    />
                    <button
                      onClick={() => handleUpdateNumProduct("plus")}
                      className="rounded-r w-[33px] h-[33px] bg-[url('/product_detail/product_number_asc_btn.png')]"
                    ></button>
                  </div>
                </div>
              </div>
              <hr />
              <div className="pt-5">
                <div className="flex justify-between items-center">
                  <p>
                    <span className="text-lg">Total</span>
                    <span className="text-[#757575] pl-1"></span>
                  </p>
                  <p className="text-[28px] font-bold text-[#ef426f]">
                    A${calculateNewPrice(comboDetail?.SellPrice, numProduct)}
                  </p>
                </div>
                <div className="flex gap-3 pt-5">
                  <button
                    className={`w-14 h-14 shrink-0 rounded ${
                      isHeart
                        ? "bg-[url('/product_detail/product_heart_on_btn.png')]"
                        : "bg-[url('/product_detail/product_heart_btn.png')]"
                    }`}
                    onClick={() => {
                      setIsHeart(!isHeart);
                    }}
                  ></button>
                  <button
                    type="button"
                    onClick={() => handleAddCart()}
                    className="basis-full rounded border border-[#252525]"
                  >
                    Add To Cart
                  </button>
                  <button className="basis-full rounded bg-[#ef426f] text-[#ffffff]">
                    Buy Now
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div id="product_in4" className="mt-[175px] mb-[60px]">
            <ComboDetailNav tab="1" />
          </div>
          <div
            className="justify-center"
            dangerouslySetInnerHTML={{
              __html: he.decode(comboDetail?.Description || ""),
            }}
          />
          <div id="product_rvw" className="mt-[120px] mb-[60px]">
            <ComboDetailNav tab="2" />
          </div>
          <div className="">
            <div className="flex justify-between pb-5">
              <p className="text-xl">
                <span className="font-bold">PRODUCT REVIEWS</span>
                <span className="text-[#757575]">(12)</span>
              </p>
              <Link href={`/write_review?ProductID=${comboDetail?.ComboID}`}>
                <button className="w-[130px] h-[35px] border border-[#ef426f] rounded text-[#ef426f] font-medium">
                  Write review
                </button>
              </Link>
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
                  <p className="text-xl font-medium"></p>
                  <p className="text-[#999999]">CONTOUR POWDER</p>
                  <p>
                    <span className="font-medium text-[17px]">uwa***</span>
                    <span className="text-[15px] text-[#999999] pl-3">
                      Ive been absolutely obsessed with this lip stain lately.
                      16 Baked...
                    </span>
                  </p>
                  <div className="flex gap-[10px]">
                    <div className="w-[110px] h-[110px] bg-[#eeeeee] rounded-[5px]"></div>
                    <div className="w-[110px] h-[110px] bg-[#eeeeee] rounded-[5px]"></div>
                  </div>
                  <div className="flex gap-[10px]">
                    <button className="w-[140px] h-[36px] bg-[url('/product_detail/comment_show_btn.png')] rounded-[5px] text-[15px] text-[#757575] pl-3 pt-0.5">
                      COMMENT
                    </button>
                    <button className="w-[140px] h-[36px] rounded-[5px] text-[15px] text-[#757575] border">
                      WRITE COMMENT
                    </button>
                  </div>
                </div>
                <div className="flex basis-[20%] items-start justify-end gap-[10px]">
                  <button className="w-[100px] h-7 text-[15px] text-[#999999] border rounded">
                    EDIT
                  </button>
                  <button className="w-[100px] h-7 text-[15px] text-[#999999] border rounded">
                    DELETE
                  </button>
                </div>
              </div>
              <hr />
              <div className="flex items-center justify-center h-[123px] bg-[#f9f9f9] border-b">
                <div className="flex w-[1131px] h-[82px]">
                  <textarea
                    placeholder="Please enter your comment."
                    className="focus:outline-none placeholder:text-lg p-5 pt-3 border rounded-l-[5px] grow resize-none"
                  />
                  <button className="w-[120px] rounded-r bg-[#ef426f] text-lg text-[#ffffff]">
                    OK
                  </button>
                </div>
              </div>
            </div>

            <Pagi></Pagi>
          </div>
        </div>
      </div>
    </Layout>
  );
}
