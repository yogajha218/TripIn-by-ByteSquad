import React from "react";

export const ButtonComponent = ({
    buttonText,
    disabled,
    onclick = () => {},
    type,
}) => {
    return (
        <button
            type={type}
            onClick={onclick}
            className={`text-md w-full rounded-md bg-primary2 py-3 font-medium text-white active:bg-primary2/70 md:text-lg`}
            disabled={disabled}
        >
            {buttonText}
        </button>
    );
};
export default ButtonComponent;
