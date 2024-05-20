/* eslint-disable react/no-unescaped-entities */
import Dropdown from "@/components/Dropdown";
import Layout from "@/components/Layout";
import Image from "next/image";
import Pagination from "@/components/Pagi";
import Link from "next/link";
import SubNav from "@/components/SubNav";
import { parse } from "cookie";
import { getWebSetting } from "@/lib/functions";
import axios from "axios";
import { CDN_URL } from "@/utils/constants";
import he from "he";
import { getSession } from "next-auth/react";
export const getServerSideProps = async (context: { params: any, req : any }) => {

    const { params, req } = context;
    const { replyID, reviewID } = params;

    const cookies = parse(req.headers.cookie || "");

    const session : any = await getSession({ req });


    const reviewDetail = await axios.get(
      `http://localhost:3000/api/review/details`,
      {
        params: { reviewID },
      }
    );

    const reviewReplys = await axios.get(
      `http://localhost:3000/api/review/reply_list`,
    );

  
    return {
      props: {
        reply: reviewReplys.data,
        reviewDetail: reviewDetail.data,
        ...(await getWebSetting(cookies)),
      },
    };
  };
export default function ReviewDetail({reviewDetail, reply, ...props } : any) {
    const formatCreatedAt = (createdAt : any) => {
        const date = new Date(createdAt);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}.${month}.${day}`;
      };
      
  return (
      <Layout {...props}>
        <div id="main">
          <SubNav title1={reviewDetail.ProductID ? "PRODUCT REVIEW" : "COMBO REVIEW"}></SubNav>
          <div className="inner-container mt-[50px] mb-[180px]">
            <div className="text-[22px] font-bold mb-10">{reviewDetail.ProductID ? "PRODUCT REVIEW" : "COMBO REVIEW"}</div>
            <div className="border-[6px] border-[#e8e8e8] flex gap-5 px-5 py-[15px]">
              <div className="">
                <Image
                   src={`${CDN_URL}${reviewDetail.ProductImage ? reviewDetail.ProductImage : reviewDetail.ComboImage}`}
                  alt=""
                  width="90"
                  height="90"
                ></Image>
              </div>
              <div className="flex flex-col grow justify-end mt-5">
                <p className="font-bold">
                  {reviewDetail.ProductName ? (
                    <>{reviewDetail.ProductName}</>
                  ) : (
                    <>{reviewDetail.ComboName}</>
                  )}
                </p>
                <p className="text-[#ef426f] font-bold mt-1 mb-2">A${reviewDetail.ProductID ? reviewDetail.InitPriceProduct : reviewDetail.InitPrice}</p>
                <hr />
                <Link
                  href={reviewDetail.ProductID ? `/product_detail/${reviewDetail.ProductID}` : `/combo/view/${reviewDetail.ComboID}`}
                  className="flex items-center justify-center w-[150px] h-[30px] text-[15px] bg-[#84868b] rounded-md text-[#ffffff] mt-3"
                >
                  View product details
                </Link>
              </div>
            </div>
            <div>
              <div className="h-[55px] bg-[#fafafa] border-t border-b border-b-[#eeeeee] pl-5 flex items-center mt-8">
                <p className="text-lg">{reviewDetail.Title}</p>
              </div>
              <div className="h-[45px] border-b border-b-[#eeeeee] flex items-center pl-5 text-[15px]">
                <p className="text-[#999999]">
                  Writer : <span className="text-[#454545]">{reviewDetail.UserName}</span>
                </p>
                <span className="block w-[1px] h-[11px] bg-[#eeeeee] mx-[15px]"></span>
                <p className="text-[#999999]">
                  Date Created :{" "}
                  <span className="text-[#454545]">{formatCreatedAt(reviewDetail.CreatedAt)}</span>
                </p>
              </div>
              <div className="min-h-[45px] border-b border-b-[#dddddd] pl-5 py-[30px]" dangerouslySetInnerHTML={{ __html: he.decode(reviewDetail.ReviewDes) }} />
              <div className="h-[45px] border-b border-b-[#eeeeee] flex items-center pl-5 text-[15px] hidden">
                <p className="text-[#757575] min-w-[115px]">Next Post</p>
                <i className="block w-[11px] h-[6px] bg-[url('/product_review_next_post_ico.png')]"></i>
                <span className="block w-[1px] h-[11px] bg-[#eeeeee] mx-[15px]"></span>
                <Link href="" className="text-[#757575]">
                  Write a review
                </Link>
              </div>
              <div className="h-[45px] border-b border-b-[#eeeeee] flex items-center pl-5 text-[15px] hidden">
                <p className="text-[#757575] min-w-[115px]">Previous Post</p>
                <i className="block w-[11px] h-[6px] bg-[url('/product_review_previous_post_ico.png')]"></i>
                <span className="block w-[1px] h-[11px] bg-[#eeeeee] mx-[15px]"></span>
                <Link href="" className="text-[#757575]">
                  Post There are no previous posts.
                </Link>
              </div>
              <Link
                href="/review_list"
                className="flex items-center justify-center w-[140px] h-[45px] border rounded-[3px] my-[30px]"
              >
                To list
              </Link>
              {reply.data
                .filter((e: any) => e.ReviewID === reviewDetail.ReviewID) 
                .map((e: any) => (
                  e.ReplyDes && (
                    <div className="min-h-[104px] bg-[#fafafa] border-t border-b border-b-[#eeeeee] pl-5 mt-8" key={e.ReplyID}>
                      <div className="py-[25px]">
                        <p className="font-bold">
                          Administrator Reply
                          <span className="pl-6 text-[15px] text-[#999999] font-normal">
                            {formatCreatedAt(e.CreatedAt)}
                          </span>
                        </p>
                        <p className="mt-2 text-[15px]">
                          {e.ReplyDes}
                        </p>
                      </div>
                    </div>
                  )
                ))}
              {reply.data
                .filter((e: any) => e.ReviewID === reviewDetail.ReviewID).length === 0 && (
                  <div className="min-h-[104px] bg-[#fafafa] border-t border-b border-b-[#eeeeee] pl-5 mt-8">
                    <div className="py-[25px]">
                      <p className="font-bold">
                        Administrator Reply
                        <span className="pl-6 text-[15px] text-[#999999] font-normal">
                        </span>
                      </p>
                      <p className="mt-2 text-[15px]">
                        Dear Customer, First of all, We thank you for your trust in
                        the product and wish you a good product experience.
                      </p>
                    </div>
                  </div>
                )
              }


            </div>
          </div>
        </div>
      </Layout>
  );
}
