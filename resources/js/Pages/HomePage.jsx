import { useLayoutEffect, useState } from "react";
import { usePage } from "@inertiajs/react";
import CarouselDashboard from "@/Components/CarouselDashboard";
import CardComponent from "@/Components/CardComponent";
import NavbarTripin from "@/Components/navbarTripin";

function HomePage() {
    const { users } = usePage().props; // Get users from Inertia props
    const [user, setUser] = useState({});
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
        // Set the first user from the backend data (adjust as needed)
        if (users && users.length > 0) {
            const loggedInUser = users[0]; // Assuming the first user is logged in
            setUser({
                userName: loggedInUser.username || "Guest",
                userCredit: loggedInUser.credit?.credit_amount || 0, // Access credit amount
            });
        }

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
            // name: "Shuttle Bus Tripi",
            // plateNumber: "BHXXX12345JJ",
            // origin: "Bandar Udara Internasional Haji Muhammad Sulaiman Sepinggan",
            // destination: "The Trans Luxury Hotel Bandung",
            // status: "On Trip",
            // price: "120.000/PAX",
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
    }, [users]); // Run effect when users data changes

    const handleLogout = async () => {
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
                window.location.href = "/"; // Redirect to login after logout
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
            <div className="flex justify-center">
                <div className=" h-fit w-full lg:max-w-[500px]">
                    <div className="h-[328px] bg-white">
                        <div className="h-[222px] bg-primary rounded-b-3xl">
                            <div className="h-[90px] relative">
                                {
                                    // Logo can go here
                                }
                            </div>
                            <div className="mx-5">
                                <p className="font-bold text-white text-3xl">
                                    Welcome, {user.userName}
                                </p>
                                <p className="font-semibold text-white text-lg">
                                    Enjoy Your Trip!
                                </p>
                            </div>
                        </div>
                        <div className="flex relative flex-col justify-center text-start">
                            <a
                                onClick={() =>
                                    console.log("Navigate to credit screen")
                                }
                                className="flex px-5 mx-10 bg-white border border-primary mb-8 mt-[-1.5rem] rounded-lg py-2 hover:cursor-pointer"
                            >
                                <img
                                    className="mr-3"
                                    src="/credit.svg"
                                    alt="CreditIcon"
                                />
                                <p className="text-orange">
                                    {user.userCredit} Credit Points
                                </p>
                            </a>
                            <button
                                onClick={handleLogout}
                                className="text-white bg-primary2 py-2 rounded-lg mx-5"
                            >
                                LOGOUT SEMENTARA
                            </button>
                        </div>
                    </div>
                    <div className="flex justify-center bg-white">
                        <div className="px-5 mb-20 bg-white ">
                            <div className="font-semibold text-black">
                                Popular Destinations
                            </div>
                            <CarouselDashboard />
                            <div className="font-semibold text-black mb-5">
                                Today's Trip
                            </div>
                            {isTripAvailable ? (
                                <CardComponent CardProp={todayTripCardProp} />
                            ) : (
                                <div>none</div>
                            )}
                            <div className="font-semibold text-orange my-5">
                                Upcoming's Trip
                            </div>
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
