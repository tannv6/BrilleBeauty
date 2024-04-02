import React, { useEffect, useState } from "react";
import AdminLayout from "../components/AdminLayout";
import { GetServerSideProps } from "next";
import connectDB from "@/app/db";
import Link from "next/link";
import axios from "axios";
import Table from "../components/Table";
import Thead from "../components/Thead";
import Tr from "../components/Tr";
import Th from "../components/Th";
import Tbody from "../components/Tbody";
import Td from "../components/Td";
import { pageSize } from "@/lib/constants";
import Pagingnation from "../components/Pagingnation";
import { useRouter } from "next/router";
import { getApiUrl } from "@/lib/functions";

export const getServerSideProps = (async (context: any) => {
  const { page } = context.query;
  const response = await axios.get(getApiUrl("/api/brand/list"), {
    params: { page, pageSize },
  });
  return {
    props: {
      response: response.data,
    },
  };
}) satisfies GetServerSideProps<{ response: any }>;
function List({ response }: any) {
  const { data, total, currentPage, totalPage } = response;
  const router = useRouter();
  const handleDelete = async (id: number) => {
    if (confirm("Are you sure delete this brand?")) {
      await axios.put(`/api/brand/del`, { BrandID: id });
      window.location.reload();
    }
  };

  const handleChangePage = (page: number) => {
    router.query.page = page.toString();
    router.push(router);
  };

  return (
    <AdminLayout>
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
            {data.map((e: any, i: any) => {
              return (
                <Tr key={i} className="border-b border-blue-gray-200">
                  <Td>{total - (currentPage - 1) * pageSize - i}</Td>
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
      <Pagingnation
        tP={totalPage}
        cP={currentPage}
        tE={total}
        per={10}
        onChange={handleChangePage}
      />
    </AdminLayout>
  );
}

export default List;
