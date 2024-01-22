import Dropdown from "@/components/Dropdown";
import Layout from "@/components/Layout";
import ProductItem from "@/components/ProductItem";
import SubVisual from "@/components/SubVisual";

export default function Face() {
  return (
    <>
      <Layout>
        <div id="main">
          <SubVisual title1="Face" title2="Sunscreen"></SubVisual>
          <div className="container mt-[50px]">
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
                image={"/product_img01.png"}
                name="Damage Care Perfect Serum Original (New) - 80ml"
                oriPrice={"A$19.65"}
                salePrice={"A$16.25"}
                discount={"10%"}
                star={"4.7"}
                starCount={150}
                heartCount={69}
              />
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
