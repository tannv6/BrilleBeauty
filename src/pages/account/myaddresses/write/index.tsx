import React from "react";
import Write from "./[ODID]";
import { getSession } from "next-auth/react";
import axios from "axios";
import { GetServerSideProps } from "next";
import { parse } from "cookie";
import { getWebSetting } from "@/lib/functions";
export const getServerSideProps = (async (context: any) => {
  const cookies = parse(context.req.headers.cookie || "");
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        destination: "/member/login",
        permanent: false,
      },
    };
  }
  const result1 = await axios.get(`http://localhost:3000/api/adress/countries`);
  return {
    props: {
      countryList: result1.data.data,
      ...(await getWebSetting(cookies)),
    },
  };
}) satisfies GetServerSideProps<{ countryList: any }>;
function ODWrite({ countryList, ...props }: any) {
  return <Write isNew countryList={countryList} {...props} />;
}

export default ODWrite;
