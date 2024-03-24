import React from "react";
import Write from "./[ODID]";
import { getSession } from "next-auth/react";
import axios from "axios";
import { GetServerSideProps } from "next";
export const getServerSideProps = (async (context: any) => {
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }
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
