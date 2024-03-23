import React, { useState } from "react";
import Layout from "../../components/Layout";
import Link from "next/link";
import Table from "../../components/Table";
import Thead from "../../components/Thead";
import Tr from "../../components/Tr";
import Th from "../../components/Th";
import Tbody from "../../components/Tbody";
import Td from "../../components/Td";
import Image from "next/image";
import axios from "axios";
import Pagingnation from "../../components/Pagingnation";
import { useRouter } from "next/router";
import { GetServerSideProps } from "next";
import { pageSize } from "@/lib/constants";
const CDN_URL = process.env.NEXT_PUBLIC_CDN_URL;
export const getServerSideProps = (async (context: any) => {
  const { params } = context;
  const { page } = params;
  const response = await axios.get("http://localhost:3000/api/combo/list", {
    params: { page, pageSize },
  });
  return {
    props: {
      response: response.data.data,
      initPage: page,
      ...response.data,
    },
  };
}) satisfies GetServerSideProps<{ response: any }>;
function ComboList({ response, initPage, total, totalPage }: any) {
  const router = useRouter();
  const [page, setPage] = useState(Number(initPage) || 1);

  const [list, setList] = useState(response || []);
  const getData = async (page: number) => {
    const response = await axios.get("/api/combo/list", {
      params: { page, pageSize },
    });
    setList(response.data.data);
  };

  const handleChangePage = (page: number) => {
    setPage(page);
    getData(page);
    router.query.page = page.toString();
    router.push(router);
  };

  const handleDelete = async (id: number) => {
    if (confirm("Are you sure delete this combo?")) {
      await axios.put(`/api/combo/del`, { ComboID: id });
      window.location.reload();
    }
  };

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
        <Table colWidths={["10%", "100px", "30%", "20%", "20%", "15%", "10%"]}>
          <Thead>
            <Tr>
              <Th>ID</Th>
              <Th>Image</Th>
              <Th>Combo Name</Th>
              <Th>Original Price</Th>
              <Th>Sell Price</Th>
              <Th>Category</Th>
              <Th center>Action</Th>
            </Tr>
          </Thead>
          <Tbody>
            {list.map((e: any, i: any) => {
              return (
                <Tr key={i} className="border-b border-blue-gray-200">
                  <Td>{total - (page - 1) * pageSize - i}</Td>
                  <Td>
                    <Image
                      src={`${CDN_URL}/${e.ComboImage}`}
                      alt=""
                      width={100}
                      height={100}
                    />
                  </Td>
                  <Td>{e.ComboName}</Td>
                  <Td>{e.InitPrice}</Td>
                  <Td>{e.SellPrice}</Td>
                  <Td>{e.CategoryName}</Td>
                  <Td center>
                    <Link
                      href={`/admin/combo/write/${e.ComboID}`}
                      className="font-medium text-blue-600 hover:text-blue-800 me-3"
                    >
                      <i className="fas fa-edit"></i>
                    </Link>
                    <button
                      className="text-red-500"
                      onClick={() => handleDelete(e.ComboID)}
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
        cP={page}
        tE={total}
        per={10}
        onChange={handleChangePage}
      />
    </Layout>
  );
}

export default ComboList;
