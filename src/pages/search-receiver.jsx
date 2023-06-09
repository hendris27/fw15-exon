import React from 'react';

import { BsSearch } from 'react-icons/bs';
import Headers from '@/components/header';
import Footers from '@/components/footers';
import Aside from '@/components/aside';

import Image from 'next/image';
import default_picture from '../assets/img/default.jpg';

export default function Home() {
  return (
    <div className="h-screen">
      <Headers />
      <div className="flex bg-[#E8F6EF] px-[100px] py-[50px] gap-4 h-full ">
        <Aside />
        <div className="flex-1 bg-white rounded-3xl flex flex-col gap-4 p-8">
          <div className="flex justify-between">
            <div className="font-bold">Search Receiver</div>
          </div>
          <div className="bg-gray-100 flex gap-4  px-4 py-2 shadow-xl rounded-xl items-center">
            <div className="flex w-[5%]">
              <BsSearch size={25} />
            </div>
            <div className=" flex-1 w-full">
              <input
                type="text"
                className="w-full input bg-gray-100 border-0 outline-none hover:border-0 hover:outline-none"
                placeholder="Search receiver here"
              />
            </div>
          </div>
          <div className="flex bg-red-100 shadow-xl rounded-xl ">
            <div className="w-full flex  items-center gap-4 ">
              <div className="rounded-xl overflow-hidden h-14 w-14 border-[#444cd4]">
                <Image src={default_picture} className="w-full h-full" alt="picture_logo" />
              </div>
              <div className="flex flex-col ">
                <div className="text-[16px] font-bold ">Samuel Suhi</div>
                <div className="text-[14px]">Accept</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <footer>
        <Footers />
      </footer>
    </div>
  );
}
