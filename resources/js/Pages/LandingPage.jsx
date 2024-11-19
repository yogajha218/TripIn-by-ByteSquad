//import tripinLogo from './assets/TripInLogo.svg';

const LandingPage = () => {
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
      <button
        className="w-full max-w-xs bg-primary2 text-white py-4 rounded-full font-medium hover:bg-blue-800 transition-colors cursor-pointer"
        onClick={() => alert('Continue button clicked')}
      >
        CONTINUE
      </button>
    </div>
  );
};

export default LandingPage;
