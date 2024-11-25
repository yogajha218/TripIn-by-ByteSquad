import { useLayoutEffect, useState } from "react";
import { usePage } from "@inertiajs/react";
import CarouselDashboard from "@/Components/CarouselDashboard";
import CardComponent from "@/Components/CardComponent";
import NavbarTripin from "@/Components/navbarTripin";

const HomePage = ({credit, username, user_id}) => {
    const [isTripAvailable, setIsTripsAvailable] = useState(false);
    const [isUpcomingTripAvailable, setIsUpcomingTripAvailable] =
        useState(false);
    const [todayTripCardProp, setTodayTripCardProp] = useState({});
    const [upcomingTripsCardProp, setUpcomingTripsCardProp] = useState({});

    function checkIsCardDataEmpty(datas, setTrip, setVisible) {
        if (Object.keys(datas).length !== 0) {
            setVisible(true);
            setTrip((prevState) => ({ ...prevState, ...datas }));
        }
    }

    useLayoutEffect(() => {
        // Dummy data for today's and upcoming trips
        const todayCardProp = {
            name: "Shuttle Bus Tripi",
            plateNumber: "BHXXX12345JJ",
            origin: "Bandar Udara Internasional Haji Muhammad Sulaiman Sepinggan",
            destination: "The Trans Luxury Hotel Bandung",
            status: "On Trip",
            price: "120.000/PAX",
        };

        const upcomingCardProp = {
            name: "Shuttle Bus Tripi",
            plateNumber: "BHXXX12345JJ",
            origin: "Bandar Udara Internasional Haji Muhammad Sulaiman Sepinggan",
            destination: "The Trans Luxury Hotel Bandung",
            status: "On Trip",
            price: "120.000/PAX",
        };

        checkIsCardDataEmpty(
            todayCardProp,
            setTodayTripCardProp,
            setIsTripsAvailable
        );
        checkIsCardDataEmpty(
            upcomingCardProp,
            setUpcomingTripsCardProp,
            setIsUpcomingTripAvailable
        );
    }, []); // Run effect when users data changes

    return (
        <>
            <div className=" flex justify-center ">
                <div className="h-fit w-full lg:max-w-[500px] bg-white">
                    <div className="h-[222px] bg-primary rounded-b-3xl">
                        <div className="h-[90px] relative pt-8 pl-5">
                            <img
                                src="/TripInLogo.svg"
                                className="h-12"
                                alt="Logo of TripIn"
                            />
                        </div>
                        <div className="mx-5">
                            <p className="font-bold text-white text-3xl">
                                Welcome, {username} 
                            </p>
                            <p className="font-semibold text-white text-lg">
                                Enjoy Your Trip!
                            </p>
                            <a
                                onClick={() =>
                                    console.log("Navigate to credit screen")
                                }
                                className="flex px-5 mx-5 bg-white border border-primary  mt-10 rounded-lg py-2 hover:cursor-pointer"
                            >
                                <img
                                    className="mr-3"
                                    src="/credit.svg"
                                    alt="CreditIcon"
                                />
                                <p className="text-orange">
                                    {credit} Credit Points
                                </p>
                            </a>
                        </div>
                    </div>

                    <div className="h-full w-full px-5 py-8 ">
                        <button
                            className="text-white bg-primary2 py-2 rounded-lg  w-full"
                        >
                            Booking
                        </button>

                        <div className="font-semibold text-black">
                            Popular Destinations
                        </div>
                        <div className="lg:flex lg:justify-center">
                            <CarouselDashboard />
                        </div>
                        <div className="font-semibold text-black mb-5">
                            Today's Trip
                        </div>
                        <div className="flex justify-center">
                            {isTripAvailable ? (
                                <CardComponent CardProp={todayTripCardProp} />
                            ) : (
                                <div>none</div>
                            )}
                        </div>

                        <div className="font-semibold text-orange my-5">
                            Upcoming's Trip
                        </div>
                        <div className="flex justify-center mb-20">
                            {isUpcomingTripAvailable ? (
                                <CardComponent
                                    CardProp={upcomingTripsCardProp}
                                />
                            ) : (
                                <div className="pb-9 justify-center items-center flex flex-col">
                                    <img src="/tayo-bus.svg" />
                                    <p>no tayo trip available</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <NavbarTripin pageInfo={"HomePage"} />
        </>
    );
}

export default HomePage;
