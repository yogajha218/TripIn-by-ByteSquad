import React from 'react';

const Seats = ({ number, isSelected, isBooked, onClick }) => {
    return (
        <div
            className={`w-12 h-12 flex flex-col items-center justify-center rounded-md ${
                isBooked ? 'bg-gray-400 text-white cursor-not-allowed opacity-75' : 
                isSelected ? 'bg-[#009EF7] text-white' : 'bg-white text-black'
            } shadow-md ${isBooked ? 'cursor-not-allowed' : 'cursor-pointer'}`}
            onClick={!isBooked ? onClick : null} // Prevent click if booked
        >
            <div className="mt-2 text-[15px] font-bold">{number}</div> {/* Seat Number */}
            <div className={`w-12 h-3 mt-2 rounded-full ${isSelected ? 'bg-white' : 'bg-[#394867]'}`}></div>
        </div>
    );
};

export default Seats;