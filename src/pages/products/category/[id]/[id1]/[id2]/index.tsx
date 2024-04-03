import React from "react";
import Layout from "@/components/Layout";
import axios from "axios";
import { useRouter } from "next/router";
import SubVisual from "@/components/SubVisual";
import Dropdown from "@/components/Dropdown";
import ProductItem from "@/components/ProductItem";
import Paginew from "@/components/Paginew";
export async function getServerSideProps({ params, query, req }: any) {
  const { page, sort, brand } = query;
  const response = await axios.get(
    "http://localhost:3000/api/products/get_by_category",
    {
      params: {
        page,
        sort,
        brand,
        pageSize: 12,
        cate_id: params.id2,
        depth: 3,
      },
    }
  );
  const response2 = await axios.get(
    "http://localhost:3000/api/category/current",
    {
      params: { cate_id: params.id2, depth: 3 },
    }
  );
  const response3 = await axios.get("http://localhost:3000/api/brand/list");
  return {
    props: {
      products: response.data,
      cateName: response2.data,
      brandList: response3.data.data.map((e: any) => ({
        ...e,
        id: e.BrandID,
        name: e.BrandName,
      })),
      sort,
      brand,
    },
  };
}
export default function Category({
  cateName,
  products,
  brandList,
  sort,
  brand,
}: any) {
  const router = useRouter();
  const { data, total, currentPage, pageSize, totalPage, thumbnail } = products;
  const handleChangePage = (page: number) => {
    router.query.page = page.toString();
    router.push(router, undefined, { scroll: false });
  };
  const handleChangeSort = (id: string | number) => {
    router.query.sort = id.toString();
    router.push(router, undefined, { scroll: false });
  };
  const handleChangeBrand = (id: string | number) => {
    router.query.brand = id.toString();
    router.push(router, undefined, { scroll: false });
  };
  return (
    <Layout>
      <div id="main">
        <SubVisual
          title1={cateName.data[0]?.CategoryName}
          title2="All"
          thumbnail={thumbnail}
        />
        <div className="inner-container mt-[50px]">
          <div className="flex justify-between mb-10">
            <Dropdown
              options={[{ id: "", name: "All" }, ...(brandList || [])]}
              onChange={(id: any) => handleChangeBrand(id)}
              activeItem={Number(brand) || ""}
              className="w-[220px]"
            />
            <Dropdown
              options={[
                { id: "price_asc", name: "Price ⭡" },
                { id: "price_desc", name: "Price ⭣" },
              ]}
              onChange={(id: any) => handleChangeSort(id)}
              activeItem={sort}
              className="w-[220px]"
            />
          </div>
          <div className="grid grid-cols-4 gap-x-5 gap-y-[30px]">
            {data?.map((e: any, i: any) => {
              return <ProductItem key={i} info={e} />;
            })}
          </div>
          {data.length ? (
            <Paginew
              tP={totalPage}
              cP={currentPage}
              tE={total}
              per={10}
              onChange={handleChangePage}
            />
          ) : (
            ``
          )}
        </div>
      </div>
    </Layout>
  );
}
