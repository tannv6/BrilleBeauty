import React from "react";

function SearchIcon({ onClick, className }: any) {
  return (
    <svg
      onClick={onClick}
      className={className}
      width="50"
      height="50"
      viewBox="0 0 50 50"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M32.384 32.3645L47.5 47.5M37.5 20C37.5 29.665 29.665 37.5 20 37.5C10.335 37.5 2.5 29.665 2.5 20C2.5 10.335 10.335 2.5 20 2.5C29.665 2.5 37.5 10.335 37.5 20Z"
        stroke="#686666"
        stroke-width="5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
}

export default SearchIcon;
