import Layout from "@/components/Layout";
import MypageNav from "@/components/MypageNav";
import SubNav from "@/components/SubNav";
import { CDN_URL, interactionTypes, objectTypes } from "@/utils/constants";
import axios from "axios";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import Image from "next/image";
import { getInteractions } from "../api/interactions/list";
import { Product } from "@/lib/types";
import { useRouter } from "next/router";
import { parse } from "cookie";
import { getWebSetting } from "@/lib/functions";
import Link from "next/link";
export const getServerSideProps = (async (context: any) => {
  const cookies = parse(context.req.headers.cookie || "");
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/member/login",
        permanent: false,
      },
    };
  }
  const response = await getInteractions({
    InteractionType: interactionTypes.like.id,
    ObjectType: objectTypes.product.id,
    ...session,
  });

  return {
    props: {
      wishList: response,
    ...(await getWebSetting(cookies)),
    },
  };
}) satisfies GetServerSideProps<{ wishList: any }>;
export default function MyWishList({ wishList, ...props }: any) {
  const router = useRouter();
  const handleDelFavorite = async (ProductID: number) => {
    await axios.post("/api/interactions/write", {
      ObjectType: "product",
      ObjectID: ProductID,
      InteractionType: "like",
    });
    router.replace(router.asPath);
  };
  return (
      <Layout {...props}>
        <div id="main">
          <SubNav title1="My Account" title2="My Wish List" />
          <div className="inner-container mt-[75px] mb-[135px]">
            <div className="flex flex-row gap-[60px]">
              <MypageNav></MypageNav>
              <div className="grow mt-[17px]">
                <p className="text-2xl pb-4 border-b border-black">
                  My Wish List
                </p>
                <table className="table-auto min-w-full">
                  <colgroup>
                    <col width="*" />
                    <col width="20%" />
                    <col width="20%" />
                    <col width="15%" />
                  </colgroup>
                  <thead className="h-[80px] border-b text-lg">
                    <tr>
                      <th className="text-start">Product</th>
                      <th>Quantity</th>
                      <th>Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {wishList?.data?.map((e: Product, i: any) => {
                      return (
                        <tr className="border-b" key={i}>
                          <td className="py-5">
                            <Link href={`/product_detail/${e.ProductID}`} className="flex items-center gap-[25px]">
                              <Image
                                className="rounded"
                                src={`${CDN_URL}${e.ProductImage}`}
                                width={100}
                                height={100}
                                alt=""
                              ></Image>
                              <div className="flex flex-col pr-8">
                                <p>{e.ProductName}</p>
                              </div>
                            </Link>
                          </td>
                          <td className="py-5 text-center">{e.Quantity}</td>
                          <td className="py-5 text-xl font-bold text-center">
                            A${e.SellPrice}
                          </td>
                          <td className="py-5">
                            <div className="flex justify-end items-center gap-5">
                              <button className="w-[27px] h-[24px] bg-[url('/cart/product_cart_btn.png')]"></button>
                              <button
                                onClick={() => handleDelFavorite(e.ProductID)}
                                className="w-[33px] h-[33px] rounded bg-[url('/cart/product_delete_btn.png')]"
                              ></button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
                <div className="flex justify-end mt-[50px] gap-[10px]">
                  <button className="w-[220px] h-[60px] rounded bg-[#cccccc] text-lg">
                    Share Wish List
                  </button>
                  <button className="w-[220px] h-[60px] rounded bg-[#f04b76] text-lg text-[#fff]">
                    Add All To Cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
  );
}
