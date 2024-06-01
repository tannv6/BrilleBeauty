import Dropdown from "@/components/Dropdown";
import Layout from "@/components/Layout";
import ProductItem from "@/components/ProductItem";
import Pagination from "@/components/Pagi";
import axios from "axios";
import { pageSize } from "@/lib/constants";
import { useRouter } from "next/router";
import { getSession } from "next-auth/react";
export async function getServerSideProps(context: any) {
  const session = await getSession(context);
  const {
    query: { BrandID, sort = "", page },
  } = context;
  const brandDetail = await axios.get(
    `http://localhost:3000/api/brand/detail`,
    {
      params: { brandID: BrandID },
    }
  );
  const response = await axios.get("http://localhost:3000/api/products/list", {
    params: { page, pageSize: pageSize, brand: BrandID, sort, session: JSON.stringify(session) },
  });
  return {
    props: {
      brand: brandDetail.data,
      products: response.data,
      sort,
    },
  };
}

export default function BrandSearch({ brand, products, sort }: any) {
  const router = useRouter();
  const { data, total, currentPage, pageSize, totalPage } = products;

  const handleChangePage = (page: number) => {
    router.query.page = page.toString();
    router.push(router, undefined, { scroll: false });
  };
  const handleChangeSort = (id: string | number) => {
    router.query.sort = id.toString();
    router.push(router, undefined, { scroll: false });
  };

  return (
    <Layout>
      <div id="main">
        <div className="w-full h-[340px] bg-[url('/sub_face/main_visual.png')]">
          <div className="flex justify-center flex-col gap-5 h-full pl-[415px]">
            <p className="text-black text-[32px] font-[700]">
              {brand.BrandName} Products
            </p>
            <div className="flex flex-row items-center gap-x-3">
              <p className="text-[#757575]">Home</p>
              <i className="block w-[9px] h-4 bg-[url('/sub_face/main_visual_arrow.png')]"></i>
              <p className="text-[#757575]">Brand</p>
              <i className="block w-[9px] h-4 bg-[url('/sub_face/main_visual_arrow.png')]"></i>
              <p className="text-[#757575]">{brand.BrandName}</p>
            </div>
          </div>
        </div>
        <div className="inner-container mt-[50px]">
          <div className="w-full flex justify-between mb-[60px]">
            <p className="w-full text-[30px] text-[#ef426f] text-center font-bold">
              {brand.BrandName} PRODUCT
            </p>
          </div>
          <div className="flex justify-end mb-10">
            <Dropdown
              options={[
                { id: "price_asc", name: "Price ⭡" },
                { id: "price_desc", name: "Price ⭣" },
              ]}
              onChange={(id: any) => handleChangeSort(id)}
              activeItem={sort}
              className="w-[220px]"
              placeHolder="--Sort by--"
            />
          </div>
          <div className="grid grid-cols-4 gap-x-5 gap-y-[30px]">
            {data?.map((e: any, i: any) => {
              return <ProductItem key={i} info={e} />;
            })}
          </div>
          <Pagination
            totalPage={totalPage}
            currentPage={currentPage}
            totalElement={total}
            elementsPerPage={10}
            onChange={handleChangePage}
          />
        </div>
      </div>
    </Layout>
  );
}
