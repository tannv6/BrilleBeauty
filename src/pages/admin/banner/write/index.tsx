import React from "react";
import BannerWrite1 from "./[bannerID]";
import axios from "axios";
export const getServerSideProps = async () => {
  const result = await axios.get("http://localhost:3000/api/category/all");

  const catObject = result.data;
  return {
    props: {
      catObject,
    },
  };
};
function BannerWrite({ catObject }: any) {
  return <BannerWrite1 isNew catObject={catObject} />;
}

export default BannerWrite;
