import { useState } from "react";

type Props = {
  options: { id: number; name: string }[];
  onChange: Function;
  activeItem: number;
};

function Dropdown({ options, activeItem, onChange }: Props) {
  const activeOption = options.find((e) => e.id === activeItem);
  const [isOpen, setIsOpen] = useState(false);
  const handleClick = (id:number) => {
    onChange(id);
    setIsOpen(false);
  }
  return (
    <div className="relative z-50" style={{}}>
      <button onClick={() => setIsOpen(!isOpen)} className="text-left text- border border-[#dbdbdb] h-12 w-[220px] px-4 appearance-none bg-[url('/dropdown_bg.png')] outline-none">
        <span className="mr-1">{activeOption?.name || "--Select--"}</span>
      </button>
      <ul className={`dropdown-menu absolute text-gray-700 pt-1 min-w-full ${isOpen ? "" : 'hidden'}`}>
        {options.map((e, i) => {
          return (
            <li onClick={()=>handleClick(e.id)} key={i}>
              <span className=" bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap">
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
