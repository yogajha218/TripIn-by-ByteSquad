import { useLayoutEffect, useEffect, useState } from "react";
import { BellIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import CarouselDashboard from "@/Components/CarouselDashboard";
import CardComponent from "@/Components/CardComponent";
import NavbarTripin from "@/Components/NavbarTripin";

const Home = ({ credit, username, user_id, booking, notification_status }) => {
    const [isTripAvailable, setIsTripsAvailable] = useState(false);
    const [isUpcomingTripAvailable, setIsUpcomingTripAvailable] =
        useState(false);
    const [showAllUpcomingRoutes, setShowAllUpcomingRoutes] = useState(false); // State to control "See More"
    const [todayTripCardProp, setTodayTripCardProp] = useState([]);
    const { todays, upcomings } = booking; // Destructure the booking props (from backend) to get today and upcoming

    const formattedCredit = new Intl.NumberFormat("id-ID", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(credit);

    const todayCardProp = todays.map((today) => ({
        id: today.booking_id,
        name: "Shuttle Bus Tripin",
        plateNumber: today.trips[0]?.schedule.vehicle.license_plate,
        origin: today.trips[0]?.origin,
        destination: today.trips[0]?.schedule.location.name,
        status: "On Trip",
        price: today.price,
        date: today.trips[0]?.selected_day,
    }));

    const upcomingCardProp = upcomings.map((upcoming) => ({
        id: upcoming.booking_id,
        name: "Shuttle Bus Tripin",
        plateNumber: upcoming.trips[0]?.schedule.vehicle.license_plate,
        origin: upcoming.trips[0]?.origin,
        destination: upcoming.trips[0]?.schedule.location.name,
        status: "Upcoming Trip",
        price: upcoming.price,
        date: upcoming.trips[0]?.selected_day,
    }));

    useEffect(() => {
        setIsTripsAvailable(todayCardProp.length > 0);
        setIsUpcomingTripAvailable(upcomingCardProp.length > 0);
    }, [booking]);

    const visibleUpcomingRoutes = showAllUpcomingRoutes
        ? upcomingCardProp
        : upcomingCardProp.slice(0, 2); // Show only the first 2 initially

    return (
        <>
            <div className="flex justify-center">
                <div className="h-fit w-full bg-white lg:max-w-[400px]">
                    <div className="relative h-[222px] rounded-b-3xl bg-primary">
                        <div className={`absolute right-5 top-8`}>
                            <BellIcon
                                onClick={() =>
                                    (window.location.href =
                                        route("notification"))
                                }
                                className={`relative z-40 size-8 cursor-pointer text-white hover:animate-none`}
                            ></BellIcon>
                            {notification_status == "unread" && (
                                <div className="absolute right-1 top-1 z-50 size-2 rounded-full bg-primary2"></div>
                            )}
                        </div>
                        <div className="relative h-[90px] pl-5 pt-8">
                            <img
                                src="/TripInLogo.svg"
                                className="h-8 w-16"
                                alt="Logo of TripIn"
                                loading="lazy"
                            />
                        </div>
                        <div className="mx-5">
                            <p className="text-2xl font-semibold tracking-tighter text-white sm:text-3xl">
                                Welcome, {username}
                            </p>
                            <p className="text-base font-medium tracking-tight text-white sm:text-lg">
                                Enjoy Your Trip!
                            </p>
                        </div>
                    </div>

                    <div className="h-full min-h-[100vh] w-full px-5 pb-8">
                        <a
                            onClick={() =>
                                console.log("Navigate to credit screen")
                            }
                            className="group relative top-[-1.5rem] mx-5 flex rounded-lg border border-primary bg-white px-5 py-2 hover:cursor-pointer"
                        >
                            <img
                                className="mr-3"
                                src="/credit.svg"
                                alt="CreditIcon"
                                loading="lazy"
                            />
                            <p className="text-orange absolute left-14 top-1/2 -translate-y-1/2 text-sm">
                                {formattedCredit} CP
                            </p>
                        </a>
                        <button
                            onClick={() =>
                                (window.location.href = route("booking.index"))
                            }
                            className="mb-8 w-full rounded-lg bg-primary2 py-2 text-white"
                        >
                            Booking
                        </button>

                        <div className="font-semibold text-black">
                            Available Locations
                        </div>
                        <div className="lg:flex lg:justify-center">
                            <CarouselDashboard />
                        </div>
                        <div className="mb-3 mt-12 font-semibold text-black">
                            Today's Trip
                        </div>

                        <div className="grid gap-4">
                            {isTripAvailable ? (
                                <CardComponent CardProp={todayCardProp} />
                            ) : (
                                <div className="flex flex-col items-center justify-center pb-9">
                                    <img src="/tayo-bus.svg " loading="lazy" />
                                    <p>no tayo trip available</p>
                                </div>
                            )}
                        </div>

                        <div className="mb-3 mt-16 flex items-baseline justify-between px-2">
                            <p className="text-orange font-semibold">
                                Upcoming's Trip
                            </p>
                            {upcomingCardProp.length > 2 && (
                                <button
                                    onClick={() =>
                                        setShowAllUpcomingRoutes(
                                            !showAllUpcomingRoutes,
                                        )
                                    }
                                    className="text-sm font-medium text-primary2 underline"
                                >
                                    {showAllUpcomingRoutes
                                        ? "See Less"
                                        : "See More"}
                                </button>
                            )}
                        </div>
                        <div className="grid gap-4">
                            <div className="mb-10 grid gap-4">
                                {isUpcomingTripAvailable ? (
                                    <CardComponent
                                        CardProp={visibleUpcomingRoutes} // Show limited or all routes
                                    />
                                ) : (
                                    <div className="flex flex-col items-center justify-center pb-9">
                                        <img src="/tayo-bus.svg" />
                                        <p>no tayo trip available</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <NavbarTripin pageInfo={"HomePage"} />
        </>
    );
};

export default Home;
