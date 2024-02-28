import React, { useState } from "react";
import Layout from "../../components/Layout";
import { GetServerSideProps } from "next";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";
import { useRouter } from "next/router";
import Pagingnation from "../../components/Pagingnation";
import Table from "../../components/Table";
import Thead from "../../components/Thead";
import Tr from "../../components/Tr";
import Th from "../../components/Th";
import Td from "../../components/Td";
import moment from "moment";
const CDN_URL = process.env.NEXT_PUBLIC_CDN_URL;
const scale = 3;
export const getServerSideProps = (async (context: any) => {
  const { params } = context;
  const { page } = params;
  const response = await axios.get("http://localhost:3000/api/orders/list", {
    params: { page, scale },
  });
  return {
    props: {
      response: response.data.data,
      initPage: page,
      ...response.data,
    },
  };
}) satisfies GetServerSideProps<{ response: any }>;
function OrdersList({ response, initPage, total, totalPage }: any) {
  const router = useRouter();
  const [page, setPage] = useState(Number(initPage) || 1);

  const [list, setList] = useState(response || []);
  const getData = async (page: number) => {
    const response = await axios.get("/api/orders/list", {
      params: { page, scale },
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
    if (confirm("Are you sure delete this order?")) {
      await axios.put(`/api/orders/del`, { OrderID: id });
      window.location.reload();
    }
  };
  return (
    <Layout>
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold mb-4">Orders List</h1>
      </div>
      <div className="flex items-center justify-center">
        <Table>
          <Thead>
            <Tr className="bg-blue-gray-100 text-gray-700">
              <Th>ID</Th>
              <Th>Order Code</Th>
              <Th>MemberName</Th>
              <Th>Email</Th>
              <Th>Phone</Th>
              <Th>Order Time</Th>
              <Th center>Action</Th>
            </Tr>
          </Thead>
          <tbody className="text-blue-gray-900">
            {list.map((e: any, i: any) => {
              return (
                <Tr key={i}>
                  <Td>{total - (page - 1) * scale - i}</Td>
                  <Td>{e.OrdersCode}</Td>
                  <Td>{e.RecieverName}</Td>
                  <Td>{e.OrderEmail}</Td>
                  <Td>{e.OrderPhone}</Td>
                  <Td>{moment(e.CreatedAt).format("yyyy-MM-DD HH:mm:ss")}</Td>
                  <Td center>
                    <Link
                      href={`/admin/orders/write/${e.OrderID}`}
                      className="font-medium text-blue-600 hover:text-blue-800 me-3"
                    >
                      <i className="fas fa-edit"></i>
                    </Link>
                    <button
                      className="text-red-500"
                      onClick={() => handleDelete(e.OrderID)}
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
        cP={page}
        tE={total}
        per={10}
        onChange={handleChangePage}
      />
    </Layout>
  );
}

export default OrdersList;
