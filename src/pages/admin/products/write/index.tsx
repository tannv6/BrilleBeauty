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
    },
  };
};
function index({ catObject }: any) {
  return <ProductWrite {...{ catObject }} />;
}

export default index;
