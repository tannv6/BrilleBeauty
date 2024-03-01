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
import { SRLWrapper } from "simple-react-lightbox";
const CDN_URL = process.env.NEXT_PUBLIC_CDN_URL;
const scale = 3;
export const getServerSideProps = (async (context: any) => {
  const { params } = context;
  const { page } = params;
  const response = await axios.get("http://localhost:3000/api/popups/list", {
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
function PopupList({ response, initPage, total, totalPage }: any) {
  const router = useRouter();
  const [page, setPage] = useState(Number(initPage) || 1);

  const [list, setList] = useState<{
    PopupID:any;
    PopupTitle:any;
    PopupContent:any;
    PositionTop:any;
    PositionLeft:any;
    StartDate:any;
    EndDate:any;
    IsShow:any;
    CreatedAt:any;
    UpdatedAt:any;
    DeletedAt:any;
    PopupImage:any;
    PopupLink:any;
    PopupScreen:any;
  }[]>(response || []);
  const getData = async (page: number) => {
    const response = await axios.get("/api/popups/list", {
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
    if (confirm("Are you sure delete this popup?")) {
      await axios.put(`/api/popups/del`, { PopupID: id });
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
          <h1 className="text-2xl font-bold mb-4">Popups List</h1>
          <Link
            href={"/admin/popup/write"}
            className="flex justify-center items-center bg-blue-600 text-white py-2 px-3 rounded h-[40px]"
          >
            Add New Popup
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
              {list.map((e, i) => {
                return (
                  <Tr key={i}>
                    <Td>{total - (page - 1) * scale - i}</Td>
                    <Td>{e.PopupScreen}</Td>
                    <Td>
                      <Image
                        width={100}
                        height={100}
                        src={`${CDN_URL}/${e.PopupImage}`}
                        alt=""
                      />
                    </Td>
                    <Td>{e.PopupLink}</Td>
                    <Td>{moment(e.CreatedAt).format("yyyy-MM-DD HH:mm:ss")}</Td>
                    <Td center>
                      <Link
                        href={`/admin/popup/write/${e.PopupID}`}
                        className="font-medium text-blue-600 hover:text-blue-800 me-3"
                      >
                        <i className="fas fa-edit"></i>
                      </Link>
                      <button
                        className="text-red-500"
                        onClick={() => handleDelete(e.PopupID)}
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

export default PopupList;
