import React from "react";
import Layout from "../components/Layout";
import { GetServerSideProps } from "next";
import connectDB from "@/app/db";
import Link from "next/link";
export const getServerSideProps = (async () => {
  const connect = await connectDB();
  const [response] = await connect.execute("SELECT * FROM products");
  return {
    props: {
      response: (response as Array<any>).map((e) => ({
        ...e,
        CreatedAt: new Date(e.CreatedAt).getTime(),
        UpdatedAt: new Date(e.UpdatedAt).getTime(),
        DeletedAt: new Date(e.DeletedAt).getTime(),
        SaleDate: new Date(e.SaleDate).getTime(),
        SaleEndDate: new Date(e.SaleEndDate).getTime(),
        IsBigSale: e.IsBigSale.toString(),
        IsBest: e.IsBest.toString(),
        IsNew: e.IsNew.toString()
      })),
    },
  };
}) satisfies GetServerSideProps<{ response: any }>;
function list({ response }: any) {
  return (
    <Layout>
      <div className="flex justify-between items-center">
      <h1 className="text-2xl font-bold mb-4">Products List</h1>
      <Link href={"/admin/products/write"} className="bg-blue-600 text-white p-2 rounded w-[200px] h-[50px]">Add Product</Link>
      </div>
      <div className="flex items-center justify-center">
        <div className="min-w-full overflow-x-auto">
          <table className="min-w-full bg-white shadow-md rounded-xl">
            <thead>
              <tr className="bg-blue-gray-100 text-gray-700">
                <th className="py-3 px-4 text-left">ID</th>
                <th className="py-3 px-4 text-left">Product Name</th>
                <th className="py-3 px-4 text-left">Original Price</th>
                <th className="py-3 px-4 text-left">Sell Price</th>
                <th className="py-3 px-4 text-left">Category</th>
                <th className="py-3 px-4 text-left">Thumb Image</th>
                <th className="py-3 px-4 text-left">Action</th>
              </tr>
            </thead>
            <tbody className="text-blue-gray-900">
              {response.map((e: any, i: any) => {
                return (
                  <tr key={i} className="border-b border-blue-gray-200">
                    <td className="py-3 px-4">{e.ProductID}</td>
                    <td className="py-3 px-4">{e.ProductName}</td>
                    <td className="py-3 px-4">{e.InitPrice}</td>
                    <td className="py-3 px-4">{e.SellPrice}</td>
                    <td className="py-3 px-4">{e.CategoryID}</td>
                    <td className="py-3 px-4">{e.ProductImage}</td>
                    <td className="py-3 px-4">
                      <Link
                        href=""
                        className="font-medium text-blue-600 hover:text-blue-800"
                      >
                        Edit
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
}

export default list;
