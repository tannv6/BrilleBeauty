import Layout from "@/components/Layout";
import MypageNav from "@/components/MypageNav";
import SubNav from "@/components/SubNav";
import axios from "axios";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import Pagination from "@/components/Pagi";
import { pageSize } from "@/lib/constants";
import moment from "moment";
import Link from "next/link";
import abc from "./icon_edit.svg";
import Image from "next/image";

export const getServerSideProps = (async (context: any) => {
  const session = await getSession(context);

  const { params } = context;
  const page = params?.page || 1;
  const result1 = await axios.get(
    `http://localhost:3000/api/order_address/list`,
    {
      params: { session: JSON.stringify(session), page, pageSize },
    }
  );
  return {
    props: {
      ...result1.data,
      page,
    },
  };
}) satisfies GetServerSideProps<{ data: any }>;
export default function MyAddresses({ data, page, total, totalPage }: any) {
  return (
    <Layout>
      <div id="main">
        <SubNav title1="My Account" title2="My Addresses" />
        <div className="inner-container mt-[75px] mb-[135px]">
          <div className="flex flex-row gap-[60px]">
            <MypageNav></MypageNav>
            <div className="grow mt-[17px]">
              <div className="flex justify-between pb-4 items-center border-b border-black">
                <p className="text-2xl">My Addresses</p>
                <Link
                  className="flex justify-center items-center bg-blue-600 text-white py-2 px-3 rounded h-[40px]"
                  href="/account/myaddresses/write"
                >
                  Add New Address
                </Link>
              </div>
              <table className="table-auto min-w-full">
                <colgroup>
                  <col width="10%" />
                  <col width="20%" />
                  <col width="25%" />
                  <col width="15%" />
                  <col width="20%" />
                  <col width="10%" />
                </colgroup>
                <thead>
                  <tr>
                    <th className="py-3 px-4 text-left">ID</th>
                    <th className="py-3 px-4 text-left">Name</th>
                    <th className="py-3 px-4 text-left">PhoneNumber</th>
                    <th className="py-3 px-4 text-left">Default</th>
                    <th className="py-3 px-4 text-left">Reg Date</th>
                    <th className="py-3 px-4 text-center">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {data?.map((e: any, i: number) => {
                    return (
                      <tr
                        key={i}
                        className="border-b border-blue-gray-200 last:border-0"
                      >
                        <td className="py-3 px-4 text-left">
                          {total - (page - 1) * pageSize - i}
                        </td>
                        <td className="py-3 px-4 text-left">
                          {e.FirstName} {e.LastName}
                        </td>
                        <td className="py-3 px-4 text-left">{e.PhoneNumber}</td>
                        <td className="py-3 px-4 text-left">
                          {e.IsDefault ? "Yes" : "No"}
                        </td>
                        <td className="py-3 px-4 text-left">
                          {moment(e.CreatedAt).format("yyyy-MM-DD")}
                        </td>
                        <td className="py-3 px-4 text-center">
                          <Link href={`/account/myaddresses/write/${e.ODID}`} className="flex justify-center">
                            <Image src={abc} alt={""} width={30} height={30} />
                          </Link>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              <Pagination
                totalPage={totalPage}
                currentPage={page}
                totalElement={total}
                elementsPerPage={10}
              />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
