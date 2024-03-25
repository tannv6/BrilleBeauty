import { CDN_URL } from "@/utils/constants";
import { setCookieClient } from "@/utils/cookie";
import Image from "next/image";
import React, { Fragment, useEffect, useState } from "react";
type Props = {
  popup?: {
    PopupID: any;
    PopupTitle: any;
    PopupContent: any;
    PositionTop: any;
    PositionLeft: any;
    StartDate: any;
    EndDate: any;
    IsShow: any;
    CreatedAt: any;
    UpdatedAt: any;
    DeletedAt: any;
    PopupImage: any;
    PopupLink: any;
    PopupScreen: any;
    IsCentered: any;
    IsFull: any;
    IsUsePosition: any;
  }[];
};
function MainPopup({ popup }: Props) {
  const [scrollEnabled, setScrollEnabled] = useState(Number(popup?.length) > 0);
  const [popupList, setPopupList] = useState(popup || []);
  const hanldeClosePop = (id: number) => {
    const popCopy = [...popupList];
    const pop = popCopy.find((e) => e.PopupID === id);
    if (pop) {
      pop["IsShow"] = 0;
    }
    setPopupList(popCopy);
    setScrollEnabled(false);
  };

  const handleNotShowAgain = (id: number) => {
    const popCopy = [...popupList];
    const pop = popCopy.find((e) => e.PopupID === id);
    if (pop) {
      pop["IsShow"] = 0;
    }
    setPopupList(popCopy);
    setScrollEnabled(false);
    setCookieClient(`pop_${id}`, "closed", 0.5);
  };

  const toggleScroll = () => {
    document.documentElement.style.overflow = scrollEnabled ? "hidden" : "auto";
    document.body.style.overflow = scrollEnabled ? "hidden" : "auto";
  };

  useEffect(() => {
    toggleScroll();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scrollEnabled]);

  return (
    <div>
      {popupList?.map((e, i: number) => {
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
                  e.IsCentered ? "flex justify-center" : ""
                } overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full md:inset-0 max-h-full`}
              >
                <div
                  className={`relative w-full max-w-xl rounded-lg my-auto`}
                  style={
                    e.IsUsePosition && !e.IsCentered
                      ? {
                          margin: "auto",
                          marginTop: e.PositionTop,
                          marginLeft: e.PositionLeft,
                        }
                      : {}
                  }
                >
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
                        onClick={() => handleNotShowAgain(e.PopupID)}
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
