import "@/app/globals.css";
import Image from "next/image";
import Link from "next/link";

function ProductItem({
  image,
  name,
  oriPrice,
  salePrice,
  discount,
  star,
  starCount,
  heartCount,
}: any) {
  return (
    <>
      <div className="font-Arial flex flex-col">
        <div className="h-[294px] border border-[#dbdbdb] rounded-t-2xl relative group">
          <Image src={image} alt="" width={286} height={294} />
          <span className="flex items-center justify-center w-[50px] h-[30px] absolute bottom-[10px] left-3 bg-[#ffffff] text-[#fe3a40] rounded-[15px] text-[14px]">
            NEW
          </span>
          <span className="flex items-center justify-center w-[50px] h-[30px] absolute bottom-[50px] left-3 bg-[#fe3a40] text-[#ffffff] rounded-[15px] text-[14px]">
            SALE
          </span>
          <div className="absolute hidden top-0 w-full h-full bg-black-rgba z-10 rounded-t-2xl items-center justify-center gap-x-5 group-hover:flex">
            <button className="w-[60px] h-[60px] bg-[url('/product_button_heart.png')]"></button>
            <button className="w-[60px] h-[60px] bg-[url('/product_button_cart.png')]"></button>
          </div>
        </div>
        <div className="p-5 pb-10 border border-t-0 border-[#dbdbdb]">
          <Link href={`/product_detail`} className="font-bold text-[18px]">{name}</Link>
          <p className="pt-2">
            <span className="line-through text-[#bbbbbb]">${oriPrice}</span>
            <span className="pl-[10px] text-[20px] font-bold">${salePrice}</span>
            <span className="pl-[15px] text-[22px] text-[#fe3a40] font-bold">
              {discount}%
            </span>
          </p>
          <div className="flex items-center pt-3">
            <div className="flex">
              <i className="block h-[18px] w-[18px] bg-[url('/product_star_ico.png')] mr-2"></i>
              <span className="mr-1 font-bold">{star}</span>
              <span className="text-[#999999]">({starCount})</span>
            </div>
            <div className="flex ml-[31px]">
              <i className="block mt-1 h-[14px] w-[17px] bg-[url('/product_heart_ico.png')] mr-2"></i>
              <span className="text-[#555555]">{heartCount}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductItem;
