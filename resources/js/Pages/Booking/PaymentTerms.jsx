import React from 'react';

import { ChevronLeft } from 'lucide-react';

const Payment = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className='bg-primary p-6'>
        <div className="relative flex items-center justify-center">
          <button className="absolute left-0 p-1 bg-transparent">
            <ChevronLeft className="w-6 h-6 text-white" />
          </button>
          <h1 className="text-2xl font-bold text-white">Gopay</h1>
        </div>
      </div>

      {/* Logo Section */}
      <div className="px-6 py-6 flex items-center gap-2 justify-center">
        <img
          src="/TripInLogo.svg"
          alt="Tripin Logo"
          className="w-24 h-14 rounded-full"
        />
        <img
          src="/Gopay.svg"
          alt="Chat Logo"
          className="w-10 h-10"
        />
      </div>

      {/* Terms Card */}
      <div className="mx-4 bg-gray-100 rounded-lg p-6 text-black">
        <h2 className="font-bold text-lg mb-4">Terms & Conditions:</h2>
        <ol className="space-y-2">
          <li className="flex gap-2">
            <span className="min-w-[24px]">1.</span>
            <span>Already installed Gopay App, have Gopay account, and already activate Gopay.</span>
          </li>
          <li className="flex gap-2">
            <span className="min-w-[24px]">2.</span>
            <span>Ensure sufficient Gopay balance to complete the payment.</span>
          </li>
          <li className="flex gap-2">
            <span className="min-w-[24px]">3.</span>
            <span>Your payment will be redirected to the Gopay App, where you can complete the payment.</span>
          </li>
          <li className="flex gap-2">
            <span className="min-w-[24px]">4.</span>
            <span>The Boarding Ticket will appear after successfully completing the payment in the Gopay App.</span>
          </li>
        </ol>
      </div>

      {/* Next Button */}
      <div className="fixed bottom-2 w-full p-4">
        <button className="w-full bg-primary2 text-white py-3 rounded-lg font-semibold">
          NEXT
        </button>
      </div>
    </div>
  );
};

export default Payment;