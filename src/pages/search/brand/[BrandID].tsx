import Dropdown from "@/components/Dropdown";
import Layout from "@/components/Layout";
import ProductItem from "@/components/ProductItem";
import Pagination from "@/components/Pagi";
import axios from "axios";
import { pageSize } from "@/lib/constants";
import { useRouter } from "next/router";
import { usePathname, useSearchParams } from "next/navigation";
import {
  getWebSetting,
  objectToSearchParams,
  searchParamsToObject,
} from "@/lib/functions";
import { parse } from "cookie";
const CDN_URL = process.env.NEXT_PUBLIC_CDN_URL;
export async function getServerSideProps({
  query: { BrandID, sort },
  req,
}: any) {
  const cookies = parse(req.headers.cookie || "");
  const brandDetail = await axios.get(
    `http://localhost:3000/api/brand/detail`,
    {
      params: { brandID: BrandID },
    }
  );
  const response = await axios.get("http://localhost:3000/api/products/list", {
    params: { page: 1, pageSize: pageSize, brand: BrandID, sort },
  });
  return {
    props: {
      brand: brandDetail.data,
      products: response.data,
      ...(await getWebSetting(cookies)),
    },
  };
}

export default function BrandSearch({ brand, products, ...props }: any) {
  const router = useRouter();
  const path = usePathname();
  const params = searchParamsToObject(useSearchParams());

  const handleChangeSort = (id: string | number) => {
    router.push(
      `${path}?${objectToSearchParams({
        ...params,
        sort: id,
      })}`
    );
  };

  return (
      <Layout {...props}>
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
                activeItem={1}
                className="w-[220px]"
                placeHolder="--Sort by--"
              />
            </div>
            <div className="grid grid-cols-4 gap-x-5 gap-y-[30px]">
              {products.data?.map((e: any, i: any) => {
                return <ProductItem key={i} info={e} />;
              })}
            </div>
            <Pagination
              totalPage={products.totalPage}
              currentPage={products.page}
              totalElement={products.total}
              elementsPerPage={10}
            />
          </div>
        </div>
      </Layout>
  );
}
