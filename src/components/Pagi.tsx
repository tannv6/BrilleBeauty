import "@/app/globals.css";
import { objectToSearchParams, searchParamsToObject } from "@/lib/functions";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { Fragment } from "react";

function Pagi({
  totalPage,
  currentPage = 1,
  totalElement = 0,
  elementsPerPage = 5,
}: any) {
  const path = usePathname();
  const params = searchParamsToObject(useSearchParams());

  const start =
    currentPage < Math.floor((elementsPerPage + 1) / 2)
      ? 1
      : currentPage >=
        totalPage - elementsPerPage + Math.floor((elementsPerPage + 1) / 2)
      ? totalPage - elementsPerPage + 1
      : currentPage - Math.floor((elementsPerPage + 1) / 2) + 1;
  const end =
    currentPage < Math.floor((elementsPerPage + 1) / 2)
      ? elementsPerPage
      : currentPage >=
        totalPage - elementsPerPage + Math.floor((elementsPerPage + 1) / 2)
      ? totalPage
      : currentPage + Math.ceil((elementsPerPage + 1) / 2) - 1;
  return (
    <>
      <div className="flex flex-row justify-center mt-20 mb-[70px] font-Arial cursor-pointer">
        {currentPage > 1 ? (
          <Link
            href={`${path}?${objectToSearchParams({
              ...params,
              page: 1,
            })}`}
          >
            <div className=" block w-[36px] h-[36px] bg-[url('/pagination_LL.png')] mr-[10px] cursor-pointer"></div>
          </Link>
        ) : (
          <div className="block w-[36px] h-[36px] bg-[url('/pagination_LL.png')] mr-[10px] cursor-pointer"></div>
        )}
        {currentPage > 1 ? (
          <Link
            href={`${path}?${objectToSearchParams({
              ...params,
              page: currentPage - 1,
            })}`}
          >
            <div className="block w-[36px] h-[36px] bg-[url('/pagination_L.png')] mr-[15px] cursor-pointer"></div>
          </Link>
        ) : (
          <div className="block w-[36px] h-[36px] bg-[url('/pagination_L.png')] mr-[15px] cursor-pointer"></div>
        )}
        {Array(totalPage || 0)
          .fill(1)
          .map((e, i) => {
            if (i >= start - 1 && i <= end - 1) {
              if (currentPage === i + 1) {
                return (
                  <div
                    key={i}
                    className="flex items-center justify-center w-[36px] h-[36px] rounded-lg bg-[#ef4370] text-[#ffffff] mx-[5px] cursor-pointer"
                  >
                    {i + 1}
                  </div>
                );
              } else {
                return (
                  <Link
                    key={i}
                    href={`${path}?${objectToSearchParams({
                      ...params,
                      page: i + 1,
                    })}`}
                  >
                    <div className="flex items-center justify-center w-[36px] h-[36px] rounded-lg mx-[5px]">
                      {i + 1}
                    </div>
                  </Link>
                );
              }
            } else {
              return <Fragment key={i}></Fragment>;
            }
          })}
        {currentPage < totalPage ? (
          <Link
            href={`${path}?${objectToSearchParams({
              ...params,
              page: currentPage + 1,
            })}`}
          >
            <div className="block w-[36px] h-[36px] bg-[url('/pagination_R.png')] ml-[15px] cursor-pointer"></div>
          </Link>
        ) : (
          <div className="block w-[36px] h-[36px] bg-[url('/pagination_R.png')] ml-[15px] cursor-pointer"></div>
        )}
        {currentPage < totalPage ? (
          <Link
            href={`${path}?${objectToSearchParams({
              ...params,
              page: totalPage,
            })}`}
          >
            <div className="block w-[36px] h-[36px] bg-[url('/pagination_RR.png')] ml-[10px] cursor-pointer"></div>
          </Link>
        ) : (
          <div className="block w-[36px] h-[36px] bg-[url('/pagination_RR.png')] ml-[10px] cursor-pointer"></div>
        )}
      </div>
    </>
  );
}

export default Pagi;
