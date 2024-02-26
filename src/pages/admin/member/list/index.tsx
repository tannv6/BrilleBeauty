import axios from "axios";
import React from "react";
import MemberList from "./[page]";
const scale = 10;
export const getServerSideProps = async () => {
  const response = await axios.get("http://localhost:3000/api/customers/list", {
    params: { page: 1, scale },
  });
  return {
    props: {
      response: response.data.data,
      initPage: 1,
      ...response.data,
    },
  };
};
function MList({ response, initPage, total, totalPage }: any) {
  return <MemberList {...{ response, initPage, total, totalPage }} />;
}

export default MList;
