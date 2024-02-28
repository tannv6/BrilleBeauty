import React from "react";

function Th({ children, center }: any) {
  return (
    <th className={`py-3 px-4 ${center ? "text-center" : "text-left"}`}>
      {children}
    </th>
  );
}

export default Th;
