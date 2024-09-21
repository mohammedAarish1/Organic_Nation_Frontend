import { useState } from "react";
import { GoPlus } from "react-icons/go";
import { LiaMinusSolid } from "react-icons/lia";

const Accordion = ({ data }) => {


    const [openIndex, setOpenIndex] = useState(null);

    const handleToggle = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className="w-full max-w-[80%] mx-auto  rounded-xl shadow-lg overflow-hidden font-serif tracking-widest">
            {data.map((item, index) => (
                <div key={item.title} className="border-b border-gray-200 last:border-b-0">
                    <button
                        className="flex justify-between items-center w-full py-5 px-6 text-left transition-colors duration-200 hover:bg-[var(--hoverEffect)]"
                        onClick={() => handleToggle(index)}
                    >
                        <span className=" text-l text-gray-800">{item.title}</span>
                        {openIndex === index ? (
                            <LiaMinusSolid
                                className={`transform transition-transform duration-500 ease-linear text-xl text-green-700 `}
                            />
                        ) : (
                            <GoPlus
                                className={`transform transition-transform duration-500 ease-linear text-xl text-green-700 `}
                            />
                        )}
                        {/* <GoPlus
                            className={`transform transition-transform duration-500 ease-linear text-xl text-blue-500 ${openIndex === index ? 'rotate-180' : ''
                                }`}
                        /> */}
                    </button>
                    <div
                        className={`overflow-hidden transition-all duration-300 ease-in-out ${openIndex === index ? 'max-h-96' : 'max-h-0'
                            }`}
                    >
                        <div className="py-6 px-10 text-gray-600 bg-[var(--hoverEffect)]">
                            {item.content.map(item => (
                                <ul key={item.subContent} className="list-disc">
                                    <li><span className="font-semibold">{item.subTitle}</span> {item.subContent}</li>
                                </ul>
                            ))}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};


export default Accordion;