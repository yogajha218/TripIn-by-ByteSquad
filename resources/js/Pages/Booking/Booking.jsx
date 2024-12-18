import { ChevronLeftIcon } from "@heroicons/react/24/solid";
import { useState, useEffect, useRef } from "react";
import { useForm } from "@inertiajs/react";
import DatePickerComponent from "@/Components/DatePickerComponent";
import CardComponent from "@/Components/CardComponent";
import SelectOriginBooking from "./SelectOriginBooking";

const Booking = ({ todays, locations }) => {
    const [isTripAvailable, setIsTripsAvailable] = useState(false);
    const cities = [...new Set(locations.map((location) => location.city))];
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [isSelectOrigin, setIsSelectOrigin] = useState(false);
    const [originError, setOriginError] = useState(false);
    const [originCityMismatch, setOriginCityMismatch] = useState(false);

    const filteredRoutes = cities.filter((location) =>
        location.toLowerCase().includes(searchTerm.toLowerCase()),
    );
    // Filter locations based on selected city
    const dropdownRef = useRef(null); // Create a ref for the dropdown
    const { data, setData, post, processing, errors } = useForm({
        cityValue: "",
        origin: "",
        selectedDay: "",
        seatsValue: null,
    });

    useEffect(() => {
        if (data.cityValue && data.origin) {
            const selectedOrigin = locations.find(
                (loc) => loc.name.toLowerCase() === data.origin.toLowerCase(),
            );

            if (
                !selectedOrigin ||
                selectedOrigin.city.toLowerCase() !==
                    data.cityValue.toLowerCase()
            ) {
                setOriginCityMismatch(true);
            } else {
                setOriginCityMismatch(false);
            }
        } else {
            setOriginCityMismatch(false);
        }
    }, [data.cityValue, data.origin, locations]);

    const handleSubmit = (e) => {
        e.preventDefault();

        // Reset previous origin error
        setOriginError(false);

        // Validate city is selected before origin
        if (!data.cityValue) {
            setOriginError(true);
            return;
        }

        if (originCityMismatch) {
            return;
        }

        const csrfToken = document.head.querySelector(
            'meta[name="csrf-token"]',
        ).content;

        try {
            post("/booking/store", data, {
                headers: {
                    "X-CSRF-TOKEN": csrfToken,
                },
            });
        } catch (error) {
            console.error("Error occurred:", error);

            if (error.response) {
                console.error("Error response:", error.response.data);
            }
        }
    };

    const filteredLocations = data.cityValue
        ? locations.filter(
              (loc) => loc.city.toLowerCase() === data.cityValue.toLowerCase(),
          )
        : locations;
    const [city] = locations;

    useEffect(() => {
        setIsTripsAvailable(todayCardProp.length > 0);
    }, [todays]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target)
            ) {
                setDropdownVisible(false); // Close dropdown if clicked outside
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

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
        setSearchTerm(e.target.value);
        if (e.target.value === e.target.value.toLowerCase()) {
            e.target.value = e.target.value.toUpperCase();
        }

        setData("cityValue", e.target.value);
        // Reset origin error when city is being changed
        setOriginError(false);
    };

    const handleCitySelect = (city) => {
        if (city === city.toLowerCase()) {
            city = city.toUpperCase();
        }

        setData("cityValue", city);
        setDropdownVisible(false);
        // Reset origin error when city is selected
        setOriginError(false);
    };

    return (
        <>
            {!isSelectOrigin ? (
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
                                        <div className="relative">
                                            <div className="pointer-events-none absolute inset-y-0 start-0 z-10 flex items-center ps-2">
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
                                                onFocus={() =>
                                                    setDropdownVisible(true)
                                                }
                                            />
                                        </div>

                                        {dropdownVisible && (
                                            <ul
                                                ref={dropdownRef}
                                                className="relative mt-1 size-fit w-full rounded-lg border border-gray-300 bg-white shadow-lg"
                                            >
                                                {filteredRoutes
                                                    .slice() // Create a copy of the array to avoid mutating the original
                                                    .sort((a, b) =>
                                                        a.localeCompare(b),
                                                    )
                                                    .map((city, index) => (
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
                                                    ))}
                                            </ul>
                                        )}
                                    </div>
                                    {/* Dropdown */}

                                    <label
                                        htmlFor="input-group-1"
                                        className="mb-2 block text-sm font-medium text-gray-900"
                                    >
                                        Origin
                                    </label>
                                    <div className="relative mb-2">
                                        <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-2">
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
                                        <svg
                                            className="absolute right-2 top-1/2 size-4 -translate-y-1/2 text-gray-800 dark:text-white"
                                            aria-hidden="true"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                stroke="currentColor"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="m9 5 7 7-7 7"
                                            />
                                        </svg>

                                        <input
                                            defaultValue={data.origin}
                                            readOnly
                                            id="input-group-1"
                                            className="block w-full cursor-pointer rounded-lg border border-gray-300 bg-gray-50 p-2.5 ps-10 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                                            placeholder="From"
                                            onFocus={() => {
                                                if (!data.cityValue) {
                                                    setOriginError(true);
                                                } else {
                                                    setIsSelectOrigin(true);
                                                }
                                            }}
                                        />
                                    </div>

                                    <div className="relative mb-4">
                                        {originCityMismatch && (
                                            <p className="text-sm text-red-500">
                                                Origin and City does not match.
                                                Please select a valid origin for
                                                the selected city.
                                            </p>
                                        )}
                                    </div>

                                    <div className="relative mb-4">
                                        {originError && (
                                            <p className="text-sm text-red-500">
                                                Please select a city first
                                            </p>
                                        )}
                                    </div>

                                    <div className="grid grid-cols-2 gap-x-3">
                                        <div>
                                            <DatePickerComponent
                                                setSelectedDay={setData}
                                                data={data}
                                            />
                                        </div>
                                        <div>
                                            <label
                                                htmlFor="countries"
                                                className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                                            >
                                                Select Seat
                                            </label>
                                            <select
                                                onClick={(e) =>
                                                    setData(
                                                        "seatsValue",
                                                        parseInt(
                                                            e.target.value,
                                                        ),
                                                    )
                                                }
                                                defaultValue=""
                                                id="countries"
                                                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                                            >
                                                <option value="" disabled>
                                                    Choose a seat
                                                </option>
                                                <option value="1">1</option>
                                                <option value="2">2</option>
                                                <option value="3">3</option>
                                                <option value="4">4</option>
                                                <option value="5">5</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <button
                                        onClick={handleSubmit}
                                        className="mt-7 w-full rounded-lg bg-primary2 py-2 text-white active:bg-primary2/85"
                                    >
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
                                        <img
                                            src="/tayo-bus.svg "
                                            loading="lazy"
                                        />
                                        <p>No trip available</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <SelectOriginBooking
                    setIsSelectOrigin={setIsSelectOrigin}
                    setOrigin={setData}
                    locations={filteredLocations} // Pass filtered locations
                />
            )}
        </>
    );
};

export default Booking;
