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
                className={`${e.IsShow ? "" : "hidden"} ${
                  e.IsCentered ? "flex" : ""
                } overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full`}
              >
                <div className="relative p-4 w-full max-w-xl max-h-full rounded-lg">
                  {/* Modal content */}
                  <div className="relative bg-white rounded-md overflow-hidden shadow dark:bg-gray-700">
                    {/* Modal body */}
                    <div className="space-y-4">
                      <a
                        href={`${e.PopupLink}`}
                        target="_blank"
                        className="block w-full pt-[100%] relative"
                      >
                        <Image
                          className="object-cover"
                          src={`${CDN_URL}${e.PopupImage}`}
                          alt={""}
                          fill
                        />
                      </a>
                    </div>
                    {/* Modal footer */}
                    <div className="flex border-t border-gray-200 dark:border-gray-600">
                      <button
                        data-modal-hide="static-modal"
                        type="button"
                        className="flex-1 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                      >
                        Not show again
                      </button>
                      <button
                        onClick={() => {
                          hanldeClosePop(e.PopupID);
                        }}
                        data-modal-hide="static-modal"
                        type="button"
                        className="flex-1 py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
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
