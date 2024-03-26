import Dropdown from "@/components/Dropdown";
import Layout from "@/components/Layout";
import Image from "next/image";
import Pagination from "@/components/Pagi";
import Link from "next/link";
import SubNav from "@/components/SubNav";
import ProductItem from "@/components/ReviewItem";
import { getWebSetting } from "@/lib/functions";
import { parse } from "cookie";
export async function getServerSideProps({ params, query, req }: any) {
  const cookies = parse(req.headers.cookie || "");
  return {
    props: {
      ...(await getWebSetting(cookies)),
    },
  };
}
export default function ReviewList({ ...props }) {
  return (
    <>
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
              <ProductItem image="/review_img01.png"></ProductItem>
              <ProductItem image="/review_img02.png"></ProductItem>
              <ProductItem image="/review_img03.png"></ProductItem>
              <ProductItem image="/review_img04.png"></ProductItem>
              <ProductItem image="/review_img01.png"></ProductItem>
              <ProductItem image="/review_img02.png"></ProductItem>
              <ProductItem image="/review_img03.png"></ProductItem>
              <ProductItem image="/review_img04.png"></ProductItem>
              <ProductItem image="/review_img01.png"></ProductItem>
              <ProductItem image="/review_img02.png"></ProductItem>
              <ProductItem image="/review_img03.png"></ProductItem>
              <ProductItem image="/review_img04.png"></ProductItem>
            </div>
            <Pagination></Pagination>
          </div>
        </div>
      </Layout>
    </>
  );
}
