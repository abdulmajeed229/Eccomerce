"use client";

import { getDocs, collection } from "firebase/firestore";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { db } from "@/app/Database/firebase.config";

interface ProductData {
  id: string;
  name: string;
  year: string;
  mileage: string;
  price: number;
  imageUrl: string;
}

export default function ProductList() {
  const [products, setProducts] = useState<ProductData[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsCollection = collection(db, "products");
        const productsSnapshot = await getDocs(productsCollection);
        const productsList = productsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as ProductData[];

        setProducts(productsList);
      } catch (error) {
        console.error("Error fetching products: ", error);
      }
    };

    fetchProducts();
  }, []);

  if (products.length === 0) {
    return <p>Loading products...</p>;
  }

  return (
    <div className="font-sans py-4 mx-auto lg:max-w-6xl max-w-lg md:max-w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map((product) => (
          <Link href={`/${product.id}`} key={product.id}>
            <div className="bg-white rounded overflow-hidden shadow-md cursor-pointer hover:scale-[1.02] transition-all">
              <div className="w-full aspect-w-16 aspect-h-8 lg:h-80 relative">
                <Image
                  src={product.imageUrl}
                  alt={product.name}
                  fill
                  className="object-cover object-top"
                  unoptimized
                />
              </div>

              <div className="p-4">
                <h3 className="text-lg font-bold text-gray-800">{product.name}</h3>
                <div className="mt-4 flex items-center flex-wrap gap-2">
                  <h4 className="text-lg font-bold text-gray-800">${product.price}</h4>
                  <div className="bg-gray-100 w-10 h-10 flex items-center justify-center rounded-full cursor-pointer ml-auto">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16px" className="fill-gray-800 inline-block" viewBox="0 0 64 64">
                      <path d="M45.5 4A18.53 18.53 0 0 0 32 9.86 18.5 18.5 0 0 0 0 22.5C0 40.92 29.71 59 31 59.71a2 2 0 0 0 2.06 0C34.29 59 64 40.92 64 22.5A18.52 18.52 0 0 0 45.5 4ZM32 55.64C26.83 52.34 4 36.92 4 22.5a14.5 14.5 0 0 1 26.36-8.33 2 2 0 0 0 3.27 0A14.5 14.5 0 0 1 60 22.5c0 14.41-22.83 29.83-28 33.14Z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
