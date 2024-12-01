import { useState, useEffect, useRef } from "react";
import { format } from "date-fns";
import { usePage } from "@inertiajs/react";
import { ChevronLeftIcon } from "@heroicons/react/24/solid";
import SelectOriginBooking from "./SelectOriginBooking";
import ButtonComponent from "@/Components/ButtonComponent";
import ModalComponent from "@/Components/ModalComponent";
import CalendarComponent from "@/Components/CalenderComponent";
// import OptionComponent from "@/Components/OptionComponent";
const Booking = () => {
    const { props } = usePage();
    const { location } = props;
    const cityOptions = ["Jakarta", "Bali", "Bandung", "Yogyakarta"];
    const numberOfSeatsOption = [
        "1 seat",
        "2 seats",
        "3 seats",
        "4 seats",
        "5 seats",
    ];
    const [isCityOptionsHidden, setIsCityOptionsHidden] = useState(true);
    const [isSeatsOptionsHidden, setIsSeatsOptionHidden] = useState(true);
    const [cityValue, setCityvalue] = useState("Select a city");
    const [seatsValue, setSeatValue] = useState(1);
    const [seatsLabel, setSeatLabel] = useState("1 seat");
    const [isModalHidden, setIsModalHidden] = useState(true);
    const [selectedDay, setSelectedDay] = useState(null); // state to hold the selected day
    const [tempSelectedDay, setTempSelectedDay] = useState(null);
    const [isSelectOrigin, setIsSelectOrigin] = useState(false);
    const [origin, setOrigin] = useState("select origin"); // Local state to temporarily store the selected day

    // Function to update the selected day
    const handleDaySelection = (day) => {
        setTempSelectedDay(day); // Store temporarily selected day
    };

    // Function to confirm the selected day
    const handleConfirmSelection = () => {
        if (tempSelectedDay) {
            setSelectedDay(tempSelectedDay); // Update the final selected day
            setTempSelectedDay(null); // Clear the temporary selection
        }
    };
    function modalVisibility() {
        setIsModalHidden((prev) => !prev);
    }
    function showOptions(isOptionsHidden, setIsOptionsHidden) {
        setIsOptionsHidden(!isOptionsHidden);
    }
    function handleCityOptions(
        index,
        isCityOptionsHidden,
        setIsCityOptionsHidden
    ) {
        let city = cityOptions[index];
        setCityvalue(city);
        setTimeout(() => {
            showOptions(isCityOptionsHidden, setIsCityOptionsHidden);
        }, 100);
    }
    function handleSeatsOptions(
        index,
        isSeatsOptionsHidden,
        setIsSeatsOptionHidden
    ) {
        setSeatValue(index + 1);
        setSeatLabel(numberOfSeatsOption[index]);
        setTimeout(() => {
            showOptions(isSeatsOptionsHidden, setIsSeatsOptionHidden);
        }, 100);
    }
    useEffect(() => {
        console.log(`ini bukan input ref ${cityValue}`);
        console.log(`seat value ${seatsValue}`);
        console.log(selectedDay);
    }, [cityValue, seatsValue, selectedDay]);
    return (
        <>
            {!isSelectOrigin ? (
                <div className="flex justify-center">
                    <div className="lg:w-[500px] w-full bg-primary">
                        <div className="h-[108px] flex items-center  justify-center relative px-3 ">
                            <ChevronLeftIcon className="size-6 text-white  font-bold absolute z-50 top-1/2 translate-y-[-50%] left-3"></ChevronLeftIcon>
                            <p className="w-fit text-2xl font-semibold  text-white mx-2">
                                Booking
                            </p>
                        </div>
                        <div className=" bg-white min-h-[100vh] w-full p-5">
                            {/* {// selection} */}
                            <form>
                                <div className="flex  relative items-center cursor-pointer">
                                    <img
                                        src="/select-city.svg"
                                        className="size-[47px]"
                                    />
                                    <div
                                        onClick={() =>
                                            showOptions(
                                                isCityOptionsHidden,
                                                setIsCityOptionsHidden
                                            )
                                        }
                                        className="flex-1 border-b-2  border-black h-fit mx-5"
                                    >
                                        <div className="w-fit">
                                            <p className="w-fit text-2xl font-bold">
                                                City
                                            </p>
                                        </div>
                                        <div className="flex-1 flex justify-between">
                                            <input
                                                className={`border-none text-lg font-light p-0 ${
                                                    cityValue !==
                                                    "Select a city"
                                                        ? "text-black"
                                                        : "text-gray-400"
                                                }`}
                                                value={cityValue}
                                                disabled={true}
                                                onChange={(e) =>
                                                    setCityvalue(e.target.value)
                                                }
                                            ></input>
                                            <div
                                                className={`text-3xl transition-transform duration-300 font-bold cursor-pointer  left-[424px] ${
                                                    isCityOptionsHidden
                                                        ? "top-[44px]"
                                                        : "top-[44px] rotate-180"
                                                }`}
                                            >
                                                <img src="/expand-arrow.svg" />
                                            </div>
                                        </div>
                                        <div
                                            className={`w-[80%]  h-fit transition-transform border duration-20 absolute top-16 left-16 shadow-lg rounded-[8px] z-50  ${
                                                isCityOptionsHidden
                                                    ? "opacity-0 pointer-events-none -translate-y-10 "
                                                    : "bg-white  opacity-100 "
                                            }`}
                                        >
                                            {cityOptions.map(
                                                (option, index) => (
                                                    <div
                                                        key={index}
                                                        onClick={() =>
                                                            handleCityOptions(
                                                                index,
                                                                isCityOptionsHidden,
                                                                setIsCityOptionsHidden
                                                            )
                                                        }
                                                        className={`hover:text-white font-semibold text-xl w-full px-2 py-2 border border-slate-400 cursor-pointer hover:bg-slate-500 ${
                                                            index === 0
                                                                ? `rounded-t-[8px]`
                                                                : " "
                                                        } ${
                                                            index ===
                                                            cityOptions.length -
                                                                1
                                                                ? `rounded-b-[8px]`
                                                                : ""
                                                        }`}
                                                    >
                                                        {option}
                                                    </div>
                                                )
                                            )}
                                        </div>
                                    </div>
                                </div>
                                {/* select origin*/}
                                <div
                                    className="flex mt-5  relative items-center cursor-pointer"
                                    onClick={() => {
                                        setIsSelectOrigin(true);
                                    }}
                                >
                                    <img
                                        src="/select-origin.svg"
                                        className="size-[47px]"
                                    />
                                    <div className="flex-1 border-b-2  border-black h-fit mx-5">
                                        <div className="w-fit">
                                            <p className="w-fit text-2xl font-bold">
                                                Origin
                                            </p>
                                        </div>
                                        <div className="flex-1 flex justify-between">
                                            <input
                                                className=" border-none text-lg font-light p-0 w-full "
                                                value={origin}
                                                disabled={true}
                                                onChange={(e) =>
                                                    setCityvalue(e.target.value)
                                                }
                                            ></input>
                                        </div>
                                        <div
                                            className={`text-3xl transition-transform duration-300 font-bold cursor-pointer absolute top-4 right-5 -rotate-90`}
                                        >
                                            <img src="/expand-arrow.svg" />
                                        </div>
                                    </div>
                                </div>
                                {/* select departuredate*/}
                                <div
                                    className="flex mt-5  relative items-center cursor-pointer "
                                    onClick={() => modalVisibility()}
                                >
                                    <img
                                        src="/select-date.svg"
                                        className="size-[47px]"
                                    />
                                    <div
                                        onClick={() => {
                                            console.log("blink-blink");
                                        }}
                                        className="flex-1 border-b-2  border-black h-fit mx-5"
                                    >
                                        <div className="w-fit">
                                            <p className="w-fit text-2xl font-bold">
                                                Departure Date
                                            </p>
                                        </div>
                                        <div className="flex-1 flex justify-between">
                                            <input
                                                className={`border-none text-lg font-light p-0 ${
                                                    cityValue !==
                                                    "select a city"
                                                        ? "text-black"
                                                        : "text-gray-400"
                                                }`}
                                                value={
                                                    selectedDay
                                                        ? format(
                                                              selectedDay,
                                                              "MMMM d, yyyy"
                                                          ) // Format date as "Month Day, Year"
                                                        : "None"
                                                }
                                                disabled={true}
                                                onChange={(e) =>
                                                    setCityvalue(e.target.value)
                                                }
                                            ></input>
                                        </div>
                                        <div
                                            className={`text-3xl transition-transform duration-300 font-bold cursor-pointer absolute top-5 right-5 `}
                                        >
                                            <img src="/calender-icon.svg" />
                                        </div>
                                    </div>
                                </div>
                                {/* select seat  */}
                                <div
                                    className="flex mt-5  relative items-center cursor-pointer"
                                    onClick={() => {
                                        showOptions(
                                            isSeatsOptionsHidden,
                                            setIsSeatsOptionHidden
                                        );
                                    }}
                                >
                                    <img
                                        src="/select-seat.svg"
                                        className="size-[47px]"
                                    />
                                    <div className="flex-1 border-b-2  border-black h-fit mx-5">
                                        <div className="w-fit">
                                            <p className="w-fit text-2xl font-bold">
                                                Seats
                                            </p>
                                        </div>
                                        <div className="flex-1 flex justify-between relative">
                                            <div className="absolute">
                                                {seatsLabel}
                                            </div>
                                            <input
                                                className={`border-none text-lg font-light p-0 opacity-0 }`}
                                                value={seatsValue}
                                                disabled={true}
                                                onChange={(e) =>
                                                    setSeatValue(e.target.value)
                                                }
                                            ></input>
                                        </div>
                                        <div
                                            className={`text-3xl transition-transform duration-300 font-bold cursor-pointer absolute top-5 right-5 ${
                                                isSeatsOptionsHidden
                                                    ? "top-5"
                                                    : "top-5 rotate-180"
                                            }`}
                                        >
                                            <img src="/expand-arrow.svg" />
                                        </div>
                                        <div
                                            className={`w-[80%]  h-fit transition-transform border duration-20 absolute top-16 left-16 shadow-lg rounded-[8px] z-50  ${
                                                isSeatsOptionsHidden
                                                    ? "opacity-0 pointer-events-none -translate-y-10 "
                                                    : "bg-white  opacity-100 "
                                            }`}
                                        >
                                            {numberOfSeatsOption.map(
                                                (option, index) => (
                                                    <div
                                                        key={index}
                                                        onClick={() =>
                                                            handleSeatsOptions(
                                                                index,
                                                                isSeatsOptionsHidden,
                                                                setIsSeatsOptionHidden
                                                            )
                                                        }
                                                        className={`hover:text-white font-semibold text-xl w-full px-2 py-2 border border-slate-400 cursor-pointer hover:bg-slate-500 ${
                                                            index === 0
                                                                ? `rounded-t-[8px]`
                                                                : " "
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
                                                )
                                            )}
                                        </div>
                                    </div>
                                </div>
                                {/* <div className="p-5 w-full h-12 bg-red-400 cursor-pointer">
                                {" "}
                            </div> */}
                            </form>
                            <div className="mt-80">
                                <ButtonComponent
                                    type="submit"
                                    buttonText={"Search"}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <SelectOriginBooking
                    setIsSelectOrigin={setIsSelectOrigin}
                    setOrigin={setOrigin}
                />
            )}
            <ModalComponent
                setIsModalHidden={setIsModalHidden}
                isModalHidden={isModalHidden}
            >
                <div className="flex flex-col px-5">
                    {/* <h1>
                        Selected Day:{" "}
                        {selectedDay
                            ? format(selectedDay, "MMMM d, yyyy") // Format date as "Month Day, Year"
                            : "None"}
                    </h1> */}
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
