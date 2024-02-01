import React, { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import "@/app/globals.css";
function Layout({ children }: any) {
  const [activeMenu, setActiveMenu] = useState(0);
  const handleChangeMenu = (id: number) => {
    if (activeMenu == id) {
      setActiveMenu(0);
    } else {
      setActiveMenu(id);
    }
  };
  return (
    <>
      <Head>
        <title>Brille Beauty CMS</title>
        <link
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css"
          rel="stylesheet"
        />
      </Head>
      <nav className="bg-blue-500 p-4 flex items-center justify-between">
        <div>
          <h1 className="text-white text-xl font-semibold">Brille Beauty</h1>
        </div>
        <div className="flex items-center space-x-4">
          <span className="text-white">{"admin"}</span>
          <i className="fas fa-user-circle text-white text-2xl" />
        </div>
      </nav>
      <div className="flex">
        <aside className="bg-gray-800 text-white w-64 min-h-screen p-4">
          <nav>
            <ul className="space-y-2">
              <li className="opcion-con-desplegable">
                <div
                  onClick={() => handleChangeMenu(1)}
                  className="flex items-center justify-between p-2 hover:bg-gray-700"
                >
                  <div className="flex items-center">
                    <i className="fas fa-calendar-alt mr-2" />
                    <span>Category</span>
                  </div>
                  <i className="fas fa-chevron-down text-xs" />
                </div>
                <ul
                  className={`desplegable ml-4 ${
                    activeMenu === 1 ? "" : "hidden"
                  }`}
                >
                  <li>
                    <Link
                      href="/admin/category/list"
                      className="block p-2 hover:bg-gray-700 flex items-center"
                    >
                      <i className="fas fa-chevron-right mr-2 text-xs" />
                      Categories List
                    </Link>
                  </li>
                  <li>
                    <Link
                      href=""
                      className="block p-2 hover:bg-gray-700 flex items-center"
                    >
                      <i className="fas fa-chevron-right mr-2 text-xs" />
                      Add Category
                    </Link>
                  </li>
                </ul>
              </li>
              <li className="opcion-con-desplegable">
                <div
                  onClick={() => handleChangeMenu(2)}
                  className="flex items-center justify-between p-2 hover:bg-gray-700"
                >
                  <div className="flex items-center">
                    <i className="fas fa-money-bill-wave mr-2" />
                    <span>Products</span>
                  </div>
                  <i className="fas fa-chevron-down text-xs" />
                </div>
                <ul
                  className={`desplegable ml-4 ${
                    activeMenu === 2 ? "" : "hidden"
                  }`}
                >
                  <li>
                    <Link
                      href="/admin/products/list"
                      className="block p-2 hover:bg-gray-700 flex items-center"
                    >
                      <i className="fas fa-chevron-right mr-2 text-xs" />
                      Products List
                    </Link>
                  </li>
                  <li>
                    <Link
                      href=""
                      className="block p-2 hover:bg-gray-700 flex items-center"
                    >
                      <i className="fas fa-chevron-right mr-2 text-xs" />
                      Add New Product
                    </Link>
                  </li>
                </ul>
              </li>
              <li className="opcion-con-desplegable">
                <div
                  onClick={() => handleChangeMenu(3)}
                  className="flex items-center justify-between p-2 hover:bg-gray-700"
                >
                  <div className="flex items-center">
                    <i className="fas fa-chart-bar mr-2" />
                    <span>Orders</span>
                  </div>
                  <i className="fas fa-chevron-down text-xs" />
                </div>
                <ul
                  className={`desplegable ml-4 ${
                    activeMenu === 3 ? "" : "hidden"
                  }`}
                >
                  <li>
                    <Link
                      href=""
                      className="block p-2 hover:bg-gray-700 flex items-center"
                    >
                      <i className="fas fa-chevron-right mr-2 text-xs" />
                      Orders List
                    </Link>
                  </li>
                </ul>
              </li>
              <li className="opcion-con-desplegable">
                <div
                  onClick={() => handleChangeMenu(4)}
                  className="flex items-center justify-between p-2 hover:bg-gray-700"
                >
                  <div className="flex items-center">
                    <i className="fas fa-file-alt mr-2" />
                    <span>Customers</span>
                  </div>
                  <i className="fas fa-chevron-down text-xs" />
                </div>
                <ul
                  className={`desplegable ml-4 ${
                    activeMenu === 4 ? "" : "hidden"
                  }`}
                >
                  <li>
                    <Link
                      href=""
                      className="block p-2 hover:bg-gray-700 flex items-center"
                    >
                      <i className="fas fa-chevron-right mr-2 text-xs" />
                      Customers List
                    </Link>
                  </li>
                </ul>
              </li>
            </ul>
          </nav>
        </aside>
        <main className="container mx-auto p-4">{children}</main>
      </div>
    </>
  );
}

export default Layout;
