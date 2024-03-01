import React from "react";
import ProductWrite from "./[productID]";
import axios from "axios";
export const getServerSideProps = async () => {
  const result = await axios.get("http://localhost:3000/api/category/all");

  const catObject = result.data;
  const result1 = await axios.get(
    "http://localhost:3000/api/option_types/list"
  );

  const result2 = await axios.get("http://localhost:3000/api/brand/list");

  return {
    props: {
      catObject,
      optionTypes: result1.data.data,
      brandList: result2.data.data.map((e:any)=>({...e, id:e.BrandID, name:e.BrandName})),
    },
  };
};
function index({ catObject, optionTypes, brandList }: any) {
  return (
    <ProductWrite {...{ catObject, optionTypes, isNew: true, brandList }} />
  );
}

export default index;
