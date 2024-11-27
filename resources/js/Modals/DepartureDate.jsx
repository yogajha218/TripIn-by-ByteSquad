import useModal from "@/Hooks/useModal";
import useBookingStore from "@/Store/bookingStore";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';

const DepartureDateModal = () => {
    const { date, setDate } = useBookingStore()
    const { hideModal } = useModal()
    return (
        <div className="bg-white p-4 rounded-xl w-[90%] md:w-96">
            <Calendar onChange={e => setDate(e.toDateString())} value={date} />
            <button className="mt-4 w-full rounded-xl text-white p-2 font-[Poppins] bg-[#394867] text-[16px] font-semibold" onClick={() => hideModal()}>SAVE</button>
        </div>
    );
}

export default DepartureDateModal