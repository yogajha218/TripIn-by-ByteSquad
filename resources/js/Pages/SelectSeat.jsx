import React, { useState, useEffect } from 'react';
import Seats from '@/Components/Seats'

const SelectSeat = (plate) => {

    const [selectedSeat, setSelectedSeat] = useState([]);
    console.log('Sended Plate : ', plate);

    // Example seat numbers
    const seats = [
        { number: 1 }, { number: 2 }, { type: 'null' }, { type: 'steeringWheel' }, // Row 1
        { type: 'null' }, { number: 3 }, { number: 4 }, { number: 5 },           // Row 2
        { number: 6 }, { number: 7 }, { number: 8 }, { number: 9 }, // Row 3
        { type: 'null' }, { number: 10 }, { number: 11 }, { number: 12 }, // Row 4
        { type: 'null' }, { number: 13 }, { number: 14 }, { number: 15 }, // Row 5
        { number: 16 }, { number: 17 }, { number: 18 }, { number: 19 }  // Row 6
    ];

    // Selecting multiple seats and putting the selected seats into the state
    const handleSeatClick = (seatNumber) => {
        if (selectedSeat.includes(seatNumber)) {
          // Remove the seat from the selected seats array
          setSelectedSeat(selectedSeat.filter((seat) => seat !== seatNumber));
        } else {
          // Add the seat to the selected seats array
          setSelectedSeat([...selectedSeat, seatNumber]);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const csrfToken = document.head.querySelector('meta[name="csrf-token"]').content;

        try{
            const response = await fetch(route('seat.store', 1), {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json', // Ensure that the content-type is set to JSON
                    'X-CSRF-TOKEN' : csrfToken,
                },
                body: JSON.stringify({seats: selectedSeat}),
            })

            console.log('Response Status: ', response.status); // Log the status code

            if(response.ok){
                const result = await response.json();
                alert(result.message);
                window.location.href = '/seat';
            } else {
                const error = await response.json();
                alert(error.message);
            }

            
        } catch(error){
            console.error('Error saving seats : ', error);
            alert('An error occurred, Please Try Again!');
        }

        console.log(selectedSeat);
    }

  return (
    <div>
        <div className="lg:max-w-[400px] md:min-w-[360px] mx-auto">
            <div className="h-[830px] relative min-w-[360px] bg-white">

                {/* Header */}
                <div className="h-[205px] bg-primary">
                    <div className="mx-5 pt-14 flex">
                        {/* Back Arrow */}
                        <div className="ml-2">
                            <img src="/backArrow.svg" alt="Back Arrow" className='cursor-pointer'/>
                        </div>

                        {/* Title */}
                        <div className="ml-[85px] text-white">
                            {/* Title Page */}
                            <p className='text-3xl font-extrabold'>Select Seat</p>
                            {/* Destination */}
                            <p className='text-lg font-semibold'>Jakarta - Bandung</p>
                        </div>
                        
                    </div>
                    {/* Seat Information */}
                    <div className="flex justify-center mt-10">
                        <div className="flex flex-row gap-4 items-center">
                            {/* Available */}
                            <div className="flex">
                                <div className="w-[20px] h-[20px] bg-white border border-gray">
                                </div>
                                <p className='ml-1.5 text-white text-center text-md font-bold'>Available</p>
                            </div>
                            
                            {/* Filled */}
                            <div className="flex">
                                <div className="w-[20px] h-[20px] bg-[#394867] border border-gray">
                                </div>
                                <p className='ml-1.5 text-white text-center text-md font-bold'>Filled</p>
                            </div>

                            {/* Selected */}
                            <div className="flex">
                                <div className="w-[20px] h-[20px] bg-[#009EF7] border border-gray">
                                </div>
                                <p className='ml-1.5 text-white text-center text-md font-bold'>Selected</p>
                            </div>
                        </div>
                    </div>
                </div>

                <form onSubmit={handleSubmit}>
                    {/* Seats */}
                    <div className="flex justify-center items-center">
                        <div className="mt-[20px]">
                            <div className="flex justify-center">
                                <h1 className="font-bold text-lg">Seat Limit: 5</h1>
                            </div>
                            <div className="mt-3 w-[300px] h-[430px] bg-[#8BAFCE] rounded-[15px]">
                                <div className="flex flex-col items-center py-5">
                                    <div className="grid grid-cols-4 gap-4 p-4">
                                    {seats.map((seat, index) => (
                                        seat.type === 'steeringWheel' ? (
                                            <div key={index} className="w-12 h-12 flex items-center justify-center">
                                                <img src="/steeringWheel.svg" alt="Steering Wheel" className="w-10 h-10" />
                                            </div>
                                        ) : seat.type === 'null' ? (
                                            <div key={index} className=""></div>
                                        ) : (
                                            <Seats
                                            key={index}
                                            number={seat.number}
                                            isSelected={selectedSeat.includes(seat.number)}
                                            onClick={() => handleSeatClick(seat.number)}
                                            />
                                        )
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Save Button */}
                    <div className="mt-10 flex justify-center" >
                        <button className='w-[350px] h-[45px] bg-[#394867] text-white rounded-[10px]'>
                            Save
                        </button>
                    </div>
                </form>   
            </div>
        </div>
    </div>
  )
}

export default SelectSeat