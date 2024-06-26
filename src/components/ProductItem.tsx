import "@/app/globals.css";
import Image from "next/image";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Product } from "@/lib/types";
import { CDN_URL } from "@/utils/constants";
import { getDiscount } from "@/lib/functions";
import { DataDispatchContext, MyContext } from "@/pages/_app";

type Props = {
  info?: Product;
};

function ProductItem({ info }: Props) {
  const dispatch: any = useContext(DataDispatchContext);

  const value: any = useContext(MyContext);

  const [liked, setLiked] = useState(Boolean(info?.liked));
  const [likeCnt, setLikeCnt] = useState(Number(info?.like));

  const handleFavorite = async () => {
    await axios.post("/api/interactions/write", {
      ObjectType: "product",
      ObjectID: info?.ProductID,
      InteractionType: "like",
    });
    if (liked) {
      setLikeCnt(likeCnt - 1);
    } else {
      setLikeCnt(likeCnt + 1);
    }
    setLiked(!liked);
  };

  const handleAddCart = async () => {
    if (!value.isLogin) {
      alert("Please login!");
      return;
    }

    let options = JSON.stringify([
      {
        PoID: 0,
        PoNum: 1,
      },
    ]);

    const response = await axios.get("/api/cart/write", {
      params: { options: options, productID: info?.ProductID },
    });

    if (response.status === 201) {
      alert("Add to cart successfully!");
      dispatch({
        type: "UPDATE_CART_COUNT",
        payload: 1,
      });
    } else {
      alert("Add to cart failed");
      return;
    }
  };

  return (
    <div className="relative product group">
      <Link
        href={`/product_detail/${info?.ProductID}`}
        className="font-Arial flex flex-col"
      >
        <div className="h-full max-h-[285px] border border-[#dbdbdb] rounded-t relative overflow-hidden bg-[#f7f7f7]">
          <Image
            src={`${CDN_URL}${info?.ProductImage || ""}`}
            alt=""
            width={295}
            height={294}
            className="rounded-t"
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
        <div className="2xl:p-5 xl:pt-5 xl:px-3 pb-10 border border-t-0 border-[#dbdbdb]">
          <span className="font-bold text-[18px] truncate overflow-hidden whitespace-pre-wrap line-clamp-2 min-h-[54px]">
            {info?.ProductName}
          </span>
          <p className="pt-2">
            <span className="line-through text-[#bbbbbb]">
              A${info?.InitPrice}
            </span>
            <span className="pl-[10px] text-[18px] font-bold">
              A${info?.SellPrice}
            </span>
            <span className="pl-[10px] text-[18px] text-[#fe3a40] font-bold">
              {getDiscount(info?.InitPrice, info?.SellPrice)}%
            </span>
          </p>
          <div className="flex items-center pt-3">
            <div className="flex">
              <i
                className={`block h-[18px] w-[18px] bg-[url('/product_star_ico.png')] mr-2`}
              ></i>
              <span className="mr-1 font-bold">{info?.reviewAvg}</span>
              <span className="text-[#999999]">({info?.reviewCnt})</span>
            </div>
            <div className="flex ml-[31px]">
              <i
                className={`block mt-1 h-[14px] w-[17px] bg-[url('/product_heart_ico.png')] mr-2`}
              ></i>
              <span className="text-[#555555]">{likeCnt}</span>
            </div>
          </div>
        </div>
      </Link>
      <div className="absolute hidden top-[147px] left-1/2 translate-x-[-50%] translate-y-[-50%] group-hover:flex gap-2">
        <button
          onClick={handleFavorite}
          className="w-[60px] h-[60px]"
          style={{
            backgroundImage: `url(${CDN_URL}/${
              liked ? "icon/heart_active.svg" : "icon/heart.svg"
            })`,
          }}
        ></button>
        <button
          onClick={handleAddCart}
          className="w-[60px] h-[60px] bg-[url('/product_button_cart.png')]"
        ></button>
      </div>
    </div>
  );
}

export default ProductItem;
