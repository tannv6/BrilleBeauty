import Layout from "@/components/Layout";
import MypageNav from "@/components/MypageNav";
import SubNav from "@/components/SubNav";
import Image from "next/image";

export default function MyOrders() {
  return (
    <>
      <Layout>
        <div id="main">
          <SubNav title="My Account" />
          <div className="inner-container mt-[75px] mb-[135px]">
            <div className="flex flex-row gap-[60px]">
              <MypageNav></MypageNav>
              <div className="grow mt-[17px]">
                <p className="text-2xl pb-4 border-b border-black">About Me</p>
                <table className="table-auto min-w-full">
                  <colgroup>
                    <col className="w-[50%]" />
                    <col className="w-[20%]" />
                    <col className="w-[20%]" />
                    <col className="w-[10%]" />
                  </colgroup>
                  <thead className="h-[80px] border-b text-lg">
                    <tr>
                      <th className="text-start">Product</th>
                      <th>Quantity</th>
                      <th>Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="py-5">
                        <div className="flex items-center gap-[25px]">
                          <Image className="rounded" src="/cart/product_img.png" width={100} height={100} alt=""></Image>
                          <div className="flex flex-col pr-8">
                            <p>Damage Care Perfect Serum Original (New) - 80ml</p>
                            <p className="text-[15px] text-[#999999]">- [Required selection]</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-5 text-center">1</td>
                      <td className="py-5 text-xl font-bold text-center">A$16.25</td>
                      <td className="py-5 text-right"><button className="w-[33px] h-[33px] rounded bg-[url('/cart/product_delete_btn.png')]"></button></td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-5">
                        <div className="flex items-center gap-[25px]">
                          <Image className="rounded" src="/cart/product_img.png" width={100} height={100} alt=""></Image>
                          <div className="flex flex-col pr-8">
                            <p>Damage Care Perfect Serum Original (New) - 80ml</p>
                            <p className="text-[15px] text-[#999999]">- [Required selection]</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-5 text-center">1</td>
                      <td className="py-5 text-xl font-bold text-center">A$16.25</td>
                      <td className="py-5 text-right"><button className="w-[33px] h-[33px] rounded bg-[url('/cart/product_delete_btn.png')]"></button></td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-5">
                        <div className="flex items-center gap-[25px]">
                          <Image className="rounded" src="/cart/product_img.png" width={100} height={100} alt=""></Image>
                          <div className="flex flex-col pr-8">
                            <p>Damage Care Perfect Serum Original (New) - 80ml</p>
                            <p className="text-[15px] text-[#999999]">- [Required selection]</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-5 text-center">1</td>
                      <td className="py-5 text-xl font-bold text-center">A$16.25</td>
                      <td className="py-5 text-right"><button className="w-[33px] h-[33px] rounded bg-[url('/cart/product_delete_btn.png')]"></button></td>
                    </tr>
                  </tbody>
                </table>
                <div className="flex justify-end mt-[50px]">
                  <button className="w-[220px] h-[60px] rounded bg-[#f04b76] text-lg text-[#fff]">Contact Seller</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}
