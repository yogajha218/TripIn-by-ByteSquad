import { Link } from "@inertiajs/react";
import React, { useLayoutEffect, useState } from "react";
const NavbarTripin = ({ pageInfo }) => {
    const [activePage, setActivePage] = useState("");

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
            case "ProfilePage":
                setActivePage("ProfilePage");
                break;
        }
    }, []);

    return (
        <div className=" fixed bottom-0 w-full lg:max-w-[500px] right-0 bg-primary left-1/2 translate-x-[-50%] h-16 rounded-t-xl z-40 flex justify-evenly">
            {activePage === "HomePage" ? (
                <Link href="/home" className="flex justify-center items-center">
                    <img src="/home-active.svg" />
                </Link>
            ) : (
                <Link href="/home" className="flex justify-center items-center">
                    <img src="/home-unactive.svg" />
                </Link>
            )}
            {activePage === "TrackingPage" ? (
                <Link
                    href="/tracking"
                    className="flex justify-center items-center"
                >
                    <img src="/shuttle-active.svg" />
                </Link>
            ) : (
                <Link
                    href="/tracking"
                    className="flex justify-center items-center"
                >
                    <img src="/shuttle-unactive.svg" />
                </Link>
            )}
            {activePage === "TicketPage" ? (
                <Link
                    href="/ticket"
                    className="flex justify-center items-center"
                >
                    <img src="/ticket-active.svg" />
                </Link>
            ) : (
                <Link
                    href="/ticket"
                    className="flex justify-center items-center"
                >
                    <img src="/ticket-unactive.svg" />
                </Link>
            )}
            {activePage === "ProfilePage" ? (
                <Link
                    href="/home/profile"
                    className="flex justify-center items-center"
                >
                    <img src="/user-active.svg" />
                </Link>
            ) : (
                <Link
                    href="/home/profile"
                    className="flex justify-center items-center"
                >
                    <img src="/user-unactive.svg" />
                </Link>
            )}
        </div>
    );
};

export default NavbarTripin;
