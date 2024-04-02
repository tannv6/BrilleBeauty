import { useEffect, useRef, useState } from "react";
import "./SearchDropdown.css";
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
  const [activeOption, setActiveOption] = useState<
    | {
        id: number | string;
        name: string;
      }
    | undefined
  >(options.find((e) => e.id === activeItem));
  const [isOpen, setIsOpen] = useState(false);
  const [text, setText] = useState(activeOption?.name || "");
  const dropdownRef = useRef<any>(null);
  const handleClick = (id: number | string) => {
    onChange(id);
    setIsOpen(false);
    const optionSelected = options.find((e) => e.id === id);
    if (optionSelected) {
      setActiveOption(optionSelected);
    }
  };

  useEffect(() => {
    "use client;";
    const handleClickOutside = (event: any) => {
      if (dropdownRef.current && !dropdownRef.current?.contains(event.target)) {
        setIsOpen(false);
        setText(activeOption?.name || "");
      }
    };

    window.addEventListener("mousedown", handleClickOutside);
    return () => {
      window.removeEventListener("mousedown", handleClickOutside);
    };
  }, [activeOption?.name]);

  useEffect(() => {
    setText(activeOption?.name || "");
  }, [activeOption?.name]);

  return (
    <div
      className={`inline-block relative ${isOpen ? "z-50" : "z-49"} ${
        containerClassName || ""
      }`}
      ref={dropdownRef}
    >
      <input
        type="text"
        placeholder={placeHolder || "--Select--"}
        onChange={(e) => {
          setText(e.target.value);
          onChangeSearch && onChangeSearch(e);
          setIsOpen(true);
        }}
        onClick={() => setIsOpen(!isOpen)}
        value={text}
        className={`text-left text- border border-[#dbdbdb] h-12 bg-no-repeat bg-[center_right_1rem] bg-[url('/dropdown_bg_arrow.png')] ${className} px-4 appearance-none outline-none`}
      />
      <ul
        className={`dropdown_contents max-h-[200px] overflow-auto dropdown-menu absolute text-gray-700 mt-1 min-w-full ${
          isOpen ? "" : "hidden"
        }`}
      >
        {options?.length > 0 ? (
          options.map((e, i) => {
            return (
              <li onMouseDown={() => handleClick(e.id)} key={i}>
                <span
                  className={`${
                    e.id === activeItem
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200"
                  } cursor-pointer hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap`}
                >
                  {e.name}
                </span>
              </li>
            );
          })
        ) : (
          <li>
            <span
              className={`bg-gray-200 cursor-pointer hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap`}
            >
              No Options
            </span>
          </li>
        )}
      </ul>
    </div>
  );
}

export default SearchDropdown;
