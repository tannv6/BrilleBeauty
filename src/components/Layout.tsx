import Head from "next/head";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "@/app/globals.css";
import localFont from '@next/font/local'

function Layout({ children }: any) {
  return (
    <>
      <Head>
        <title>BrilleBeauty</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="BrilleBeauty" />
      </Head>

      <Header />

      {children}

      <Footer />
    </>
  );
}

export default Layout;
