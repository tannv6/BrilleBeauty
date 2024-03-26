import React, { useEffect, useState } from "react";
import AdminLayout from "../../components/AdminLayout";
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
import { SRLWrapper } from "simple-react-lightbox";
import { pageSize } from "@/lib/constants";
import { bannerCategories } from "@/utils/constants";
const CDN_URL = process.env.NEXT_PUBLIC_CDN_URL;
export const getServerSideProps = (async (context: any) => {
  const { params, query } = context;
  const { page } = params;
  const { cate } = query;

  const response = await axios.get("http://localhost:3000/api/banners/list", {
    params: { page, pageSize, cate },
  });
  return {
    props: {
      response: response.data.data,
      initPage: Number(page),
      ...response.data,
      cate,
    },
  };
}) satisfies GetServerSideProps<{ response: any }>;
function BannerList({ response, initPage, total, totalPage, cate }: any) {
  const router = useRouter();
  const [page, setPage] = useState(Number(initPage) || 1);

  const [list, setList] = useState(response || []);
  const getData = async (page: number) => {
    const response = await axios.get("/api/banners/list", {
      params: { page, pageSize, cate },
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
    if (confirm("Are you sure delete this banner?")) {
      await axios.put(`/api/banners/del`, { BannerID: id });
      window.location.reload();
    }
  };

  useEffect(() => {
    setList(response);
    setPage(initPage);
  }, [response, initPage]);

  return (
    <AdminLayout>
      <SRLWrapper
        options={{
          thumbnails: {
            showThumbnails: false,
          },
        }}
      >
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold break-keep">Banners List</h1>
          <div className="flex gap-[2px] flex-wrap">
            {Object.values(bannerCategories).map((e, i) => {
              return (
                <Link
                className={`inline-flex justify-center items-center ${e.id == cate ? "bg-blue-600" : "bg-gray-600"} text-white py-0 px-2 rounded h-[35px]`}
                  key={i}
                  href={`/admin/banner/list/1?cate=${e.id}`}
                  prefetch
                >
                  {e.name}
                </Link>
              );
            })}
          </div>
          <Link
            href={"/admin/banner/write"}
            className="flex justify-center items-center bg-blue-600 text-white py-2 px-3 rounded h-[40px]"
          >
            Add New Banner
          </Link>
        </div>
        <div className="flex items-center justify-center">
          <Table>
            <Thead>
              <Tr className="bg-blue-gray-100 text-gray-700">
                <Th>ID</Th>
                <Th>Category</Th>
                <Th>Image</Th>
                <Th>Link</Th>
                <Th>CreatedAt</Th>
                <Th center>Action</Th>
              </Tr>
            </Thead>
            <tbody className="text-blue-gray-900">
              {list.map((e: any, i: any) => {
                return (
                  <Tr key={i}>
                    <Td>{total - (page - 1) * pageSize - i}</Td>
                    <Td>{e.BannerCategory}</Td>
                    <Td>
                      <Image
                        width={100}
                        height={100}
                        src={`${CDN_URL}/${e.BannerImg}`}
                        alt=""
                      />
                    </Td>
                    <Td>{e.BannerLink}</Td>
                    <Td>{moment(e.CreatedAt).format("yyyy-MM-DD HH:mm:ss")}</Td>
                    <Td center>
                      <Link
                        href={`/admin/banner/write/${e.BannerID}`}
                        className="font-medium text-blue-600 hover:text-blue-800 me-3"
                      >
                        <i className="fas fa-edit"></i>
                      </Link>
                      <button
                        className="text-red-500"
                        onClick={() => handleDelete(e.BannerID)}
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
    </AdminLayout>
  );
}

export default BannerList;
