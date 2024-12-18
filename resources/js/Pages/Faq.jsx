import React, { useState } from "react";
import { ChevronLeftIcon } from "@heroicons/react/24/solid";

const FAQ = () => {
    const faqs = [
        {
            question: "How do I book tickets as a passenger on Tripin?",
            answer: "To order tickets, open the Tripin application, select your destination and travel date, then select the available schedule. After that, proceed to the payment page to complete the order.",
        },
        {
            question: "Can I bring food and drinks into the vehicle?",
            answer: "Yes, you are allowed to bring food and light drinks. However, it is recommended to avoid food or drinks that smell strong or have the potential to disturb the comfort of other passengers. Please maintain cleanliness and dispose of rubbish properly when finished.",
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
            question:
                "What should I do if other passengers are disruptive or don't follow the rules?",
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
        <>
            <div className="flex justify-center">
                <div className="flex flex-col bg-primary lg:w-[400px]">
                    {/* Header */}
                    <div className="sticky top-0 z-10 mb-4 mt-4 flex items-center bg-primary px-4 py-6">
                        <ChevronLeftIcon
                            className="absolute left-5 size-6 cursor-pointer text-white"
                            onClick={() => history.back()}
                        ></ChevronLeftIcon>

                        <h1 className="mx-auto flex-1 pr-5 text-center text-[30px] font-bold text-white">
                            FAQ
                        </h1>
                    </div>

                    {/* FAQ Content */}
                    <div className="min-h-screen flex-1 rounded-t-[30px] bg-white p-6">
                        <div className="mx-auto max-w-md">
                            <div className="space-y-4">
                                {faqs.map((faq, index) => (
                                    <div
                                        key={index}
                                        className="rounded-lg border border-gray-300 bg-white shadow-md"
                                    >
                                        <button
                                            className="flex w-full items-center justify-between bg-transparent p-4 text-left transition hover:bg-gray-50"
                                            onClick={() => toggleFAQ(index)}
                                        >
                                            <span className="font-medium text-gray-800">
                                                {faq.question}
                                            </span>
                                            <svg
                                                className={`h-5 w-5 transform text-gray-600 ${
                                                    activeIndex === index
                                                        ? "rotate-180"
                                                        : "rotate-0"
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
                                            <div className="bg-gray-50 p-4 text-gray-700">
                                                {faq.answer}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default FAQ;
