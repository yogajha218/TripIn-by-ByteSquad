import React, { useEffect } from "react";
import { format } from "date-fns";
import { ChevronLeftIcon } from "@heroicons/react/24/solid";
const NotificationPage = ({ notifications }) => {
    useEffect(() => {
        // Call API to mark all notifications as read
        const markAllAsRead = async () => {
            try {
                await axios.post("/notifications/read"); // Adjust the endpoint as needed
                console.log("All notifications marked as read.");
            } catch (error) {
                console.error("Error marking notifications as read:", error);
            }
        };

        markAllAsRead();
    }, []);

    return (
        <>
            <div className="lg:flex lg:justify-center">
                <div className="min-h-screen bg-primary lg:w-[400px] rounded-b-md">
                    {/* Header */}
                    <div className="px-4 py-6 flex items-center relative">
                        <ChevronLeftIcon
                            className="absolute text-white size-6 cursor-pointer"
                            onClick={() => {
                                history.back();
                            }}
                        />

                        <h1 className="text-white bg-primary rounded-md text-2xl font-semibold w-full text-center">
                            Notification
                        </h1>
                    </div>

                    {/* Content */}
                    <div className="bg-white  min-h-screen mt-2 px-6 py-6">
                        <h2 className="text-lg font-semibold mb-4">
                            Notifications
                        </h2>

                        <div className="space-y-3">
                            {notifications.length > 0 ? (
                                notifications.map((notification) => {
                                    // Convert the date string to a Date object
                                    const date = new Date(
                                        notification.data.date
                                    );
                                    // Format the date using date-fns
                                    const formattedDate = format(
                                        date,
                                        "EEEE, MMMM d, yyyy"
                                    );

                                    return (
                                        <div
                                            key={notification.id}
                                            className="bg-white rounded-xl p-4 shadow-md border border-gray-100"
                                        >
                                            <div className="flex items-start justify-between">
                                                <div className="flex items-center">
                                                    <img
                                                        src="TripInLogo.svg"
                                                        className="h-8"
                                                        alt="TripIn Logo"
                                                    />
                                                </div>
                                                <span className="text-sm text-gray-500">
                                                    {formattedDate}
                                                </span>
                                            </div>
                                            <div>
                                                <h3 className="font-semibold">
                                                    {notification.data.title}
                                                </h3>
                                            </div>
                                            <p className="text-gray-600 mt-2 text-sm">
                                                {notification.data.message}
                                            </p>
                                        </div>
                                    );
                                })
                            ) : (
                                <p>No notifications available.</p>
                            )}
                        </div>

                        {/* Bottom Indicator */}
                        <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2">
                            <div className="w-32 h-1 bg-gray-300 rounded-full"></div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default NotificationPage;
