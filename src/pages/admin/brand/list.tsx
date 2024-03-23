import React from "react";
import Layout from "../components/Layout";
import { GetServerSideProps } from "next";
import connectDB from "@/app/db";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";
import Table from "../components/Table";
import Thead from "../components/Thead";
import Tr from "../components/Tr";
import Th from "../components/Th";
import Tbody from "../components/Tbody";
import Td from "../components/Td";

export const getServerSideProps = (async () => {
  const connect = await connectDB();
  const [response] = await connect.execute("SELECT * FROM brand WHERE DeletedAt IS NULL;");
  connect.end();
  return {
    props: {
      response: JSON.parse(JSON.stringify(response)),
    },
  };
}) satisfies GetServerSideProps<{ response: any }>;
function list({ response }: any) {
  const handleDelete = async (id: number) => {
    if (confirm("Are you sure delete this brand?")) {
      await axios.put(`/api/brand/del`, { BrandID: id });
      window.location.reload();
    }
  };
  return (
    <Layout>
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold mb-4">Brand List</h1>
        <Link
          href={"/admin/brand/write"}
          className="flex justify-center items-center bg-blue-600 text-white p-2 rounded w-[150px] h-[40px]"
        >
          Add New Brand
        </Link>
      </div>
      <div className="flex items-center justify-center">
        <Table colWidths={["100px", "*", "200px"]}>
          <Thead>
            <Tr className="bg-blue-gray-100 text-gray-700">
              <Th>ID</Th>
              <Th>Brand Name</Th>
              <Th center>Action</Th>
            </Tr>
          </Thead>
          <Tbody className="text-blue-gray-900">
            {response.map((e: any, i: any) => {
              return (
                <Tr key={i} className="border-b border-blue-gray-200">
                  <Td>{e.BrandID}</Td>
                  <Td>{e.BrandName}</Td>
                  <Td center>
                    <Link
                      href={`/admin/brand/${e.BrandID}`}
                      className="font-medium text-blue-600 hover:text-blue-800 me-3"
                    >
                      <i className="fas fa-edit"></i>
                    </Link>
                    <button
                      className="text-red-500"
                      onClick={() => handleDelete(e.BrandID)}
                    >
                      <i className="fas fa-trash-alt"></i>
                    </button>
                  </Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </div>
    </Layout>
  );
}

export default list;
