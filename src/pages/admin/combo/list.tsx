import React from "react";
import Layout from "../components/Layout";
import { GetServerSideProps } from "next";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";
const CDN_URL = process.env.NEXT_PUBLIC_CDN_URL;
export const getServerSideProps = (async () => {
  const response = await axios.get("http://localhost:3000/api/combo/list");
  return {
    props: {
      response: response.data.data,
    },
  };
}) satisfies GetServerSideProps<{ response: any }>;
function List({ response }: any) {
  return (
    <Layout>
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold mb-4">Combo List</h1>
        <Link
          href={"/admin/combo/write"}
          className="flex justify-center items-center bg-blue-600 text-white p-2 rounded w-[150px] h-[40px]"
        >
          Add New Combo
        </Link>
      </div>
      <div className="flex items-center justify-center">
        <div className="min-w-full overflow-x-auto">
          <table className="min-w-full bg-white shadow-md rounded-xl">
            <thead>
              <tr className="bg-blue-gray-100 text-gray-700">
                <th className="py-3 px-4 text-left">ID</th>
                <th className="py-3 px-4 text-left">Thumb Image</th>
                <th className="py-3 px-4 text-left">Combo Name</th>
                <th className="py-3 px-4 text-left">Original Price</th>
                <th className="py-3 px-4 text-left">Sell Price</th>
                <th className="py-3 px-4 text-left">Category</th>
                <th className="py-3 px-4 text-left">Action</th>
              </tr>
            </thead>
            <tbody className="text-blue-gray-900">
              {response.map((e: any, i: any) => {
                return (
                  <tr key={i} className="border-b border-blue-gray-200">
                    <td className="py-3 px-4">{e.ComboID}</td>
                    <td className="py-3 px-4">
                      <Image
                        src={`${CDN_URL}/${e.ComboImage}`}
                        alt=""
                        width={100}
                        height={100}
                      />
                    </td>
                    <td className="py-3 px-4">{e.ComboName}</td>
                    <td className="py-3 px-4">{e.InitPrice}</td>
                    <td className="py-3 px-4">{e.SellPrice}</td>
                    <td className="py-3 px-4">{e.CategoryID}</td>
                    <td className="py-3 px-4">
                      <Link
                        href={`/admin/combo/write/${e.ComboID}`}
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

export default List;
