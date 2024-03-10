import React, { useEffect, useState } from "react";
import Layout from "@/components/Layout";
import axios from "axios";
import { useRouter } from "next/router";
import Link from "next/link";
import SubVisual from "@/components/SubVisual";
import Dropdown from "@/components/Dropdown";
import ProductItem from "@/components/ProductItem";
import Paginew from "@/components/Paginew";
export async function getServerSideProps({ params, query }: any) {
    const response = await axios.get("http://localhost:3000/api/products/category", {
        params: { page: query.page, pageSize: 12, cate_id: params.id1, depth: 2 },
    });
    const response2 = await axios.get("http://localhost:3000/api/category/current", {
        params: { cate_id: params.id1, depth: 2 },
    });
    const response3 = await axios.get("http://localhost:3000/api/category/sub_cate_filter", {
        params: { cate_id: params.id1, depth: 2 },
    });
    return {
        props: {
            id: params.id,
            id1: params.id1,
            products: response.data,
            cateName: response2.data,
            subCate: response3.data,
            page: query.page || 1,
            ...response.data,
        },
    };
}
export default function Category({id, id1, cateName, products, subCate, page, total, totalPage }: any) {
    const router = useRouter();
    const [cpage, setCPage] = useState(Number(page));
    const handleChangePage = (page: number) => {
        setCPage(page);
        router.query.page = page.toString();
        router.push(router);
    };
    return (
        <>
            <Layout>
                <div id="main">
                    <SubVisual title1={cateName.data[0]?.CategoryName} title2="All"></SubVisual>
                    <div className="inner-container mt-[50px]">
                        <div className="w-full flex flex-wrap gap-3 mb-[60px] text-[18px] text-[#656565]">
                            <button className="w-[230px] h-14 bg-[#ef426f] rounded-md text-[#ffffff]">
                                All
                            </button>
                            {subCate.data?.map((e: any, i: any) => {
                                return (
                                    <Link key={i}  href={`/products/category/${id}/${id1}/${e.CategoryID}`} scroll={false}>
                                        <button className="w-[230px] h-14 rounded-md border border-[#dbdbdb]">
                                            {e.CategoryName}
                                        </button>
                                    </Link>
                                )
                            })}
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
                                            key = {i}
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
                        {products.data.length ? (<><Paginew
                            tP={totalPage}
                            cP={cpage}
                            tE={total}
                            per={10}
                            onChange={handleChangePage}
                        >
                        </Paginew></>) : (``)}

                    </div>
                </div>
            </Layout>
        </>
    );
}
