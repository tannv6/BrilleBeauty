import Dropdown from "@/components/Dropdown";
import Layout from "@/components/Layout";
import ProductItem from "@/components/ProductItem";
import Pagination from "@/components/Pagi";
import SubNav from "@/components/SubNav";

export default function Search() {
  return (
    <>
      <Layout>
        <div id="main">
          <SubNav title1="Product_search"></SubNav>
          <div className="inner-container mt-[80px] mb-[280px]">
            <div className="mb-[60px]">
              <p className="text-center text-[30px] text-[#ef426f] pb-[55px]">
                PRODUCT SEARCH
              </p>
              <p className="text-[20px]">
                <span className="text-[#ef426f]">2</span> products found
              </p>
              <hr className="border-black mt-2" />
            </div>
            <div className="grid grid-cols-4 gap-x-5 gap-y-[30px]">
              <ProductItem />
              <ProductItem />
            </div>
            {/* <Pagination></Pagination> */}
          </div>
        </div>
      </Layout>
    </>
  );
}
