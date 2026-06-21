import axios from "axios";
import { useEffect, useState } from "react";
import { Button } from "./Button";
import { useNavigate } from "react-router-dom";

export function Users() {
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    axios.get("http://localhost:3000/api/v1/user/bulk?filter=" + filter)
      .then(response => {
        setUsers(response.data.user); 
      });
  }, [filter]);

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Users</h2>
      <div className="my-2">
        <input onChange={(e) => {
          setFilter(e.target.value)
        }} type="text" placeholder="Search users..." className="w-full px-2 py-1 border rounded border-slate-200" />
      </div>
      <div className="space-y-2">
        {users.map((user) => (
          <div 
            key={user._id}
            className="flex justify-between items-center p-2 bg-gray-100 rounded"
          >
            <div>
              <p className="font-semibold">{user.username}</p>
              <p className="text-sm text-gray-600">{user.firstName} {user.lastName}</p>
            </div>
            <div className="flex flex-col justify-center h-full">
              <Button onClick={(e) => {
                navigate("/send?id=" + user._id + "&name=" + user.firstName)
              }} label={"Send Money"} className="px-4 py-2 border border-blue-500 text-blue-500 rounded hover:bg-blue-500 hover:text-white transition-colors"/>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
