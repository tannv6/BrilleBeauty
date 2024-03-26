import Dropdown from "@/components/Dropdown";
import Layout from "@/components/Layout";
import ProductItem from "@/components/ProductItem";
import SubVisual from "@/components/SubVisual";
import Pagination from "@/components/Pagi";

export default function Brands() {
  return (
    <>
      <Layout>
        <div id="main">
          <SubVisual title1="Brands" title2="Sunscreen"></SubVisual>
          <div className="inner-container mt-[50px]">
            <div className="w-full flex justify-between mb-[60px] text-[18px] text-[#656565]">
              <button className="w-[230px] h-14 bg-[#ef426f] rounded-md text-[#ffffff]">
                Sunscreen
              </button>
              <button className="w-[230px] h-14 rounded-md border border-[#dbdbdb]">
                Moisturizer
              </button>
              <button className="w-[230px] h-14 rounded-md border border-[#dbdbdb]">
                Toner & Mist
              </button>
              <button className="w-[230px] h-14 rounded-md border border-[#dbdbdb]">
                Masks
              </button>
              <button className="w-[230px] h-14 rounded-md border border-[#dbdbdb]">
                Acne-Prone
              </button>
            </div>
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
              <ProductItem />
              <ProductItem />
              <ProductItem />
              <ProductItem />
              <ProductItem />
              <ProductItem />
              <ProductItem />
              <ProductItem />
              <ProductItem />
              <ProductItem />
              <ProductItem />
              <ProductItem />
            </div>
            <Pagination></Pagination>
          </div>
        </div>
      </Layout>
    </>
  );
}
