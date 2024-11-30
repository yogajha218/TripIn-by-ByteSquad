import { useLayoutEffect, useState } from "react";
import { usePage } from "@inertiajs/react";
import HistoryComponent from "@/Components/HistoryComponent";

const History = () => {
    const { users } = usePage().props; // Get users from Inertia props
    const [user, setUser ] = useState({});
    const [isNewHistoryCardProp, setIsNewHistoryCardProp] = useState(false);
    const [isOldHistoryCardProp, setIsOldHistoryCardProp] = useState(false);
    const [newHistoryCardProp, setNewHistoryCardProp] = useState({});
    const [oldHistoryCardProp, setOldHistoryCardProp] = useState({});

    function checkIsCardDataEmpty(datas, setCardProp, setVisible) {
        if (Object.keys(datas).length !== 0) {
            setVisible(true);
            setCardProp((prevState) => ({ ...prevState, ...datas }));
        }
    }

    useLayoutEffect(() => {
        // Dummy data for new and old history cards
        const newHistoryCardProp = {
          name: "Shuttle Bus TripIn",
          bookingCode: "782VAML",
          seat: "Seat 6",
          passengers: "1 Passenger",
          origin: "Jakarta",
          originTime: "10.00",
          destination: "Bandung",
          destinationTime: "12.45",
          duration: "2 h 45 m",
          price: "Rp120.000",
        };

        const oldHistoryCardProp = {
          name: "Shuttle Bus TripIn",
          bookingCode: "798VAML",
          seat: "Seat 10,12",
          passengers: "2 Passenger",
          origin: "Jakarta",
          originTime: "10.00",
          destination: "Bandung",
          destinationTime: "12.45",
          duration: "2 h 45 m",
          price: "Rp240.000",
        };

        checkIsCardDataEmpty(newHistoryCardProp, setNewHistoryCardProp, setIsNewHistoryCardProp);
        checkIsCardDataEmpty(oldHistoryCardProp, setOldHistoryCardProp, setIsOldHistoryCardProp);
    }, [users]);

    return (
        <div className="flex justify-center">
            <div className="w-full max-w-[500px] bg-white shadow-lg  overflow-hidden">
                <header className="bg-primary text-white py-4 px-6">
                    <div className="flex justify-between items-center">
                        <button
                            onClick={() => console.log("Back button clicked")}
                            className="text-white"
                        >
                            &lt;
                        </button>
                        <h1 className="font-bold text-xl sm:text-3xl">History</h1>
                        <div></div>
                    </div>
                </header>

                <main className="px-4 py-6 bg-gray-100">
                    <section className="mb-6">
                        <p className="font-semibold text-black mb-5">
                            Sat, 9 November 2024
                        </p>
                        {isNewHistoryCardProp ? (
                            <HistoryComponent CardProp={newHistoryCardProp} />
                        ) : (
                            <div>None</div>
                        )}
                    </section>

                    <section>
                        <p className="font-semibold text-black mb-5">
                            Sun, 3 November 2024
                        </p>
                        {isOldHistoryCardProp ? (
                            <HistoryComponent CardProp={oldHistoryCardProp} />
                        ) : (
                            <div>None</div>
                        )}
                    </section>
                </main>
            </div>
        </div>
    );
}

export default History;