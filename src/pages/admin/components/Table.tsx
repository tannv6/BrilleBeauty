import React from "react";
type Props = {
  children: any;
  colWidths?: any[];
};
function Table({ children, colWidths }: Props) {
  return (
    <table className="min-w-full bg-white shadow-md rounded-md">
      <colgroup>
        {colWidths?.map((e: any, i: any) => {
          return <col key={i} width={e} />;
        })}
      </colgroup>
      {children}
    </table>
  );
}

export default Table;
