import React, { FormEvent, useState } from "react";
import "@/app/globals.css";
import Link from "next/link";
import connectDB from "@/app/db";
import { useRouter } from "next/router";
import { GetServerSideProps } from "next";
import { signIn } from "next-auth/react";

export const getServerSideProps = (async () => {
  const connect = await connectDB();
  const [response] = await connect.execute("SELECT * FROM admin");
  connect.end();
  return { props: { response: (response as any)[0]?.AdminUName } };
}) satisfies GetServerSideProps<{ response: any }>;

function Main({ response }: any) {
  const [error, setError] = useState("");
  const router = useRouter();
  const [user, setUser] = useState<{ [key: string]: any }>({
    username: "",
    password: "",
  });
  function handleChange(e: any) {
    setError("");
    setUser({ ...user, [e.target.name]: e.target.value });
  }
  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const username = user.username;
    const password = user.password;

    try {
      const res = await signIn("credentials", {
        redirect: false,
        username,
        password,
        mode: "admin",
      });

      if (res?.error) {
        setError("Thông tin đăng nhập không chính xác!");
        return;
      }

      router.push("/admin/category/list");

    } catch (error) {
      console.log(error);
    }
  }
  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0 bg-[url('/backgroud_admin.png')]">
        <Link
          href=""
          className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
        >
          BrilleBeauty
        </Link>
        <div className="w-[360px] max-w-full bg-white rounded-lg shadow dark:border md:mt-0 xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <form className="flex flex-col gap-3" onSubmit={onSubmit}>
              <div>
                <label
                  htmlFor="username"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your username
                </label>
                <input
                  type="username"
                  name="username"
                  id="username"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Username"
                  required={true}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required={true}
                  onChange={handleChange}
                />
              <div>
                <label
                  htmlFor="remember"
                  className="text-gray-500 dark:text-gray-300 text-sm text-red-400"
                >
                  {error}
                </label>
              </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="remember"
                      aria-describedby="remember"
                      type="checkbox"
                      className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label
                      htmlFor="remember"
                      className="text-gray-500 dark:text-gray-300"
                    >
                      Remember me
                    </label>
                  </div>
                </div>
                <a
                  href="#"
                  className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500"
                >
                  Forgot password?
                </a>
              </div>
              <button
                type="submit"
                className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Sign in
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Main;
