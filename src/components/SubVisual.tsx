import "@/app/globals.css";
import { CDN_URL } from "@/utils/constants";
import Image from "next/image";

function SubVisual({ title1, title2, thumbnail }: any) {
  const thumbnailImage = thumbnail?.[0]?.BannerImg
    ? `${CDN_URL}${thumbnail?.[0]?.BannerImg}`
    : "/sub_face/main_visual.png";
  return (
    <div className="w-full h-[340px] relative">
      <Image src={thumbnailImage} alt={""} fill className="object-cover z-0" />
      <div className="flex justify-center flex-col gap-5 h-full pl-[415px] relative z-1">
        <p className="text-black text-[32px] font-[700]">{title1}</p>
        <div className="flex flex-row items-center gap-x-3">
          <p className="text-[#757575]">Home</p>
          <i className="block w-[9px] h-4 bg-[url('/sub_face/main_visual_arrow.png')]"></i>
          <p className="text-[#757575]">{title1}</p>
          <i className="block w-[9px] h-4 bg-[url('/sub_face/main_visual_arrow.png')]"></i>
          <p className="text-[#757575]">{title2}</p>
        </div>
      </div>
    </div>
  );
}

export default SubVisual;
