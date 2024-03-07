import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import axios from "axios";
import { useRouter } from "next/router";
import Link from "next/link";
import SubVisual from "@/components/SubVisual";
import Dropdown from "@/components/Dropdown";
import ProductItem from "@/components/ProductItem";
import Pagi from "@/components/Pagi";
import { pageSize } from "@/lib/constants";
import { GetServerSideProps } from "next";

export async function getServerSideProps({ query: { id } }: any) {
    const response = await axios.get("http://localhost:3000/api/products/list", {
        params: { page: 1, pageSize: pageSize, cate_id: id },
    });
    return {
        props: {
            products: response.data,
        },
    };
}
export default function Category({ products }: any) {
    const [list, setList] = useState(products || []);
    const getData = async (page: number) => {
        const response = await axios.get("/api/products/list", {
            params: { page, pageSize },
        });
        setList(response.data.data);
    };

    return (
        <>
            <Layout>
                <div id="main">
                    <SubVisual title1="Face" title2="Sunscreen"></SubVisual>
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
                                onChange={() => { }}
                                activeItem={1}
                                className="w-[220px]"
                            />
                            <Dropdown
                                options={[
                                    { id: 1, name: "Sort by: Popularity" },
                                    { id: 2, name: "3CE (4)" },
                                ]}
                                onChange={() => { }}
                                activeItem={1}
                                className="w-[220px]"
                            />
                        </div>
                        <div className="grid grid-cols-4 gap-x-5 gap-y-[30px]">
                            {products.data?.map((e: any, i: any) => {
                                return (
                                    <>
                                    <ProductItem
                                        image={"/product_img02.png"}
                                        name={e.ProductName}
                                        oriPrice={"A$19.65"}
                                        salePrice={"A$16.25"}
                                        discount={"10%"}
                                        star={"4.7"}
                                        starCount={150}
                                        heartCount={69}
                                    />
                                    </>
                                );
                            })}
                        </div>
                        <Pagi></Pagi>
                    </div>
                </div>
            </Layout>
        </>
    );
}
