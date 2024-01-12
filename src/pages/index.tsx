import type { InferGetServerSidePropsType, GetServerSideProps } from "next";
import "./style.css";
import Link from "next/link";
import Layout from "./components/Layout";
import { useState } from "react";

export const getServerSideProps: GetServerSideProps<{
  text: string;
}> = async () => {
  return { props: { text: "Get data here!" } };
};

export default function Page({
  text,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <Layout>
      <div className="red">
        {text}
        <Link href={"/products"}>Go to products</Link>
      </div>
    </Layout>
  );
}
