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
import { SRLWrapper } from "simple-react-lightbox";
import { pageSize } from "@/lib/constants";
const CDN_URL = process.env.NEXT_PUBLIC_CDN_URL;

export const getServerSideProps = (async (context: any) => {
  const { params } = context;
  const { page } = params;
  const response = await axios.get("http://localhost:3000/api/products/list", {
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
function ProductList({ response, initPage, total, totalPage }: any) {
  const router = useRouter();
  const [page, setPage] = useState(Number(initPage) || 1);

  const [list, setList] = useState(response || []);
  const getData = async (page: number) => {
    const response = await axios.get("/api/products/list", {
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
    if (confirm("Are you sure delete this product?")) {
      await axios.put(`/api/products/del`, { ProductID: id });
      window.location.reload();
    }
  };
  return (
    <Layout>
      <SRLWrapper
        options={{
          thumbnails: {
            showThumbnails: false,
          },
        }}
      >
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold mb-4">Products List</h1>
          <Link
            href={"/admin/products/write"}
            className="flex justify-center items-center bg-blue-600 text-white p-2 rounded w-[150px] h-[40px]"
          >
            Add New Product
          </Link>
        </div>
        <div className="flex items-center justify-center">
          <Table>
            <Thead>
              <Tr className="bg-blue-gray-100 text-gray-700">
                <Th>ID</Th>
                <Th>Thumb Image</Th>
                <Th>Product Name</Th>
                <Th>Original Price</Th>
                <Th>Sell Price</Th>
                <Th>Category</Th>
                <Th center>Action</Th>
              </Tr>
            </Thead>
            <tbody className="text-blue-gray-900">
              {list.map((e: any, i: any) => {
                return (
                  <Tr key={i}>
                    <Td>{total - (page - 1) * pageSize - i}</Td>
                    <Td>
                      <Image
                        src={`${CDN_URL}/${e.ProductImage}`}
                        alt=""
                        width={100}
                        height={100}
                      />
                    </Td>
                    <Td>{e.ProductName}</Td>
                    <Td>{e.InitPrice}</Td>
                    <Td>{e.SellPrice}</Td>
                    <Td>{e.CategoryName}</Td>
                    <Td center>
                      <Link
                        href={`/admin/products/write/${e.ProductID}`}
                        className="font-medium text-blue-600 hover:text-blue-800 me-3"
                      >
                        <i className="fas fa-edit"></i>
                      </Link>
                      <button
                        className="text-red-500"
                        onClick={() => handleDelete(e.ProductID)}
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
      </SRLWrapper>
    </Layout>
  );
}

export default ProductList;
