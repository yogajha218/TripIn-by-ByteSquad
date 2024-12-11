import React from "react";

export const ButtonComponent = ({
    buttonText,
    textColor = "white",
    buttonColor = "primary2",
    disabled,
    onclick = () => {},
    type,
}) => {
    return (
        <button
            type={type}
            onClick={onclick}
            className={`bg-${buttonColor} text-${textColor} text-md md:text-lg w-full py-3  text-white rounded-md font-medium`}
            disabled={disabled}
        >
            {buttonText}
        </button>
    );
};
export default ButtonComponent;
