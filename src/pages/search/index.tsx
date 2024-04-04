import Layout from "@/components/Layout";
import ProductItem from "@/components/ProductItem";
import SubNav from "@/components/SubNav";
import axios from "axios";
import { pageSize } from "@/lib/constants";
import { GetServerSideProps } from "next";
import Paginew from "@/components/Paginew";
import { useRouter } from "next/router";
export const getServerSideProps: GetServerSideProps<{}> = async ({ query }) => {
  const { search_txt = "", page = 1 } = query;
  const response = await axios.get("http://localhost:3000/api/products/list", {
    params: {
      page,
      pageSize,
      search_txt,
      search_mode: "all",
      isForceSearch: true,
    },
  });
  return {
    props: {
      list: response.data,
      search_txt,
    },
  };
};
export default function Search({ list, search_txt }: any) {
  const router = useRouter();
  const { data, total, currentPage, totalPage } = list;
  const handleChangePage = (page: number) => {
    router.query.page = page.toString();
    router.push(router, undefined, { scroll: false });
  };
  return (
    <Layout>
      <div id="main">
        <SubNav title1="Product_search"></SubNav>
        <div className="inner-container mt-[80px] mb-[280px]">
          <div className="mb-[60px]">
            <p className="text-center text-[30px] text-[#ef426f] pb-[55px]">
              PRODUCT SEARCH
            </p>
            <p className="text-[20px]">
              <span className="text-[#ef426f]">{total}</span> products found
              {search_txt ? (
                <>
                  with keyword{" "}
                  <span className="text-rose-400 font-bold">{search_txt}</span>
                </>
              ) : (
                <>, please enter a keyword</>
              )}
            </p>
            <hr className="border-black mt-2" />
          </div>
          <div className="grid grid-cols-4 gap-x-5 gap-y-[30px]">
            {data?.map((e: any, i: any) => {
              return <ProductItem key={i} info={e} />;
            })}
          </div>
          <Paginew
            tP={totalPage}
            cP={currentPage}
            tE={total}
            per={10}
            onChange={handleChangePage}
          />
        </div>
      </div>
    </Layout>
  );
}
