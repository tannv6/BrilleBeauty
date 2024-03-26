import React, { useEffect, useState } from "react";
import Layout from "@/components/Layout";
import axios from "axios";
import { useRouter } from "next/router";
import Link from "next/link";
import SubVisual from "@/components/SubVisual";
import Dropdown from "@/components/Dropdown";
import ProductItem from "@/components/ProductItem";
import Paginew from "@/components/Paginew";
import { getWebSetting } from "@/lib/functions";
import { parse } from "cookie";
export async function getServerSideProps({ params, query, req }: any) {
  const cookies = parse(req.headers.cookie || "");
  const response = await axios.get(
    "http://localhost:3000/api/products/category",
    {
      params: { page: query.page, pageSize: 12, cate_id: params.id2, depth: 3 },
    }
  );
  const response2 = await axios.get(
    "http://localhost:3000/api/category/current",
    {
      params: { cate_id: params.id2, depth: 3 },
    }
  );
  return {
    props: {
      id: params.id,
      products: response.data,
      cateName: response2.data,
      page: query.page || 1,
      ...response.data,
      ...(await getWebSetting(cookies)),
    },
  };
}
export default function Category({
  id,
  cateName,
  products,
  page,
  total,
  totalPage,
  ...props
}: any) {
  const router = useRouter();
  const [cpage, setCPage] = useState(Number(page));
  const handleChangePage = (page: number) => {
    setCPage(page);
    router.query.page = page.toString();
    router.push(router, undefined, { scroll: false });
  };
  return (
    <>
      <Layout {...props}>
        <div id="main">
          <SubVisual
            title1={cateName.data[0]?.CategoryName}
            title2="All"
          ></SubVisual>
          <div className="inner-container mt-[50px]">
            <div className="flex justify-between mb-10">
              <Dropdown
                options={[
                  { id: 1, name: "Branch Name" },
                  { id: 2, name: "3CE" },
                ]}
                onChange={() => {}}
                activeItem={1}
                className="w-[220px]"
              />
              <Dropdown
                options={[
                  { id: 1, name: "Sort by: Popularity" },
                  { id: 2, name: "3CE (4)" },
                ]}
                onChange={() => {}}
                activeItem={1}
                className="w-[220px]"
              />
            </div>
            <div className="grid grid-cols-4 gap-x-5 gap-y-[30px]">
              {products.data?.map((e: any, i: any) => {
                return <ProductItem key={i} info={e} />;
              })}
            </div>
            {products.data.length ? (
              <>
                <Paginew
                  tP={totalPage}
                  cP={cpage}
                  tE={total}
                  per={10}
                  onChange={handleChangePage}
                ></Paginew>
              </>
            ) : (
              ``
            )}
          </div>
        </div>
      </Layout>
    </>
  );
}
