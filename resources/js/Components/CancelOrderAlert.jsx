import React, { useState } from 'react';

const CancelOrderAlert = () => {
  const [showAlert, setShowAlert] = useState(false);

  const handleCancelOrder = () => {
    setShowAlert(true);
  };

  const handleConfirm = () => {
    // Add logic to cancel the order
    setShowAlert(false);
  };

  const handleCancel = () => {
    setShowAlert(false);
  };

  return (
    <div>
      <button onClick={handleCancelOrder}>Cancel order</button>

      {showAlert && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-lg font-bold mb-2">Cancel order</h2>
            <p className="mb-4">Are you sure you want to cancel the ticket order?</p>
            <div className="flex flex-col ">
              <button
                className="bg-primary2 hover:bg-primary text-white px-36 py-2 rounded-md mb-2"
                onClick={handleConfirm}
              >
                YES
              </button>
              <button
                className="bg-gray-300 hover:bg-gray-400 px-36 py-2 rounded-md"
                onClick={handleCancel}
              >
                NO
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CancelOrderAlert;