import React, { useState } from "react";
import { Link } from "@inertiajs/react";

const FAQ = () => {
  const faqs = [
    {
      question: "How do I book tickets as a passenger on Tripin?",
      answer:
        "To order tickets, open the Tripin application, select your destination and travel date, then select the available schedule. After that, proceed to the payment page to complete the order.",
    },
    {
      question: "Can I bring food and drinks into the vehicle?",
      answer:
        "Yes, you are allowed to bring food and light drinks. However, it is recommended to avoid food or drinks that smell strong or have the potential to disturb the comfort of other passengers. Please maintain cleanliness and dispose of rubbish properly when finished.",
    },
    {
      question: "What if I or other passengers get motion sick?",
      answer: "Answer coming soon. Please check back later.",
    },
    {
      question: "How do I view the tickets I have purchased?",
      answer: "Answer coming soon. Please check back later.",
    },
    {
      question: "What should I do if other passengers are disruptive or don't follow the rules?",
      answer: "Answer coming soon. Please check back later.",
    },
    {
      question: "Is smoking allowed in the vehicle?",
      answer: "Answer coming soon. Please check back later.",
    },
  ];

  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-primary flex flex-col">
      {/* Header */}
      <div className="flex items-center px-4 py-6 mt-4 mb-4 sticky top-0 bg-primary z-10">
        <Link href="/home/profile" className="flex items-center text-white">
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 19l-7-7 7-7"
            ></path>
          </svg>
        </Link>
        <h1 className="flex-1 text-center text-[30px] font-bold text-white mx-auto pr-5">
          FAQ
        </h1>
      </div>

      {/* FAQ Content */}
      <div className="flex-1 bg-white p-6 rounded-t-[30px]">
        <div className="max-w-md mx-auto">
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="border border-gray-300 rounded-lg bg-white shadow-md"
              >
                <button
                  className="w-full flex justify-between items-center p-4 text-left bg-transparent hover:bg-gray-50 transition"
                  onClick={() => toggleFAQ(index)}
                >
                  <span className="font-medium text-gray-800">{faq.question}</span>
                  <svg
                    className={`w-5 h-5 text-gray-600 transform ${
                      activeIndex === index ? "rotate-180" : "rotate-0"
                    }`}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19 9l-7 7-7-7"
                    ></path>
                  </svg>
                </button>
                {activeIndex === index && (
                  <div className="p-4 text-gray-700 bg-gray-50">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;