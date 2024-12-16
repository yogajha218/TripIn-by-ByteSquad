import React, { useState, useEffect } from "react";
import { Link, usePage } from "@inertiajs/react";
import NavbarTripin from "@/Components/NavbarTripin";
import ModalComponent from "@/Components/ModalComponent";
import { ToastComponent } from "@/Components/ToastComponent";
import { ChevronLeftIcon } from "@heroicons/react/24/solid";

const Profile = () => {
    const [notification, setNotification] = useState(null);
    const { auth, flash = {} } = usePage().props; // Provide a default empty object
    const { user } = auth;
    const [isModalHidden, setIsModalHidden] = useState(true);
    const [toastMessage, setToastMessage] = useState("");
    function modalVisibility() {
        setIsModalHidden((prev) => !prev);
    }

    useEffect(() => {
        if (flash && flash.success) {
            setNotification({
                type: "success",
                message: flash.success,
            });

            // setToastMessage(notification.message);
            // Auto-dismiss notification after 3 seconds
            const timer = setTimeout(() => {
                setNotification(null);
            }, 3000);

            // Cleanup the timer
            return () => clearTimeout(timer);
        }
    }, [flash.success]);

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: "smooth", // Optional: smooth scrolling
        });
        console.log("rerendering gakni");
    }, []);

    if (sessionStorage.getItem("reloaded") === "true") {
        sessionStorage.removeItem("reloaded"); // Remove the flag after first reload
    }
    const handleLogout = async () => {
        await fetch("/sanctum/csrf-cookie");

        const csrfToken = document.head.querySelector(
            'meta[name="csrf-token"]',
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
                <div className="nowrap fixed left-1/2 top-5 flex h-fit w-fit items-center justify-center">
                    <ToastComponent
                        message={notification.message}
                        onClose={() => setToastMessage("")}
                        type="success"
                    />
                </div>
            )}

            <div className="flex justify-center">
                <div className="h-fit w-full lg:max-w-[400px]">
                    <div className="h-[220px] w-full bg-primary">
                        <p className="pt-16 text-center text-3xl font-semibold text-white">
                            Profile
                        </p>
                    </div>
                    <div className="mt-[-1.75rem] h-full min-h-[100dvh] w-full rounded-t-3xl bg-white px-6">
                        <div className="flex flex-col items-center">
                            <div className="mt-[-3.5rem] h-[120px] w-[120px] overflow-hidden rounded-full ring-4 ring-blue-300">
                                <svg
                                    xmlns="http://www.w4.org/2000/svg"
                                    width="120"
                                    height="120"
                                    viewBox="0 0 120 120"
                                >
                                    <rect
                                        width="100%"
                                        height="100%"
                                        fill="#DDDDDD"
                                    />
                                    <path
                                        fill="#999999"
                                        d="M29.505 64.305h2.08v1.48h-6.4v-1.48h2.35v-6.74q0-.4.02-.83l-1.66 1.39q-.15.12-.29.14-.14.03-.26.01-.13-.03-.22-.09-.1-.06-.15-.13l-.62-.85 3.53-3h1.62v10.1Zm7.96-.36h2.97q.32 0 .51.18t.19.48v1.18h-7.94v-.66q0-.2.08-.42.09-.22.27-.39l3.51-3.52q.44-.45.79-.86.35-.41.58-.81.23-.4.36-.81.12-.41.12-.87 0-.41-.12-.73-.12-.31-.34-.53-.22-.22-.53-.32-.3-.11-.69-.11-.35 0-.65.1-.3.1-.53.28-.23.18-.39.42t-.24.53q-.14.36-.36.48-.21.12-.62.06l-1.04-.18q.12-.84.46-1.46.35-.63.86-1.05.52-.42 1.19-.63.67-.22 1.43-.22.8 0 1.47.24.66.24 1.13.67.48.43.74 1.04.26.61.26 1.35 0 .64-.18 1.18-.19.55-.51 1.04-.31.5-.74.96-.42.47-.89.95l-2.6 2.66q.37-.11.74-.17.38-.06.71-.06Zm13.28-3.94q0 1.51-.32 2.62-.33 1.12-.9 1.85-.57.73-1.35 1.08-.78.36-1.68.36-.91 0-1.68-.36-.77-.35-1.34-1.08-.57-.73-.89-1.85-.32-1.11-.32-2.62 0-1.52.32-2.64.32-1.11.89-1.84.57-.72 1.34-1.08.77-.36 1.68-.36.9 0 1.68.36.78.36 1.35 1.08.57.73.9 1.84.32 1.12.32 2.64Zm-2.04 0q0-1.26-.18-2.08-.19-.83-.49-1.32-.31-.48-.71-.68-.4-.2-.83-.2-.43 0-.82.2-.4.2-.7.68-.31.49-.49 1.32-.18.82-.18 2.08 0 1.25.18 2.08.18.82.49 1.31.3.49.7.68.39.2.82.2.43 0 .83-.2.4-.19.71-.68.3-.49.49-1.31.18-.83.18-2.08Zm14.75 3.13-1.05 1.03-2.71-2.71-2.74 2.73-1.05-1.03 2.74-2.75-2.61-2.6 1.04-1.04 2.61 2.6 2.59-2.59 1.06 1.04-2.6 2.6 2.72 2.72Zm10.95 1.17h2.08v1.48h-6.4v-1.48h2.34v-6.74q0-.4.03-.83l-1.67 1.39q-.14.12-.28.14-.14.03-.27.01-.12-.03-.22-.09-.09-.06-.14-.13l-.62-.85 3.52-3h1.63v10.1Zm7.96-.36h2.97q.32 0 .5.18.19.18.19.48v1.18h-7.93v-.66q0-.2.08-.42.08-.22.27-.39l3.51-3.52q.44-.45.79-.86.35-.41.58-.81.23-.4.35-.81.13-.41.13-.87 0-.41-.12-.73-.12-.31-.34-.53-.22-.22-.53-.32-.31-.11-.69-.11-.35 0-.65.1-.3.1-.54.28-.23.18-.39.42t-.24.53q-.13.36-.35.48-.22.12-.62.06l-1.04-.18q.12-.84.46-1.46.34-.63.86-1.05.52-.42 1.18-.63.67-.22 1.44-.22.8 0 1.46.24.67.24 1.14.67.47.43.74 1.04.26.61.26 1.35 0 .64-.19 1.18-.19.55-.5 1.04-.32.5-.74.96-.43.47-.89.95l-2.61 2.66q.38-.11.75-.17.37-.06.71-.06Zm13.28-3.94q0 1.51-.33 2.62-.32 1.12-.89 1.85-.57.73-1.35 1.08-.78.36-1.69.36-.9 0-1.67-.36-.78-.35-1.34-1.08-.57-.73-.89-1.85-.32-1.11-.32-2.62 0-1.52.32-2.64.32-1.11.89-1.84.56-.72 1.34-1.08.77-.36 1.67-.36.91 0 1.69.36.78.36 1.35 1.08.57.73.89 1.84.33 1.12.33 2.64Zm-2.04 0q0-1.26-.19-2.08-.18-.83-.49-1.32-.31-.48-.71-.68-.4-.2-.83-.2-.42 0-.82.2-.39.2-.7.68-.3.49-.48 1.32-.18.82-.18 2.08 0 1.25.18 2.08.18.82.48 1.31.31.49.7.68.4.2.82.2.43 0 .83-.2.4-.19.71-.68.31-.49.49-1.31.19-.83.19-2.08Z"
                                    />
                                </svg>
                            </div>
                            <p className="text-center text-3xl font-semibold">
                                {user.username}
                            </p>
                            <p className="text-center text-sm font-light">
                                {user.email}
                            </p>
                            <p className="text-center text-xs font-light">
                                {user.phone_number}
                            </p>
                        </div>
                        <div className="h-max-[230px] w-max-[392px] py-3">
                            <p className="pl-2 text-lg font-medium leading-10">
                                Account
                            </p>
                            <div className="grid h-[158px] w-full grid-cols-1 overflow-hidden rounded-md">
                                <Link
                                    href="/profile/edit"
                                    className="group flex flex-row items-center bg-[#DADADA59] px-5 text-lg font-medium hover:bg-primary hover:text-white"
                                >
                                    <svg
                                        width="30"
                                        height="30"
                                        viewBox="0 0 30 30"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M6.9775 8.02326C6.9775 5.89536 7.82274 3.85461 9.32727 2.34996C10.8318 0.845305 12.8724 0 15.0001 0C17.1279 0 19.1685 0.845305 20.673 2.34996C22.1775 3.85461 23.0228 5.89536 23.0228 8.02326C23.0228 10.1512 22.1775 12.1919 20.673 13.6966C19.1685 15.2012 17.1279 16.0465 15.0001 16.0465C12.8724 16.0465 10.8318 15.2012 9.32727 13.6966C7.82274 12.1919 6.9775 10.1512 6.9775 8.02326ZM14.7183 18.1549C14.7784 18.1458 14.8389 18.1407 14.8997 18.1395H15.1006C15.162 18.1395 15.2224 18.1446 15.282 18.1549L25.4603 19.9451L25.5133 19.9563C27.3885 20.3888 29.4032 21.5791 29.7953 23.8912L29.8008 23.9316L29.9599 25.1553V25.1581C30.3282 27.9614 28.1056 30 25.4812 30C25.4233 29.9989 25.3655 29.9943 25.3082 29.986H4.51908C1.89464 29.986 -0.329377 27.946 0.040362 25.1414L0.199419 23.9288L0.206396 23.887C0.597063 21.6167 2.62853 20.3595 4.49955 19.9535L4.54001 19.9451L14.7183 18.1549Z"
                                            className="fill-black group-hover:fill-white"
                                        />
                                    </svg>

                                    <p className="px-5 text-sm">Edit Profile</p>
                                </Link>
                                <Link
                                    href="/notifications"
                                    className="group flex flex-row items-center border-y-2 bg-[#DADADA59] px-5 text-lg font-medium hover:bg-primary hover:text-white"
                                >
                                    <svg
                                        width="23"
                                        height="28"
                                        viewBox="0 0 23 28"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M11.5 9.42335e-08C11.1829 -9.23077e-05 10.8694 0.0677707 10.5803 0.199085C10.2912 0.330399 10.0331 0.522161 9.82323 0.761642C9.61332 1.00112 9.45638 1.28285 9.36281 1.58811C9.26923 1.89338 9.24118 2.2152 9.2805 2.53223C7.35632 3.02881 5.65094 4.15656 4.43329 5.73764C3.21564 7.31872 2.55501 9.26317 2.55556 11.2644V20.2759H1.27778C0.93889 20.2759 0.613882 20.4115 0.374252 20.6529C0.134623 20.8943 0 21.2218 0 21.5632C0 21.9046 0.134623 22.2321 0.374252 22.4735C0.613882 22.7149 0.93889 22.8506 1.27778 22.8506H21.7222C22.0611 22.8506 22.3861 22.7149 22.6257 22.4735C22.8654 22.2321 23 21.9046 23 21.5632C23 21.2218 22.8654 20.8943 22.6257 20.6529C22.3861 20.4115 22.0611 20.2759 21.7222 20.2759H20.4444V11.2644C20.445 9.26317 19.7844 7.31872 18.5667 5.73764C17.3491 4.15656 15.6437 3.02881 13.7195 2.53223C13.7297 2.44126 13.7353 2.34814 13.7361 2.25287C13.7361 1.65537 13.5005 1.08235 13.0812 0.659852C12.6618 0.237356 12.0931 9.42335e-08 11.5 9.42335e-08ZM11.5 28C10.4833 28 9.50831 27.5931 8.78942 26.8688C8.07053 26.1446 7.66667 25.1622 7.66667 24.1379H15.3333C15.3333 25.1622 14.9295 26.1446 14.2106 26.8688C13.4917 27.5931 12.5167 28 11.5 28Z"
                                            className="fill-black group-hover:fill-white"
                                        />
                                    </svg>

                                    <p className="px-[27px] text-sm">
                                        Notification
                                    </p>
                                </Link>
                                <Link
                                    href="/profile/history"
                                    className="group flex flex-row items-center bg-[#DADADA59] px-5 text-lg font-medium hover:bg-primary hover:text-white"
                                >
                                    <svg
                                        width="30"
                                        height="30"
                                        viewBox="0 0 30 30"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M26.25 15V5.625C26.25 5.12772 26.0525 4.65081 25.7008 4.29917C25.3492 3.94754 24.8723 3.75 24.375 3.75H5.625C5.12772 3.75 4.65081 3.94754 4.29917 4.29917C3.94754 4.65081 3.75 5.12772 3.75 5.625V24.375C3.75 24.8723 3.94754 25.3492 4.29917 25.7008C4.65081 26.0525 5.12772 26.25 5.625 26.25H15"
                                            className="stroke-black group-hover:stroke-white"
                                            strokeWidth="2.91667"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                        />
                                        <path
                                            d="M20 23.75C22.0711 23.75 23.75 22.0711 23.75 20C23.75 17.9289 22.0711 16.25 20 16.25C17.9289 16.25 16.25 17.9289 16.25 20C16.25 22.0711 17.9289 23.75 20 23.75Z"
                                            className="stroke-black group-hover:stroke-white"
                                            stroke-width="2.91667"
                                        />
                                        <path
                                            d="M23.125 22.5L26.25 25M8.75 10H21.25M8.75 15H13.75"
                                            className="stroke-black group-hover:stroke-white"
                                            stroke-width="2.91667"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                        />
                                    </svg>

                                    <p className="px-5 text-sm">History</p>
                                </Link>
                            </div>
                        </div>
                        <div className="h-max-[230px] w-max-[392px] py-3">
                            <p className="pl-2 text-lg font-medium leading-10">
                                About
                            </p>
                            <div className="grid h-[158px] w-full grid-cols-1 overflow-hidden rounded-md">
                                <Link
                                    href="/faq"
                                    className="group flex flex-row items-center bg-[#DADADA59] px-5 text-lg font-medium hover:bg-primary hover:text-white"
                                >
                                    <svg
                                        width="30"
                                        height="30"
                                        viewBox="0 0 30 30"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M15 0C13.0385 0 11.5385 1.5 11.5385 3.46154V10.3846C11.5385 12.3462 13.0385 13.8462 15 13.8462H21.9231L26.5385 18.4615V13.8462C28.5 13.8462 30 12.3462 30 10.3846V3.46154C30 1.5 28.5 0 26.5385 0H15ZM19.8323 3.46154H21.8146L23.7623 10.3846H22.0315L21.5619 8.65385H19.8312L19.3996 10.3846H17.8846L19.8323 3.46154ZM20.7692 4.61538C20.6538 5.07692 20.5246 5.64 20.4081 5.98615L20.085 7.5H21.4546L21.1292 5.985C20.8996 5.64 20.7692 5.07692 20.7692 4.61538ZM3.46154 11.5385C1.5 11.5385 0 13.0385 0 15V21.9231C0 23.8846 1.5 25.3846 3.46154 25.3846V30L8.07692 25.3846H15C16.9615 25.3846 18.4615 23.8846 18.4615 21.9231V15H15C12.8077 15 11.07 13.5 10.4931 11.5385H3.46154ZM8.76231 14.8915C10.7238 14.8915 11.6469 16.5069 11.6469 18.3531C11.6469 19.9685 11.0919 20.9931 10.1688 21.4546C10.6304 21.6854 11.1773 21.8077 11.7542 21.9231L11.3227 23.0769C10.515 22.8462 9.67731 22.4862 8.86962 22.1388C8.75423 22.0235 8.55231 22.0315 8.43692 22.0315C7.05231 21.9162 5.76923 20.7692 5.76923 18.4615C5.76923 16.5 6.91615 14.8915 8.76231 14.8915ZM8.76231 16.1538C7.83923 16.1538 7.39154 17.1923 7.39154 18.4615C7.39154 19.8462 7.83923 20.7692 8.76231 20.7692C9.68538 20.7692 10.1677 19.7308 10.1677 18.4615C10.1677 17.1923 9.68538 16.1538 8.76231 16.1538Z"
                                            className="fill-black group-hover:fill-white"
                                        />
                                    </svg>

                                    <p className="px-5 text-sm">FAQ</p>
                                </Link>
                                <Link
                                    href="/terms-condition"
                                    className="group flex flex-row items-center border-y-2 bg-[#DADADA59] px-5 text-lg font-medium hover:bg-primary hover:text-white"
                                >
                                    <svg
                                        width="26"
                                        height="26"
                                        viewBox="0 0 26 26"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            fill-rule="evenodd"
                                            clip-rule="evenodd"
                                            d="M13 0C5.82032 0 0 5.82026 0 13C0 20.1796 5.82032 26 13 26C20.1797 26 26 20.1797 26 13C26 5.82026 20.1797 0 13 0ZM13 23.4C7.26545 23.4 2.60002 18.7345 2.60002 13C2.60002 7.26539 7.26539 2.60002 13 2.60002C18.7346 2.60002 23.4 7.26539 23.4 13C23.4 18.7345 18.7346 23.4 13 23.4ZM14.6279 7.79999C14.6279 8.74257 13.9416 9.42501 13.0132 9.42501C12.0473 9.42501 11.3778 8.74251 11.3778 7.78196C11.3778 6.85875 12.0654 6.17504 13.0132 6.17504C13.9416 6.17504 14.6279 6.85875 14.6279 7.79999ZM11.7029 11.7H14.3028V19.5H11.7029V11.7Z"
                                            className="fill-black group-hover:fill-white"
                                        />
                                    </svg>

                                    <p className="px-6 text-sm">
                                        Term & Conditions
                                    </p>
                                </Link>
                                <Link
                                    href="/privacy-policy"
                                    className="group flex flex-row items-center bg-[#DADADA59] px-5 text-lg font-medium hover:bg-primary hover:text-white"
                                >
                                    <svg
                                        width="30"
                                        height="32"
                                        viewBox="0 0 30 32"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M23.9025 15.6891V7.13204C23.9026 7.02398 23.8814 6.91697 23.84 6.81714C23.7987 6.7173 23.738 6.62661 23.6616 6.55025L19.3523 2.24093C19.1984 2.08685 18.9896 2.00019 18.7719 2H2.82134C2.60351 2 2.3946 2.08653 2.24057 2.24057C2.08653 2.3946 2 2.60351 2 2.82134V28.5568C2 28.7746 2.08653 28.9836 2.24057 29.1376C2.3946 29.2916 2.60351 29.3782 2.82134 29.3782H14.3202M7.47563 12.9513H18.4269M7.47563 7.47563H12.9513M7.47563 18.4269H11.5824"
                                            className="stroke-black group-hover:stroke-white"
                                            strokeWidth="2.1875"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                        <path
                                            d="M18.4268 2V6.65429C18.4268 6.87212 18.5133 7.08103 18.6673 7.23506C18.8214 7.3891 19.0303 7.47563 19.2481 7.47563H23.9024M23.8914 19.9669L27.3904 20.8553C27.7545 20.9484 28.0105 21.2797 27.9995 21.6548C27.7641 29.5369 23.2179 30.7471 23.2179 30.7471C23.2179 30.7471 18.6718 29.5369 18.4363 21.6548C18.4326 21.4723 18.4908 21.2939 18.6014 21.1488C18.712 21.0036 18.8686 20.9002 19.0455 20.8553L22.5444 19.9669C22.9866 19.8547 23.4493 19.8547 23.8914 19.9669Z"
                                            className="stroke-black group-hover:stroke-white"
                                            strokeWidth="2.1875"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>

                                    <p className="px-5 text-sm">
                                        Privacy Policy
                                    </p>
                                </Link>
                            </div>
                        </div>
                        <div className="h-max-[230px] w-max-[392px] py-3">
                            <p className="pl-2 text-lg font-medium leading-10">
                                Action
                            </p>
                            <div className="group: mb-16 h-[52px] w-full overflow-hidden rounded-md">
                                <button
                                    onClick={modalVisibility}
                                    className="group flex h-[52px] w-full flex-row items-center bg-[#DADADA59] px-5 text-lg font-medium hover:bg-primary hover:text-white"
                                >
                                    <svg
                                        width="25"
                                        height="25"
                                        viewBox="0 0 25 25"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M2.77778 25C2.01389 25 1.36019 24.7282 0.816667 24.1847C0.273148 23.6412 0.000925926 22.987 0 22.2222V2.77778C0 2.01389 0.272222 1.36019 0.816667 0.816667C1.36111 0.273148 2.01481 0.000925926 2.77778 0H12.5V2.77778H2.77778V22.2222H12.5V25H2.77778ZM18.0556 19.4444L16.1458 17.4306L19.6875 13.8889H8.33333V11.1111H19.6875L16.1458 7.56944L18.0556 5.55556L25 12.5L18.0556 19.4444Z"
                                            className="fill-black group-hover:fill-white"
                                        />
                                    </svg>

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
                <div className="flex h-[160px] w-[300px] flex-col overflow-hidden sm:w-[360px] md:h-[180px]">
                    <div className="p-6 sm:p-8">
                        <p className="text-center text-2xl font-semibold text-red-400 opacity-100">
                            Logout
                        </p>
                        <p className="text-center text-base font-extralight text-black opacity-100">
                            Are you sure?
                        </p>
                    </div>
                    <div className="h-full rounded-b-xl">
                        <div className="grid h-full grid-cols-2">
                            <button
                                className="rounded-es-lg border-t border-black bg-transparent text-black transition-colors duration-200 hover:bg-yellow-500 hover:text-white sm:text-lg"
                                onClick={modalVisibility}
                            >
                                Cancel
                            </button>
                            <button
                                className="rounded-ee-lg border-l border-t border-black bg-transparent text-black transition-colors duration-200 hover:bg-red-500 hover:text-white sm:text-lg"
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
