import { useState, useEffect } from "react";
import { format } from "date-fns";
import { usePage } from "@inertiajs/react";
import { ChevronLeftIcon, ArrowLeftIcon } from "@heroicons/react/24/solid";
import SelectOriginBooking from "./SelectOriginBooking";
import ButtonComponent from "@/Components/ButtonComponent";
import ModalComponent from "@/Components/ModalComponent";
import CalendarComponent from "@/Components/CalenderComponent";
import axios from "axios";
import { ToastComponent } from "@/Components/ToastComponent";

const Booking = () => {
    const { props } = usePage();
    const { location, driver, routes } = props;
    const [locations, setLocations] = useState(location); // Initialize locations with the provided locations
    const [selectedCity, setSelectedCity] = useState("");
    const uniqueCities = [...new Set(locations.map((loc) => loc.city))]; // Get unique cities
    const filteredLocations = selectedCity
        ? locations.filter((loc) => loc.city === selectedCity)
        : locations; // Filter locations based on selected city

    const numberOfSeatsOption = [
        "1 seat",
        "2 seats",
        "3 seats",
        "4 seats",
        "5 seats",
    ];
    const [isCityOptionsHidden, setIsCityOptionsHidden] = useState(true);
    const [isSeatsOptionsHidden, setIsSeatsOptionHidden] = useState(true);
    const [cityValue, setCityValue] = useState("Select a city");
    const [seatsValue, setSeatValue] = useState(1);
    const [seatsLabel, setSeatLabel] = useState("1 seat");
    const [isModalHidden, setIsModalHidden] = useState(true);
    const [selectedDay, setSelectedDay] = useState(null);
    const [tempSelectedDay, setTempSelectedDay] = useState(null);
    const [isSelectOrigin, setIsSelectOrigin] = useState(false);
    const [origin, setOrigin] = useState("select origin");
    const [toastMessage, setToastMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        const csrfToken = document.head.querySelector(
            'meta[name="csrf-token"]',
        ).content;

        console.log("City : ", cityValue);
        console.log("Origin : ", origin);
        console.log("Date/Time : ", selectedDay);
        console.log("Seats : ", seatsValue);

        try {
            const response = await axios.post(
                route("booking.store"),
                {
                    cityValue,
                    origin,
                    selectedDay,
                    seatsValue,
                },
                {
                    headers: {
                        "X-CSRF-TOKEN": csrfToken,
                    },
                },
            );

            if (response.status === 200) {
                window.location.href = route("schedule", cityValue);
            }
        } catch (error) {
            // Handle error
        }
    };

    const handleDaySelection = (day) => {
        setTempSelectedDay(day);
    };

    const handleConfirmSelection = () => {
        if (tempSelectedDay) {
            setSelectedDay(tempSelectedDay);
            setTempSelectedDay(null);
        }
    };

    function modalVisibility() {
        setIsModalHidden((prev) => !prev);
    }

    function showOptions(isOptionsHidden, setIsOptionsHidden) {
        setIsOptionsHidden(!isOptionsHidden);
    }

    function handleCityOptions(city) {
        setSelectedCity(city);
        setCityValue(city);
        setOrigin("select origin"); // Reset origin when city changes
        setIsCityOptionsHidden(true); // Hide city options after selection
    }

    function handleSeatsOptions(index) {
        setSeatValue(index + 1);
        setSeatLabel(numberOfSeatsOption[index]);
        setIsSeatsOptionHidden(true); // Hide seat options after selection
    }

    const handleOriginSelect = () => {
        // Only allow selecting origin if a city is selected
        if (cityValue !== "Select a city") {
            setIsSelectOrigin(true);
        } else {
            // Optionally, show an error or alert
            setToastMessage("Please select a city first");
        }
    };

    return (
        <>
            {!isSelectOrigin ? (
                <div className="lg:flex lg:justify-center">
                    <div className="min-h-screen bg-white lg:w-[400px]">
                        <div className="relative flex h-[108px] items-center justify-center rounded-b-lg bg-primary px-3">
                            <ArrowLeftIcon
                                onClick={() => (window.location.href = "/home")}
                                className="absolute left-3 top-1/2 z-50 size-8 translate-y-[-50%] cursor-pointer font-bold text-white"
                            ></ArrowLeftIcon>
                            <p className="mx-2 w-fit cursor-default select-none text-2xl font-medium text-white">
                                Booking
                            </p>
                        </div>
                        <div className="relative h-4/5 w-full select-none rounded-t-xl bg-white p-5">
                            {/* City Selection Dropdown */}
                            <form className=" ">
                                <div className="relative flex cursor-pointer items-center">
                                    <img
                                        src="/select-city.svg"
                                        className="size-[47px]"
                                    />
                                    <div
                                        onClick={() =>
                                            showOptions(
                                                isCityOptionsHidden,
                                                setIsCityOptionsHidden,
                                            )
                                        }
                                        className="mx-5 h-fit flex-1 border-b-2 border-black"
                                    >
                                        <div className="w-fit">
                                            <p className="w-fit text-lg font-medium">
                                                City
                                            </p>
                                        </div>
                                        <div className="flex flex-1 justify-between">
                                            <div className="absolute">
                                                {cityValue}
                                            </div>
                                            <input
                                                className={`w-0 border-none p-0 text-sm font-light ${
                                                    cityValue !==
                                                    "Select a city"
                                                        ? "text-black"
                                                        : "text-gray-400"
                                                }`}
                                                value={cityValue}
                                                disabled={true}
                                            />
                                            <div
                                                className={`right-5 top-5 cursor-pointer text-3xl font-bold transition-transform duration-300 ${
                                                    isCityOptionsHidden
                                                        ? "top-[44px]"
                                                        : "top-[44px] rotate-180"
                                                }`}
                                            >
                                                <img src="/expand-arrow.svg" />
                                            </div>
                                        </div>
                                        <div
                                            className={`duration-20 absolute left-16 top-16 z-50 h-fit w-[80%] rounded-[8px] border shadow-lg transition-transform ${
                                                isCityOptionsHidden
                                                    ? "pointer-events-none -translate-y-10 opacity-0"
                                                    : "bg-white opacity-100"
                                            }`}
                                        >
                                            {uniqueCities.map((city, index) => (
                                                <div
                                                    key={index}
                                                    onClick={() =>
                                                        handleCityOptions(city)
                                                    }
                                                    className={`w-full cursor-pointer border border-slate-400 px-2 py-2 text-xl font-normal hover:bg-slate-500 hover:text-white ${
                                                        index === 0
                                                            ? `rounded-t-[8px]`
                                                            : ""
                                                    } ${
                                                        index ===
                                                        uniqueCities.length - 1
                                                            ? `rounded-b-[8px]`
                                                            : ""
                                                    }`}
                                                >
                                                    {city}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                {/* Select Origin */}
                                <div
                                    className="relative mt-5 flex cursor-pointer items-center"
                                    onClick={handleOriginSelect}
                                >
                                    <img
                                        src="/select-origin.svg"
                                        className="size-[47px]"
                                    />
                                    <div className="relative mx-5 h-fit flex-1 border-b-2 border-black">
                                        <div className="w-fit">
                                            <p className="w-fit text-lg font-medium">
                                                Origin
                                            </p>
                                        </div>
                                        <div className="relative flex flex-1 justify-between">
                                            <p className="">{origin}</p>
                                            <input
                                                className="h-0 w-0 border-none text-sm font-light"
                                                value={origin}
                                                disabled={true}
                                            />
                                        </div>
                                        <div
                                            className={`absolute right-0 top-1/2 -translate-y-1/2 -rotate-90 cursor-pointer text-3xl font-bold transition-transform duration-300`}
                                        >
                                            <img src="/expand-arrow.svg" />
                                        </div>
                                    </div>
                                </div>
                                {/* Select Departure Date */}
                                <div
                                    className="relative mt-5 flex cursor-pointer items-center"
                                    onClick={modalVisibility}
                                >
                                    <img
                                        src="/select-date.svg"
                                        className="size-[47px]"
                                    />
                                    <div className="mx-5 h-fit flex-1 border-b-2 border-black">
                                        <div className="w-fit">
                                            <p className="w-fit text-lg font-medium">
                                                Departure Date
                                            </p>
                                        </div>
                                        <div className="flex flex-1 justify-between">
                                            <p>
                                                {selectedDay
                                                    ? format(
                                                          selectedDay,
                                                          "MMMM d, yyyy",
                                                      )
                                                    : "Select Date"}
                                            </p>
                                            <input
                                                className={`size-0 border p-0 text-lg font-light`}
                                                value={
                                                    selectedDay
                                                        ? format(
                                                              selectedDay,
                                                              "MMMM d, yyyy",
                                                          )
                                                        : "Select Date"
                                                }
                                                disabled={true}
                                            />
                                        </div>
                                        <div
                                            className={`absolute right-5 top-5 cursor-pointer text-3xl font-bold transition-transform duration-300`}
                                        >
                                            <img src="/calender-icon.svg" />
                                        </div>
                                    </div>
                                </div>
                                {/* Select Seats */}
                                <div
                                    className="relative mt-5 flex cursor-pointer items-center"
                                    onClick={() =>
                                        showOptions(
                                            isSeatsOptionsHidden,
                                            setIsSeatsOptionHidden,
                                        )
                                    }
                                >
                                    <img
                                        src="/select-seat.svg"
                                        className="size-[47px]"
                                    />
                                    <div className="mx-5 h-fit flex-1 border-b-2 border-black">
                                        <div className="w-fit">
                                            <p className="w-fit text-lg font-medium">
                                                Seats
                                            </p>
                                        </div>
                                        <div className="relative flex flex-1 justify-between">
                                            <p className="">{seatsLabel}</p>
                                            <input
                                                className={`size-0 border p-0 text-lg font-light`}
                                                value={seatsValue}
                                                disabled={true}
                                            />
                                        </div>
                                        <div
                                            className={`absolute right-5 top-5 cursor-pointer text-3xl font-bold transition-transform duration-300 ${
                                                isSeatsOptionsHidden
                                                    ? "top-5"
                                                    : "top-5 rotate-180"
                                            }`}
                                        >
                                            <img src="/expand-arrow.svg" />
                                        </div>
                                    </div>
                                    <div
                                        className={`duration-20 absolute left-16 top-16 z-50 h-fit w-[80%] rounded-[8px] border shadow-lg transition-transform ${
                                            isSeatsOptionsHidden
                                                ? "pointer-events-none -translate-y-10 opacity-0"
                                                : "bg-white opacity-100"
                                        }`}
                                    >
                                        {numberOfSeatsOption.map(
                                            (option, index) => (
                                                <div
                                                    key={index}
                                                    onClick={() =>
                                                        handleSeatsOptions(
                                                            index,
                                                        )
                                                    }
                                                    className={`w-full cursor-pointer border border-slate-400 px-2 py-2 text-xl font-normal hover:bg-slate-500 hover:text-white ${
                                                        index === 0
                                                            ? `rounded-t-[8px]`
                                                            : ""
                                                    } ${
                                                        index ===
                                                        numberOfSeatsOption.length -
                                                            1
                                                            ? `rounded-b-[8px]`
                                                            : ""
                                                    }`}
                                                >
                                                    {option}
                                                </div>
                                            ),
                                        )}
                                    </div>
                                </div>
                            </form>
                            <div className="relative top-48">
                                <ButtonComponent
                                    type=""
                                    buttonText={"Search"}
                                    onclick={handleSubmit}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <SelectOriginBooking
                    setIsSelectOrigin={setIsSelectOrigin}
                    setOrigin={setOrigin}
                    locations={filteredLocations} // Pass filtered locations
                />
            )}
            <ModalComponent
                setIsModalHidden={setIsModalHidden}
                isModalHidden={isModalHidden}
            >
                <div className="flex flex-col">
                    <CalendarComponent
                        selectedDay={selectedDay}
                        tempSelectedDay={tempSelectedDay}
                        onDaySelection={handleDaySelection}
                    />
                    <div className="h-fit w-full px-4 pb-5 md:p-5">
                        <ButtonComponent
                            buttonText={"Save"}
                            onclick={() => {
                                handleConfirmSelection();
                                modalVisibility();
                            }}
                        />
                    </div>
                </div>
            </ModalComponent>
            {toastMessage !== "" && (
                <div className="nowrap absolute left-1/2 top-5 flex h-fit w-fit items-center justify-center">
                    <ToastComponent
                        message={toastMessage}
                        onClose={() => setToastMessage("")}
                        type="alert"
                    />
                </div>
            )}
        </>
    );
};

export default Booking;
