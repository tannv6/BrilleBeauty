import Link from "next/link";
import React, { useContext } from "react";
import Image from "next/image";
import { CDN_URL } from "@/utils/constants";
import { MyContext } from "@/pages/_app";
function Footer() {
  const value: any = useContext(MyContext);
  const webSetting = JSON.parse(value?.webSetting || "{}") || {};
  return (
    <div>
      <div className="py-[65px] bg-[#f6f6f6] border-[#dbdbdb] border-t-[1px]">
        <div className="inner-container flex items-center justify-between">
          <div className="flex gap-[75px] items-center">
            <div className="logo">
              <Image
                src={`${CDN_URL}${webSetting?.logo_footer || ""}`}
                alt=""
                width={210}
                height={80}
              />
            </div>
            <div>
              <ul className="flex items-center gap-10 mb-[30px]">
                <li>
                  <Link
                    href={"/info/about"}
                    className="text-[15px] text-[#252525] font-bold"
                  >
                    ABOUT BEAUTY
                  </Link>
                </li>
                <li>
                  <Link href={"/info/term"} className="text-[15px] text-[#252525] font-bold">
                    TERMS OF USE
                  </Link>
                </li>
                <li>
                  <Link href={"/info/store"} className="text-[15px] text-[#252525] font-bold">
                    STORE INFORMATION
                  </Link>
                </li>
              </ul>
              <p className="text-[18px] text-[#999] leading-6">
                {webSetting?.addr1 || ""} {webSetting?.addr1 ? ", " : ""}{" "}
                {webSetting?.addr2 || ""}
              </p>
              <p className="text-[18px] text-[#999] leading-6">
                Phone number : {webSetting?.custom_phone || ""}
              </p>
              <p className="text-[18px] text-[#999] leading-6">
                Mail order business report: {webSetting?.email || ""}
              </p>
              <p className="text-[18px] text-[#999] leading-6 mt-[35px]">
                {webSetting?.buytext || ""}
              </p>
              <p className="text-[18px] text-[#999] leading-6 mt-[30px]">
                Copyright ⓒ 2023 juntile., Ltd. All rights reserved.
              </p>
            </div>
          </div>
          <div>
            <p className="text-[18px] font-bold text-[#454545] leading-6">
              Subscribe To Our Newsletter
            </p>
            <div className="flex mt-4">
              <input
                placeholder="Enter your email here...."
                type="text"
                className=" peer h-[34px] w-[260px] rounded-l-md bg-gray-50 px-4 py-[10px] text-[14px] text-[#999] outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-f04b76"
              />
              <button className="h-[34px] w-[100px] rounded-r-md flex items-center justify-center text-[14px] text-white bg-[#000] text-center">
                Subcribe
              </button>
            </div>
            <div className="flex gap-[10px] mt-[20px]">
             <Link href={"/"}>
              <Image
                  src="/ico_ins.png"
                  alt=""
                  width={31}
                  height={31}
                />
              </Link>
              <Link href={"/"}>
                <Image
                  src="/ico_fb.png"
                  alt=""
                  width={33}
                  height={33}
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-[#cc1426] h-[62px]"></div>
    </div>
  );
}

export default Footer;
