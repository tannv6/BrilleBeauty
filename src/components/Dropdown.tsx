import { useEffect, useRef, useState } from "react";
import "./SearchDropdown.css";

type Props = {
  className?: string;
  options: { id: number | string; name: string }[];
  onChange: Function;
  activeItem: number | string;
  containerClassName?: string;
  placeHolder?: string;
};

function Dropdown({
  className,
  options = [],
  activeItem,
  onChange,
  containerClassName,
  placeHolder,
}: Props) {
  const activeOption = options.find((e) => e.id === activeItem);
  const dropdownRef = useRef<any>(null);
  const [isOpen, setIsOpen] = useState(false);
  const handleClick = (id: number | string) => {
    onChange(id);
    setIsOpen(false);
  };
  useEffect(() => {
    "use client;";
    const handleClickOutside = (event: any) => {
      if (dropdownRef.current && !dropdownRef.current?.contains(event.target)) {
        setIsOpen(false);
      }
    };

    window.addEventListener("mousedown", handleClickOutside);
    return () => {
      window.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <div
      className={`inline-block relative ${isOpen ? "z-50" : "z-49"} ${
        containerClassName || ""
      }`}
      ref={dropdownRef}
    >
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`text-left text- border border-[#dbdbdb] h-12 bg-no-repeat bg-[center_right_1rem] bg-[url('/dropdown_bg_arrow.png')] ${className} px-4 appearance-none outline-none`}
      >
        <span className="mr-1">
          {activeOption?.name || placeHolder || "--Select--"}
        </span>
      </button>
      <ul
        className={`max-h-[200px] overflow-auto dropdown-menu absolute text-gray-700 pt-1 min-w-full ${
          isOpen ? "" : "hidden"
        }`}
      >
        {options.map((e, i) => {
          return (
            <li onMouseDown={() => handleClick(e.id)} key={i}>
              <span
                className={`${
                  e.id === activeItem ? "bg-blue-500 text-white" : "bg-gray-200"
                } cursor-pointer hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap`}
              >
                {e.name}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Dropdown;
