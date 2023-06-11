import React from 'react';

import { RxDashboard } from 'react-icons/rx';
import { AiOutlineArrowUp, AiOutlineArrowDown, AiOutlinePlus, AiOutlineUser, AiOutlineLogout } from 'react-icons/ai';
import Headers from '@/components/Header';
import Footers from '@/components/Footers';
import Image from 'next/image';
import default_picture from '../assets/img/default.jpg';

export default function Home() {
  return (
    <div className="h-screen">
      <Headers />
      <div className="flex bg-[#E8F6EF] px-[100px] py-[50px] gap-4 h-full ">
        <div className="bg-white shadow-2xl w-[30%] py-8 px-6 rounded-3xl flex flex-col  justify-between ">
          <div className="flex flex-col gap-8">
            <div className="flex gap-8 ">
              <div>
                <RxDashboard size={25} color="#69BEB9" />
              </div>
              <div className="font-bold text-[#69BEB9]">Dashboard</div>
            </div>
            <div className="flex gap-8 ">
              <div>
                <AiOutlineArrowUp size={25} color="#69BEB9" />
              </div>
              <div className="font-bold text-[#69BEB9]">Transfer</div>
            </div>
            <div className="flex gap-8 ">
              <div>
                <AiOutlinePlus size={25} color="#69BEB9" />
              </div>
              <div className="font-bold text-[#69BEB9]">Top Up</div>
            </div>
            <div className="flex gap-8 ">
              <div>
                <AiOutlineUser size={25} color="#69BEB9" />
              </div>
              <div className="font-bold text-[#69BEB9]">Profile</div>
            </div>
          </div>
          <div className="flex gap-8 ">
            <div>
              <AiOutlineLogout size={25} color="red" />
            </div>
            <div className="font-bold text-[#FF0000]">Logout</div>
          </div>
        </div>
        <div className="flex-1 bg-white rounded-3xl flex flex-col gap-4 p-8">
          <div className="flex justify-between">
            <div className="font-bold">Transaction History</div>
            <div className="dropdown">
              <label tabIndex={0} className="btn m-1">
                --Select Filter--
              </label>
              <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
                <li>
                  <a>Name</a>
                </li>
                <li>
                  <a>Date</a>
                </li>
              </ul>
            </div>
          </div>
          <div className="flex justify-between items-center ">
            <div className="flex justify-center items-center gap-4">
              <div className="rounded-xl overflow-hidden h-14 w-14 border-[#444cd4]">
                <Image src={default_picture} className="w-full h-full" alt="picture_logo" />
              </div>
              <div className="flex flex-col">
                <div className="text-[16px] font-bold ">Samuel Suhi</div>
                <div className="text-[14px]">Accept</div>
              </div>
            </div>
            <div className="font-bold text-accent">+Rp50.000</div>
          </div>
        </div>
      </div>
      <footer>
        <Footers />
      </footer>
    </div>
  );
}
