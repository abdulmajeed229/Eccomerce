"use client";

import { FcGoogle } from 'react-icons/fc';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { getAuth, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../Database/firebase.config";
import { useState } from 'react';

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const login = (e: React.FormEvent) => {
    e.preventDefault(); // Prevent default form submission

    // Firebase Email/Password Authentication
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        alert('Login Successful');
        localStorage.setItem("user", "true");
        router.push("/home");
      })
      .catch((error) => {
        // Error handling
        let errorMessage = "Login failed. Please try again.";
        switch (error.code) {
          case "auth/invalid-email":
            errorMessage = "Invalid email format.";
            break;
          case "auth/user-not-found":
            errorMessage = "User not found.";
            break;
          case "auth/wrong-password":
            errorMessage = "Incorrect password.";
            break;
          case "auth/user-disabled":
            errorMessage = "This user has been disabled.";
            break;
          default:
            errorMessage = "Something went wrong.";
        }
        alert(errorMessage);
        console.error("Login error:", error);
      });
  };

  const handleGoogleSignIn = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        alert(`Welcome, ${user.displayName}!`);
        localStorage.setItem("user", "true");
        router.push("/home");
      })
      .catch((error) => {
        alert('Google Sign-In failed');
        console.error("Google Sign-In error:", error);
      });
  };

  return (
    <div className="bglog min-h-screen flex items-center justify-center bg-gray-100">
      <div className="logCardsh bg-white rounded-lg p-8 max-w-md w-full">
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
          Login Account
        </h2>

        <form className="space-y-4" onSubmit={login}>
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
              onChange={(e) => setPassword(e.target.value)}
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

        <div className="flex items-center justify-between mt-4">
          <span className="border-b w-1/5"></span>
          <span className="text-xs text-gray-500 uppercase">or continue with</span>
          <span className="border-b w-1/5"></span>
        </div>

        <div className="mt-4 space-y-2">
          <button
            onClick={handleGoogleSignIn}
            className="flex items-center justify-center w-full border border-gray-300 rounded-lg py-2 hover:bg-gray-100 transition duration-300"
          >
            <FcGoogle className="mr-2 text-lg" />
            Continue with Google
          </button>
        </div>

        <div className="mt-6 flex justify-center space-x-4">
          <FaTwitter className="text-blue-400 hover:text-blue-500 cursor-pointer text-2xl" />
          <FaInstagram className="text-pink-500 hover:text-pink-600 cursor-pointer text-2xl" />
          <FaFacebook className="text-blue-600 hover:text-blue-700 cursor-pointer text-2xl" />
        </div>

        <p className="text-center text-sm text-gray-600 mt-6">
          Not a user?{" "}
          <Link href="/">
            <span className="text-blue-600 hover:text-blue-800 cursor-pointer">
              Create an account
            </span>
          </Link>
        </p>
      </div>
    </div>
  );
}
