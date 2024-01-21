import Layout from "@/components/Layout";
import ProductItem from "@/components/ProductItem";
import SubVisual from "@/components/SubVisual";

export default function Face() {
  return (
    <>
        <Layout>
        <div id="main">
            <SubVisual></SubVisual>
            <div className="container mt-[50px]">
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
            <option disabled selected>Brand Name</option>
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
        <div className="flex flex-row justify-center mt-20 mb-[70px]">
          <div className="block w-[36px] h-[36px] bg-[url('/pagination_LL.png')] mr-[10px] cursor-pointer"></div>
          <div className="block w-[36px] h-[36px] bg-[url('/pagination_L.png')] mr-[20px] cursor-pointer"></div>
          <div className="flex items-center justify-center w-[36px] h-[36px] rounded-lg bg-[#ef4370] text-[#ffffff] mr-[10px]">
            <a href="">1</a>
          </div>
          <div className="flex items-center justify-center w-[36px] h-[36px] rounded-lg mr-[10px]">
            <a href="">2</a>
          </div>
          <div className="flex items-center justify-center w-[36px] h-[36px] rounded-lg mr-[10px]">
            <a href="">3</a>
          </div>
          <div className="flex items-center justify-center w-[36px] h-[36px] rounded-lg mr-[10px]">
            <a href="">4</a>
          </div>
          <div className="flex items-center justify-center w-[36px] h-[36px] rounded-lg">
            <a href="">5</a>
          </div>
          <div className="block w-[36px] h-[36px] bg-[url('/pagination_R.png')] ml-[20px] cursor-pointer"></div>
          <div className="block w-[36px] h-[36px] bg-[url('/pagination_RR.png')] ml-[10px] cursor-pointer"></div>
        </div>
      </div>
        </div>
        </Layout>
    </>
  );
}
