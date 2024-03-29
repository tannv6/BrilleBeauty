import axios from "axios";
import { SessionProvider } from "next-auth/react";
import App, { AppContext, AppProps } from "next/app";
import { createContext, useState } from "react";
type TProps = Pick<AppProps, "Component" | "pageProps"> & {
  session: any;
  category: any;
  combo_category: any;
};
export const MyContext = createContext({});
const MyCustomApp = ({
  Component,
  session,
  pageProps,
  category,
  combo_category,
}: TProps) => {
  return (
    <>
      <SessionProvider session={session} refetchInterval={5 * 60}>
        <MyContext.Provider value={{ category, combo_category }}>
          <Component {...pageProps} />
        </MyContext.Provider>
      </SessionProvider>
    </>
  );
};

MyCustomApp.getInitialProps = async (context: AppContext) => {
  const ctx = await App.getInitialProps(context);
  const category = await axios.get("http://localhost:3000/api/category/header");
  const combo_category = await axios.get(
    "http://localhost:3000/api/combo_category/header"
  );
  return {
    category: JSON.stringify(category.data),
    combo_category: JSON.stringify(combo_category.data),
  };
};

export default MyCustomApp;
