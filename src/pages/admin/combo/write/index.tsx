import React from "react";
import ComboDetail from "./[comboID]";
import axios from "axios";
export const getServerSideProps = async () => {
  const result1 = await axios.get(
    "http://localhost:3000/api/combo_category/list"
  );

  const result2 = await axios.get("http://localhost:3000/api/season/list");
  return {
    props: {
      categoryList: result1.data.data.map((e: any) => ({
        id: e.CategoryID,
        name: e.CategoryName,
        IsSeasonal: e.IsSeasonal || 0,
      })),
      seasonList: result2.data.data.map((e: any) => ({
        id: e.SeasonID,
        name: e.SeasonName,
      })),
    },
  };
};
function index({ categoryList, seasonList }: any) {
  return <ComboDetail {...{ isNew: true, categoryList, seasonList }} />;
}

export default index;
