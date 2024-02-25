import React from "react";

function Td({ children, center }: any) {
  return (
    <td className={`py-3 px-4 ${center ? "text-center" : "text-left"}`}>
      {children}
    </td>
  );
}

export default Td;
