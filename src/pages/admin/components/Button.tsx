import React from "react";
type Props = {
  color: "blue" | "green";
  children: any;
};
function Button({
  color,
  children,
  ...props
}: Props &
  React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  >) {
  if (color === "green") {
    return (
      <button
        className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-bold rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
        {...props}
      >
        {children}
      </button>
    );
  }
  if (color === "blue") {
    return (
      <button
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-bold rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        {...props}
      >
        {children}
      </button>
    );
  }
  return <button {...props}>{children}</button>;
}

export default Button;
