import React from "react";
import Layout from "../components/Layout";
import { GetServerSideProps } from "next";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";
import Table from "../components/Table";
import Thead from "../components/Thead";
import Tr from "../components/Tr";
import Th from "../components/Th";
import Tbody from "../components/Tbody";
import Td from "../components/Td";
import Pagingnation from "../components/Pagingnation";
const CDN_URL = process.env.NEXT_PUBLIC_CDN_URL;
export const getServerSideProps = (async () => {
  const response = await axios.get("http://localhost:3000/api/combo/list");
  return {
    props: {
      response: response.data.data,
    },
  };
}) satisfies GetServerSideProps<{ response: any }>;
function List({ response }: any) {
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
        <div className="min-w-full overflow-x-auto">
          <Table colWidths={["10%", "100px", "45%", "20%", "20%", "10%"]}>
            <Thead>
              <Tr>
                <Th>ID</Th>
                <Th>Image</Th>
                <Th>Combo Name</Th>
                <Th>Original Price</Th>
                <Th>Sell Price</Th>
                <Th center>Action</Th>
              </Tr>
            </Thead>
            <Tbody>
              {response.map((e: any, i: any) => {
                return (
                  <Tr key={i} className="border-b border-blue-gray-200">
                    <Td>{e.ComboID}</Td>
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
                    <Td center>
                      <Link
                        href={`/admin/combo/write/${e.ComboID}`}
                        className="font-medium text-blue-600 hover:text-blue-800"
                      >
                        <i className="fas fa-edit"></i>
                      </Link>
                    </Td>
                  </Tr>
                );
              })}
            </Tbody>
          </Table>
        </div>
      </div>
      <Pagingnation tP={5} cP={3} tE={100} scale={10}/>
    </Layout>
  );
}

export default List;
