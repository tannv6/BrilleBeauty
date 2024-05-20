import "@/app/globals.css";
import { getDiscount } from "@/lib/functions";
import { CDN_URL } from "@/utils/constants";
import Image from "next/image";
import Link from "next/link";
import { useContext } from "react";
import { DataDispatchContext, MyContext } from "@/pages/_app";
import axios from "axios";

export default function ComboItem({ info }: any) {
  const dispatch: any = useContext(DataDispatchContext);

  const value: any = useContext(MyContext);
  const handleFavorite = async () => {
    await axios.post("/api/interactions/write", {
      ObjectType: "combo",
      ObjectID: info?.ComboID,
      InteractionType: "like",
    });
  };

  const handleAddCart = async () => {
    if (!value.isLogin) {
      alert("Please login!");
      return;
    }

    const response = await axios.get("/api/cart/write", {
      params: { ComboID: info?.ComboID, Quantity: 1 },
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
    <div className="relative group">
      <Link
        href={`/combo/view/${info.ComboID}`}
        className="font-Arial flex flex-col"
      >
        <div className="h-[216px] border border-[#dbdbdb] rounded-2xl relative">
          <Image
            className="object-cover rounded-2xl"
            src={`${CDN_URL}${info.ComboImage}`}
            alt=""
            fill
          />
          {/* <span className="flex items-center justify-center w-[50px] h-[30px] absolute bottom-[10px] left-3 bg-[#ffffff] text-[#fe3a40] rounded-[15px] text-[14px]">
            NEW
          </span>
          <span className="flex items-center justify-center w-[50px] h-[30px] absolute bottom-[50px] left-3 bg-[#fe3a40] text-[#ffffff] rounded-[15px] text-[14px]">
            SALE
          </span> */}
          <div className="absolute hidden top-0 w-full h-full bg-gray-400/50 z-9 rounded-2xl items-center justify-center gap-x-5 group-hover:flex"></div>
        </div>
        <div className="p-5 pb-10">
          <span className="font-bold text-[18px]">{info.ComboName}</span>
          <p className="pt-2">
            <span className="line-through text-[#bbbbbb]">
              A${info.InitPrice || "0"}
            </span>
            <span className="pl-[10px] text-[20px] font-bold">
              A${info.SellPrice || "0"}
            </span>
            <span className="pl-[15px] text-[22px] text-[#fe3a40] font-bold">
              {getDiscount(info.InitPrice, info.SellPrice)}
            </span>
          </p>
          <div className="flex items-center pt-3">
            <div className="flex">
              <i className="block h-[18px] w-[18px] bg-[url('/product_star_ico.png')] mr-2"></i>
              <span className="mr-1 font-bold">{0}</span>
              <span className="text-[#999999]">({0})</span>
            </div>
            <div className="flex ml-[31px]">
              <i className="block mt-1 h-[14px] w-[17px] bg-[url('/product_heart_ico.png')] mr-2"></i>
              <span className="text-[#555555]">{0}</span>
            </div>
          </div>
        </div>
      </Link>
      <div className="absolute hidden top-[108px] left-1/2 translate-x-[-50%] translate-y-[-50%] z-10 gap-x-2 group-hover:flex">
        <button
          onClick={handleFavorite}
          className="w-[60px] h-[60px] bg-[url('/product_button_heart.png')]"
        ></button>
        <button
          onClick={handleAddCart}
          className="w-[60px] h-[60px] bg-[url('/product_button_cart.png')]"
        ></button>
      </div>
    </div>
  );
}
