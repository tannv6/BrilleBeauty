import axios from "axios";
import React from "react";
import PopupList from "./[page]";
import { pageSize } from "../../utils/constants";

export const getServerSideProps = async () => {
  const response = await axios.get("http://localhost:3000/api/popups/list", {
    params: { page: 1, pageSize },
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
  return <PopupList {...{ response, initPage, total, totalPage }} />;
}

export default MList;
