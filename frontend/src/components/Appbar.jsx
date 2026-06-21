import { Link } from "react-router-dom";

export function Appbar() {
  return (
    <nav className="flex justify-between items-center p-4 bg-white shadow-md">
      <Link to="/dashboard" className="text-2xl font-bold text-blue-600">
        PayFlow
      </Link>
      <div>
        <Link to="/dashboard" className="px-4 py-2 text-gray-700 hover:text-blue-600">
          Dashboard
        </Link>
        <Link to="/send" className="px-4 py-2 text-gray-700 hover:text-blue-600">
          Send Money
        </Link>
        <Link to="/signin" className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100">
          Sign Out
        </Link>
      </div>
    </nav>
  );
}
