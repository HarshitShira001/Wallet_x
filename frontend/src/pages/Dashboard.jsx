import React, { useEffect, useState } from "react";
import { Appbar } from "../components/Appbar";
import { Balance } from "../components/Balance";
import { Users } from "../components/Users";
import axios from "axios";

export default function Dashboard() {
  const [balance, setBalance] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/v1/account/balance", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((res) => setBalance(res.data.balance.toFixed(2)))
      .catch(() => setBalance("N/A"));
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <Appbar />
      <main className="container mx-auto p-4">
        <Balance amount={balance !== null ? balance : "Loading..."} />
        <div className="mt-8">
          <Users />
        </div>
      </main>
    </div>
  );
}