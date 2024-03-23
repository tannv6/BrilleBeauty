import React, { useEffect, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import "@/app/globals.css";
import { listMenu } from "@/utils/constants";
import { usePathname } from "next/navigation";
import SimpleReactLightbox from 'simple-react-lightbox';
function Layout({ children }: any) {
  const pathname = usePathname();

  const initMenu = listMenu.find((e) =>
    e.mapLinks?.find((e1) => pathname?.includes(e1))
  );

  const [activeMenu, setActiveMenu] = useState(initMenu?.id || 0);

  useEffect(() => {
    const initMenu = listMenu.find((e) =>
      e.mapLinks?.find((e1) => pathname?.includes(e1))
    );
    setActiveMenu(initMenu?.id || 0);
  }, [pathname]);

  const handleChangeMenu = (id: number) => {
    if (activeMenu == id) {
      setActiveMenu(0);
    } else {
      setActiveMenu(id);
    }
  };
  return (
    <SimpleReactLightbox>
      <Head>
        <title>Brille Beauty CMS</title>
      </Head>
      <link
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css"
        rel="stylesheet"
      />
      <nav className="bg-blue-500 p-4 flex items-center justify-between">
        <div>
          <h1 className="text-white text-xl font-semibold">Brille Beauty</h1>
        </div>
        <div className="flex items-center space-x-4">
          <span className="text-white">{"admin"}</span>
          <i className="fas fa-user-circle text-white text-2xl" />
        </div>
      </nav>
      <div className="flex overflow-x-auto">
        <aside className="bg-gray-800 text-white w-64 min-h-screen py-4">
          <nav>
            <ul className="space-y-2">
              {listMenu.map((e, i) => {
                return (
                  <li
                    key={i}
                    className="opcion-con-desplegable ease-out duration-300"
                  >
                    <div
                      role="button"
                      onClick={() => handleChangeMenu(e.id)}
                      className="flex items-center justify-between py-2 px-4 hover:bg-gray-700"
                    >
                      <div className="flex items-center">
                        <i className={`${e.icon} mr-2`} />
                        <span>{e.label}</span>
                      </div>
                      <i className="fas fa-chevron-down text-xs" />
                    </div>
                    <ul
                      className={`duration-300 desplegable pl-6 ease-out overflow-hidden ${
                        activeMenu === e.id ? "max-h-[500px]" : "max-h-[0px]"
                      }`}
                    >
                      {e.children?.map((e1, i1) => {
                        return (
                          <li key={i1}>
                            <Link
                              href={e1.link}
                              className="block p-2 hover:bg-gray-700 flex items-center"
                            >
                              <i className="fas fa-chevron-right mr-2 text-xs" />
                              {e1.label}
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  </li>
                );
              })}
            </ul>
          </nav>
        </aside>
        <main className="w-full mx-auto p-4">{children}</main>
      </div>
    </SimpleReactLightbox>
  );
}

export default Layout;
