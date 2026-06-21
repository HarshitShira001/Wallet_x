import React, { useState } from "react";
import { Appbar } from "../components/Appbar";
import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";
import { Button } from "../components/Button";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";

export default function SendMoney() {
  const [searchParams] = useSearchParams();
  const [amount, setAmount] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const id = searchParams.get("id");
  const name = searchParams.get("name") || "Your Friend's Name";

  const handleTransfer = async () => {
    if (!amount || Number(amount) <= 0) {
      setError("Please enter a valid amount greater than 0");
      return;
    }
    try {
      setError("");
      setSuccess("");
      setLoading(true);
      await axios.post(
        "http://localhost:3000/api/v1/account/transfer",
        {
          to: id,
          amount: Number(amount),
        },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      setSuccess("Transfer successful! Redirecting...");
      setTimeout(() => navigate("/dashboard"), 1500);
    } catch (e) {
      setError(e.response?.data?.message || "Transfer failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Appbar />
      <main className="container mx-auto flex justify-center items-center min-h-[calc(100vh-64px)] p-4">
        <div className="max-w-sm w-full bg-white rounded-2xl shadow-md p-6">
          <Heading text="Send Money" className="text-center mb-6" />

          <div className="flex flex-col items-center mb-6">
            <div className="h-16 w-16 rounded-full bg-green-100 flex justify-center items-center text-green-700 text-2xl font-bold">
              {name[0].toUpperCase()}
            </div>
            <h3 className="mt-3 text-lg text-gray-700 font-medium">{name}</h3>
          </div>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded mb-4 text-sm">
              {error}
            </div>
          )}
          {success && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-2 rounded mb-4 text-sm">
              {success}
            </div>
          )}

          <div className="mb-6">
            <InputBox
              label="Amount (₹)"
              placeholder="Enter amount"
              type="number"
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>

          <Button
            label={loading ? "Sending..." : "Send Money"}
            onClick={handleTransfer}
            className="w-full py-3"
          />
        </div>
      </main>
    </div>
  );
}
