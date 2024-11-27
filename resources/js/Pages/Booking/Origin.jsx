import InputRow from "@/Components/InputRow";
import BookingLayout from "@/Layouts/BookingLayout";
import useBookingStore from "@/Store/bookingStore";
import { Link, router, usePage } from "@inertiajs/react";
import { useState } from "react";
import LocationNotFound from "@/Components/LocationNotFound";

const OriginPage = () => {
    const { origin, setOrigin } = useBookingStore()
    const { locations } = usePage().props;

    const [search, setSearch] = useState('')

    const mappedLocation = locations.filter((item) => item.city.toLocaleLowerCase().search(search.toLocaleLowerCase()) != -1 || item.station.toLocaleLowerCase().search(search.toLocaleLowerCase()) != -1)

    const selectOrigin = (item) => {
        setOrigin(item.station)
        router.visit('/booking')
    }

    return (
        <BookingLayout>
            <header>
                <div className="flex flex-row items-center justify-between w-full min-h-full pb-2 pt-8 bg-[#49ABFF] px-4">
                    <Link href="/booking">
                        <svg width="46" height="46" viewBox="0 0 46 46" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M25.0016 16.7181C25.3754 16.3269 26 16.3269 26.3738 16.7181C26.7242 17.0849 26.7242 17.6623 26.3738 18.029L21.6246 23L26.3738 27.971C26.7242 28.3377 26.7242 28.9152 26.3738 29.2819C26 29.6731 25.3754 29.6731 25.0016 29.2819L19 23L25.0016 16.7181Z" fill="white" />
                        </svg>
                    </Link>
                    <div className="relative w-full">
                        <svg className="absolute inset-2" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M19.6 21L13.3 14.7C12.8 15.1 12.225 15.4167 11.575 15.65C10.925 15.8833 10.2333 16 9.5 16C7.68333 16 6.14583 15.3708 4.8875 14.1125C3.62917 12.8542 3 11.3167 3 9.5C3 7.68333 3.62917 6.14583 4.8875 4.8875C6.14583 3.62917 7.68333 3 9.5 3C11.3167 3 12.8542 3.62917 14.1125 4.8875C15.3708 6.14583 16 7.68333 16 9.5C16 10.2333 15.8833 10.925 15.65 11.575C15.4167 12.225 15.1 12.8 14.7 13.3L21 19.6L19.6 21ZM9.5 14C10.75 14 11.8125 13.5625 12.6875 12.6875C13.5625 11.8125 14 10.75 14 9.5C14 8.25 13.5625 7.1875 12.6875 6.3125C11.8125 5.4375 10.75 5 9.5 5C8.25 5 7.1875 5.4375 6.3125 6.3125C5.4375 7.1875 5 8.25 5 9.5C5 10.75 5.4375 11.8125 6.3125 12.6875C7.1875 13.5625 8.25 14 9.5 14Z" fill="#1D1B20" />
                        </svg>

                        <input type="text" placeholder="Search" onChange={e => setSearch(e.target.value)} className="font-[Poppins] w-full mr-3 pl-10 rounded-xl p-2 outline-none border-[#C4C4C4]" />
                    </div>
                </div>
            </header>
            <section className="flex flex-col w-full h-[calc(100dvh-140px)] overflow-y-auto p-4 ">
                {mappedLocation.length < 1 ?
                    <LocationNotFound /> :
                    mappedLocation.map((item, index) => (
                        <InputRow key={index}>
                            <div className="flex flex-col w-full cursor-pointer" onClick={() => selectOrigin(item)}>
                                <h3 className="font-light text-[14px] font-[Poppins]">{item.city}</h3>
                                <h3 className="font-medium text-[16px] font-[Poppins]">{item.station}</h3>
                            </div>
                        </InputRow>
                    ))
                }
            </section>
        </BookingLayout>
    )
}

export default OriginPage