import useModal from "@/Hooks/useModal";
import useBookingStore from "@/Store/bookingStore";
import 'react-calendar/dist/Calendar.css';

const PassengerModal = () => {
    const { passenger, setPassenger } = useBookingStore()
    const { hideModal } = useModal()

    const decreasePassenger = () => {
        if (passenger > 0)
            setPassenger(passenger - 1)
    }

    const increasePassenger = () => {
        setPassenger(passenger + 1)
    }

    return (
        <div className="flex flex-col bg-white p-4 rounded-xl w-[90%] md:w-96 h-fit">
            <h3 className="font-[Poppins] text-[14px] font-light">Passenger</h3>
            <div className="flex flex-row justify-between">
                <h1 className="font-[Poppins] text-[16px] font-medium">Add Seats</h1>
                <div className="flex flex-row">
                    <svg className="cursor-pointer" onClick={decreasePassenger} width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clip-path="url(#clip0_1_46541)">
                            <path d="M6.66663 10.0001H13.3333M18.3333 10.0001C18.3333 14.6025 14.6023 18.3334 9.99996 18.3334C5.39759 18.3334 1.66663 14.6025 1.66663 10.0001C1.66663 5.39771 5.39759 1.66675 9.99996 1.66675C14.6023 1.66675 18.3333 5.39771 18.3333 10.0001Z" stroke="#1E1E1E" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                        </g>
                        <defs>
                            <clipPath id="clip0_1_46541">
                                <rect width="20" height="20" fill="white" />
                            </clipPath>
                        </defs>
                    </svg>
                    <span className="mx-4 text-[16px] font-medium font-[Poppins]">{passenger ? passenger.toString() : '0'}</span>
                    <svg className="cursor-pointer" onClick={increasePassenger} width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clip-path="url(#clip0_1_46540)">
                            <path d="M9.99996 6.66675V13.3334M6.66663 10.0001H13.3333M18.3333 10.0001C18.3333 14.6025 14.6023 18.3334 9.99996 18.3334C5.39759 18.3334 1.66663 14.6025 1.66663 10.0001C1.66663 5.39771 5.39759 1.66675 9.99996 1.66675C14.6023 1.66675 18.3333 5.39771 18.3333 10.0001Z" stroke="#1E1E1E" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                        </g>
                        <defs>
                            <clipPath id="clip0_1_46540">
                                <rect width="20" height="20" fill="white" />
                            </clipPath>
                        </defs>
                    </svg>

                </div>
            </div>
            <button className="mt-4 w-full rounded-xl text-white p-2 font-[Poppins] bg-[#394867] text-[16px] font-semibold" onClick={() => hideModal()}>DONE</button>
        </div>
    );
}

export default PassengerModal