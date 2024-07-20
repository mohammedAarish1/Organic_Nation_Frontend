import React, { useState } from "react";
import { IoChevronDownOutline } from "react-icons/io5";

const AccordionItem = ({ faq }) => {
  const [active, setActive] = useState(false);
  const { header, text } = faq;

  const handleToggle = (e) => {
    e.preventDefault();
    setActive(!active);
  };
  return (
    <div className=" w-full md:w-[40%]  rounded-lg bg-white p-4  dark:bg-dark-2 dark:shadow-[0px_20px_95px_0px_rgba(0,0,0,0.30)] sm:p-8 lg:px-6 xl:px-8">
      <button
        className={` flex w-full text-left`}
        onClick={(e) => handleToggle(e)}
      >
        <div className="mr-5 flex h-10 w-full max-w-[40px] items-center justify-center rounded-lg bg-primary/5 text-primary dark:bg-white/5">

          <IoChevronDownOutline className={`fill-primary text-xl stroke-primary duration-200 ease-in-out ${active ? "rotate-180" : ""
            }`} />
        </div>

        <div className="w-full">
          <h4 className="mt-1 xs:text-lg font-medium ">
            {header}
          </h4>
        </div>
      </button>

      <div
        className={`pl-[62px] duration-200 ease-in-out ${active ? "block" : "hidden"
          }`}
      >
        <p className="py-3 text-base leading-relaxed  ">
          {text}
        </p>
      </div>
    </div>
  );
};

export default AccordionItem;
