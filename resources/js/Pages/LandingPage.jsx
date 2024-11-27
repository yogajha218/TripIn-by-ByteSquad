import { Link, usePage } from "@inertiajs/react";
import { useEffect, useState } from "react";
import Notification from '@/Components/Notification';
import '../../css/animation.css';

const LandingPage = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { flash = {} } = usePage().props;
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    const timer = setTimeout(()=> setIsVisible(true), 100);
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

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-400 to-blue-100 flex flex-col items-center  justify-center px-20">
        {showNotification && flash.success && (
        <div className="absolute top-4 left-0 right-0 z-50 flex justify-center">
          <Notification
            message={flash.success}
            type="success"
            duration={3000}
          />
        </div>
      )}

      {/* Logo Container */}
      <div className={`mb-2 fade-in ${isVisible ? 'active' : ''}`}>
        <img src='/TripInLogo.svg'
         className="" alt="Logo of TripIn" />
      </div>

      {/* Text Container */}
      <div className={`text-center mb-12 fade-in ${isVisible ? 'active' : ''}`}>
        <h1 className="text-2xl font-semibold text-gray-800 mb-2">
          Enjoy Your Trip,
        </h1>
        <h2 className="text-2xl font-semibold text-gray-800">
          Leave the Hassle Behind
        </h2>
      </div>

      {/* Continue Button */}
      <Link
        className="w-full text-center max-w-xs bg-primary2 text-white py-4 rounded-full font-medium hover:bg-blue-800 transition-colors cursor-pointer"
        href="/auth"
      >
        CONTINUE
      </Link>
    </div>
  );
};

export default LandingPage;
