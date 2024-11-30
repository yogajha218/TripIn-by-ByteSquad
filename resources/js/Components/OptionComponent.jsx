import React from "react";

export const OptionComponent = ({
    handleCallback,
    numberOptions,
    isOptionsHidden,
}) => {
    return (
        <div
            className={`w-[80%]  h-fit transition-transform border duration-20 absolute top-16 left-16 shadow-lg rounded-[8px] z-50  ${
                isOptionsHidden
                    ? "opacity-0 pointer-events-none -translate-y-10 "
                    : "bg-white  opacity-100 "
            }`}
        >
            {numberOptions.map((option, index) => (
                <div
                    key={index}
                    onClick={() => handleCallback(index)}
                    className={`hover:text-white font-semibold text-xl w-full px-2 py-2 border border-slate-400 cursor-pointer hover:bg-slate-500 ${
                        index === 0 ? `rounded-t-[8px]` : " "
                    } ${
                        index === cityOptions.length - 1
                            ? `rounded-b-[8px]`
                            : ""
                    }`}
                >
                    {option}
                </div>
            ))}
        </div>
    );
};

export default OptionComponent;
