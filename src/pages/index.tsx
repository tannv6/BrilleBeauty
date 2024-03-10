import type { InferGetServerSidePropsType, GetServerSideProps } from "next";
import Link from "next/link";
import Layout from "@/components/Layout";
import Main from "@/components/Main";
import axios from "axios";
import connectDB from "@/app/db";
import { getWebSetting } from "@/lib/functions";

export const getServerSideProps: GetServerSideProps<{
  main_visual: any;
  after_main_visual: any[];
  main_middle: any;
}> = async () => {
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
  const connect = await connectDB();
  const sql = "select * from homeset where idx = 1";
  const [result] = await connect.execute(sql);
  return {
    props: {
      main_visual: response.data[0],
      after_main_visual: response1.data,
      main_middle: response2.data[0],
      ...(await getWebSetting()),
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
