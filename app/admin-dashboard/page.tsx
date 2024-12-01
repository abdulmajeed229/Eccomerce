"use client";

import { useState, useEffect } from "react";
import { db } from "../Database/firebase.config";
import { collection, getDocs, addDoc, deleteDoc, doc, updateDoc } from "firebase/firestore";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
}

interface Order {
  id: string;
  userId: string;
  productName: string;
  quantity: number;
  totalPrice: number;
  status: string;
}

const AdminDashboard: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    price: 0,
    imageUrl: "",
  });
  const [showForm, setShowForm] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const checkAdminAccess = () => {
      const adminValue = localStorage.getItem("admin");
      if (adminValue !== "Y8$Fw#1kLxP@z9d3R6Vq*J&0N4oX^T7Zb!CmKaU%5W2YQHt") {
        router.push("/home");
      }
    };

    const fetchProducts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "products"));
        const productsList: Product[] = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Product[];
        setProducts(productsList);
      } catch (error) {
        console.error("Error fetching products: ", error);
      }
    };

    const fetchOrders = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "orders"));
        const ordersList: Order[] = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Order[];
        setOrders(ordersList);
      } catch (error) {
        console.error("Error fetching orders: ", error);
      }
    };

    checkAdminAccess();
    fetchProducts();
    fetchOrders();
  }, [router]);

  const handleAddProduct = async () => {
    if (!newProduct.name || !newProduct.description || !newProduct.price || !newProduct.imageUrl) {
      alert("All fields are required!");
      return;
    }

    try {
      await addDoc(collection(db, "products"), {
        name: newProduct.name,
        description: newProduct.description,
        price: newProduct.price,
        imageUrl: newProduct.imageUrl,
      });
      setNewProduct({ name: "", description: "", price: 0, imageUrl: "" });
      setShowForm(false);
      alert("Product added successfully!");
    } catch (error) {
      console.error("Error adding product: ", error);
    }
  };

  const handleDeleteProduct = async (id: string) => {
    try {
      await deleteDoc(doc(db, "products", id));
      alert("Product deleted successfully!");
      setProducts(products.filter((product) => product.id !== id));
    } catch (error) {
      console.error("Error deleting product: ", error);
    }
  };

  const handleEditProduct = async (id: string) => {
    const updatedName = prompt("Enter new name") || "";
    const updatedDescription = prompt("Enter new description") || "";
    const updatedPrice = parseFloat(prompt("Enter new price") || "0");

    if (!updatedName || !updatedDescription || updatedPrice <= 0) {
      alert("All fields are required and price must be greater than 0.");
      return;
    }

    try {
      const productRef = doc(db, "products", id);
      await updateDoc(productRef, {
        name: updatedName,
        description: updatedDescription,
        price: updatedPrice,
      });
      alert("Product updated successfully!");
    } catch (error) {
      console.error("Error updating product: ", error);
    }
  };

  return (
    <div className="relative bg-[#f7f6f9] h-full min-h-screen font-[sans-serif]">
      <div className="flex items-start">
        <nav id="sidebar" className="lg:min-w-[250px] w-max max-lg:min-w-8">
          <div
            id="sidebar-collapse-menu"
            className="bg-white shadow-lg h-screen fixed top-0 left-0 overflow-auto z-[99] lg:min-w-[250px] lg:w-max max-lg:w-0 max-lg:invisible transition-all duration-500"
          >
            <div className="flex items-center gap-2 pt-6 pb-2 px-4 sticky top-0 bg-white min-h-[64px] z-[100]">
              <a href="">
                <img
                  src="https://readymadeui.com/readymadeui.svg"
                  alt="logo"
                  className="w-[140px]"
                />
              </a>
              <button id="close-sidebar" className="lg:hidden ml-auto">
                <svg
                  className="w-7 h-7"
                  fill="#000"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </button>
            </div>
            <div className="py-4 px-4">
              <ul className="space-y-2">
                <li>
                  <a
                    href=""
                    className="text-gray-800 text-sm flex items-center cursor-pointer hover:bg-gray-100 rounded-md px-3 py-2.5 transition-all duration-300"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      className="w-[18px] h-[18px] mr-3"
                      viewBox="0 0 24 24"
                    >
                      <path
                        d="M19.56 23.253H4.44a4.051 4.051 0 0 1-4.05-4.05v-9.115c0-1.317.648-2.56 1.728-3.315l7.56-5.292a4.062 4.062 0 0 1 4.644 0l7.56 5.292a4.056 4.056 0 0 1 1.728 3.315v9.115a4.051 4.051 0 0 1-4.05 4.05zM12 2.366a2.45 2.45 0 0 0-1.393.443l-7.56 5.292a2.433 2.433 0 0 0-1.037 1.987v9.115c0 1.34 1.09 2.43 2.43 2.43h15.12c1.34 0 2.43-1.09 2.43-2.43v-9.115c0-.788-.389-1.533-1.037-1.987l-7.56-5.292A2.438 2.438 0 0 0 12 2.377z"
                      />
                      <path
                        d="M16.32 23.253H7.68a.816.816 0 0 1-.81-.81v-5.4c0-2.83 2.3-5.13 5.13-5.13s5.13 2.3 5.13 5.13v5.4c0 .443-.367.81-.81.81zm-7.83-1.62h7.02v-4.59c0-1.933-1.577-3.51-3.51-3.51s-3.51 1.577-3.51 3.51z"
                      />
                    </svg>
                    <span className="overflow-hidden text-ellipsis whitespace-nowrap">
                      Dashboard
                    </span>
                  </a>
                </li>

                <li>
                  <a
                    href=""
                    className="text-gray-800 text-sm flex items-center cursor-pointer hover:bg-gray-100 rounded-md px-3 py-2.5 transition-all duration-300"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      className="w-[18px] h-[18px] mr-3"
                      viewBox="0 0 24 24"
                    >
                      <path
                        d="M21 19.25c0 .74-.61 1.34-1.35 1.34H4.35c-.74 0-1.35-.61-1.35-1.34v-5.4c0-.74.61-1.34 1.35-1.34h15.3c.74 0 1.35.61 1.35 1.34v5.4zM2.76 9.91a1.004 1.004 0 0 0-.19-.15c-.54-.37-.84-.96-.84-1.6 0-.29.07-.58.21-.83.39-.61 1.01-.95 1.74-.95 1.24 0 2.25.94 2.25 2.09 0 .74-.39 1.41-.99 1.76-.1.08-.21.16-.31.25-1.65 1.28-3.74 2.01-5.88 2.01-1.5 0-2.91-.25-4.25-.73-.88-.28-1.69-.65-2.46-1.14.42-.61.58-1.42.39-2.12-.2-.67-.64-1.26-1.16-1.74-.02-.02-.04-.03-.06-.05.53-.23 1.14-.31 1.74-.31s1.22.08 1.74.31c-.27-.48-.5-.99-.67-1.52.09-.09.19-.18.28-.27l-.46-.32z"
                      />
                    </svg>
                    <span>Orders</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        <div className="lg:flex-1 flex flex-col gap-10 px-10 pt-10 pb-6 w-full">
          <div className="flex justify-between mb-8">
            <h1 className="text-3xl font-semibold">Admin Dashboard</h1>
            <button
              onClick={() => setShowForm(!showForm)}
              className="bg-blue-500 text-white px-6 py-2 rounded-md"
            >
              {showForm ? "Close Add Product Form" : "Add Product"}
            </button>
          </div>

          {showForm && (
            <div className="bg-white shadow-md p-6 rounded-md">
              <h2 className="text-xl mb-4">Add New Product</h2>
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Product Name"
                  className="w-full p-3 border rounded-md"
                  value={newProduct.name}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, name: e.target.value })
                  }
                />
                <input
                  type="text"
                  placeholder="Product Description"
                  className="w-full p-3 border rounded-md"
                  value={newProduct.description}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, description: e.target.value })
                  }
                />
                <input
                  type="number"
                  placeholder="Product Price"
                  className="w-full p-3 border rounded-md"
                  value={newProduct.price}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, price: parseFloat(e.target.value) })
                  }
                />
                <input
                  type="text"
                  placeholder="Image URL"
                  className="w-full p-3 border rounded-md"
                  value={newProduct.imageUrl}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, imageUrl: e.target.value })
                  }
                />
                <button
                  onClick={handleAddProduct}
                  className="bg-green-500 text-white px-6 py-2 rounded-md"
                >
                  Add Product
                </button>
              </div>
            </div>
          )}

          <div>
            <h2 className="text-xl font-semibold mb-4">Product List</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="bg-white shadow-md rounded-md p-4"
                >
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-full h-48 object-cover rounded-md mb-4"
                  />
                  <h3 className="text-lg font-semibold">{product.name}</h3>
                  <p className="text-sm text-gray-600">{product.description}</p>
                  <p className="mt-2 text-lg font-bold">${product.price}</p>
                  <div className="mt-4 flex justify-between">
                    <button
                      onClick={() => handleEditProduct(product.id)}
                      className="bg-yellow-500 text-white px-4 py-2 rounded-md"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteProduct(product.id)}
                      className="bg-red-500 text-white px-4 py-2 rounded-md"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-4">Order List</h2>
            <div className="space-y-4">
              {orders.map((order) => (
                <div
                  key={order.id}
                  className="bg-white shadow-md rounded-md p-4"
                >
                  <h3 className="text-lg font-semibold">{order.productName}</h3>
                  <p className="text-sm text-gray-600">User ID: {order.userId}</p>
                  <p className="mt-2">Quantity: {order.quantity}</p>
                  <p className="mt-2">Total Price: ${order.totalPrice}</p>
                  <p className="mt-2">Status: {order.status}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
