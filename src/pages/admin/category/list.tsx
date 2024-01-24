import React from "react";
import Layout from "../components/Layout";
import Link from "next/link";
import connectDB from "@/app/db";
import { GetServerSideProps } from "next";

export const getServerSideProps = (async () => {
  const connect = await connectDB();
  const [response] = await connect.execute("SELECT * FROM menu");
  return {
    props: {
      response: (response as Array<any>).map((e) => ({
        ...e,
        CreatedAt: new Date(e.CreatedAt).getTime(),
        UpdatedAt: new Date(e.UpdatedAt).getTime(),
        DeletedAt: new Date(e.DeletedAt).getTime(),
      })),
    },
  };
}) satisfies GetServerSideProps<{ response: any }>;

function list({ response }: any) {
  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-4">Category List</h1>
      <div className="flex items-center justify-center">
        <div className="min-w-full overflow-x-auto">
          <table className="min-w-full bg-white shadow-md rounded-xl">
            <thead>
              <tr className="bg-blue-gray-100 text-gray-700">
                <th className="py-3 px-4 text-left">ID</th>
                <th className="py-3 px-4 text-left">Category Name</th>
                <th className="py-3 px-4 text-left">Total Products</th>
                <th className="py-3 px-4 text-left">Action</th>
              </tr>
            </thead>
            <tbody className="text-blue-gray-900">
              {response.map((e: any, i: any) => {
                return (
                  <tr key={i} className="border-b border-blue-gray-200">
                    <td className="py-3 px-4">{e.MenuID}</td>
                    <td className="py-3 px-4">{e.MenuName}</td>
                    <td className="py-3 px-4">{1}</td>
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
