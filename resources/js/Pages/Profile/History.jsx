import { useState, useEffect } from "react";
import { usePage } from "@inertiajs/react";
import HistoryComponent from "@/Components/HistoryComponent";
import { ChevronLeftIcon } from "@heroicons/react/24/solid";

const History = ({ logs }) => {
    const { users } = usePage().props; // Get users from Inertia props
    const [groupedLogs, setGroupedLogs] = useState({}); // Grouped by date

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
                        "id-ID",
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
                <div className="bg-white lg:w-[400px]">
                    <header className="h-[108px] w-full rounded-b-lg bg-primary">
                        <div className="relative flex h-full items-center justify-center text-white">
                            <ChevronLeftIcon
                                className="absolute left-3 top-1/2 size-6 translate-y-[-50%] cursor-pointer"
                                onClick={() => {
                                    window.location.href = "/profile";
                                }}
                            />
                            <h1 className="w-full text-center text-3xl font-medium">
                                History
                            </h1>
                        </div>
                    </header>

                    <main className="min-h-screen bg-white px-4 py-6">
                        {Object.entries(groupedLogs).map(([date, entries]) => (
                            <section key={date} className="mb-6">
                                <p className="mb-5 font-semibold text-black">
                                    {new Date(date).toLocaleDateString(
                                        "en-US",
                                        {
                                            weekday: "short",
                                            day: "numeric",
                                            month: "long",
                                            year: "numeric",
                                        },
                                    )}
                                </p>
                                <div className="flex flex-col gap-3">
                                    {entries.map((entry, index) => (
                                        <HistoryComponent
                                            key={index}
                                            CardProp={entry}
                                        />
                                    ))}
                                </div>
                            </section>
                        ))}
                    </main>
                </div>
            </div>
        </>
    );
};

export default History;
