import Dropdown from "@/components/Dropdown";
import Layout from "@/components/Layout";
import Image from "next/image";
import Pagination from "@/components/Pagi";
import Link from "next/link";
import SubNav from "@/components/SubNav";
import ProductItem from "@/components/ReviewItem";
import { getWebSetting } from "@/lib/functions";
import { parse } from "cookie";
import axios from "axios";
import { CDN_URL } from "@/utils/constants";
import he from "he";

export async function getServerSideProps({ params, query, req }: any) {
  const cookies = parse(req.headers.cookie || "");
  const reviewDetail = await axios.get(
    `http://localhost:3000/api/review/list`,
  );
  return {
    props: {
      review: reviewDetail.data,
      ...(await getWebSetting(cookies)),
    },
  };
}
export default function ReviewList({review, ...props } : any) {
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
      <Layout {...props}>
        <div id="main">
          <SubNav title1="Review Board"></SubNav>
          <div className="inner-container mt-[50px]">
            <div className="flex justify-between items-center mb-10">
              <div className="text-[22px] font-bold">REVIEW BOARD</div>
              <input
                type="text"
                className="border w-[320px] h-[52px] rounded-md pl-5 pr-12 placeholder:text-base outline-none focus:ring-1 focus:ring-f04b76 bg-no-repeat bg-[center_right_1rem] bg-[url('/search_item_ico.png')]"
                placeholder="Please enter your search term."
              />
            </div>
            <div className="grid grid-cols-4 gap-x-5 gap-y-[30px]">
            {review.data?.map((e : any, i : any) => (
                <Link href={`/review_detail/${e?.ReviewID}`} className="popular_product_element relative" key={i}>
                    <div className="thumbnail relative">
                        {e.Img1 ? (
                          <Image 
                          className="thumb_image w-[285px] h-[285px] object-cover border border-[#dbdbdb] rounded-t-2xl" 
                          src={`${CDN_URL}${e.Img1}`} alt="" 
                          width={283} 
                          height={283} />
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
                    <div className="product_props flex flex-col gap-3 px-5 py-5 border-[#dbdbdb] border-[1px] border-t-0">
                        <div className="flex items-center gap-1">
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
                        <div className="text-[16px] text-[#999] white-space-nowrap overflow-hidden text-ellipsis line-clamp-2 line-height-36">
                        {renderTextOnly(e.ReviewDes)}
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-[13px] text-[#999]">{e.UserName}</span>
                            <span className="text-[13] text-[#999]">{formatCreatedAt(e.CreatedAt)}</span>
                        </div>
                    </div>
                </Link>
            ))}
            </div>
            <Pagination></Pagination>
          </div>
        </div>
      </Layout>
  );
}
