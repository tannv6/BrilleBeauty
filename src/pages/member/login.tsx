import Layout from "@/components/Layout";
import Link from "next/link";
import { useRouter } from "next/router";
import { FormEvent, useState } from "react";
import { getSession, signIn } from "next-auth/react";
import { GetServerSideProps } from "next";
import { parse } from "cookie";
import { getWebSetting } from "@/lib/functions";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]";
export const getServerSideProps = (async (context: any) => {
  const cookies = parse(context.req.headers.cookie || "");
  const session = await getServerSession(context.req, context.res, authOptions);

  if (session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: { ...(await getWebSetting(cookies)) },
  };
}) satisfies GetServerSideProps<{}>;
export default function Login({ ...props }) {
  const [error, setError] = useState("");
  const router = useRouter();

  const [user, setUser] = useState<{ [key: string]: any }>({
    user_name: "",
    password: "",
  });

  function handleChangeUser(e: any) {
    setError("");
    setUser({ ...user, [e.target.name]: e.target.value });
  }

  async function loginForm(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const username = user.user_name;
    const password = user.password;

    try {
      const res = await signIn("credentials", {
        redirect: false,
        username,
        password,
      });

      if (res?.error) {
        setError("Thông tin đăng nhập không chính xác!");
        return;
      }

      router.push("/");
    } catch (error) {
      console.log(error);
    }
  }

  return (
      <Layout {...props}>
        <div className="inner-530 mt-[95px] mb-[375px]">
          <div className="flex mb-[35px]">
            <button
              type="button"
              className={`w-full h-[54px] border border-[#dbdbdb] btn_on flex items-center justify-center text-[18px] text-[#999] border-b-[#252525] font-bold`}
            >
              Login
            </button>
            <Link
              href={"/register"}
              className={`w-full h-[54px] border border-[#dbdbdb] flex items-center justify-center text-[18px] text-[#999] border-b-[#252525] font-bold`}
            >
              Register
            </Link>
          </div>
          <form id="form_login" onSubmit={loginForm}>
            <div className="mt-10">
              <label
                htmlFor="user_name"
                className="block text-[18px] font-bold leading-6 text-[#252525]"
              >
                Email*
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="user_name"
                  id="user_name"
                  value={user.user_name}
                  onChange={handleChangeUser}
                  className="block w-full rounded-md border outline-none border-gray-200 bg-transparent py-3 pl-2 text-[16px] placeholder:text-[#999] transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-f04b76"
                  placeholder="Please enter your ID"
                />
              </div>
            </div>
            <div className="mt-4">
              <label
                htmlFor="password"
                className="block text-[18px] font-bold leading-6 text-[#252525]"
              >
                Password*
              </label>
              <div className="mt-2">
                <input
                  type="password"
                  name="password"
                  id="password"
                  value={user.password}
                  onChange={handleChangeUser}
                  className="block w-full rounded-md border outline-none border-gray-200 bg-transparent py-3 pl-2 text-[16px] placeholder:text-[#999] transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-f04b76"
                  placeholder="Please enter a password."
                />
              </div>
            </div>
            <div className="flex items-center justify-between mt-[30px]">
              <div className="flex gap-2 items-center">
                <input
                  className="w-[22px] h-[22px] rounded appearance-none border checked:bg-[url('/checkbox_customer.png')] checked:border-0 cursor-pointer"
                  type="checkbox"
                  id="save"
                />
                <label
                  htmlFor="save"
                  className="text-[16px] font-medium text-[#252525]"
                >
                  {" "}
                  Save ID
                </label>
              </div>
              <Link href={"/find_id"}>
                <p className="text-[16px] font-medium text-[#454545]">
                  Forgot Your Password?
                </p>
              </Link>
            </div>
            {error && (
              <div className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">
                {error}
              </div>
            )}

            <button
              type="submit"
              className="mt-7 w-full h-[62px] flex items-center justify-center rounded bg-[#f04b76] text-[18px] text-white font-medium"
            >
              Login
            </button>
          </form>
        </div>
      </Layout>
  );
}
