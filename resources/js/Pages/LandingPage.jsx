import { Link } from "@inertiajs/react";

const LandingPage = () => {
  const handleLogout = async () => {
      const csrfToken = document.head.querySelector('meta[name="csrf-token"]').content;

    try {
      const response = await fetch('/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-TOKEN': csrfToken,
        },
      });

      if (response.ok) {
        window.location.href = '/'; // Redirect to login after logout
      } else {
        alert('Logout failed, please try again');
      }
    } catch (error) {
      console.error('Error during logout:', error);
      alert('Logout failed, please try again');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-400 to-blue-100 flex flex-col items-center  justify-center px-20">
      {/* Logo Container */}
      <div className="mb-2">
        <img src='/TripInLogo.svg'
         className="" alt="Logo of TripIn" />
      </div>

      {/* Text Container */}
      <div className="text-center mb-12">
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
