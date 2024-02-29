import React from "react";
import ComboDetail from "./[comboID]";
import axios from "axios";
export const getServerSideProps = async () => {
  const result1 = await axios.get(
    "http://localhost:3000/api/combo_category/list"
  );

  return {
    props: {
      categoryList: result1.data.data.map((e: any) => ({
        id: e.CategoryID,
        name: e.CategoryName,
      })),
    },
  };
};
function index({ categoryList }: any) {
  return <ComboDetail {...{ isNew: true, categoryList }} />;
}

export default index;
