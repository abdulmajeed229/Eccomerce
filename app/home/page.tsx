"use client"

import Image from "next/image";
import Header from "../components/Header";
import Slider from "../components/slider";
import HeaderNew from "../components/Header2";
import ProductCard from "../components/product";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Footer from "../components/footer";

export default function Home() {

  const router = useRouter();

  useEffect(() => {
    const user = localStorage.getItem("user");
    
    if (!user) {
      router.push("/login");
    } else {
      router.push("/home");
    }
  }, [router]); 

  return (
    <div className="min-h-[100vh] w-full">
      <HeaderNew />
      <Header />
      <br />
      <Slider />

      <h1 className="text-[37px] font-bold text-center p-[20px]" >Our Products</h1>
      <ProductCard />
      <Footer/>
    </div>
  );
}
