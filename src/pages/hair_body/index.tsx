import Dropdown from "@/components/Dropdown";
import Layout from "@/components/Layout";
import ProductItem from "@/components/ProductItem";
import SubVisual from "@/components/SubVisual";
import Pagination from "@/components/Pagi";

export default function HairBody() {
  return (
    <>
      <Layout>
        <div id="main">
          <SubVisual title1="Hair & Body" title2="Sunscreen"></SubVisual>
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
              />
              <Dropdown
                options={[
                  { id: 1, name: "Sort by: Popularity" },
                  { id: 2, name: "3CE (4)" },
                ]}
                onChange={() => {}}
                activeItem={1}
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
