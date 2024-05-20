import Dropdown from "@/components/Dropdown";
import Layout from "@/components/Layout";
import React, { useEffect, useState } from "react";
import ComboItem from "@/components/ComboItem";
import axios from "axios";
import { useRouter } from "next/router";
import Paginew from "@/components/Paginew";

export async function getServerSideProps({ params, query }: any) {
  const response = await axios.get("http://localhost:3000/api/combo/category", {
    params: { page: query.page, pageSize: 12, cate_id: params.id },
  });
  const response2 = await axios.get(
    "http://localhost:3000/api/combo_category/current",
    {
      params: { cate_id: params.id },
    }
  );
  return {
    props: {
      combo: response.data,
      cateName: response2.data,
      page: query.page || 1,
      ...response.data,
    },
  };
}
export default function ComboSearch({
  combo,
  cateName,
  page,
  total,
  totalPage,
}: any) {
  const router = useRouter();
  const [cpage, setCPage] = useState(Number(page));
  const handleChangePage = (page: number) => {
    setCPage(page);
    router.query.page = page.toString();
    router.push(router, undefined, { scroll: false });
  };
  return (
    <Layout>
      <div id="main">
        <div className="w-full h-[340px] bg-[url('/sub_face/main_visual.png')]">
          <div className="flex justify-center flex-col gap-5 h-full pl-[415px]">
            <p className="text-black text-[32px] font-[700]">
              {cateName.data[0]?.CategoryName}
            </p>
            <div className="flex flex-row items-center gap-x-3">
              <p className="text-[#757575]">Home</p>
              <i className="block w-[9px] h-4 bg-[url('/sub_face/main_visual_arrow.png')]"></i>
              <p className="text-[#757575]">{cateName.data[0]?.CategoryName}</p>
            </div>
          </div>
        </div>
        <div className="inner-container mt-[50px]">
          <div className="w-full flex justify-between mb-[60px]">
            <p className="w-full text-[30px] text-[#ef426f] text-center font-bold">
              {cateName.data[0]?.CategoryName}
            </p>
          </div>
          <div className="grid grid-cols-3 gap-x-5 gap-y-[30px]">
            {combo.data?.map((e: any, i: any) => {
              return (
                <ComboItem
                  key={i}
                  info={e}
                />
              );
            })}
          </div>
          {combo.data.length ? (
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
  );
}
