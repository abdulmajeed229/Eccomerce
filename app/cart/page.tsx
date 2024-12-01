import { getDocs, collection } from "firebase/firestore";
import { db } from "@/app/Database/firebase.config";
import Image from "next/image";
// import { Button } from "@/components/ui/button";
import Header from "../components/Header";

interface CartItem {
  id: string;
  productId: string;
  name: string;
  price: number;
  imageUrl: string;
  quantity: number;
}

async function getCartItems() {
  const cartCollection = collection(db, "cart");
  const cartSnapshot = await getDocs(cartCollection);
  return cartSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as CartItem[];
}

export default async function CartPage() {
  const cartItems = await getCartItems();

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <>
    <Header/>
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          {cartItems.map((item) => (
            <div key={item.id} className="flex items-center border-b py-4">
              <Image
                src={item.imageUrl}
                alt={item.name}
                width={100}
                height={100}
                className="object-cover mr-4"
              />
              <div className="flex-grow">
                <h2 className="text-lg font-semibold">{item.name}</h2>
                <p className="text-gray-600">Quantity: {item.quantity}</p>
                <p className="text-gray-600">Price: ${item.price}</p>
              </div>
              <p className="font-bold">${item.price * item.quantity}</p>
            </div>
          ))}
          <div className="mt-4 text-right">
            <p className="text-xl font-bold">Total: ${total.toFixed(2)}</p>
            <button className="mt-4">Checkout</button>
          </div>
        </div>
      )}
    </div>
      </>
  );
}

