import Cookies from "cookies";

export function setCookie(
  ctx: any,
  name: string,
  value: string,
  options?: Cookies.SetOption
) {
  const cookies = new Cookies(ctx.req, ctx.res);
  cookies.set(name, value, options);
}

export function getCookieValue(ctx: any, name: string) {
  const cookies = new Cookies(ctx.req, ctx.res, {keys: ['pop']});
  return cookies.get(name);
}

export function setCookieClient(name: any, value: any, days: any) {
  var expires = "";
  if (days) {
    var date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + (value || "") + expires + "; path=/";
}
export function getCookieClient(name: any) {
  var nameEQ = name + "=";
  var ca = document.cookie.split(";");
  
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == " ") c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}
