import "@/app/globals.css";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";
import { Product } from "@/lib/types";
import { CDN_URL } from "@/utils/constants";
import { getDiscount } from "@/lib/functions";

type Props = {
  info?: Product;
};

function ProductItem({ info }: Props) {
  const handleFavorite = async () => {
    await axios.post("/api/interactions/write", {
      ObjectType: "product",
      ObjectID: info?.ProductID,
      InteractionType: "like",
    });
  };
  return (
    <div className="relative product group">
      <Link
        href={`/product_detail/${info?.ProductID}`}
        className="font-Arial flex flex-col"
      >
        <div className="h-[294px] border border-[#dbdbdb] rounded-t-2xl relative ">
          <Image
            src={`${CDN_URL}${info?.ProductImage || ""}`}
            alt=""
            width={286}
            height={294}
          />
          {Boolean(info?.IsNew) && (
            <span className="flex items-center justify-center w-[50px] h-[30px] absolute bottom-[10px] left-3 bg-[#ffffff] text-[#fe3a40] rounded-[15px] text-[14px]">
              NEW
            </span>
          )}
          {Boolean(info?.IsBigSale) && (
            <span className="flex items-center justify-center w-[50px] h-[30px] absolute bottom-[50px] left-3 bg-[#fe3a40] text-[#ffffff] rounded-[15px] text-[14px]">
              SALE
            </span>
          )}
          <div className="absolute hidden top-0 w-full h-full bg-gray-400/50 z-9 rounded-t-2xl items-center justify-center gap-x-5 group-hover:flex"></div>
        </div>
        <div className="p-5 pb-10 border border-t-0 border-[#dbdbdb]">
          <span className="font-bold text-[18px]">{info?.ProductName}</span>
          <p className="pt-2">
            <span className="line-through text-[#bbbbbb]">
              A${info?.InitPrice}
            </span>
            <span className="pl-[10px] text-[20px] font-bold">
              A${info?.SellPrice}
            </span>
            <span className="pl-[15px] text-[22px] text-[#fe3a40] font-bold">
              {getDiscount(info?.InitPrice, info?.SellPrice)}%
            </span>
          </p>
          <div className="flex items-center pt-3">
            <div className="flex">
              <i className="block h-[18px] w-[18px] bg-[url('/product_star_ico.png')] mr-2"></i>
              <span className="mr-1 font-bold">{info?.BrandID}</span>
              <span className="text-[#999999]">({info?.BrandID})</span>
            </div>
            <div className="flex ml-[31px]">
              <i className="block mt-1 h-[14px] w-[17px] bg-[url('/product_heart_ico.png')] mr-2"></i>
              <span className="text-[#555555]">{info?.BrandID}</span>
            </div>
          </div>
        </div>
      </Link>
      <div className="absolute hidden top-[147px] left-1/2 translate-x-[-50%] translate-y-[-50%] group-hover:flex gap-2">
        <button
          onClick={handleFavorite}
          className="w-[60px] h-[60px] bg-[url('/product_button_heart.png')]"
        ></button>
        <button className="w-[60px] h-[60px] bg-[url('/product_button_cart.png')]"></button>
      </div>
    </div>
  );
}

export default ProductItem;
