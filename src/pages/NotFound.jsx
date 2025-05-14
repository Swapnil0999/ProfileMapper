import { Link } from "react-router";

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-gray-800 p-4">
      <h1 className="text-6xl font-bold text-blue-600 mb-4">404</h1>
      <h2 className="text-2xl sm:text-3xl font-semibold mb-2">
        Page Not Found
      </h2>
      <p className="text-center text-sm sm:text-base text-gray-600 max-w-md mb-6">
        Sorry, the page you're looking for doesn't exist or has been moved.
      </p>
      <Link
        to="/"
        className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg transition focus:outline-none focus:ring-2 focus:ring-blue-300"
      >
        Go Home
      </Link>
    </div>
  );
};

export default NotFound;
