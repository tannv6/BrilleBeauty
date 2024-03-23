import React from "react";

function Tr({ children }: any) {
  return <tr className="border-b border-blue-gray-200 last:border-0">{children}</tr>;
}

export default Tr;
