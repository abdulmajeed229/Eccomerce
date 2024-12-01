"use client";

import { useState, ChangeEvent, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../Database/firebase.config";
import Link from 'next/link';

const AdminLoginForm: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const router = useRouter();

  // Define the login function with proper type for the event
  const login = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent form submission to allow custom login logic

    // Check if email and password match admin credentials
    if (email === "asd@gmail.com" && password === "1234") {
      alert('Admin Login Successful');
      localStorage.setItem("admin", "Y8$Fw#1kLxP@z9d3R6Vq*J&0N4oX^T7Zb!CmKaU%5W2YQHt"); // You can modify this for admin-specific storage
      router.push("/admin-dashboard"); // Redirect to admin dashboard or any other page
    } else {
      alert('Failed Login: Invalid credentials');
    }
  };

  return (
    <div className="adminback min-h-screen flex items-center justify-center bg-gray-100">
      <div className="adminSha bg-white rounded-lg p-8 max-w-md w-full">
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
          Welcome! Majeed
        </h2>

        <form className="space-y-4" onSubmit={login}>
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
              onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
              onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Login
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-6">
          Not an admin?{' '}
          <Link href="/home">
            <span className="text-blue-600 hover:text-blue-800 cursor-pointer">
              Go back to home
            </span>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default AdminLoginForm;
