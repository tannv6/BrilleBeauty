import React from "react";

type Props = {
  name: string;
  value: any;
  width: number;
  type: "input" | "select" | "textareae" | "date";
  onChange: any;
};

function Input({ name, value, width, type, onChange }: Props) {
  if (type === "input") {
    return (
      <input
        type="text"
        name={name}
        value={value}
        onChange={onChange}
        className="h-[35px] outline-none border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      />
    );
  }
  if (type === "textareae") {
    return <textarea
      value={value}
      name={name}
      onChange={onChange}
      rows={4}
      className="block p-2.5 w-full text-sm text-gray-900 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      placeholder=""
    />
  }
  return <div></div>;
}

export default Input;
