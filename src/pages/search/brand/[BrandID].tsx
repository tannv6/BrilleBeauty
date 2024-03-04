import Dropdown from "@/components/Dropdown";
import Layout from "@/components/Layout";
import ProductItem from "@/components/ProductItem";
import SubVisual from "@/components/SubVisual";
import Pagination from "@/components/Pagi";

export function getServerSideProps() {
  return {
    props: {
      brand: {},
    },
  };
}

export default function BrandSearch({ brand }: any) {
  console.log(brand);

  return (
    <>
      <Layout>
        <div id="main">
          <div className="w-full h-[340px] bg-[url('/sub_face/main_visual.png')]">
            <div className="flex justify-center flex-col gap-5 h-full pl-[415px]">
              <p className="text-black text-[32px] font-[700]">3CE Products</p>
              <div className="flex flex-row items-center gap-x-3">
                <p className="text-[#757575]">Home</p>
                <i className="block w-[9px] h-4 bg-[url('/sub_face/main_visual_arrow.png')]"></i>
                <p className="text-[#757575]">Brand</p>
                <i className="block w-[9px] h-4 bg-[url('/sub_face/main_visual_arrow.png')]"></i>
                <p className="text-[#757575]">3CE</p>
              </div>
            </div>
          </div>
          <div className="inner-container mt-[50px]">
            <div className="w-full flex justify-between mb-[60px]">
              <p className="w-full text-[30px] text-[#ef426f] text-center font-bold">
                3CE PRODUCT
              </p>
            </div>
            <div className="flex justify-end mb-10">
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
              <ProductItem
                image={"/product_img01.png"}
                name="Damage Care Perfect Serum Original (New) - 80ml"
                oriPrice={"A$19.65"}
                salePrice={"A$16.25"}
                discount={"10%"}
                star={"4.7"}
                starCount={150}
                heartCount={69}
              />
              <ProductItem
                image={"/product_img02.png"}
                name="Damage Care Perfect Serum Original (New) - 80ml"
                oriPrice={"A$19.65"}
                salePrice={"A$16.25"}
                discount={"10%"}
                star={"4.7"}
                starCount={150}
                heartCount={69}
              />
              <ProductItem
                image={"/product_img03.png"}
                name="Damage Care Perfect Serum Original (New) - 80ml"
                oriPrice={"A$19.65"}
                salePrice={"A$16.25"}
                discount={"10%"}
                star={"4.7"}
                starCount={150}
                heartCount={69}
              />
              <ProductItem
                image={"/product_img04.png"}
                name="Damage Care Perfect Serum Original (New) - 80ml"
                oriPrice={"A$19.65"}
                salePrice={"A$16.25"}
                discount={"10%"}
                star={"4.7"}
                starCount={150}
                heartCount={69}
              />
              <ProductItem
                image={"/product_img01.png"}
                name="Damage Care Perfect Serum Original (New) - 80ml"
                oriPrice={"A$19.65"}
                salePrice={"A$16.25"}
                discount={"10%"}
                star={"4.7"}
                starCount={150}
                heartCount={69}
              />
              <ProductItem
                image={"/product_img02.png"}
                name="Damage Care Perfect Serum Original (New) - 80ml"
                oriPrice={"A$19.65"}
                salePrice={"A$16.25"}
                discount={"10%"}
                star={"4.7"}
                starCount={150}
                heartCount={69}
              />
              <ProductItem
                image={"/product_img03.png"}
                name="Damage Care Perfect Serum Original (New) - 80ml"
                oriPrice={"A$19.65"}
                salePrice={"A$16.25"}
                discount={"10%"}
                star={"4.7"}
                starCount={150}
                heartCount={69}
              />
              <ProductItem
                image={"/product_img04.png"}
                name="Damage Care Perfect Serum Original (New) - 80ml"
                oriPrice={"A$19.65"}
                salePrice={"A$16.25"}
                discount={"10%"}
                star={"4.7"}
                starCount={150}
                heartCount={69}
              />
              <ProductItem
                image={"/product_img01.png"}
                name="Damage Care Perfect Serum Original (New) - 80ml"
                oriPrice={"A$19.65"}
                salePrice={"A$16.25"}
                discount={"10%"}
                star={"4.7"}
                starCount={150}
                heartCount={69}
              />
              <ProductItem
                image={"/product_img02.png"}
                name="Damage Care Perfect Serum Original (New) - 80ml"
                oriPrice={"A$19.65"}
                salePrice={"A$16.25"}
                discount={"10%"}
                star={"4.7"}
                starCount={150}
                heartCount={69}
              />
              <ProductItem
                image={"/product_img03.png"}
                name="Damage Care Perfect Serum Original (New) - 80ml"
                oriPrice={"A$19.65"}
                salePrice={"A$16.25"}
                discount={"10%"}
                star={"4.7"}
                starCount={150}
                heartCount={69}
              />
              <ProductItem
                image={"/product_img04.png"}
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
    </>
  );
}
