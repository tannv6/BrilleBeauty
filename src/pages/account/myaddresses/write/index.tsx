import React from "react";
import Write from "./[ODID]";
import axios from "axios";
import { GetServerSideProps } from "next";
export const getServerSideProps = (async (context: any) => {
  const result1 = await axios.get(`http://localhost:3000/api/adress/countries`);
  return {
    props: {
      countryList: result1.data.data,
    },
  };
}) satisfies GetServerSideProps<{ countryList: any }>;
function ODWrite({ countryList }: any) {
  return <Write isNew countryList={countryList} />;
}

export default ODWrite;
