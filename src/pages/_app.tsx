import axios from "axios";
import { SessionProvider, getSession } from "next-auth/react";
import App, { AppContext, AppProps } from "next/app";
import { createContext, useReducer, useState } from "react";
import { authOptions } from "./api/auth/[...nextauth]";
import { getApiUrl, getWebSetting } from "@/lib/functions";
import { parse } from "cookie";
type TProps = Pick<AppProps, "Component" | "pageProps"> & {
  session: any;
  category: any;
  combo_category: any;
  isLogin: boolean;
  customerID: number;
  webSetting: any;
  banner_top: any;
  popup: any;
};
export const MyContext = createContext({});
export const DataDispatchContext = createContext({});
function dataReducer(state: any, action: any) {
  switch (action.type) {
    case "INIT_CART_COUNT":
      return { ...state, cartCount: action.payload };
    case "UPDATE_CART_COUNT":
      return { ...state, cartCount: state.cartCount + action.payload };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
}
const MyCustomApp = ({
  Component,
  session,
  pageProps,
  category,
  combo_category,
  isLogin,
  customerID,
  webSetting,
  banner_top,
  popup,
}: TProps) => {
  const [state, dispatch] = useReducer(dataReducer, {
    category,
    combo_category,
    isLogin,
    customerID,
    webSetting,
    banner_top,
    popup,
    cartCount: 0
  });
  return (
    <>
      <SessionProvider session={session} refetchInterval={5 * 60}>
        <MyContext.Provider
          value={state}
        >
          <DataDispatchContext.Provider value={dispatch}>
            <Component {...pageProps} />
          </DataDispatchContext.Provider>
        </MyContext.Provider>
      </SessionProvider>
    </>
  );
};

MyCustomApp.getInitialProps = async (context: any) => {
  const session: any = await getSession(context);
  const category = await axios.get(getApiUrl("/api/category/header"));
  const combo_category = await axios.get(
    getApiUrl("/api/combo_category/header")
  );
  const cookies = parse(context.ctx.req?.headers.cookie || "");

  const webSetting = await getWebSetting(cookies);
  return {
    category: JSON.stringify(category.data),
    combo_category: JSON.stringify(combo_category.data),
    isLogin: !!session,
    customerID: session?.user?.id,
    webSetting: JSON.stringify(webSetting.webSetting),
    banner_top: JSON.stringify(webSetting.banner_top),
    popup: JSON.stringify(webSetting.popup),
  };
};

export default MyCustomApp;
