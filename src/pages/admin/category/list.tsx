import React from "react";
import AdminLayout from "../components/AdminLayout";
import Link from "next/link";
import { GetServerSideProps } from "next";
import axios from "axios";
import Table from "../components/Table";
import moment from "moment";
import Thead from "../components/Thead";
import Tr from "../components/Tr";
import Th from "../components/Th";
import Td from "../components/Td";

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
    <AdminLayout>
      <div className="flex justify-between items-center">
      <h1 className="text-2xl font-bold mb-4">Category List</h1>
        <Link
          href={"/admin/category/write"}
          className="flex justify-center items-center bg-blue-600 text-white p-2 rounded w-[160px] h-[40px]"
        >
          Add New Category
        </Link>
      </div>
      <div className="flex items-center justify-center">
          <Table colWidths={["10%", "40%", "20%", "20%", "10%"]}>
            <Thead>
              <Tr>
                <Th>ID</Th>
                <Th>Category Name</Th>
                <Th>Total Products</Th>
                <Th>Created time</Th>
                <Th center>Action</Th>
              </Tr>
            </Thead>
            <tbody className="text-blue-gray-900">
              {response.map((e: any, i: any) => {
                return (
                  <Tr key={i}>
                    <Td>{response.length - i}</Td>
                    <Td>{e.CategoryName}</Td>
                    <Td>{e.totalProducts}</Td>
                    <Td>
                      {moment(e.CreatedAt).format("yyyy.MM.DD HH:mm:ss")}
                    </Td>
                    <Td center>
                        <Link
                          href={`/admin/category/write/${e.CategoryID}`}
                          className="font-medium text-blue-600 hover:text-blue-800 me-4"
                        >
                          <i className="fas fa-edit"></i>
                        </Link>
                        <button
                          className="text-red-500"
                          onClick={() => handleDelete(e.CategoryID)}
                        >
                          <i className="fas fa-trash-alt"></i>
                        </button>
                    </Td>
                  </Tr>
                );
              })}
            </tbody>
          </Table>
        </div>
    </AdminLayout>
  );
}
list.auth=false;
export default list;
