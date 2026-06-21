export function Balance({ amount }) {
    return (
      <div className="flex items-center p-4 bg-green-100 rounded-lg">
        <h2 className="text-lg font-semibold mr-2">Your balance:</h2>
        <span className="text-2xl font-bold text-green-700">₹{amount}</span>
      </div>
    )
  }  