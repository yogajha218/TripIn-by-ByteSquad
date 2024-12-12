import React from "react";
import { useState, useEffect } from "react";
import { XMarkIcon } from "@heroicons/react/24/solid";

export const ToastComponent = ({ message, onClose, type }) => {
    const [isVisible, setIsVisible] = useState(true);
    const [toastType, setToastType] = useState("");

    useEffect(() => {
        // Automatically close the toast after 3 seconds
        const timer = setTimeout(() => {
            setIsVisible(false);
            if (onClose) onClose();
        }, 1600);

        return () => clearTimeout(timer); // Cleanup the timer
    }, [onClose]);
    useEffect(() => {
        switch (type) {
            case "alert":
                setToastType(type);
                break;
            case "warning":
                setToastType(type);
                break;
            case "success":
                setToastType(type);
                break;
        }
    }, []);
    const handleClose = () => {
        setIsVisible(false); // Trigger slide-out animation
        setTimeout(onClose, 700); // Wait for animation to complete before unmounting
    };
    if (!isVisible) return null;
    return (
        <>
            <div
                className={`flex -translate-x-1/2 transform items-center rounded-md border-l-4 p-5 text-center text-sm text-white shadow-lg transition-transform duration-700 md:text-base ${
                    isVisible ? "animate-slideDown" : "animate-slideUp"
                } ${toastType === "alert" && "bg-red-500"} ${toastType === "warning" && "bg-yellow-500"} ${toastType === "success" && "bg-green-500"}`}
            >
                <p className="text-nowrap">{message}</p>
                {toastType === "alert" && (
                    <button
                        onClick={handleClose}
                        className="ml-4 flex items-center justify-center text-white"
                    >
                        <XMarkIcon className="size-4 text-white md:size-6" />
                    </button>
                )}
            </div>
        </>
    );
};
