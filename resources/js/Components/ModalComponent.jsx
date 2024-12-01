import React from "react";
import { useState } from "react";
import "./ModalComponent.css";

export const ModalComponent = ({
    isModalHidden,
    setIsModalHidden,
    children,
}) => {
    const [isAnimating, setIsAnimating] = useState(false);

    function handleModal() {
        if (!isModalHidden) {
            // Add animation reset logic when hiding
            setIsAnimating(true);
            setTimeout(() => {
                setIsAnimating(false);
                setIsModalHidden(true);
            }, 300); // Match animation duration
        } else {
            setIsModalHidden(false);
        }
    }

    return (
        <>
            <div
                id="modal"
                className={`flex justify-center items-center w-full h-full bg-black fixed top-0 left-0 z-50 ${
                    isModalHidden ? "hidden opacity-0" : "bg-opacity-[15%]"
                }`}
                onClick={handleModal}
            >
                <div
                    className={`absolute z-20 bg-white rounded-lg w-fit h-fit modal  ${
                        isAnimating
                            ? "animate-slide-out"
                            : !isModalHidden
                            ? "animate-slide-in"
                            : ""
                    }`}
                    onClick={(e) => e.stopPropagation()}
                >
                    {children}
                </div>
            </div>
        </>
    );
};
export default ModalComponent;
