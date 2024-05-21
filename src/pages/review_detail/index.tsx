/* eslint-disable react/no-unescaped-entities */
import Dropdown from "@/components/Dropdown";
import Layout from "@/components/Layout";
import Image from "next/image";
import Pagination from "@/components/Pagi";
import Link from "next/link";
import SubNav from "@/components/SubNav";
import { parse } from "cookie";
export async function getServerSideProps({ params, query, req }: any) {
  const cookies = parse(req.headers.cookie || "");
  return {
    props: {
    },
  };
}
export default function ReviewDetail() {
  return (
      <Layout>
        <div id="main">
          <SubNav title1="Product Review"></SubNav>
          <div className="inner-container mt-[50px] mb-[180px]">
            <div className="text-[22px] font-bold mb-10">PRODUCT REVIEW</div>
            <div className="border-[6px] border-[#e8e8e8] flex gap-5 px-5 py-[15px]">
              <div className="">
                <Image
                  src="/product_review_thumb_img.png"
                  alt=""
                  width="90"
                  height="90"
                ></Image>
              </div>
              <div className="flex flex-col grow justify-end mt-5">
                <p className="font-bold">
                  Pubble Product Details This product is for testing purposes
                  only.
                </p>
                <p className="text-[#ef426f] font-bold mt-1 mb-2">A$16.25</p>
                <hr />
                <Link
                  href=""
                  className="flex items-center justify-center w-[150px] h-[30px] text-[15px] bg-[#84868b] rounded-md text-[#ffffff] mt-3"
                >
                  View product details
                </Link>
              </div>
            </div>
            <div>
              <div className="h-[55px] bg-[#fafafa] border-t border-b border-b-[#eeeeee] pl-5 flex items-center mt-8">
                <p className="text-lg">Pubble review test</p>
              </div>
              <div className="h-[45px] border-b border-b-[#eeeeee] flex items-center pl-5 text-[15px]">
                <p className="text-[#999999]">
                  Writer : <span className="text-[#454545]">hye***</span>
                </p>
                <span className="block w-[1px] h-[11px] bg-[#eeeeee] mx-[15px]"></span>
                <p className="text-[#999999]">
                  Date Created :{" "}
                  <span className="text-[#454545]">2023-06-13</span>
                </p>
              </div>
              <div className="min-h-[45px] border-b border-b-[#dddddd] pl-5 py-[30px]">
                <Image
                  src="/product_review_img.png"
                  alt=""
                  width="630"
                  height="316"
                ></Image>
                <p className="pt-5 text-[15px]">
                  I really loved the set you can build up the powder to go from
                  super natural to more strong shading <br />
                  the powder has a fine texture so you don't get loose powder
                  all over when taking product with <br />
                  the included bursh wich is really flexible and soft! makes the
                  application go really smooth
                </p>
              </div>
              <div className="h-[45px] border-b border-b-[#eeeeee] flex items-center pl-5 text-[15px]">
                <p className="text-[#757575] min-w-[115px]">Next Post</p>
                <i className="block w-[11px] h-[6px] bg-[url('/product_review_next_post_ico.png')]"></i>
                <span className="block w-[1px] h-[11px] bg-[#eeeeee] mx-[15px]"></span>
                <Link href="" className="text-[#757575]">
                  Write a review
                </Link>
              </div>
              <div className="h-[45px] border-b border-b-[#eeeeee] flex items-center pl-5 text-[15px]">
                <p className="text-[#757575] min-w-[115px]">Previous Post</p>
                <i className="block w-[11px] h-[6px] bg-[url('/product_review_previous_post_ico.png')]"></i>
                <span className="block w-[1px] h-[11px] bg-[#eeeeee] mx-[15px]"></span>
                <Link href="" className="text-[#757575]">
                  Post There are no previous posts.
                </Link>
              </div>
              <Link
                href=""
                className="flex items-center justify-center w-[140px] h-[45px] border rounded-[3px] my-[30px]"
              >
                To list
              </Link>
              <div className="min-h-[104px] bg-[#fafafa] border-t border-b border-b-[#eeeeee] pl-5 mt-8">
                <div className="py-[25px]">
                  <p className="font-bold">
                    Administrator Reply
                    <span className="pl-6 text-[15px] text-[#999999] font-normal">
                      2023-06-13
                    </span>
                  </p>
                  <p className="mt-2 text-[15px]">
                    Dear Customer, First of all, We thank you for your trust in
                    the product and wish you a good product experience.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
  );
}
