"use client";
import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../app/Database/firebase.config";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";
import { db } from "../app/Database/firebase.config";
import { collection, addDoc } from "firebase/firestore";


export default  function SignUpForm() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState("");
  


  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  const handleCreate = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {

      
            const docRef =  addDoc(collection(db, "RegisterData"), {
             name,
             email,
             password,
             image
            });
            
            localStorage.setItem("user", "true");

            
        alert("Success");
        router.push("/home");
      })
      .catch((error) => {
        alert("Failed: " + error.message);
      });
  };

  return (
    <div className="logiii min-h-screen flex items-center justify-center bg-gray-100 p-7">
      <div className="signupSh bg-white rounded-lg p-8 max-w-md w-full">
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">Create Account</h2>

        <div>
          <label className="block text-sm font-medium text-gray-700">Full Name</label>
          <input
            type="text"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700">Password</label>
          <input
            type="password"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700">Profile Picture</label>
          <div className="flex items-center space-x-4">
            {image ? (
              <img
                src={image}
                alt="Profile preview"
                className="w-24 h-24 rounded-full object-cover border border-gray-300"
              />
            ) : (
              <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
                No Image
              </div>
            )}

            <label className="cursor-pointer bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300">
              Choose File
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
              />
            </label>
          </div>
        </div>

        <button
          onClick={handleCreate}
          className="mt-6 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300"
        >
          Sign Up
        </button>

        <p className="text-center text-sm text-gray-600 mt-6">
          Already have an account?{" "}
          <Link href="/login">
            <span className="text-blue-600 hover:text-blue-800 cursor-pointer">Login here</span>
          </Link>
        </p>
      </div>
    </div>
  );
}
