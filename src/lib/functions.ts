import axios from "axios";
import { ReadonlyURLSearchParams } from "next/navigation";

type AnyFunction = (...args: any[]) => any;

export function debounce<F extends AnyFunction>(
  func: F,
  delay: number
): (...args: Parameters<F>) => void {
  let timeoutId: ReturnType<typeof setTimeout>;

  return function (this: ThisParameterType<F>, ...args: Parameters<F>) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}

export function searchParamsToObject(params: ReadonlyURLSearchParams | null) {
  const paramsObject: { [key: string]: any } = {};
  if (params) {
    params.forEach((value, key) => {
      paramsObject[key] = value;
    });
  }
  return paramsObject;
}

export function objectToSearchParams(obj: { [key: string]: any }) {
  const searchParams = new URLSearchParams();

  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      searchParams.append(key, obj[key]);
    }
  }

  return searchParams.toString();
}

export async function getWebSetting(cookies: any) {
  const response = await axios.get(getApiUrl("/api/banners/get_by_position"), {
    params: { position: "top", count: 1 },
  });

  const result = await axios.get(getApiUrl("/api/setting/web_info_detail"));

  const result1 = await axios.get(getApiUrl("/api/popups/list_show_pop"), {
    params: { cookies1: JSON.stringify(cookies) },
    withCredentials: true,
  });

  return {
    webSetting: result.data,
    banner_top: response.data[0] || null,
    popup: result1.data.data,
  };
}

export const getDiscount = (init: number = 0, sell: number = 0) => {
  return Math.round(((init - sell) / init) * 100);
};

export const getApiUrl = (basePath: any) => {
  const baseUrlServer = "http://localhost:3000";
  if (typeof window === "undefined") {
    return `${baseUrlServer}${basePath}`;
  }
  return basePath;
};

export const generatePassword = (length: number, characters: string) => {
  let password = "";
  for (let i = 0; i < length; i++) {
    password += characters.charAt(
      Math.floor(Math.random() * characters.length)
    );
  }
  return password;
};
