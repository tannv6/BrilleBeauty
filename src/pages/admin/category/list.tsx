import React from "react";
import Layout from "../components/Layout";
import Link from "next/link";
import { GetServerSideProps } from "next";
import axios from "axios";
import Table from "../components/Table";
import moment from "moment";

export const getServerSideProps = (async () => {
  const response = await axios.get("http://localhost:3000/api/category/list");
  return {
    props: {
      response: response.data.data,
    },
  };
}) satisfies GetServerSideProps<{ response: any }>;

function list({ response }: any) {
  const handleDelete = async (id: number) => {
    const data = {
      del: [{ CategoryID: id }],
    };
    if (confirm("Are you sure delete this category?")) {
      await axios.post(`/api/category/update`, {
        data,
      });
      window.location.reload();
    }
  };
  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-4">Category List</h1>
      <div className="flex items-center justify-center">
        <div className="min-w-full overflow-x-auto">
          <Table colWidths={["10%", "40%", "20%", "20%", "10%"]}>
            <thead>
              <tr className="bg-blue-gray-100 text-gray-700">
                <th className="py-3 px-4 text-left">ID</th>
                <th className="py-3 px-4 text-left">Category Name</th>
                <th className="py-3 px-4 text-left">Total Products</th>
                <th className="py-3 px-4 text-left">Created time</th>
                <th className="py-3 px-4 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="text-blue-gray-900">
              {response.map((e: any, i: any) => {
                return (
                  <tr key={i} className="border-b border-blue-gray-200">
                    <td className="py-3 px-4">{response.length - i}</td>
                    <td className="py-3 px-4">{e.CategoryName}</td>
                    <td className="py-3 px-4">{e.totalProducts}</td>
                    <td className="py-3 px-4">
                      {moment(e.CreatedAt).format("yyyy.MM.DD HH:mm:ss")}
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex gap-4 justify-center">
                        <Link
                          href={`/admin/category/write/${e.CategoryID}`}
                          className="font-medium text-blue-600 hover:text-blue-800"
                        >
                          <i className="fas fa-edit"></i>
                        </Link>
                        <button
                          className="text-red-500"
                          onClick={() => handleDelete(e.CategoryID)}
                        >
                          <i className="fas fa-trash-alt"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </div>
      </div>
    </Layout>
  );
}

export default list;
