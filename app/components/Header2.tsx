"use client"
import '@fortawesome/fontawesome-free/css/all.min.css';
import Image from 'next/image';
import { useState } from 'react';

function HeaderNew() {
  return (
    <header className="h-[40px] flex items-center justify-between p-4 border-b text-white border-gray-200 bg-[#00BAF2]">
      {/* Shipping Info */}
      <div className='flex text-white'>
        <h4>Free shipping on orders over $99</h4>
      </div>

      {/* Language Selector */}
      <div>
        <select className='bg-transparent text-white outline-none transition-all duration-300 ease-in-out transform hover:scale-105 focus:scale-105'>
          <option value="" className='text-black '>English</option>
          <option value="" className='text-black'>Arabic</option>
          <option value="" className='text-black'>Urdu</option>
        </select>
      </div>
    </header>
  );
}

export default HeaderNew;
