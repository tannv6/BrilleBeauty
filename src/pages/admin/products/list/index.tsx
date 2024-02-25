import axios from "axios";
import { GetServerSideProps } from "next";
import React from "react";
import ProductList from "./[page]";
const scale = 10;
export const getServerSideProps = (async () => {
  const response = await axios.get("http://localhost:3000/api/products/list", {
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
function PList({ response, initPage, total, totalPage }: any) {
  return <ProductList {...{ response, initPage, total, totalPage }} />;
}

export default PList;
