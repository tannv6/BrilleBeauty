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
