import { Link } from "@inertiajs/react";
import React, { useLayoutEffect, useState } from "react";
const NavbarTripin = ({ pageInfo }) => {
    const [activePage, setActivePage] = useState("");
    // const handleReload = () => {
    //     e.preventDefault();
    //     sessionStorage.setItem("reloaded", "true");
    //     window.location.reload();
    // };

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
        <div className="fixed bottom-0 left-1/2 right-0 z-40 flex h-16 w-full translate-x-[-50%] justify-evenly rounded-t-xl bg-primary lg:max-w-[400px]">
            <Link
                href="/home"
                className="flex flex-col items-center justify-center"
            >
                <svg
                    width="45"
                    height="45"
                    viewBox="0 0 45 45"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className={
                        activePage === "HomePage" ? "fill-grey" : "fill-white"
                    }
                >
                    <path d="M18.7499 35.6251V26.2501H26.2499V35.6251C26.2499 36.6563 27.0936 37.5001 28.1249 37.5001H33.7499C34.7811 37.5001 35.6249 36.6563 35.6249 35.6251V22.5001H38.8124C39.6749 22.5001 40.0874 21.4313 39.4311 20.8688L23.7561 6.7501C23.0436 6.1126 21.9561 6.1126 21.2436 6.7501L5.56863 20.8688C4.93113 21.4313 5.32488 22.5001 6.18738 22.5001H9.37488V35.6251C9.37488 36.6563 10.2186 37.5001 11.2499 37.5001H16.8749C17.9061 37.5001 18.7499 36.6563 18.7499 35.6251Z" />
                </svg>
                <p
                    className={`relative text-xs ${activePage === "HomePage" ? "text-grey" : "text-white"}`}
                >
                    Home
                </p>
            </Link>

            <Link
                href="/tracking"
                className="flex flex-col items-center justify-center"
            >
                <svg
                    width="41"
                    height="41"
                    viewBox="0 0 41 41"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M5.01611 18.8334L9.16268 9.18675C9.42071 8.58675 9.8498 8.07548 10.3967 7.71638C10.9436 7.35728 11.5843 7.16617 12.2392 7.16675H27.8925C28.5468 7.16682 29.1867 7.35824 29.733 7.7173C30.2792 8.07636 30.7078 8.58727 30.9656 9.18675L35.1122 18.8334M5.01611 18.8334H35.1122M5.01611 18.8334V30.5001M35.1122 18.8334V30.5001M5.01611 30.5001V31.3334C5.01611 31.9965 5.28035 32.6323 5.75069 33.1012C6.22103 33.57 6.85895 33.8334 7.52412 33.8334C8.18928 33.8334 8.8272 33.57 9.29755 33.1012C9.76789 32.6323 10.0321 31.9965 10.0321 31.3334V30.5001M5.01611 30.5001H10.0321M35.1122 30.5001V31.3334C35.1122 31.9965 34.8479 32.6323 34.3776 33.1012C33.9073 33.57 33.2693 33.8334 32.6042 33.8334C31.939 33.8334 31.3011 33.57 30.8308 33.1012C30.3604 32.6323 30.0962 31.9965 30.0962 31.3334V30.5001M35.1122 30.5001H30.0962M30.0962 30.5001H10.0321"
                        className={
                            activePage === "TrackingPage"
                                ? "stroke-grey"
                                : "stroke-white"
                        }
                        strokeWidth="2.91667"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                    <path
                        className={
                            activePage === "TrackingPage"
                                ? "fill-grey"
                                : "fill-white"
                        }
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M5.01611 18.8335H35.1122V30.5002H5.01611V18.8335ZM10.0321 23.8335C10.0321 23.3915 10.2083 22.9675 10.5218 22.655C10.8354 22.3424 11.2607 22.1668 11.7041 22.1668C12.1476 22.1668 12.5745 22.3424 12.8881 22.655C13.2016 22.9675 13.3778 23.3915 13.3778 23.8335C13.3778 24.2755 13.2016 24.6994 12.8881 25.012C12.5745 25.3246 12.1492 25.5002 11.7058 25.5002C11.2624 25.5002 10.8354 25.3246 10.5218 25.012C10.2083 24.6994 10.0321 24.2755 10.0321 23.8335ZM28.4242 22.1668C27.9807 22.1668 27.5554 22.3424 27.2419 22.655C26.9283 22.9675 26.7522 23.3915 26.7522 23.8335C26.7522 24.2755 26.9283 24.6994 27.2419 25.012C27.5554 25.3246 27.9807 25.5002 28.4242 25.5002C28.8676 25.5002 29.2946 25.3246 29.6081 25.012C29.9217 24.6994 30.0978 24.2755 30.0978 23.8335C30.0978 23.3915 29.9217 22.9675 29.6081 22.655C29.2946 22.3424 28.8676 22.1668 28.4242 22.1668Z"
                    />
                </svg>
                <p
                    className={`relative top-0.5 text-xs ${activePage === "TrackingPage" ? "text-grey" : "text-white"}`}
                >
                    Tracking
                </p>
            </Link>
            <Link
                href="/ticket"
                className="flex flex-col items-center justify-center"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="37"
                    height="29"
                    viewBox="0 0 37 29"
                    fill="none"
                >
                    <path
                        d="M24.1282 1.66675V5.33342M24.1282 12.6667V16.3334M24.1282 23.6667V27.3334M5.79484 1.66675H31.4615C32.434 1.66675 33.3666 2.05306 34.0542 2.74069C34.7419 3.42832 35.1282 4.36095 35.1282 5.33342V10.8334C34.1557 10.8334 33.2231 11.2197 32.5354 11.9074C31.8478 12.595 31.4615 13.5276 31.4615 14.5001C31.4615 15.4725 31.8478 16.4052 32.5354 17.0928C33.2231 17.7804 34.1557 18.1667 35.1282 18.1667V23.6667C35.1282 24.6392 34.7419 25.5718 34.0542 26.2595C33.3666 26.9471 32.434 27.3334 31.4615 27.3334H5.79484C4.82238 27.3334 3.88975 26.9471 3.20212 26.2595C2.51448 25.5718 2.12817 24.6392 2.12817 23.6667V18.1667C3.10063 18.1667 4.03327 17.7804 4.7209 17.0928C5.40853 16.4052 5.79484 15.4725 5.79484 14.5001C5.79484 13.5276 5.40853 12.595 4.7209 11.9074C4.03327 11.2197 3.10063 10.8334 2.12817 10.8334V5.33342C2.12817 4.36095 2.51448 3.42832 3.20212 2.74069C3.88975 2.05306 4.82238 1.66675 5.79484 1.66675Z"
                        className={
                            activePage === "TicketPage"
                                ? "stroke-grey"
                                : "stroke-white"
                        }
                        strokeWidth="2.91667"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
                <p
                    className={`relative top-2 text-xs ${activePage === "TicketPage" ? "text-grey" : "text-white"}`}
                >
                    Ticket
                </p>
            </Link>
            <Link
                // onClick={handleReload}
                href="/profile"
                className="flex flex-col items-center justify-center"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="36"
                    height="35"
                    viewBox="0 0 36 35"
                    fill="none"
                >
                    <path
                        d="M9.24273 10.2084C9.24273 7.98446 10.1262 5.8516 11.6988 4.27903C13.2713 2.70646 15.4042 1.823 17.6281 1.823C19.8521 1.823 21.985 2.70646 23.5575 4.27903C25.1301 5.8516 26.0136 7.98446 26.0136 10.2084C26.0136 12.4324 25.1301 14.5652 23.5575 16.1378C21.985 17.7104 19.8521 18.5938 17.6281 18.5938C15.4042 18.5938 13.2713 17.7104 11.6988 16.1378C10.1262 14.5652 9.24273 12.4324 9.24273 10.2084ZM17.3336 20.7974C17.3963 20.7879 17.4597 20.7825 17.5231 20.7813H17.7331C17.7973 20.7813 17.8605 20.7867 17.9227 20.7974L28.5613 22.6684L28.6167 22.6801C30.5767 23.1322 32.6825 24.3761 33.0923 26.7926L33.0981 26.8349L33.2644 28.1138V28.1167C33.6494 31.0465 31.3263 33.1772 28.5831 33.1772C28.5226 33.1761 28.4622 33.1712 28.4023 33.1626H6.67314C3.93002 33.1626 1.60544 31.0305 1.99189 28.0992L2.15814 26.832L2.16544 26.7882C2.57377 24.4155 4.6971 23.1015 6.65273 22.6772L6.69502 22.6684L17.3336 20.7974Z"
                        className={
                            activePage === "Profile"
                                ? "fill-grey"
                                : "fill-white"
                        }
                    />
                </svg>
                <p
                    className={`relative top-1 text-xs ${activePage === "Profile" ? "text-grey" : "text-white"}`}
                >
                    Profile
                </p>
            </Link>
        </div>
    );
};

export default NavbarTripin;
