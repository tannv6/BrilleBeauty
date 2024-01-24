import Layout from "@/components/Layout";
import ProductRelated from "@/components/ProductRelated";
import SubNav from "@/components/SubNav";
import Image from "next/image";

export default function EyesLips() {
  return (
    <>
      <Layout>
        <div id="main">
          <SubNav title="MyCart" />
          <div className="inner-container mt-[75px] mb-[155px]">
            <p className="text-[22px] font-bold pb-[25px]">MY CART</p>
            <table className="table-auto min-w-full">
              <colgroup>
                <col className="w-[5%]" />
                <col className="w-[35%]" />
                <col className="w-[20%]" />
                <col className="w-[20%]" />
                <col className="w-[17%]" />
                <col className="w-[3%]" />
              </colgroup>
              <thead className="h-[80px] border-b border-t border-t-black text-lg">
                <tr>
                  <th colSpan={2} className="text-start">Product</th>
                  <th>Volume / Weight</th>
                  <th>Quantity</th>
                  <th>Price</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="py-5 px-5"><input className="w-5 h-5 rounded appearance-none border checked:bg-[url('/checkbox_custome.png')]" type="checkbox" /></td>
                  <td className="py-5">
                    <div className="flex items-center gap-[25px]">
                      <Image className="rounded" src="/cart/product_img.png" width={100} height={100} alt=""></Image>
                      <div className="flex flex-col pr-8">
                        <p>Damage Care Perfect Serum Original (New) - 80ml</p>
                        <p className="text-[15px] text-[#999999]">- [Required selection]</p>
                      </div>
                    </div>
                  </td>
                  <td className="text-center py-5 text-[#757575]">80ml</td>
                  <td className="py-5">
                    <div className="flex flex-row justify-center">
                      <button className="rounded-l w-[33px] h-[33px] bg-[url('/product_detail/product_number_desc_btn.png')]"></button>
                      <input type="number" value={"1"} className="pt-1 border border-x-0 text-center min-w-[46px] max-w-[46px] h-[33px] outline-0" />
                      <button className="rounded-r w-[33px] h-[33px] bg-[url('/product_detail/product_number_asc_btn.png')]"></button>
                    </div>
                  </td>
                  <td className="py-5 text-xl font-bold text-center">A$16.25</td>
                  <td className="py-5 text-right"><button className="w-[33px] h-[33px] rounded bg-[url('/cart/product_delete_btn.png')]"></button></td>
                </tr>
                <tr className="border-b">
                  <td className="py-5 px-5"><input className="w-5 h-5 rounded appearance-none border checked:bg-[url('/checkbox_custome.png')]" type="checkbox" /></td>
                  <td className="py-5">
                    <div className="flex items-center gap-[25px]">
                      <Image className="rounded" src="/cart/product_img.png" width={100} height={100} alt=""></Image>
                      <div className="flex flex-col pr-8">
                        <p>Damage Care Perfect Serum Original (New) - 80ml</p>
                        <p className="text-[15px] text-[#999999]">- [Required selection]</p>
                      </div>
                    </div>
                  </td>
                  <td className="text-center py-5 text-[#757575]">80ml</td>
                  <td className="py-5">
                    <div className="flex flex-row justify-center">
                      <button className="rounded-l w-[33px] h-[33px] bg-[url('/product_detail/product_number_desc_btn.png')]"></button>
                      <input type="number" value={"1"} className="pt-1 border border-x-0 text-center min-w-[46px] max-w-[46px] h-[33px] outline-0" />
                      <button className="rounded-r w-[33px] h-[33px] bg-[url('/product_detail/product_number_asc_btn.png')]"></button>
                    </div>
                  </td>
                  <td className="py-5 text-xl font-bold text-center">A$16.25</td>
                  <td className="py-5 text-right"><button className="w-[33px] h-[33px] rounded bg-[url('/cart/product_delete_btn.png')]"></button></td>
                </tr>
                <tr className="border-b">
                  <td className="py-5 px-5"><input className="w-5 h-5 rounded appearance-none border checked:bg-[url('/checkbox_custome.png')]" type="checkbox" /></td>
                  <td className="py-5">
                    <div className="flex items-center gap-[25px]">
                      <Image className="rounded" src="/cart/product_img.png" width={100} height={100} alt=""></Image>
                      <div className="flex flex-col pr-8">
                        <p>Damage Care Perfect Serum Original (New) - 80ml</p>
                        <p className="text-[15px] text-[#999999]">- [Required selection]</p>
                      </div>
                    </div>
                  </td>
                  <td className="text-center py-5 text-[#757575]">80ml</td>
                  <td className="py-5">
                    <div className="flex flex-row justify-center">
                      <button className="rounded-l w-[33px] h-[33px] bg-[url('/product_detail/product_number_desc_btn.png')]"></button>
                      <input type="number" value={"1"} className="pt-1 border border-x-0 text-center min-w-[46px] max-w-[46px] h-[33px] outline-0" />
                      <button className="rounded-r w-[33px] h-[33px] bg-[url('/product_detail/product_number_asc_btn.png')]"></button>
                    </div>
                  </td>
                  <td className="py-5 text-xl font-bold text-center">A$16.25</td>
                  <td className="py-5 text-right"><button className="w-[33px] h-[33px] rounded bg-[url('/cart/product_delete_btn.png')]"></button></td>
                </tr>
              </tbody>
            </table>
            <div className="mt-[75px] flex flex-col items-end">
              <div className="flex items-center gap-[115px]">
                <p className="text-[18px]">Total Payment <span className="text-base text-[#757575]">(0 Products):</span></p>
                <p className="text-[30px] text-[#ef426f]">A$16.25</p>
              </div>
              <div className="flex mt-[40px] gap-[10px]">
                <button className="w-[252px] h-[56px] border border-black rounded text-lg">Continue Shopping</button>
                <button className="w-[252px] h-[56px] rounded bg-[#ef426f] text-[#ffffff] text-lg">Purchase</button>
              </div>
            </div>
            <p className="text-center mt-[140px] mb-[50px] text-xl font-bold">SHOP MORE TO ENJOY FREE SHIPPING</p>
            <ProductRelated></ProductRelated>
          </div>
        </div>
      </Layout>
    </>
  );
}
