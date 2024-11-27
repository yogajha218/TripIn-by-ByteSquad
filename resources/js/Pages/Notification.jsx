import React from "react";

const NotificationPage = () => {
  const notifications = [
    {
      id: 1,
      date: "a day ago",
      message:
        "You successfully purchased ticket from TripIn. Enjoy your Trip from Jakarta to Bandung!",
    },
    {
      id: 2,
      date: "2 days ago",
      message:
        "You successfully purchased ticket from TripIn. Enjoy your Trip from Jakarta to Bandung!",
    },
    {
      id: 3,
      date: "3 days ago",
      message:
        "You successfully purchased ticket from TripIn. Enjoy your Trip from Jakarta to Bandung!",
    },
    {
      id: 4,
      date: "9 days ago",
      message:
        "You successfully purchased ticket from TripIn. Enjoy your Trip from Jakarta to Bandung!",
    },
  ];

  return (
    <div className="min-h-screen bg-primary">
      {/* Header */}
      <div className="px-4 py-6 flex items-center relative">
        <button className="text-white absolute left-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
        <h1 className="text-white text-2xl font-semibold w-full text-center">
          Notification
        </h1>
      </div>

      {/* Content */}
      <div className="bg-white rounded-t-3xl min-h-screen mt-2 px-6 py-6">
        <h2 className="text-lg font-semibold mb-4 ">November 2024</h2>

        <div className="space-y-3">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className="bg-white rounded-xl p-4 shadow-md border border-gray-100"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center">
                  <img src="TripInLogo.svg" className="h-8" alt="TripIn Logo" />
                </div>
                <span className="text-sm text-gray-500">
                  {notification.date}
                </span>
              </div>
              <div>
                <h3 className="font-semibold">Successfully purchase ticket</h3>
              </div>
              <p className="text-gray-600 mt-2 text-sm">
                {notification.message}
              </p>
            </div>
          ))}
        </div>

        {/* Bottom Indicator */}
        <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2">
          <div className="w-32 h-1 bg-gray-300 rounded-full"></div>
        </div>
      </div>
    </div>
  );
};

export default NotificationPage;