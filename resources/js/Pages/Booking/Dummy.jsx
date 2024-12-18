import ModalComponent from "@/Components/ModalComponent";
import { usePage } from "@inertiajs/react";
import { useEffect, useState } from "react";

const dummy = () => {
    const [isVisible, setIsVisible] = useState(false);
    const { flash = {} } = usePage().props;
    const [showNotification, setShowNotification] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setIsVisible(true), 100);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        const timer = setTimeout(() => setIsVisible(true), 100);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        if (flash && flash.success) {
            setShowNotification(true);

            // Optional: Automatically hide after some time
            const notificationTimer = setTimeout(() => {
                setShowNotification(false);
            }, 3000);

            return () => clearTimeout(notificationTimer);
        }
    }, [flash]);
    useEffect(() => {
        const finishPayment = async () => {
            const csrfToken = document.head.querySelector(
                'meta[name="csrf-token"]',
            ).content;

            try {
                const response = await axios.post(
                    "/booking/order-detail/store/finish",
                    {
                        headers: {
                            "X-CSRF-TOKEN": csrfToken,
                        },
                    },
                );

                if (response.status == 200) {
                    window.location.href = "/booking/payment-status";
                }
            } catch (error) {
                console.log("Unexpected error has occurred ", error);
            }
        };

        finishPayment();
    }, []);

    return (
        <>
            <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-blue-400 to-blue-100 px-20">
                {showNotification && flash.success && (
                    <div className="absolute left-0 right-0 top-4 z-50 flex justify-center">
                        <Notification
                            message={flash.success}
                            type="success"
                            duration={3000}
                        />
                    </div>
                )}

                {/* Logo Container */}
                <div className={`fade-in mb-2 ${isVisible ? "active" : ""}`}>
                    <img
                        src="/TripInLogo.svg"
                        className=""
                        alt="Logo of TripIn"
                    />
                </div>

                {/* Text Container */}
                <div
                    className={`fade-in mb-12 text-center ${
                        isVisible ? "active" : ""
                    }`}
                >
                    <h1 className="mb-2 text-2xl font-semibold text-gray-800">
                        Enjoy Your Trip,
                    </h1>
                    <h2 className="text-2xl font-semibold text-gray-800">
                        Leave the Hassle Behind
                    </h2>
                </div>
            </div>
            <ModalComponent>
                <div className="size-fit px-12 py-10">
                    <svg
                        width="100"
                        height="100"
                        viewBox="0 0 100 100"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <circle
                            cx="50"
                            cy="50"
                            r="40"
                            stroke="#ddd"
                            strokeWidth="8"
                            fill="none"
                        />
                        <circle
                            cx="50"
                            cy="50"
                            r="40"
                            stroke="#3498db"
                            strokeWidth="8"
                            fill="none"
                            strokeLinecap="round"
                            strokeDasharray="251.2"
                            strokeDashoffset="0"
                        >
                            <animate
                                attributeName="stroke-dashoffset"
                                from="0"
                                to="251.2"
                                dur="1.5s"
                                repeatCount="indefinite"
                            />
                        </circle>
                    </svg>
                    <p>Redirecting ...</p>
                </div>
            </ModalComponent>
        </>
    );
};

export default dummy;
