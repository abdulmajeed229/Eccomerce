import { getDoc, doc } from "firebase/firestore";
import Image from "next/image";
import { db } from "@/app/Database/firebase.config";
import { notFound } from "next/navigation";
import Header from "../components/Header";
import Footer from "../components/footer";

interface ProductData {
  id: string;
  name: string;
  year: string;
  mileage: string;
  price: number;
  imageUrl: string;
  description?: string;
}

async function getProduct(id: string): Promise<ProductData | null> {
  try {
    const docRef = doc(db, "products", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() } as ProductData;
    }
  } catch (error) {
    console.error("Error fetching product:", error);
  }
  return null;
}

export default async function ProductPage({ params }: { params: { id: string } }) {
  const product = await getProduct(params.id);

  if (!product) {
    notFound(); // Triggers 404 page in Next.js
    return null;
  }

  return (

    <>
<Header/>

    <div className="bg-white py-8 px-4 w-[90%] mx-auto">
      <div className="bg-white rounded-lg overflow-hidden">

    

<div className=" bg-white">

    
            <div className="p-4 lg:max-w-7xl max-w-4xl mx-auto">
                <div className="grid items-start grid-cols-1 lg:grid-cols-5 gap-12  p-6 rounded-lg">
                    <div className="lg:col-span-3 w-full lg:sticky top-0 text-center">

                        <div className="px-4 py-10 rounded-lg shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] relative">
                            <img src={product.imageUrl} alt="Product" className="w-3/4 rounded object-cover mx-auto" />
                            <button type="button" className="absolute top-4 right-4">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20px" fill="#ccc" className="mr-1 hover:fill-[#333]" viewBox="0 0 64 64">
                                    <path d="M45.5 4A18.53 18.53 0 0 0 32 9.86 18.5 18.5 0 0 0 0 22.5C0 40.92 29.71 59 31 59.71a2 2 0 0 0 2.06 0C34.29 59 64 40.92 64 22.5A18.52 18.52 0 0 0 45.5 4ZM32 55.64C26.83 52.34 4 36.92 4 22.5a14.5 14.5 0 0 1 26.36-8.33 2 2 0 0 0 3.27 0A14.5 14.5 0 0 1 60 22.5c0 14.41-22.83 29.83-28 33.14Z" data-original="#000000"></path>
                                </svg>
                            </button>
                        </div>

                        <div className="mt-6 flex flex-wrap justify-center gap-6 mx-auto">
                        
                        </div>
                    </div>

                    <div className="lg:col-span-2">
                        <h2 className="text-2xl font-extrabold text-gray-800">{product.name}</h2>

                        <div className="flex space-x-2 mt-4">
                            <svg className="w-5 fill-blue-600" viewBox="0 0 14 13" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                            </svg>
                            <svg className="w-5 fill-blue-600" viewBox="0 0 14 13" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                            </svg>
                            <svg className="w-5 fill-blue-600" viewBox="0 0 14 13" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                            </svg>
                            <svg className="w-5 fill-blue-600" viewBox="0 0 14 13" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                            </svg>
                            <svg className="w-5 fill-[#CED5D8]" viewBox="0 0 14 13" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                            </svg>
                            <h4 className="text-gray-800 text-base">500 Reviews</h4>
                        </div>

                        <div className="flex flex-wrap gap-4 mt-8">
                            <p className="text-gray-800 text-3xl font-bold">${product.price}</p>
                          
                                                  </div>

                                                  <div>
                                                    <p>{product.description?.slice(0 ,300)+"..."}</p>
                                                  </div>
                                                  


                        <div className="flex flex-wrap gap-4 mt-8">
                            <button type="button" className="min-w-[200px] px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded">Buy now</button>
                            <button type="button" className="min-w-[200px] px-4 py-2.5 border border-blue-600 bg-transparent hover:bg-gray-50 text-gray-800 text-sm font-semibold rounded">Add to cart</button>
                        </div>
                    </div>
                </div>

                <div className="mt-16 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] p-6">
                    <h3 className="text-[25px] font-bold text-gray-800">Product information</h3>

                    <p className="mt-[20px] text-[15px]">{product.description}</p>
                    
                </div>

            </div>
        </div>
          
        </div>
      </div>
      <Footer/>

      </>
  );
}
