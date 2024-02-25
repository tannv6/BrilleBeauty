import React from "react";
import ProductWrite from "./[productID]";
import axios from "axios";
export const getServerSideProps = async () => {
  const result = await axios.get("http://localhost:3000/api/category/list");

  const categories = result.data.data;

  const catObject: any = {
    level1: [],
    level2: [],
    level3: [],
  };
  const result1 = await axios.get(
    "http://localhost:3000/api/option_types/list"
  );

  categories.forEach((e: any, i: any) => {
    if (e.Level === 1) {
      catObject.level1.push({
        ...e,
        id: e.CategoryID,
        name: e.CategoryName,
      });
    } else if (e.Level === 2) {
      catObject.level2.push({
        ...e,
        id: e.CategoryID,
        name: e.CategoryName,
      });
    } else if (e.Level === 3) {
      catObject.level3.push({
        ...e,
        id: e.CategoryID,
        name: e.CategoryName,
      });
    }
  });

  return {
    props: {
      catObject,
      optionTypes: result1.data.data,
    },
  };
};
function index({ catObject, optionTypes }: any) {
  return <ProductWrite {...{ catObject, optionTypes, isNew: true }} />;
}

export default index;
