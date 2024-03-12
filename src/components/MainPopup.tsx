import { CDN_URL } from "@/utils/constants";
import Image from "next/image";
import React, { Fragment, useState } from "react";
type Props = {
  isOpen: boolean;
  title?: string;
  onClose?: any;
  children?: any;
  popup: any[];
};
function MainPopup({ isOpen, onClose, title, children, popup }: Props) {
  const [popupList, setPopupList] = useState(popup || []);
  const hanldeClosePop = (id: number) => {
    const popCopy = [...popupList];
    const pop = popCopy.find((e) => e.PopupID === id);
    if (pop) {
      pop["IsShow"] = 0;
    }
    setPopupList(popCopy);
  };
  return (
    <div>
      {popupList?.map((e: any, i: number) => {
        return (
          <Fragment key={i}>
            <div>
              {/* Main modal */}
              <div
                id="static-modal"
                data-modal-backdrop="static"
                tabIndex={-1}
                aria-hidden="true"
                className={`${
                  e.IsShow ? "" : "hidden"
                } overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full`}
              >
                <div className="relative p-4 w-full max-w-xl max-h-full">
                  {/* Modal content */}
                  <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                    {/* Modal header */}
                    <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                        {title}
                      </h3>
                      <button
                        onClick={() => {
                          hanldeClosePop(e.PopupID);
                        }}
                        type="button"
                        className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                        data-modal-hide="static-modal"
                      >
                        <svg
                          className="w-3 h-3"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 14 14"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                          />
                        </svg>
                        <span className="sr-only">Close modal</span>
                      </button>
                    </div>
                    {/* Modal body */}
                    <div className="p-4 md:p-5 space-y-4">
                      <Image
                        className="mt-2"
                        src={`${CDN_URL}${e.PopupImage}`}
                        alt={""}
                        width={100}
                        height={100}
                      />
                    </div>
                    {/* Modal footer */}
                    <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
                      <a
                        href={`${e.PopupLink}`}
                        target="_blank"
                        data-modal-hide="static-modal"
                        type="button"
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                      >
                        Go
                      </a>
                      <button
                        onClick={() => {
                          hanldeClosePop(e.PopupID);
                        }}
                        data-modal-hide="static-modal"
                        type="button"
                        className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                      >
                        Quit
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {e.IsShow && (
              <div
                modal-backdrop=""
                className="bg-gray-900/50 dark:bg-gray-900/80 fixed inset-0 z-40"
              ></div>
            )}
          </Fragment>
        );
      })}
    </div>
  );
}

export default MainPopup;
