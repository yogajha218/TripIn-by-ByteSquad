import React, { useState, useEffect } from "react";
import checkmark from "/Checkmark.svg";
import down from "/downarrow.svg";
import back from "/backArrow.svg";

const PaymentStatus = () => {
  const [paymentData, setPaymentData] = useState({
    gopayAccount: "081234567890",
    timeLeft: 60,
    date: new Date().toLocaleDateString("en-GB"),
    transactionNo: `A${Math.random().toString(36).substr(2, 16)}`,
    paymentMethod: "Gopay",
    totalPrice: 120000,
  });

  const [isHowToPayOpen, setIsHowToPayOpen] = useState(false);
  const [countdown, setCountdown] = useState(paymentData.timeLeft);

  useEffect(() => {
    if (countdown <= 0) return;

    const timer = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [countdown]);

  const formatPrice = (price) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const formatGopayAccount = (number) => {
    const visible = number.slice(-4);
    const hidden = number.slice(0, -4).replace(/./g, "x");
    return hidden + visible;
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-primary p-6">
        <div className="relative flex items-center justify-center">
          <button className="absolute left-0 p-1 bg-transparent">
            <img src={back} className="w-6 h-6 text-white" />
          </button>
          <h1 className="text-2xl font-bold text-white">Gopay</h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6">
        {/* Success Icon */}
        <div className="flex justify-center mb-4">
          <div className="bg-green-500 rounded-full p-4">
            <img src={checkmark} className="w-8 h-8 text-white" />
          </div>
        </div>

        {/* Notification Text */}
        <div className="text-center text-black mb-6">
          <h2 className="text-xl font-semibold mb-2">
            Payment Notification Sent
          </h2>
          <p className="text-sm">Check your Gopay Account to make payments</p>
        </div>

        {/* Payment Details Card */}
        <div className="bg-gray-100 rounded-lg p-4 mb-4">
          <div className="mb-4">
            <div className="flex justify-between mb-2">
              <span className="text-black">Number Gopay Account</span>
              <span className="font-bold text-black">
                {formatGopayAccount(paymentData.gopayAccount)}
              </span>
            </div>
            <p className="text-sm text-black mb-2">
              Complete payment immediately on Gopay applications in
            </p>
            <p className="font-medium text-red-500">{countdown} seconds</p>
          </div>

          {/* How to Pay Section */}
          <div>
            <button
              onClick={() => setIsHowToPayOpen(!isHowToPayOpen)}
              className="w-full flex justify-between items-center bg-transparent text-black"
            >
              <h3 className="font-medium">How to Pay With Gopay</h3>
              <img src={down}
                className={`w-5 h-5 transition-transform duration-200 ${
                  isHowToPayOpen ? "transform rotate-180" : ""
                }`}
              />
            </button>
            <div
              className={`overflow-hidden transition-all duration-200 ${
                isHowToPayOpen ? "max-h-52" : "max-h-0"
              }`}
            >
              <ol className="text-sm text-black space-y-3 p-4">
                <li className="flex gap-1">
                  <span className="min-w-[24px]">1.</span>
                  <span>
                  Enter your registered phone number in the Gopay Application
                  (example: 08123456789).
                  </span>
                </li>
                <li className="flex gap-1">
                  <span className="min-w-[24px]">2.</span>
                  Open your Gopay application and click the bell icon on the
                  upper right to complete the payment.
                </li>
                <li className="flex gap-1">
                  <span className="min-w-[24px]">3.</span>
                  Make sure you complete the payment with specified time
                  limit to avoid transaction time out.
                </li>
              </ol>
            </div>
          </div>
        </div>

        {/* Transaction Details Card */}
        <div className="bg-gray-100 rounded-lg p-4 mb-8 text-black">
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-black">Date</span>
              <span>{paymentData.date}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-black">Transaction No</span>
              <span>{paymentData.transactionNo}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-black">Payment Method</span>
              <span>{paymentData.paymentMethod}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-black font-bold">Total Price</span>
              <span className="font-bold">
                {formatPrice(paymentData.totalPrice)}
              </span>
            </div>
          </div>
        </div>

        {/* Back Button */}
        <div>
          <button className="w-full bg-primary2 text-white py-3 rounded-lg font-medium">
            BACK TO HOME
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentStatus;

