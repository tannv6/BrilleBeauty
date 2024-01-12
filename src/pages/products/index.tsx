import type { InferGetServerSidePropsType, GetServerSideProps } from "next";
import Layout from "../components/Layout";
import style from "./products.module.css";

export const getServerSideProps: GetServerSideProps<{
  list: string;
}> = async () => {
  return { props: { list: "List products!" } };
};

export default function Page({
  list,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <Layout>
      <ul className={style.product_list}>{list}</ul>
    </Layout>
  );
}
