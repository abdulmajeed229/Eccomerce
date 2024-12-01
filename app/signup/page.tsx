"use client"

import { useState, ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { db } from "@/app/Database/firebase.config"; // No need for storage import
import { addDoc, collection } from "firebase/firestore";

export default function SignUpForm() {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [image, setImage] = useState<File | null>(null); // Still keeping image state for future use
  const auth = getAuth();
  const router = useRouter();

  // Handle the sign-up process
  const handleCreate = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // You can skip uploading the image to Firebase
      let imageUrl = ""; // Just set imageUrl to an empty string or null
      if (image) {
        // You can still process the image locally if required, but it's not being uploaded to Firebase now.
        console.log("Selected image (not uploading to Firebase):", image.name);
      }

      // Save user data in Firestore without the image URL
      await addDoc(collection(db, "RegisterData"), {
        uid: user.uid,
        name,
        email,
        image: imageUrl, // Image URL is now an empty string or null
      });

      // Save UID in localStorage
      localStorage.setItem("user", JSON.stringify({ uid: user.uid }));

      alert("Account created successfully!");
      router.push("/home");
    } catch (error: any) {
      alert("Error: " + error.message);
    }
  };

  // Handle file input change (image upload)
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    setImage(selectedFile || null); // Store the selected image in the state (optional)
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h1 className="text-2xl font-bold mb-6 text-center">Sign Up</h1>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 border rounded mb-4"
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 border rounded mb-4"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 border rounded mb-4"
        />
        <input
          type="file"
          onChange={handleFileChange} // Image handling is optional
          className="w-full p-2 border rounded mb-4"
        />
        <button
          onClick={handleCreate}
          className="w-full bg-blue-500 text-white p-2 rounded mt-4 hover:bg-blue-600"
        >
          Create Account
        </button>
      </div>
    </div>
  );
}
