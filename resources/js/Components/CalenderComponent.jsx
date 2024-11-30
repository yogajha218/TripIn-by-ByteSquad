import { useState } from "react";
import {
    startOfToday,
    format,
    parse,
    endOfMonth,
    eachDayOfInterval,
    add,
    getDay,
    isEqual,
    isToday,
    isSameMonth,
} from "date-fns";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/solid";

export default function CalendarComponent() {
    const today = startOfToday();
    const [selectedDay, setSelectedDay] = useState(today);
    const [currentMonth, setCurrentMonth] = useState(format(today, "MMM-yyyy"));
    const firstDayCurrentMonth = parse(currentMonth, "MMM-yyyy", new Date());

    const days = eachDayOfInterval({
        start: firstDayCurrentMonth,
        end: endOfMonth(firstDayCurrentMonth),
    });

    const colStartClasses = [
        "",
        "col-start-2",
        "col-start-3",
        "col-start-4",
        "col-start-5",
        "col-start-6",
        "col-start-7",
    ];

    function previousMonth() {
        const firstDayNextMonth = add(firstDayCurrentMonth, { months: -1 });
        setCurrentMonth(format(firstDayNextMonth, "MMM-yyyy"));
    }

    function nextMonth() {
        const firstDayNextMonth = add(firstDayCurrentMonth, { months: 1 });
        setCurrentMonth(format(firstDayNextMonth, "MMM-yyyy"));
    }

    function classNames(...classes) {
        return classes.filter(Boolean).join(" ");
    }

    return (
        <div className="pt-16">
            <div className="max-w-md px-4 mx-auto sm:px-7 md:max-w-4xl md:px-6">
                <div className="flex items-center justify-between">
                    <h2 className="font-semibold text-gray-900">
                        {format(firstDayCurrentMonth, "MMMM yyyy")}
                    </h2>
                    <div className="flex space-x-2">
                        <button
                            type="button"
                            onClick={previousMonth}
                            className="p-1 text-gray-400 hover:text-gray-500"
                        >
                            <ChevronLeftIcon
                                className="w-5 h-5"
                                aria-hidden="true"
                            />
                        </button>
                        <button
                            type="button"
                            onClick={nextMonth}
                            className="p-1 text-gray-400 hover:text-gray-500"
                        >
                            <ChevronRightIcon
                                className="w-5 h-5"
                                aria-hidden="true"
                            />
                        </button>
                    </div>
                </div>
                <div className="grid grid-cols-7 mt-10 text-xs leading-6 text-center text-gray-500">
                    <div>S</div>
                    <div>M</div>
                    <div>T</div>
                    <div>W</div>
                    <div>T</div>
                    <div>F</div>
                    <div>S</div>
                </div>
                <div className="grid grid-cols-7 mt-2 text-sm">
                    {days.map((day, dayIdx) => (
                        <div
                            key={day.toString()}
                            className={classNames(
                                dayIdx === 0 && colStartClasses[getDay(day)],
                                "py-1.5"
                            )}
                        >
                            <button
                                type="button"
                                onClick={() => setSelectedDay(day)}
                                className={classNames(
                                    isEqual(day, selectedDay) && "text-white",
                                    !isEqual(day, selectedDay) &&
                                        isToday(day) &&
                                        "text-red-500",
                                    !isEqual(day, selectedDay) &&
                                        !isToday(day) &&
                                        isSameMonth(
                                            day,
                                            firstDayCurrentMonth
                                        ) &&
                                        "text-gray-900",
                                    !isEqual(day, selectedDay) &&
                                        !isToday(day) &&
                                        !isSameMonth(
                                            day,
                                            firstDayCurrentMonth
                                        ) &&
                                        "text-gray-400",
                                    isEqual(day, selectedDay) &&
                                        isToday(day) &&
                                        "bg-red-500",
                                    isEqual(day, selectedDay) &&
                                        !isToday(day) &&
                                        "bg-gray-900",
                                    !isEqual(day, selectedDay) &&
                                        "hover:bg-gray-200",
                                    "mx-auto flex h-8 w-8 items-center justify-center rounded-full font-semibold"
                                )}
                            >
                                <time dateTime={format(day, "yyyy-MM-dd")}>
                                    {format(day, "d")}
                                </time>
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
