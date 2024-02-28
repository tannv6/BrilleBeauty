import { useState } from "react";

type Props = {
  className?: string;
  options: { id: number; name: string }[];
  onChange: Function;
  activeItem: number;
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
  const [isOpen, setIsOpen] = useState(false);
  const handleClick = (id: number) => {
    onChange(id);
  };
  const handleBlur = (e: any) => {
    setIsOpen(false);
  };
  return (
    <div
      className={`inline-block relative ${isOpen ? "z-50" : "z-49"} ${
        containerClassName || ""
      }`}
      tabIndex={-1}
      onBlur={handleBlur}
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
        className={`dropdown-menu absolute text-gray-700 pt-1 min-w-full ${
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
