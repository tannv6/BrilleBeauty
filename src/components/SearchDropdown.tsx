import { useEffect, useState } from "react";

type Props = {
  className?: string;
  options: { id: number | string; name: string }[];
  onChange: Function;
  activeItem: number;
  containerClassName?: string;
  placeHolder?: string;
  onChangeSearch?: Function;
};

function SearchDropdown({
  className,
  options = [],
  activeItem,
  onChange,
  containerClassName,
  placeHolder,
  onChangeSearch,
}: Props) {
  const activeOption = options.find((e) => e.id === activeItem);
  const [isOpen, setIsOpen] = useState(false);
  const [text, setText] = useState(activeOption?.name || "");

  const handleClick = (id: number | string) => {
    onChange(id);
  };

  const handleBlur = (e: any) => {
    setIsOpen(false);
    setText(activeOption?.name || "");
  };

  useEffect(() => {
    setText(activeOption?.name || "");
  }, [activeOption?.name]);

  return (
    <div
      className={`inline-block relative ${isOpen ? "z-50" : "z-49"} ${
        containerClassName || ""
      }`}
      tabIndex={-1}
      onBlur={handleBlur}
    >
      <input
        type="text"
        placeholder={placeHolder || "--Select--"}
        onChange={(e) => {
          setText(e.target.value);
          onChangeSearch &&
            onChangeSearch(e);
        }}
        onFocus={() => setIsOpen(!isOpen)}
        value={text}
        className={`text-left text- border border-[#dbdbdb] h-12 bg-no-repeat bg-[center_right_1rem] bg-[url('/dropdown_bg_arrow.png')] ${className} px-4 appearance-none outline-none`}
      />
      {/* <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`text-left text- border border-[#dbdbdb] h-12 bg-no-repeat bg-[center_right_1rem] bg-[url('/dropdown_bg_arrow.png')] ${className} px-4 appearance-none outline-none`}
      >
        <span className="mr-1">
          {activeOption?.name || placeHolder || "--Select--"}
        </span>
      </button> */}
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

export default SearchDropdown;
