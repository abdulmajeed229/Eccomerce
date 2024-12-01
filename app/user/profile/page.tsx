"use client"

import { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { db } from "@/app/Database/firebase.config";
import Header from "@/app/components/Header";

interface UserData {
  uid: string;
  name: string;
  email: string;
  image?: string;
  phone?: string;
}

export default function Profile() {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const auth = getAuth();

  useEffect(() => {
    const fetchUserData = async (uid: string) => {
      try {
        const userQuery = query(collection(db, "RegisterData"), where("uid", "==", uid));
        const querySnapshot = await getDocs(userQuery);

        if (!querySnapshot.empty) {
          const userData: UserData = querySnapshot.docs[0].data() as UserData;
          setUserData(userData);
        } else {
          setUserData(null);
        }
      } catch (error) {
        console.error("Error fetching user data: ", error);
      } finally {
        setLoading(false);
      }
    };

    // Check if the user is authenticated via Firebase or localStorage
    const storedUser = JSON.parse(localStorage.getItem("user") || "{}");

    onAuthStateChanged(auth, (user) => {
      if (user) {
        fetchUserData(user.uid);
      } else if (storedUser?.uid) {
        fetchUserData(storedUser.uid); // If the user is not logged in but `uid` exists in localStorage
      } else {
        setLoading(false);
      }
    });
  }, [auth]);

  if (loading) {
    return <div className="text-center text-lg">Loading...</div>;
  }

  if (!userData) {
    return <div className="text-center text-lg">No user data found.</div>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Header />
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
        <h1 className="text-2xl font-bold text-gray-800">Profile</h1>
        <div className="mt-4">
          {userData.image && (
            <img
              src={userData.image}
              alt="Profile"
              className="w-32 h-32 rounded-full object-cover mx-auto"
            />
          )}
          <p className="text-gray-600 mt-4">
            <span className="font-semibold">Name:</span> {userData.name}
          </p>
          <p className="text-gray-600">
            <span className="font-semibold">Email:</span> {userData.email}
          </p>
          {userData.phone && (
            <p className="text-gray-600">
              <span className="font-semibold">Phone:</span> {userData.phone}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
