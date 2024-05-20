import Layout from "@/components/Layout";
import MypageNav from "@/components/MypageNav";
import SubNav from "@/components/SubNav";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import Image from "next/image";
import { getOrderByCustomer } from "../api/orders/get_by_customer";
import { CDN_URL } from "@/utils/constants";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/router";
export const getServerSideProps = (async (context: any) => {
  const session = await getSession(context);
  const response = await getOrderByCustomer({ ...session });

  return {
    props: {
      response,
    },
  };
}) satisfies GetServerSideProps<{ response: any }>;
export default function MyOrders({ response, ...props }: any) {
  const router = useRouter();
  console.log(response);
  const handleDel = async (OrderID: any) => {
    if (confirm("Did you sure to delete this order?")) {
      const res = await axios.post("/api/orders/del", {
        OrderID,
      });
      alert("Delete order successfully!");
      router.reload();
    }
  };
  return (
    <Layout {...props}>
      <div id="main">
        <SubNav title1="My Account" title2="My Orders" />
        <div className="inner-container mt-[75px] mb-[135px]">
          <div className="flex flex-row gap-[60px]">
            <MypageNav></MypageNav>
            <div className="grow mt-[17px]">
              <p className="text-2xl pb-4 border-b border-black">My Orders</p>
              {response?.data?.map((elm: any, idx: any) => {
                return (
                  <div
                    key={idx}
                    className=" border-b border-b-[2px] border-b-black pb-2 mb-3"
                  >
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
                          <th>
                            <button
                              onClick={() => handleDel(elm.OrderID)}
                              className="w-[33px] h-[33px] rounded bg-[url('/cart/product_delete_btn.png')]"
                            ></button>
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {elm.products?.map((e: any, i: any) => {
                          return (
                            <tr key={i} className="border-b">
                              <td className="py-5">
                                <Link
                                  href={e.type === "combo" ? `/combo/view/${e.ComboID}` : `/product_detail/${e.ProductID}`}
                                  className="flex items-center gap-[25px]"
                                >
                                  <Image
                                    className="rounded"
                                    src={`${CDN_URL}${e.ProductImage}`}
                                    width={100}
                                    height={100}
                                    alt=""
                                  ></Image>
                                  <div className="flex flex-col pr-8">
                                    <p>
                                      {e.ProductName}
                                      {e.PoName ? ` - ${e.PoName}` : ""}
                                    </p>
                                    {/* <p className="text-[15px] text-[#999999]">
                                      - [Required selection]
                                    </p> */}
                                  </div>
                                </Link>
                              </td>
                              <td className="py-5 text-center">
                                {e.Quantity || 0}
                              </td>
                              <td className="py-5 text-xl font-bold text-center">
                                A${e.Subtotal || 0}
                              </td>
                            </tr>
                          );
                        })}
                        <tr>
                          <td colSpan={4}>
                            <div className="flex justify-end mt-5">
                              <p className="text-xl font-bold">
                                Total Price: A${elm.TotalPayment}
                              </p>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                );
              })}
              {/* <div className="flex justify-end mt-[50px]">
                <button className="w-[220px] h-[60px] rounded bg-[#f04b76] text-lg text-[#fff]">
                  Contact Seller
                </button>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
