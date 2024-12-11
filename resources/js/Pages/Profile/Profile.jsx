import React, { useState, useEffect } from "react";
import { Link, usePage } from "@inertiajs/react";
import NavbarTripin from "@/Components/navbarTripin";
import ModalComponent from "@/Components/ModalComponent";

const Profile = () => {
    const [notification, setNotification] = useState(null);
    const { auth, flash = {} } = usePage().props; // Provide a default empty object
    const { user } = auth;
    const [isModalHidden, setIsModalHidden] = useState(true);
    function modalVisibility() {
        setIsModalHidden((prev) => !prev);
    }

    useEffect(() => {
        if (flash && flash.success) {
            setNotification({
                type: "success",
                message: flash.success,
            });

            // Auto-dismiss notification after 3 seconds
            const timer = setTimeout(() => {
                setNotification(null);
            }, 3000);

            // Cleanup the timer
            return () => clearTimeout(timer);
        }
    }, [flash.success]);

    if (sessionStorage.getItem("reloaded") === "true") {
        sessionStorage.removeItem("reloaded"); // Remove the flag after first reload
    }
    const handleLogout = async () => {
        await fetch("/sanctum/csrf-cookie");

        const csrfToken = document.head.querySelector(
            'meta[name="csrf-token"]'
        ).content;

        try {
            const response = await fetch("/logout", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "X-CSRF-TOKEN": csrfToken,
                },
            });

            if (response.ok) {
                window.location.href = "/welcome"; // Redirect to login after logout
            } else {
                alert("Logout failed, please try again");
            }
        } catch (error) {
            console.error("Error during logout:", error);
            alert("Logout failed, please try again");
        }
    };

    return (
        <>
            {notification && (
                <div
                    className={`
                        fixed top-0 left-0 right-0 z-50
                        ${
                            notification.type === "success"
                                ? "bg-primary"
                                : "bg-red-500"
                        }
                        text-white text-center py-9
                        transition-all duration-300 ease-in-out
                        animate-bounce
                    `}
                >
                    {notification.message}
                </div>
            )}

            <div className="flex justify-center">
                <div className="  h-fit w-full lg:max-w-[400px]">
                    <div className="w-full h-[220px] bg-primary">
                        <p className="text-white font-semibold text-3xl pt-16 text-center">
                            Profile
                        </p>
                    </div>
                    <div className="w-full h-full min-h-[100dvh] bg-white mt-[-1.75rem] rounded-t-3xl px-6">
                        <div className="flex flex-col items-center">
                            <div className="w-[120px] h-[120px] rounded-full ring-4 ring-blue-300 overflow-hidden mt-[-3.5rem]">
                                <img
                                    src="https://placehold.co/120x120"
                                    loading="lazy"
                                />
                            </div>
                            <p className="text-3xl font-semibold text-center">
                                {user.username}
                            </p>
                            <p className="text-sm font-light  text-center">
                                {user.email}
                            </p>
                            <p className="text-xs font-light text-center">
                                {user.phone_number}
                            </p>
                        </div>
                        <div className="h-max-[230px] w-max-[392px] py-3 ">
                            <p className="pl-2 font-medium text-lg leading-10">
                                Account
                            </p>
                            <div className="w-full h-[158px] grid grid-cols-1 overflow-hidden rounded-md">
                                <Link
                                    href="/profile/edit"
                                    className="bg-[#DADADA59] flex flex-row items-center px-5 text-lg font-medium  hover:bg-primary hover:text-white"
                                >
                                    <img
                                        src="/profile.svg"
                                        alt="icon"
                                        loading="lazy"
                                    />
                                    <p className="px-5 text-sm">Edit Profile</p>
                                </Link>
                                <Link
                                    href="/notification"
                                    className="bg-[#DADADA59] flex flex-row items-center px-5 text-lg font-medium border-y-2  hover:bg-primary hover:text-white"
                                >
                                    <img
                                        src="/notif.svg"
                                        alt="icon"
                                        loading="lazy"
                                    />
                                    <p className="px-[27px] text-sm">
                                        Notification
                                    </p>
                                </Link>
                                <Link
                                    href="/profile/history"
                                    className="bg-[#DADADA59] flex flex-row items-center px-5 text-lg font-medium  hover:bg-primary hover:text-white"
                                >
                                    <img
                                        src="/history.svg"
                                        alt="icon"
                                        loading="lazy"
                                    />
                                    <p className="px-5 text-sm">History</p>
                                </Link>
                            </div>
                        </div>
                        <div className="h-max-[230px] w-max-[392px] py-3 ">
                            <p className="pl-2 font-medium text-lg leading-10">
                                About
                            </p>
                            <div className="w-full h-[158px] grid grid-cols-1 overflow-hidden rounded-md">
                                <Link
                                    href="/faq"
                                    className="bg-[#DADADA59] flex flex-row items-center px-5 text-lg font-medium hover:bg-primary hover:text-white"
                                >
                                    <img
                                        src="/faq.svg"
                                        alt="icon"
                                        loading="lazy"
                                    />
                                    <p className="px-5 text-sm">FAQ</p>
                                </Link>
                                <Link
                                    href="/terms-condition"
                                    className="bg-[#DADADA59] flex flex-row items-center px-5 text-lg font-medium border-y-2 hover:bg-primary hover:text-white"
                                >
                                    <img
                                        src="/term.svg"
                                        alt="icon"
                                        loading="lazy"
                                    />
                                    <p className="px-6 text-sm">
                                        Term & Conditions
                                    </p>
                                </Link>
                                <Link
                                    href="/privacy-policy"
                                    className="bg-[#DADADA59] flex flex-row items-center px-5 text-lg font-medium
                                     hover:bg-primary hover:text-white"
                                >
                                    <img
                                        src="/privacy.svg"
                                        alt="icon"
                                        loading="lazy"
                                    />
                                    <p className="px-5 text-sm">
                                        Privacy Policy
                                    </p>
                                </Link>
                            </div>
                        </div>
                        <div className="h-max-[230px] w-max-[392px] py-3 ">
                            <p className="font-bold text-lg leading-10">
                                Action
                            </p>
                            <div className="w-full h-[52px]  overflow-hidden rounded-md mb-16">
                                <button
                                    onClick={modalVisibility}
                                    className="bg-[#DADADA59] flex flex-row items-center px-5 text-lg font-medium h-[52px] w-full  hover:bg-primary hover:text-white"
                                >
                                    <img
                                        src="/logout.svg"
                                        alt="icon"
                                        loading="lazy"
                                    />
                                    <p className="px-5 text-sm">Log Out</p>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <NavbarTripin pageInfo={"Profile"} />
            <ModalComponent
                isModalHidden={isModalHidden}
                setIsModalHidden={setIsModalHidden}
            >
                <div className="  flex flex-col  w-[300px]  sm:w-[360px]  h-[160px] md:h-[180px] overflow-hidden">
                    <div className="p-6 sm:p-8">
                        <p className="text-red-400 opacity-100 text-center text-2xl font-semibold">
                            Logout
                        </p>
                        <p className="text-black opacity-100 text-center text-base font-extralight">
                            Are you sure?
                        </p>
                    </div>
                    <div className="h-full rounded-b-xl">
                        <div className="grid h-full grid-cols-2">
                            <button
                                className=" bg-transparent text-black border-black border-t rounded-es-lg hover:bg-yellow-500 hover:text-white transition-colors duration-200 sm:text-lg"
                                onClick={modalVisibility}
                            >
                                Cancel
                            </button>
                            <button
                                className=" bg-transparent text-black  border-black border-t border-l rounded-ee-lg hover:bg-red-500 hover:text-white transition-colors duration-200 sm:text-lg "
                                onClick={handleLogout}
                            >
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            </ModalComponent>
        </>
    );
};

export default Profile;
