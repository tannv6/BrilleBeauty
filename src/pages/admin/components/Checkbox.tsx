import React, { useId } from "react";

function Checkbox({ name, label, checked, onChange }: any) {
    const id = useId();
  return (
    <div className="inline-flex items-center align-middle">
      <input
        checked={checked}
        name={name}
        id={id}
        onChange={onChange}
        type="checkbox"
        className="cursor-pointer w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
      />
      <label
        htmlFor={id}
        className="me-3 cursor-pointer ps-1 text-sm font-medium text-gray-400 dark:text-gray-500"
      >
        {label}
      </label>
    </div>
  );
}

export default Checkbox;
