import React from "react";
import Layout from "../components/Layout";
import Link from "next/link";

function list() {
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
              <tr className="border-b border-blue-gray-200">
                <td className="py-3 px-4">1</td>
                <td className="py-3 px-4">A</td>
                <td className="py-3 px-4">3</td>
                <td className="py-3 px-4">
                  <Link
                    href=""
                    className="font-medium text-blue-600 hover:text-blue-800"
                  >
                    Edit
                  </Link>
                </td>
              </tr>
              <tr className="border-b border-blue-gray-200">
                <td className="py-3 px-4">1</td>
                <td className="py-3 px-4">B</td>
                <td className="py-3 px-4">4</td>
                <td className="py-3 px-4">
                  <Link
                    href=""
                    className="font-medium text-blue-600 hover:text-blue-800"
                  >
                    Edit
                  </Link>
                </td>
              </tr>
              <tr className="border-b border-blue-gray-200">
                <td className="py-3 px-4 font-medium">Total Wallet Value</td>
                <td className="py-3 px-4" />
                <td className="py-3 px-4" />
                <td className="py-3 px-4" />
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
}

export default list;
