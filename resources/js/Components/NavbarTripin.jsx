import { Link } from "@inertiajs/react";
import React, { useLayoutEffect, useState } from "react";
const NavbarTripin = ({ pageInfo }) => {
    const [activePage, setActivePage] = useState("");
    const handleReload = () => {
        e.preventDefault();
        sessionStorage.setItem("reloaded", "true");
        window.location.reload();
    };

    useLayoutEffect(() => {
        switch (pageInfo) {
            case "HomePage":
                setActivePage("HomePage");
                break;
            case "TrackingPage":
                setActivePage("TrackingPage");
                break;
            case "TicketPage":
                setActivePage("TicketPage");
                break;
            case "Profile":
                setActivePage("Profile");
                break;
        }
    }, []);

    return (
        <div className=" fixed bottom-0 w-full lg:max-w-[400px] right-0 bg-primary left-1/2 translate-x-[-50%]  h-16 rounded-t-xl z-40 flex justify-evenly">
            {activePage === "HomePage" ? (
                <Link href="/home" className="flex justify-center items-center">
                    <img src="/home-active.svg" className="h-12" />
                </Link>
            ) : (
                <Link href="/home" className="flex justify-center items-center">
                    <img src="/home-unactive.svg" className="h-10" />
                </Link>
            )}
            {activePage === "TrackingPage" ? (
                <Link
                    href="/tracking"
                    className="flex justify-center items-center"
                >
                    <img src="/shuttle-active.svg" className="h-10" />
                </Link>
            ) : (
                <Link
                    href="/tracking"
                    className="flex justify-center items-center"
                >
                    <img src="/shuttle-unactive.svg" className="h-8" />
                </Link>
            )}
            {activePage === "TicketPage" ? (
                <Link
                    href="/ticket"
                    className="flex justify-center items-center"
                >
                    <img src="/ticket-active.svg" className="h-8" />
                </Link>
            ) : (
                <Link
                    href="/ticket"
                    className="flex justify-center items-center"
                >
                    <img src="/ticket-unactive.svg" className="h-6" />
                </Link>
            )}
            {activePage === "Profile" ? (
                <Link
                    onClick={handleReload}
                    href="/profile"
                    className="flex justify-center items-center"
                >
                    <img src="/user-active.svg" className="h-10" />
                </Link>
            ) : (
                <Link
                    onClick={handleReload}
                    href="/profile"
                    className="flex justify-center items-center"
                >
                    <img src="/user-unactive.svg" className="h-8" />
                </Link>
            )}
        </div>
    );
};

export default NavbarTripin;
