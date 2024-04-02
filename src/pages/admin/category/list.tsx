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
import { pageSize } from "@/lib/constants";
import Pagingnation from "../components/Pagingnation";
import { useRouter } from "next/router";
import { getApiUrl } from "@/lib/functions";

export const getServerSideProps = (async (context: any) => {
  const { page } = context.query;
  const response = await axios.get(getApiUrl("/api/category/list"), {
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

  const handleChangePage = (page: number) => {
    router.query.page = page.toString();
    router.push(router);
  };

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
              {data.map((e: any, i: any) => {
                return (
                  <Tr key={i}>
                    <Td>{total - (currentPage - 1) * pageSize - i}</Td>
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
