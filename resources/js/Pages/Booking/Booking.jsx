import useModal from "@/Hooks/useModal";
import InputRow from "@/Components/InputRow";
import BookingLayout from "@/Layouts/BookingLayout";
import { useContext } from "react";
import { ModalContext } from "@/Contexts/ModalContext";
import DepartureDateModal from "@/Modals/DepartureDate";
import useBookingStore from "@/Store/bookingStore";
import PassengerModal from "@/Modals/Passenger";
import { Link } from "@inertiajs/react";

const Booking = () => {
    const { showModal } = useContext(ModalContext)
    const { origin, destination, date, passenger, setOrigin, setDestination } = useBookingStore()

    const switchLocation = () => {
        const tempOrigin = origin
        setOrigin(destination)
        setDestination(tempOrigin)
    }
    return (
        <BookingLayout>
            <header>
                <div className="flex flex-row items-center justify-between w-full py-6 bg-[#49ABFF] px-4">
                    <svg width="46" height="46" viewBox="0 0 46 46" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M25.0016 16.7181C25.3754 16.3269 26 16.3269 26.3738 16.7181C26.7242 17.0849 26.7242 17.6623 26.3738 18.029L21.6246 23L26.3738 27.971C26.7242 28.3377 26.7242 28.9152 26.3738 29.2819C26 29.6731 25.3754 29.6731 25.0016 29.2819L19 23L25.0016 16.7181Z" fill="white" />
                    </svg>
                    <h1 className="font-[Poppins] font-bold text-white text-[1.75rem]">Booking</h1>
                    <div className="w-[46px]"></div>
                </div>
            </header>
            <section className="flex flex-col w-full h-[calc(100dvh-140px)] overflow-y-auto p-4 ">
                <div className="flex flex-col flex-grow">
                    <InputRow>
                        <Link href="/booking/origin" className="flex flex-row w-full cursor-pointer">
                            <svg width="47" height="47" viewBox="0 0 47 47" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M23.3553 35.033C23.3553 28.5908 28.5907 23.3553 35.0329 23.3553C37.1543 23.3553 39.159 23.9392 40.8717 24.9318V23.3553L36.8235 11.6777C36.4342 10.5489 35.3443 9.73145 34.0597 9.73145H12.6508C11.3662 9.73145 10.2763 10.5489 9.88705 11.6777L5.83881 23.3553V38.9255C5.83881 39.996 6.71463 40.8718 7.78508 40.8718H9.73135C10.8018 40.8718 11.6776 39.996 11.6776 38.9255V36.9793H23.5304C23.4331 36.337 23.3553 35.6947 23.3553 35.033ZM12.6508 12.6509H34.0597L36.9792 21.4091H9.73135L12.6508 12.6509ZM12.6508 31.1404C11.0354 31.1404 9.73135 29.8364 9.73135 28.221C9.73135 26.6056 11.0354 25.3016 12.6508 25.3016C14.2662 25.3016 15.5702 26.6056 15.5702 28.221C15.5702 29.8364 14.2662 31.1404 12.6508 31.1404ZM36.9792 40.8718V36.9793H29.1941V33.0867H36.9792V29.1942L42.818 35.033L36.9792 40.8718Z" fill="black" />
                            </svg>
                            <div className="flex flex-col ml-2 justify-center">
                                <h3 className="font-light text-[14px] font-[Poppins]">Origin</h3>
                                <h3 className="font-medium text-[16px] font-[Poppins]">{origin ?? 'Origin'}</h3>
                            </div>
                        </Link>
                    </InputRow>
                    <div className="relative w-full">
                        <div onClick={switchLocation} className="cursor-pointer text-black bg-[#f1f1f1] absolute w-[54px] h-[54px] -top-[27px] right-0">
                            <svg width="54" height="54" viewBox="0 0 54 54" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M26.6918 48.9349C38.9764 48.9349 48.9349 38.9764 48.9349 26.6918C48.9349 14.4073 38.9764 4.44873 26.6918 4.44873C14.4073 4.44873 4.44873 14.4073 4.44873 26.6918C4.44873 38.9764 14.4073 48.9349 26.6918 48.9349Z" stroke="#C4C4C4" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M20.6861 18.9067V34.4769M20.6861 18.9067C19.0958 18.9067 16.6824 22.7993 16.6824 22.7993M20.6861 18.9067C22.252 18.9067 24.6899 22.7993 24.6899 22.7993M32.6974 34.4769V18.9067M32.6974 34.4769C31.1315 34.4769 28.6936 30.5844 28.6936 30.5844M32.6974 34.4769C34.2633 34.4769 36.7012 30.5844 36.7012 30.5844" stroke="#C4C4C4" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                        </div>
                    </div>
                    <InputRow>
                        <Link href="/booking/destination" className="flex flex-row w-full cursor-pointer">
                            <svg width="47" height="47" viewBox="0 0 47 47" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M23.3553 35.033C23.3553 28.5908 28.5907 23.3553 35.0329 23.3553C37.1543 23.3553 39.159 23.9392 40.8717 24.9318V23.3553L36.8235 11.6777C36.4342 10.5489 35.3443 9.73145 34.0597 9.73145H12.6508C11.3662 9.73145 10.2763 10.5489 9.88705 11.6777L5.83881 23.3553V38.9255C5.83881 39.996 6.71463 40.8718 7.78508 40.8718H9.73135C10.8018 40.8718 11.6776 39.996 11.6776 38.9255V36.9793H23.5304C23.4331 36.337 23.3553 35.6947 23.3553 35.033ZM12.6508 12.6509H34.0597L36.9792 21.4091H9.73135L12.6508 12.6509ZM12.6508 31.1404C11.0354 31.1404 9.73135 29.8364 9.73135 28.221C9.73135 26.6056 11.0354 25.3016 12.6508 25.3016C14.2662 25.3016 15.5702 26.6056 15.5702 28.221C15.5702 29.8364 14.2662 31.1404 12.6508 31.1404ZM35.0329 29.1942V33.0867H42.818V36.9793H35.0329V40.8718L29.1941 35.033L35.0329 29.1942Z" fill="black" />
                            </svg>
                            <div className="flex flex-col ml-2 justify-center">
                                <h3 className="font-light text-[14px] font-[Poppins]">Destination</h3>
                                <h3 className="font-medium text-[16px] font-[Poppins]">{destination ?? 'Destination'}</h3>
                            </div>
                        </Link>
                    </InputRow>
                    <InputRow>
                        <div onClick={() => showModal(<DepartureDateModal />)} className="flex flex-row w-full cursor-pointer">
                            <svg width="46" height="46" viewBox="0 0 46 46" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M39.7039 22.0011C40.5902 22.6067 41.3804 23.2936 42.0747 24.0617C42.7689 24.8297 43.3671 25.6717 43.8693 26.5875C44.3715 27.5033 44.7408 28.4707 44.9771 29.4899C45.2135 30.5091 45.3464 31.5505 45.3759 32.614C45.3759 34.3717 45.0436 36.026 44.3789 37.5769C43.7142 39.1279 42.7984 40.4794 41.6315 41.6315C40.4646 42.7837 39.1131 43.6921 37.577 44.3568C36.0408 45.0214 34.3865 45.3612 32.614 45.3759C31.2698 45.3759 29.97 45.1765 28.7145 44.7777C27.4589 44.3789 26.3068 43.8028 25.2581 43.0495C24.2094 42.2962 23.2788 41.3952 22.4664 40.3465C21.654 39.2977 21.0263 38.1382 20.5831 36.8679H2.836V2.836H8.50799V0H11.344V2.836H31.196V0H34.032V2.836H39.7039V22.0011ZM5.67199 5.67199V11.344H36.868V5.67199H34.032V8.50799H31.196V5.67199H11.344V8.50799H8.50799V5.67199H5.67199ZM19.9184 34.032C19.8741 33.5741 19.852 33.1014 19.852 32.614C19.852 30.8562 20.1843 29.2019 20.849 27.651C21.5137 26.1 22.4295 24.7485 23.5964 23.5964C24.7633 22.4443 26.1148 21.5358 27.651 20.8712C29.1871 20.2065 30.8415 19.8667 32.614 19.852C34.091 19.852 35.509 20.0957 36.868 20.5831V14.18H5.67199V34.032H19.9184ZM32.614 42.5399C33.9876 42.5399 35.2727 42.2815 36.4691 41.7645C37.6656 41.2475 38.7143 40.5385 39.6153 39.6375C40.5163 38.7365 41.2253 37.6877 41.7423 36.4913C42.2593 35.2949 42.5252 34.0024 42.5399 32.614C42.5399 31.2403 42.2815 29.9552 41.7645 28.7588C41.2475 27.5623 40.5385 26.5136 39.6375 25.6126C38.7365 24.7116 37.6877 24.0026 36.4913 23.4856C35.2949 22.9686 34.0024 22.7027 32.614 22.688C31.2403 22.688 29.9552 22.9465 28.7588 23.4634C27.5623 23.9804 26.5136 24.6894 25.6126 25.5904C24.7116 26.4915 24.0026 27.5402 23.4856 28.7366C22.9686 29.9331 22.7027 31.2255 22.688 32.614C22.688 33.9876 22.9465 35.2727 23.4634 36.4691C23.9804 37.6656 24.6894 38.7143 25.5904 39.6153C26.4915 40.5163 27.5402 41.2253 28.7366 41.7423C29.9331 42.2593 31.2255 42.5252 32.614 42.5399ZM34.032 31.196H38.286V34.032H31.196V25.524H34.032V31.196Z" fill="black" />
                            </svg>
                            <div className="flex flex-col ml-2 justify-center">
                                <h3 className="font-light text-[14px] font-[Poppins]">Departure Date</h3>
                                <h3 className="font-medium text-[16px] font-[Poppins]">{date ?? 'Departure Date'}</h3>
                            </div>
                        </div>
                    </InputRow>
                    <InputRow>
                        <div onClick={() => showModal(<PassengerModal />)} className="flex flex-row w-full cursor-pointer">
                            <svg width="47" height="47" viewBox="0 0 47 47" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M17.5165 36.9792H29.1941V40.8717H17.5165C12.1447 40.8717 7.7851 36.5121 7.7851 31.1404V13.6239H11.6776V31.1404C11.6776 34.3712 14.2856 36.9792 17.5165 36.9792ZM20.2802 10.5293C21.7983 9.01124 21.7983 6.53947 20.2802 5.02138C18.7621 3.50329 16.2903 3.50329 14.7722 5.02138C13.2541 6.53947 13.2541 9.01124 14.7722 10.5293C16.2903 12.0669 18.7426 12.0669 20.2802 10.5293ZM22.3821 17.5164C22.3821 15.3755 20.6305 13.6239 18.4896 13.6239H17.5165C15.3756 13.6239 13.6239 15.3755 13.6239 17.5164V29.1941C13.6239 32.4249 16.2319 35.0329 19.4627 35.0329H29.3303L36.1423 41.8448L38.9254 39.0617L29.0578 29.1941H22.3821V17.5164Z" fill="black" />
                            </svg>
                            <div className="flex flex-col ml-2 justify-center">
                                <h3 className="font-light text-[14px] font-[Poppins]">Passenger</h3>
                                <h3 className="font-medium text-[16px] font-[Poppins]">{passenger ?? ''} Passenger</h3>
                            </div>
                        </div>
                    </InputRow>
                </div>
                <div className="w-full">
                    <button className="w-full rounded-xl text-white p-2 font-[Poppins] bg-[#394867] text-[16px] font-semibold">SEARCH TICKETS</button>
                </div>
            </section>
        </BookingLayout>
    )
}

export default Booking