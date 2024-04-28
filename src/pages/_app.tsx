import axios from "axios";
import { SessionProvider, getSession } from "next-auth/react";
import { AppProps } from "next/app";
import { createContext, useEffect, useMemo, useReducer } from "react";
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
    case "UPDATE_STATE":
      return { ...state, ...action.payload };
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
  webSetting,
  banner_top,
  popup,
}: TProps) => {
  const sessionJson = useMemo(() => {
    return JSON.parse(session);
  }, [session]);
  const isLogin = !!sessionJson;
  const customerID = sessionJson?.user?.id;

  const [state, dispatch] = useReducer(dataReducer, {
    category,
    combo_category,
    isLogin,
    customerID,
    webSetting,
    banner_top,
    popup,
    cartCount: 0,
  });
  useEffect(() => {
    const isLogin = !!sessionJson;
    const customerID = sessionJson?.user?.id;
    dispatch({
      type: "UPDATE_STATE",
      payload: {
        isLogin,
        customerID,
      },
    });
  }, [sessionJson]);
  useEffect(() => {
    dispatch({
      type: "UPDATE_STATE",
      payload: {
        popup,
      },
    });
  }, [popup]);
  return (
    <>
      <SessionProvider session={session} refetchInterval={5 * 60}>
        <MyContext.Provider value={state}>
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
  let cookies_str = "";
  if (typeof document === "undefined") {
    cookies_str = context.ctx.req?.headers.cookie || "";
  } else {
    cookies_str = document?.cookie || "";
  }
  const cookies = parse(cookies_str);

  const webSetting = await getWebSetting(cookies);
  return {
    category: JSON.stringify(category.data),
    combo_category: JSON.stringify(combo_category.data),
    session: JSON.stringify(session),
    webSetting: JSON.stringify(webSetting.webSetting),
    banner_top: JSON.stringify(webSetting.banner_top),
    popup: JSON.stringify(webSetting.popup),
  };
};

export default MyCustomApp;
