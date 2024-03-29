import Layout from "@/components/Layout";
import ProductRelated from "@/components/ProductRelated";
import SubNav from "@/components/SubNav";
import axios from "axios";
import { getSession } from "next-auth/react";
import Image from "next/image";
import { CDN_URL } from "@/utils/constants";
import { useRouter } from "next/router";
import { useState } from "react";
import { getWebSetting } from "@/lib/functions";
import { parse } from "cookie";

export const getServerSideProps = async(context : any) => {

  const cookies = parse(context.req.headers.cookie || "");

  const session : any = await getSession(context);
  if (!session) {
    return {
      redirect: {
        destination: "/member/login",
        permanent: false,
      },
    };
  }

  const customerID = session?.user?.id;
  const carts = await axios.get(
    `http://localhost:3000/api/cart/list`,
    {
      params: { customerID: customerID },
    }
  );
  return {
    props: {
      carts: carts.data,
      ...(await getWebSetting(cookies)),
    },
  };
}

export default function EyesLips({ carts, ...props } : any) {
  
  let obj : any = {};
  carts.forEach((cart : any) => {
    obj[cart.CartID] = cart.Quantity;
  });

  
  const [NumProduct, setNumProduct] = useState<{ [key: number]: number }>(obj); 
  
  const updateNumProduct = (id: number, value: number) => {
    setNumProduct((prevNumProducts) => ({
      ...prevNumProducts,
      [id]: value,
    }));
  };

  const cartElement = carts.map((cart : any) => (
    <tr className="border-b" key={cart.CartID}>
      <td className="py-5 px-5"><input className="w-5 h-5 rounded appearance-none border checked:bg-[url('/checkbox_custome.png')]" type="checkbox" /></td>
      <td className="py-5">
        <div className="flex items-center gap-[25px]">
          <Image className="rounded" src={`${CDN_URL}${cart.ProductImage || ""}`} width={100} height={100} alt=""></Image>
          <div className="flex flex-col pr-8">
            <p>{cart.ProductName}</p>
            <p className="text-[15px] text-[#999999]">- [{cart.PotName}]</p>
          </div>
        </div>
      </td>
      <td className="text-center py-5 text-[#757575]">{cart.PoName}</td>
      <td className="py-5">
        <div className="flex flex-row justify-center">
          <button onClick={() => { updateNumProduct(cart.CartID, Math.max((NumProduct[cart.CartID] || 1) - 1, 1)) }} className="rounded-l w-[33px] h-[33px] bg-[url('/product_detail/product_number_desc_btn.png')]"></button>
          <input type="number" value={NumProduct[cart.CartID] || 1} onChange={(e) => { updateNumProduct(cart.CartID, Number(e.target.value)) }} className="pt-1 border border-x-0 text-center min-w-[46px] max-w-[46px] h-[33px] outline-0" />
          <button onClick={() => { updateNumProduct(cart.CartID, (NumProduct[cart.CartID] || 1) + 1) }} className="rounded-r w-[33px] h-[33px] bg-[url('/product_detail/product_number_asc_btn.png')]"></button>
        </div>
      </td>
      <td className="py-5 text-xl font-bold text-center">A${cart.PoSellPrice * NumProduct[cart.CartID]}</td>
      <td className="py-5 text-right"><button className="w-[33px] h-[33px] rounded bg-[url('/cart/product_delete_btn.png')]"></button></td>
    </tr>
  ));
  return (
      <Layout {...props}>
        <div id="main">
          <SubNav title1="MyCart" />
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
                {cartElement}
              </tbody>
            </table>
            <div className="mt-[50px] flex flex-col items-end">
              <div className="flex items-center gap-[115px] w-full">
                <button className="mr-auto ml-4 text-lg w-[144px] h-[36px] rounded border border-[#dbdbdb]">Select all</button>
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
  );
}
