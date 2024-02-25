import React from "react";
import ComboList from "./[page]";
import axios from "axios";
import { GetServerSideProps } from "next";
const scale = 10;
export const getServerSideProps = (async () => {
  const response = await axios.get("http://localhost:3000/api/combo/list", {
    params: { page: 1, scale },
  });
  return {
    props: {
      response: response.data.data,
      initPage: 1,
      ...response.data,
    },
  };
}) satisfies GetServerSideProps<{ response: any }>;
function CList({ response, initPage, total, totalPage }: any) {
  return <ComboList {...{ response, initPage, total, totalPage }} />;
}

export default CList;
