import Link from "next/link";
import React from "react";
type Props = {
  color: "blue" | "green";
  children: any;
  href: string;
};
function LinkButton({ color, children, href, ...props }: Props & typeof Link) {
  if (color === "green") {
    return (
      <Link
        href={href}
        className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-bold rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
        {...props}
      >
        {children}
      </Link>
    );
  }
  if (color === "blue") {
    return (
      <Link
        href={href}
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-bold rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        {...props}
      >
        {children}
      </Link>
    );
  }
  return (
    <Link href={href} {...props}>
      {children}
    </Link>
  );
}

export default LinkButton;
