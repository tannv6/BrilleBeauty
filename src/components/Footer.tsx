import Link from "next/link";
import React from "react";
import Image from "next/image";
import { WebSetting } from "./Layout";
import { CDN_URL } from "@/utils/constants";
type Props = {
  webSetting?: WebSetting;
};
function Footer({ webSetting }: Props) {
  return (
    <div>
      <div className="footer_top py-5 bg-[#f6f6f6] border-[#dbdbdb] border-[1px] border-l-0 border-r-0">
        <nav className="inner-container">
          <ul className="flex items-center gap-10">
            <li>
              <Link
                href={"/info/about"}
                className="text-[15px] text-[#454545] font-bold"
              >
                ABOUT BEAUTY
              </Link>
            </li>
            <li>
              <Link href={"/info/term"} className="text-[15px] text-[#757575]">
                TERMS OF USE
              </Link>
            </li>
            <li>
              <Link href={"/info/store"} className="text-[15px] text-[#757575]">
                STORE INFORMATION
              </Link>
            </li>
          </ul>
        </nav>
      </div>
      <div className="py-[65px]">
        <div className="inner-container flex justify-between">
          <div className="flex gap-[75px]">
            <div className="logo">
              <Image
                src={`${CDN_URL}${webSetting?.logo_footer || ""}`}
                alt=""
                width={234}
                height={33}
              />
            </div>
            <div>
              <p className="text-[15px] text-[#999] leading-6">
                {webSetting?.addr1 || ""} {webSetting?.addr1 ? ", " : ""}{" "}
                {webSetting?.addr2 || ""}
              </p>
              <p className="text-[15px] text-[#999] leading-6">
                Phone number : {webSetting?.custom_phone || ""}
              </p>
              <p className="text-[15px] text-[#999] leading-6">
                Mail order business report: {webSetting?.email || ""}
              </p>
              <p className="text-[15px] text-[#999] leading-6 mt-[35px]">
                {webSetting?.buytext || ""}
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
              <button className="h-[34px] w-[100px] rounded-r-md flex items-center justify-center text-[14px] text-white bg-[#f04b76] text-center">
                Subcribe
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
