export function Button({ label, onClick }) {
    return (
      <button
        onClick={onClick}
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
      >
        {label}
      </button>
    )
  }  