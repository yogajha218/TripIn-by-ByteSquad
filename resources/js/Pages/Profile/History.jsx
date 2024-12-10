import { useState, useEffect } from "react";
import { usePage } from "@inertiajs/react";
import HistoryComponent from "@/Components/HistoryComponent";
import { ChevronLeftIcon } from "@heroicons/react/24/solid";

const History = ({ logs }) => {
    const { users } = usePage().props; // Get users from Inertia props
    const [groupedLogs, setGroupedLogs] = useState({}); // Grouped by date

    console.log("Log Data: ", logs);

    useEffect(() => {
        if (logs && Array.isArray(logs)) {
            // Group logs by selected_day
            const grouped = logs.reduce((acc, log) => {
                const day = log.departure_date || "Unknown Date";
                if (!acc[day]) {
                    acc[day] = [];
                }
                acc[day].push({
                    logId: log.log_id,
                    name: "Shuttle Bus TripIn",
                    bookingCode: log.trip.booking.booking_code,
                    seat: `Seat ${log.trip.booking.seat_number.join(", ")}`,
                    passengers: `${log.trip.booking.seat_total} Passenger(s)`,
                    origin: log.departure,
                    originTime: log.trip.schedule.departure_time, // Placeholder
                    destination: log.arrival,
                    destinationTime: log.trip.schedule.arrival_time, // Placeholder
                    duration: "2 h 45 m", // Placeholder
                    price: `Rp${parseInt(log.trip.booking.price).toLocaleString(
                        "id-ID"
                    )}`,
                });
                return acc;
            }, {});
            setGroupedLogs(grouped);
        }
    }, [logs]);

    return (
        <>
            <div className="lg:flex lg:justify-center">
                <div className="lg:w-[400px]">
                    <header className="bg-primary h-[108px] w-full">
                        <div className="flex text-white justify-center items-center relative h-full">
                            <ChevronLeftIcon
                                className="size-6 cursor-pointer absolute top-1/2 translate-y-[-50%] left-3"
                                onClick={() => history.back()}
                            />
                            <h1 className="font-medium text-3xl w-full text-center">
                                History
                            </h1>
                        </div>
                    </header>

                    <main className="px-4 py-6 bg-white min-h-screen">
                        {Object.entries(groupedLogs).map(([date, entries]) => (
                            <section key={date} className="mb-6">
                                <p className="font-semibold text-black mb-5">
                                    {new Date(date).toLocaleDateString(
                                        "en-US",
                                        {
                                            weekday: "short",
                                            day: "numeric",
                                            month: "long",
                                            year: "numeric",
                                        }
                                    )}
                                </p>
                                {entries.map((entry, index) => (
                                    <HistoryComponent
                                        key={index}
                                        CardProp={entry}
                                    />
                                ))}
                            </section>
                        ))}
                    </main>
                </div>
            </div>
        </>
    );
};

export default History;
