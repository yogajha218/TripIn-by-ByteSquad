import { useLayoutEffect, useState } from "react";
import CarouselDashboard from "@/Components/CarouselDashboard";
import CardComponent from "@/Components/CardComponent";

function TripInDashboard() {
    const [user, setUser] = useState({});
    const [isTripAvailable, setIsTripsAvailable] = useState(false);
    const [isUpcomingTripAvailable, setIsUpcomingTripAvailable] =
        useState(false);
    const [todayTripCardProp, setTodayTripCardProp] = useState({});
    const [UpcomingTripsCardProp, setUpcomingTripsCardProp] = useState({});
    function checkIsCardDataEmpty(datas, setTrip, setVisiable) {
        if (Object.keys(datas).length !== 0) {
            setVisiable(true);
            setTrip((prevState) => ({ ...prevState, ...datas }));
            // setVisiable(false);
            console.log("test");
        }
    }
    useLayoutEffect(() => {
        const user = {
            userName: "User2",
            userCredit: 1000,
        };
        const todayCardProp = {
            name: "Shuttle Bus Tripi",
            plateNumber: "BHXXX12345JJ",
            origin: "Bandar Udara Internasional Haji Muhammad Sulaiman Sepinggan ",
            destination: "The Trans Luxury Hotel Bandung",
            status: "On Trip",
            price: "120.000/PAX",
        };
        const UpcomingCardProp = {
            name: "Shuttle Bus Tripi",
            plateNumber: "BHXXX12345JJ",
            origin: "Bandar Udara Internasional Haji Muhammad Sulaiman Sepinggan ",
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
            UpcomingCardProp,
            setUpcomingTripsCardProp,
            setIsUpcomingTripAvailable
        );
        console.log(isUpcomingTripAvailable);
        setUser({ ...user });
    }, []);

    return (
        <>
            <div className="h-[328px] relative min-w-[360px]">
                <div className="h-[222px] bg-primary rounded-b-3xl">
                    <div className="h-[90px] relative">
                        {
                            //logo
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
                <div className=" flex relative flex-col justify-center text-start">
                    <a
                        onClick={() => console.log("pergi ke credit screen")}
                        className="flex px-5 mx-10 bg-white border border-primary mb-8 mt-[-1.5rem]  rounded-lg py-2 hover:cursor-pointer"
                    >
                        <img
                            className="mr-3"
                            src="/public/credit.svg"
                            alt="CreditIcon"
                        />
                        <p className="text-orange">
                            {" "}
                            {user.userCredit} Credit Points
                        </p>
                    </a>
                    <button className="text-white bg-primary2 py-2 rounded-lg mx-5">
                        {" "}
                        BOOK NOW{" "}
                    </button>
                </div>
            </div>
            <div className="px-5 mb-20">
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
                    <div className="">none</div>
                )}
                <div className="font-semibold text-orange my-5">
                    Upcoming's Trip
                </div>
                {isUpcomingTripAvailable ? (
                    <CardComponent CardProp={UpcomingTripsCardProp} />
                ) : (
                    <div></div>
                )}
            </div>
        </>
    );
}

export default TripInDashboard;
