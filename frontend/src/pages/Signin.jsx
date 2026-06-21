import React, { useState } from "react";
import { Heading } from "../components/Heading";
import { SubHeading } from "../components/SubHeading";
import { InputBox } from "../components/InputBox";
import { Button } from "../components/Button";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function SignIn() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <Heading text="Sign In" />
        <SubHeading text="Enter your credentials to access your account" />

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded mb-4 text-sm">
            {error}
          </div>
        )}

        <InputBox
          onChange={(e) => setUsername(e.target.value)}
          label="Email"
          placeholder="harshit@gmail.com"
          type="email"
        />
        <InputBox
          onChange={(e) => setPassword(e.target.value)}
          label="Password"
          placeholder="********"
          type="password"
        />

        <div className="pt-4">
          <Button
            label="Sign In"
            onClick={async () => {
              try {
                setError("");
                const response = await axios.post(
                  "http://localhost:3000/api/v1/user/signin",
                  { username, password }
                );
                localStorage.setItem("token", response.data.token);
                navigate("/dashboard");
              } catch (e) {
                setError(
                  e.response?.data?.message || "Invalid email or password"
                );
              }
            }}
          />
        </div>

        <div className="py-2 text-sm flex justify-center">
          <div>Don't have an account?</div>
          <Link
            to="/signup"
            className="underline pl-1 cursor-pointer text-blue-600 hover:text-blue-800"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
}