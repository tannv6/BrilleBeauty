import type { InferGetServerSidePropsType, GetServerSideProps } from "next";
import Link from "next/link";
import Layout from "@/components/Layout";
import Main from "@/components/Main";

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
      <Main />
      <div className="text-red-600">
        {text}
        <Link className="text-green-600" href={"/products"}>Go to products</Link>
      </div>
    </Layout>
  );
}
