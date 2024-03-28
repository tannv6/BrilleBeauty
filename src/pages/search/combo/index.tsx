import Dropdown from "@/components/Dropdown";
import Layout from "@/components/Layout";
import ProductItem from "@/components/ProductItem";
import Pagination from "@/components/Pagi";
import ComboItem from "@/components/ComboItem";
import { parse } from "cookie";
import { getWebSetting } from "@/lib/functions";
export async function getServerSideProps({ params, query, req }: any) {
  const cookies = parse(req.headers.cookie || "");
  return {
    props: {
      ...(await getWebSetting(cookies)),
    },
  };
}
export default function ComboSearch({ ...props }) {
  return (
      <Layout {...props}>
        <div id="main">
          <div className="w-full h-[340px] bg-[url('/sub_face/main_visual.png')]">
            <div className="flex justify-center flex-col gap-5 h-full pl-[415px]">
              <p className="text-black text-[32px] font-[700]">Sale Combo</p>
              <div className="flex flex-row items-center gap-x-3">
                <p className="text-[#757575]">Home</p>
                <i className="block w-[9px] h-4 bg-[url('/sub_face/main_visual_arrow.png')]"></i>
                <p className="text-[#757575]">Sale Combo</p>
              </div>
            </div>
          </div>
          <div className="inner-container mt-[50px]">
            <div className="w-full flex justify-between mb-[60px]">
              <p className="w-full text-[30px] text-[#ef426f] text-center font-bold">
                SALE COMBO
              </p>
            </div>
            <div className="grid grid-cols-3 gap-x-5 gap-y-[30px]">
              <ComboItem
                image={"/product_combo_img.png"}
                name="Damage Care Perfect Serum Original (New) - 80ml"
                oriPrice={"A$19.65"}
                salePrice={"A$16.25"}
                discount={"10%"}
                star={"4.7"}
                starCount={150}
                heartCount={69}
              />
              <ComboItem
                image={"/product_combo_img.png"}
                name="Damage Care Perfect Serum Original (New) - 80ml"
                oriPrice={"A$19.65"}
                salePrice={"A$16.25"}
                discount={"10%"}
                star={"4.7"}
                starCount={150}
                heartCount={69}
              />
              <ComboItem
                image={"/product_combo_img.png"}
                name="Damage Care Perfect Serum Original (New) - 80ml"
                oriPrice={"A$19.65"}
                salePrice={"A$16.25"}
                discount={"10%"}
                star={"4.7"}
                starCount={150}
                heartCount={69}
              />
              <ComboItem
                image={"/product_combo_img.png"}
                name="Damage Care Perfect Serum Original (New) - 80ml"
                oriPrice={"A$19.65"}
                salePrice={"A$16.25"}
                discount={"10%"}
                star={"4.7"}
                starCount={150}
                heartCount={69}
              />
              <ComboItem
                image={"/product_combo_img.png"}
                name="Damage Care Perfect Serum Original (New) - 80ml"
                oriPrice={"A$19.65"}
                salePrice={"A$16.25"}
                discount={"10%"}
                star={"4.7"}
                starCount={150}
                heartCount={69}
              />
              <ComboItem
                image={"/product_combo_img.png"}
                name="Damage Care Perfect Serum Original (New) - 80ml"
                oriPrice={"A$19.65"}
                salePrice={"A$16.25"}
                discount={"10%"}
                star={"4.7"}
                starCount={150}
                heartCount={69}
              />
            </div>
            <Pagination></Pagination>
          </div>
        </div>
      </Layout>
  );
}
