import { useState, useEffect } from "react";
import { format } from "date-fns";
import { usePage } from "@inertiajs/react";
import { ChevronLeftIcon } from "@heroicons/react/24/solid";
import SelectOriginBooking from "./SelectOriginBooking";
import ButtonComponent from "@/Components/ButtonComponent";
import ModalComponent from "@/Components/ModalComponent";
import CalendarComponent from "@/Components/CalenderComponent";
import axios from "axios";

const Booking = () => {
    const { props } = usePage();
    const { location, driver, routes } = props;
    const [locations, setLocations] = useState(location); // Initialize locations with the provided locations
    const [selectedCity, setSelectedCity] = useState("");
    const uniqueCities = [...new Set(locations.map(loc => loc.city))]; // Get unique cities
    const filteredLocations = selectedCity 
        ? locations.filter(loc => loc.city === selectedCity) 
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        const csrfToken = document.head.querySelector('meta[name="csrf-token"]').content;

        console.log("City : ", cityValue);
        console.log("Origin : ", origin);
        console.log("Date/Time : ", selectedDay);
        console.log("Seats : ", seatsValue);

        try {
            const response = await axios.post(route('booking.store'), {
                cityValue,
                origin,
                selectedDay,
                seatsValue,
            }, {
                headers: {
                    'X-CSRF-TOKEN': csrfToken,
                }
            });

            if(response.status === 200){
                window.location.href = route('schedule', cityValue);
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
        setIsCityOptionsHidden(true); // Hide city options after selection
    }

    function handleSeatsOptions(index) {
        setSeatValue(index + 1);
        setSeatLabel(numberOfSeatsOption[index]);
        setIsSeatsOptionHidden(true); // Hide seat options after selection
    }

    return (
        <>
            {!isSelectOrigin ? (
                <div className="flex justify-center">
                    <div className="lg:w-[500px] w-full bg-primary">
                        <div className="h-[108px] flex items-center justify-center relative px-3 ">
                            <ChevronLeftIcon className="size-6 text-white font-bold absolute z-50 top-1/2 translate-y-[-50%] left-3"></ChevronLeftIcon>
                            <p className="w-fit text-2xl font-semibold text-white mx-2">
                                Booking
                            </p>
                        </div>
                        <div className="bg-white min-h-[100vh] w-full p-5">
                            {/* City Selection Dropdown */}
                            <form>
                                <div className="flex relative items-center cursor-pointer">
                                    <img src="/select-city.svg" className="size-[47px]" />
                                    <div
                                        onClick={() => showOptions(isCityOptionsHidden, setIsCityOptionsHidden)}
                                        className="flex-1 border-b-2 border-black h-fit mx-5"
                                    >
                                        <div className="w-fit">
                                            <p className="w-fit text-2xl font-bold">City</p>
                                        </div>
                                        <div className="flex-1 flex justify-between">
                                            <input
                                                className={`border-none text-lg font-light p-0 ${cityValue !== "Select a city" ? "text-black" : "text-gray-400"}`}
                                                value={cityValue}
                                                disabled={true}
                                            />
                                            <div className={`text-3xl transition-transform duration-300 font-bold cursor-pointer left-[424px] ${isCityOptionsHidden ? "top-[44px]" : "top-[44px] rotate-180"}`}>
                                                <img src="/expand-arrow.svg" />
                                            </div>
                                        </div>
                                        <div className={`w-[80%] h-fit transition-transform border duration-20 absolute top-16 left-16 shadow-lg rounded-[8px] z-50 ${isCityOptionsHidden ? "opacity-0 pointer-events-none -translate-y-10" : "bg-white opacity-100"}`}>
                                            {uniqueCities.map((city, index) => (
                                                <div
                                                    key={index}
                                                    onClick={() => handleCityOptions(city)}
                                                    className={`hover:text-white font-semibold text-xl w-full px-2 py-2 border border-slate-400 cursor-pointer hover:bg-slate-500 ${index === 0 ? `rounded-t-[8px]` : ""} ${index === uniqueCities.length - 1 ? `rounded-b-[8px]` : ""}`}
                                                >
                                                    {city}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                {/* Select Origin */}
                                <div className="flex mt-5 relative items-center cursor-pointer" onClick={() => setIsSelectOrigin(true)}>
                                    <img src="/select-origin.svg" className="size-[47px]" />
                                    <div className="flex-1 border-b-2 border-black h-fit mx-5">
                                        <div className="w-fit">
                                            <p className="w-fit text-2xl font-bold">Origin</p>
                                        </div>
                                        <div className="flex-1 flex justify-between">
                                            <input className="border-none text-lg font-light p-0 w-full" value={origin} disabled={true} />
                                        </div>
                                        <div className={`text-3xl transition-transform duration-300 font-bold cursor-pointer absolute top-4 right-5 -rotate-90`}>
                                            <img src="/expand-arrow.svg" />
                                        </div>
                                    </div>
                                </div>
                                {/* Select Departure Date */}
                                <div className="flex mt-5 relative items-center cursor-pointer" onClick={modalVisibility}>
                                    <img src="/select-date.svg" className="size-[47px]" />
                                    <div className="flex-1 border-b-2 border-black h-fit mx-5">
                                        <div className="w-fit">
                                            <p className="w-fit text-2xl font-bold">Departure Date</p>
                                        </div>
                                        <div className="flex-1 flex justify-between">
                                            <input
                                                className={`border-none text-lg font-light p-0 ${selectedDay ? "text-black" : "text-gray-400"}`}
                                                value={selectedDay ? format(selectedDay, "MMMM d, yyyy") : "None"}
                                                disabled={true}
                                            />
                                        </div>
                                        <div className={`text-3xl transition-transform duration-300 font-bold cursor-pointer absolute top-5 right-5`}>
                                            <img src="/calender-icon.svg" />
                                        </div>
                                    </div>
                                </div>
                                {/* Select Seats */}
                                <div className="flex mt-5 relative items-center cursor-pointer" onClick={() => showOptions(isSeatsOptionsHidden, setIsSeatsOptionHidden)}>
                                    <img src="/select-seat.svg" className="size-[47px]" />
                                    <div className="flex-1 border-b-2 border-black h-fit mx-5">
                                        <div className="w-fit">
                                            <p className="w-fit text-2xl font-bold">Seats</p>
                                        </div>
                                        <div className="flex-1 flex justify-between relative">
                                            <div className="absolute">{seatsLabel}</div>
                                            <input className={`border-none text-lg font-light p-0 opacity-0`} value={seatsValue} disabled={true} />
                                        </div>
                                        <div
                                        className={`text-3xl transition-transform duration-300 font-bold cursor-pointer absolute top-5 right-5 ${isSeatsOptionsHidden ? "top-5" : "top-5 rotate-180"}`}
                                    >
                                        <img src="/expand-arrow.svg" />
                                        </div>
                                    </div>
                                    <div className={`w-[80%] h-fit transition-transform border duration-20 absolute top-16 left-16 shadow-lg rounded-[8px] z-50 ${isSeatsOptionsHidden ? "opacity-0 pointer-events-none -translate-y-10" : "bg-white opacity-100"}`}>
                                        {numberOfSeatsOption.map((option, index) => (
                                            <div
                                                key={index}
                                                onClick={() => handleSeatsOptions(index)}
                                                className={`hover:text-white font-semibold text-xl w-full px-2 py-2 border border-slate-400 cursor-pointer hover:bg-slate-500 ${index === 0 ? `rounded-t-[8px]` : ""} ${index === numberOfSeatsOption.length - 1 ? `rounded-b-[8px]` : ""}`}
                                            >
                                                {option}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </form>
                            <div className="mt-80">
                                <ButtonComponent type="submit" buttonText={"Search"} onclick={handleSubmit}/>
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
            <ModalComponent setIsModalHidden={setIsModalHidden} isModalHidden={isModalHidden}>
                <div className="flex flex-col px-5">
                    <CalendarComponent
                        selectedDay={selectedDay}
                        tempSelectedDay={tempSelectedDay}
                        onDaySelection={handleDaySelection}
                    />
                    <div className="w-full h-fit p-4">
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
        </>
    );
};

export default Booking;