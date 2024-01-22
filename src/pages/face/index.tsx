import Layout from "@/components/Layout";
import ProductItem from "@/components/ProductItem";
import SubVisual from "@/components/SubVisual";
import Pagination from "@/components/Pagination";

export default function Face() {
  return (
    <>
      <Layout>
        <div id="main">
          <SubVisual title1="Face" title2="Sunscreen"></SubVisual>
          <div className="inner-container mt-[50px]">
            <div className="w-full flex justify-between mb-[60px] text-[18px] text-[#656565]">
              <button className="w-[230px] h-14 bg-[#ef426f] rounded-md text-[#ffffff]">Sunscreen</button>
              <button className="w-[230px] h-14 rounded-md border border-[#dbdbdb]">Moisturizer</button>
              <button className="w-[230px] h-14 rounded-md border border-[#dbdbdb]">Toner & Mist</button>
              <button className="w-[230px] h-14 rounded-md border border-[#dbdbdb]">Masks</button>
              <button className="w-[230px] h-14 rounded-md border border-[#dbdbdb]">Acne-Prone</button>
            </div>
            <div className="flex justify-between mb-10">
              <select
                name="" id=""
                className="border border-[#dbdbdb] h-12 w-[220px] px-4 appearance-none bg-[url('/dropdown_bg.png')] outline-none">
                <option disabled selected>Brand Name</option>
                <option value="">3CE (4)</option>
                <option value="">3W Clinic (8)</option>
              </select>
              <select
                name="" id=""
                className="text- border border-[#dbdbdb] h-12 w-[220px] px-4 appearance-none bg-[url('/dropdown_bg.png')] outline-none">
                <option disabled selected>Sort by:  Popularity</option>
                <option value="">3CE (4)</option>
              </select>
            </div>
            <div className="grid grid-cols-4 gap-x-5 gap-y-[30px]">
              <ProductItem></ProductItem>
              <ProductItem></ProductItem>
              <ProductItem></ProductItem>
              <ProductItem></ProductItem>
              <ProductItem></ProductItem>
              <ProductItem></ProductItem>
              <ProductItem></ProductItem>
              <ProductItem></ProductItem>
              <ProductItem></ProductItem>
              <ProductItem></ProductItem>
              <ProductItem></ProductItem>
              <ProductItem></ProductItem>
            </div>
            <Pagination></Pagination>
          </div>
        </div>
      </Layout>
    </>
  );
}
