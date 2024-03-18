import type { InferGetServerSidePropsType, GetServerSideProps } from "next";
import Link from "next/link";
import Layout from "@/components/Layout";
import Main from "@/components/Main";
import axios from "axios";
import { getWebSetting } from "@/lib/functions";
import { parse } from 'cookie';
export const getServerSideProps: GetServerSideProps<{
  main_visual: any;
  after_main_visual: any[];
  main_middle: any;
}> = async (context:any) => {
  const { req } = context;
  const cookies = parse(req.headers.cookie || '');
  
  const response = await axios.get(
    "http://localhost:3000/api/banners/get_by_position",
    {
      params: { position: "main_visual" },
    }
  );
  const response1 = await axios.get(
    "http://localhost:3000/api/banners/get_by_position",
    {
      params: { position: "after_main_visual", count: 2 },
    }
  );
  const response2 = await axios.get(
    "http://localhost:3000/api/banners/get_by_position",
    {
      params: { position: "main_middle", count: 1 },
    }
  );
  return {
    props: {
      main_visual: response.data[0] || null,
      after_main_visual: response1.data,
      main_middle: response2.data[0] || null,
      ...(await getWebSetting(cookies)),
    },
  };
};

export default function Page({
  main_visual,
  after_main_visual,
  main_middle,
  ...props
}: any) {
  return (
    <Layout {...props}>
      <Main
        main_visual={main_visual}
        after_main_visual={after_main_visual}
        main_middle={main_middle}
      />
    </Layout>
  );
}
