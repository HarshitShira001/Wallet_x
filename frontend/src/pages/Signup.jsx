import React, { useState } from "react";
import { Heading } from "../components/Heading";
import { SubHeading } from "../components/SubHeading";
import { InputBox } from "../components/InputBox";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../components/Button";
import axios from "axios";

export default function SignUp() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState(""); 
  const [error, setError] = useState("");
  const navigate = useNavigate();

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <Heading text="Sign Up" />
        <SubHeading text="Enter your information to create an account" />
        
        {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded relative mb-4" role="alert">
          <span className="block sm:inline">{error}</span>
        </div>}

        <InputBox onChange={e => {
          setFirstName(e.target.value)
        }} label="First Name" placeholder="Harshit" />
        <InputBox onChange={e => {
          setLastName(e.target.value)
        }} label="Last Name" placeholder="Shira" />
        <InputBox onChange={e => {
          setUsername(e.target.value)
        }} label="Email" placeholder="harshit@gmail.com" />
        <InputBox onChange={e => {
          setPassword(e.target.value)
        }} label="Password" placeholder="********" type="password"/>
        
        <div className="pt-4">
          <Button label="Sign Up" onClick={async () => {
            try {
              setError("");
              const response = await axios.post("http://localhost:3000/api/v1/user/signup", {
                username,
                firstName,
                lastName,
                password
              })
              localStorage.setItem("token", response.data.token)
              navigate("/dashboard")
            } catch (e) {
              setError(e.response?.data?.message || "An error occurred during signup");
            }
          }} />
        </div>

        <div className="py-2 text-sm flex justify-center">
          <div>Already have an account?</div>
          <Link to="/signin" className="underline pl-1 cursor-pointer text-blue-600 hover:text-blue-800">
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}
