import axios from "axios";
import React from "react";
import PopupList from "./[page]";
const scale = 3;
export const getServerSideProps = async () => {
  const response = await axios.get("http://localhost:3000/api/popups/list", {
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
  return <PopupList {...{ response, initPage, total, totalPage }} />;
}

export default MList;
