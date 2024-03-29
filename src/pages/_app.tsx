import axios from "axios";
import { getServerSession } from "next-auth";
import { SessionProvider, getSession } from "next-auth/react";
import App, { AppContext, AppProps } from "next/app";
import { createContext, useState } from "react";
import { authOptions } from "./api/auth/[...nextauth]";
type TProps = Pick<AppProps, "Component" | "pageProps"> & {
  session: any;
  category: any;
  combo_category: any;
  isLogin: boolean;
};
export const MyContext = createContext({});
const MyCustomApp = ({
  Component,
  session,
  pageProps,
  category,
  combo_category,
  isLogin,
}: TProps) => {
  return (
    <>
      <SessionProvider session={session} refetchInterval={5 * 60}>
        <MyContext.Provider value={{ category, combo_category, isLogin }}>
          <Component {...pageProps} />
        </MyContext.Provider>
      </SessionProvider>
    </>
  );
};

MyCustomApp.getInitialProps = async (context: any) => {
  const session = await getSession(context);
  const category = await axios.get("http://localhost:3000/api/category/header");
  const combo_category = await axios.get(
    "http://localhost:3000/api/combo_category/header"
  );
  return {
    category: JSON.stringify(category.data),
    combo_category: JSON.stringify(combo_category.data),
    isLogin: !!session,
  };
};

export default MyCustomApp;
