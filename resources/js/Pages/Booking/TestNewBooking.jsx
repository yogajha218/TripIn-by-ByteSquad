import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import { useState, useEffect } from "react";
import { useForm } from "@inertiajs/react";
import DatePickerComponent from "@/Components/DatePickerComponent";
import CardComponent from "@/Components/CardComponent";

const TestBooking = ({ todays, locations }) => {
    const [isTripAvailable, setIsTripsAvailable] = useState(false);
    const cities = [...new Set(locations.map((location) => location.city))];
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const [filteredCities, setFilteredCities] = useState([]);

    console.log("Location Backend: ", locations);
    console.log("Location Array Mapped: ", cities);

    const { data, setData, post, processing, errors } = useForm({
        cityValue: "",
        origin: "",
        selectedDay: "",
        seatsValue: "",
    });

    useEffect(() => {
        setIsTripsAvailable(todayCardProp.length > 0);
    }, [todays]);

    useEffect(() => {
        console.log(`dropdown: ${dropdownVisible}`);
    }, [dropdownVisible]);
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

    const handleCityInputChange = (e) => {
        const value = e.target.value;
        setData("cityValue", value);

        if (value) {
            const filtered = cities.filter((city) =>
                city.toLowerCase().includes(value.toLowerCase()),
            );
            setFilteredCities(filtered);
            setDropdownVisible(true);
        } else {
            setDropdownVisible(false);
        }
    };

    const handleCitySelect = (city) => {
        setData("cityValue", city);
        setDropdownVisible(false);
    };

    return (
        <>
            <div className="lg:flex lg:justify-center">
                <div className="min-h-screen bg-white lg:w-[400px]">
                    <div className="relative flex h-[108px] items-center justify-center rounded-b-lg bg-primary px-3">
                        <ChevronLeftIcon
                            onClick={() => (window.location.href = "/home")}
                            className="absolute left-3 top-1/2 z-50 size-8 translate-y-[-50%] cursor-pointer font-bold text-white"
                        ></ChevronLeftIcon>
                        <p className="mx-2 w-fit cursor-default select-none text-2xl font-medium text-white">
                            Booking
                        </p>
                    </div>
                    <div className="m-5 rounded-md border p-4 shadow-md">
                        <form>
                            <div>
                                <label
                                    htmlFor="input-group-1"
                                    className="mb-2 block text-sm font-medium text-gray-900"
                                >
                                    Departure City
                                </label>
                                <div className="relative mb-6">
                                    <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3.5">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth="1.5"
                                            stroke="currentColor"
                                            className="size-6"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
                                            />
                                        </svg>
                                    </div>
                                    <input
                                        type="text"
                                        id="input-group-1"
                                        className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 ps-10 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                                        placeholder="From"
                                        value={data.cityValue}
                                        onChange={handleCityInputChange}
                                        onFocus={() => setDropdownVisible(true)}
                                    />
                                    {dropdownVisible &&
                                        filteredCities.length !== 0 && (
                                            <ul className="absolute z-50 mt-1 size-fit w-full rounded-lg border border-gray-300 bg-white shadow-lg">
                                                {filteredCities.map(
                                                    (city, index) => (
                                                        <li
                                                            key={index}
                                                            className="cursor-pointer px-4 py-2 hover:bg-gray-100"
                                                            onClick={() =>
                                                                handleCitySelect(
                                                                    city,
                                                                )
                                                            }
                                                        >
                                                            {city}
                                                        </li>
                                                    ),
                                                )}
                                            </ul>
                                        )}
                                </div>
                                {/* Dropdown */}

                                <label
                                    htmlFor="input-group-1"
                                    className="mb-2 block text-sm font-medium text-gray-900"
                                >
                                    Place
                                </label>
                                <div className="relative mb-6">
                                    <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3.5">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth="1.5"
                                            stroke="currentColor"
                                            className="size-6"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                                            />
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
                                            />
                                        </svg>
                                    </div>
                                    <input
                                        type="text"
                                        id="input-group-1"
                                        className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 ps-10 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                                        placeholder="   From"
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-x-3">
                                    <div>
                                        <DatePickerComponent />
                                    </div>
                                    <div>
                                        <label
                                            htmlFor="countries"
                                            className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                                        >
                                            Select Seat
                                        </label>
                                        <select
                                            defaultValue=""
                                            id="countries"
                                            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                                        >
                                            <option value="" disabled>
                                                Choose a seat
                                            </option>
                                            <option value="US">1</option>
                                            <option value="CA">2</option>
                                            <option value="FR">3</option>
                                            <option value="DE">4</option>
                                            <option value="DE">5</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <button className="mt-7 w-full rounded-lg bg-primary2 py-2 text-white">
                                    Search
                                </button>
                            </div>
                        </form>
                    </div>
                    <div>
                        <div className="px-5 font-semibold text-black">
                            Today's Trip
                        </div>
                        <div className="mt-2 grid gap-4 px-5">
                            {isTripAvailable ? (
                                <CardComponent CardProp={todayCardProp} />
                            ) : (
                                <div className="flex flex-col items-center justify-center pb-9">
                                    <img src="/tayo-bus.svg " loading="lazy" />
                                    <p>no tayo trip available</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default TestBooking;
