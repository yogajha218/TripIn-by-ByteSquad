import React, { useState } from 'react';
// import Coins from '/Coins.svg';

const ConfirmationPage = ({ orderData, routeData }) => {
  // Default data if props are not provided
  const defaultData = {
    busInfo: {
      name: "Shuttle Bus Tripin",
      plateNumber: "B 1234 XYZ",
      duration: "2 h 45 m",
      departureTime: "10.00",
      departureDate: "Sat, 10 Nov 2024",
      arrivalTime: "12.45",
      arrivalDate: "Sat, 10 Nov 2024",
      from: "Jakarta",
      to: "Bandung"
    },
    orderDetails: {
      name: "Jennifer Kim",
      seatNumber: 9,
      potentialPoints: 70,
      exchangePoints: 1000
    },
    pricing: {
      seatPrice: 120000,
      quantity: 1
    }
  };

  // States
  const [isExchangeEnabled, setIsExchangeEnabled] = useState(false);
  const [isPaymentDropdownOpen, setIsPaymentDropdownOpen] = useState(false);

  // Using data from props or default data
  const data = orderData || defaultData;
  const totalPrice = data.pricing.seatPrice * data.pricing.quantity;

  console.log('Received Route Data : ', routeData);

  // Format currency
  const formatCurrency = (amount) => {
    return `Rp${amount.toLocaleString('id-ID')}`;
  };

  return (
    <div className="min-h-screen bg-primary">
      {/* Header */}
      <div className="px-4 py-3 flex items-center text-white">
        <img src="/backArrow.svg" className="w-6 h-6" />
        <h1 className="text-2xl font-semibold flex-1 text-center mr-6 mt-4 mb-4">Confirmation</h1>
      </div>

      {/* Content */}
      <div className="bg-gray-100 min-h-screen pt-4 px-6">
        <h2 className="text-lg font-semibold mb-4">Order Details</h2>

        {/* Shuttle Info Card */}
        <div className="bg-white rounded-lg p-4 mb-4">
          <h3 className="font-medium mb-1">{data.busInfo.name}</h3>
          <p className="text-gray-600 text-sm mb-4">{data.busInfo.plateNumber}</p>

          {/* Time and Route - Improved Journey Section */}
          <div className="flex items-start gap-10">
            <div className="flex flex-col gap-10">
              <div>
                <p className="font-semibold">{data.busInfo.departureTime}</p>
                <p className="text-xs text-gray-500">{data.busInfo.departureDate}</p>
              </div>
              <div>
                <p className="font-semibold">{data.busInfo.arrivalTime}</p>
                <p className="text-xs text-gray-500">{data.busInfo.arrivalDate}</p>
              </div>
            </div>

            <div className="relative flex flex-col items-center">
              <div className="w-2.5 h-2.5 rounded-full bg-black"></div>
              <div className="w-0.5 h-20 bg-gray-300"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-black"></div>
            </div>

            <div className="flex flex-col gap-16">
              <p className="font-medium">{data.busInfo.from}</p>
              <p className="font-medium">{data.busInfo.to}</p>
            </div>

            <div className="ml-auto text-sm text-gray-500">
              {data.busInfo.duration}
            </div>
          </div>
        </div>

        {/* Order Name Card - Updated Layout */}
        <div className="bg-white rounded-lg p-4 mb-4">
          <div className="flex justify-between items-center mb-2">
            <div>
              <h3 className="font-medium mb-1">ORDER NAME</h3>
              <p className="text-gray-700">{data.orderDetails.name}</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500">Seat Number</p>
              <p className="font-medium">{data.orderDetails.seatNumber}</p>
            </div>
          </div>
          <div className="bg-gray-50 rounded p-2 text-sm">
            <p>Potential gain <span className="text-orange-500">{data.orderDetails.potentialPoints} CreditPoint</span></p>
          </div>
        </div>

        {/* Exchange Points Toggle - With Functionality */}
        <div className="bg-white rounded-lg p-4 mb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <img src="#" alt="Credits" className="h-4" />
              <span>Exchange {data.orderDetails.exchangePoints} CreditsPoint</span>
            </div>
            <button
              onClick={() => setIsExchangeEnabled(!isExchangeEnabled)}
              className={`w-12 h-6 rounded-full transition-colors duration-200 ease-in-out relative ${
                isExchangeEnabled ? 'bg-orange-500' : 'bg-gray-200'
              }`}
            >
              <div
                className={`w-5 h-5 bg-white rounded-full shadow transition-transform duration-200 ease-in-out absolute top-0.5 ${
                  isExchangeEnabled ? 'translate-x-6' : 'translate-x-0.5'
                }`}
              />
            </button>
          </div>
        </div>

        {/* Payment Method - With Dropdown */}
        <div className="bg-white rounded-lg p-4 mb-4">
          <h3 className="font-medium mb-2">Payment Method</h3>
          <div
            className="relative"
            onClick={() => setIsPaymentDropdownOpen(!isPaymentDropdownOpen)}
          >
            <div className="flex items-center justify-between p-2 border rounded cursor-pointer">
              <div className="flex items-center gap-2">
                <img src="/Gopay.svg" alt="GoPay" className="w-6 h-6" />
                <span>GoPay</span>
              </div>
              <img src="/downarrow.svg" className={`w-5 h-5 transition-transform duration-200 ${
                isPaymentDropdownOpen ? 'transform rotate-180' : ''
              }`} />
            </div>
            {isPaymentDropdownOpen && (
              <div className="absolute w-full bg-white border rounded-lg mt-1 shadow-lg z-10">
                <div className="p-2 flex items-center gap-2 cursor-pointer hover:bg-gray-50">
                  <img src="/Gopay.svg" alt="GoPay" className="w-6 h-6" />
                  <span>GoPay</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Price Details */}
        <div className="bg-white rounded-lg p-4 mb-20">
          <h3 className="font-medium mb-2">Price Details</h3>
          <div className="flex justify-between mb-2">
            <p>Seat (x{data.pricing.quantity})</p>
            <p>{formatCurrency(data.pricing.seatPrice)}</p>
          </div>
          <div className="flex justify-between font-semibold pt-2 border-t">
            <p>Total Price</p>
            <p>{formatCurrency(totalPrice)}</p>
          </div>
        </div>

        {/* Order Button */}
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-white">
          <button className="w-full bg-[#2d3748] text-white py-3 rounded-lg font-semibold">
            ORDER NOW
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationPage;
