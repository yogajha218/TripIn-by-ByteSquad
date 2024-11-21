import React from 'react'

const Seats = ({ number, isSelected, onClick }) => {
  return (
    <div
      className={`w-12 h-12 flex flex-col items-center justify-center rounded-md ${
        isSelected ? 'bg-[#009EF7] text-white' : 'bg-white text-black'
      } shadow-md cursor-pointer`}
      onClick={onClick}
    >
      <div className="mt-2 text-[15px] font-bold">{number}</div> {/* Seat Number */}
      <div className={`w-12 h-3 mt-2 rounded-full ${isSelected ? 'bg-white' : 'bg-[#394867]'}`}></div>
    </div>
  )
}

export default Seats