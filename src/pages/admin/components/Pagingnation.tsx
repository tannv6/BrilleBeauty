import Link from "next/link";
import React, { Fragment } from "react";

function Pagingnation({ tP, cP = 1, tE = 0, per = 5, onChange }: any) {
  const totalPage = Math.ceil(tE / per);
  const handleChangePage = (page: number) => {
    onChange && onChange(page);
  };
  const start =
    cP < Math.floor((per + 1) / 2)
      ? 1
      : cP >= tP - per + Math.floor((per + 1) / 2)
      ? tP - per + 1
      : cP - Math.floor((per + 1) / 2) + 1;
  const end =
    cP < Math.floor((per + 1) / 2)
      ? per
      : cP >= tP - per + Math.floor((per + 1) / 2)
      ? tP
      : cP + Math.ceil((per + 1) / 2) - 1;
  return (
    <div>
      <ol className="flex justify-center gap-1 text-xs font-medium">
        {cP !== 1 ? (
          <li>
            <button
              type="button"
              onClick={() => handleChangePage(cP - 1)}
              className="inline-flex size-8 items-center justify-center rounded border border-gray-100 bg-white text-gray-900 rtl:rotate-180"
            >
              <span className="sr-only">Prev Page</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-3 w-3"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </li>
        ) : (
          <li>
            <button
              type="button"
              className="inline-flex size-8 items-center justify-center rounded border border-gray-100 bg-white text-gray-900 rtl:rotate-180"
            >
              <span className="sr-only">Prev Page</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-3 w-3"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </li>
        )}

        {Array(tP || 0)
          .fill(1)
          .map((e, i) => {
            if (i >= start - 1 && i <= end - 1) {
              return (
                <li key={i}>
                  <button
                    type="button"
                    onClick={() => handleChangePage(i + 1)}
                    className={
                      i + 1 === cP
                        ? "block size-8 rounded border-blue-600 bg-blue-600 text-center leading-8 text-white"
                        : `block size-8 rounded border border-gray-100 bg-white text-center leading-8 text-gray-900`
                    }
                  >
                    {i + 1}
                  </button>
                </li>
              );
            } else {
              return <Fragment key={i}></Fragment>;
            }
          })}
        {cP < tP ? (
          <li>
            <button
              type="button"
              onClick={() => handleChangePage(cP + 1)}
              className="inline-flex size-8 items-center justify-center rounded border border-gray-100 bg-white text-gray-900 rtl:rotate-180"
            >
              <span className="sr-only">Next Page</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-3 w-3"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </li>
        ) : (
          <li>
            <button
              type="button"
              className="inline-flex size-8 items-center justify-center rounded border border-gray-100 bg-white text-gray-900 rtl:rotate-180"
            >
              <span className="sr-only">Next Page</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-3 w-3"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </li>
        )}
      </ol>
    </div>
  );
}

export default Pagingnation;
