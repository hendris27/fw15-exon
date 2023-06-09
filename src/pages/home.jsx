import React from 'react';

import { AiOutlineArrowUp, AiOutlineArrowDown, AiOutlinePlus } from 'react-icons/ai';
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
        <div className="flex-1 rounded-3xl flex flex-col gap-4">
          <div className="bg-[#69BEB9] shadow-2xl flex justify-between h-[180px] rounded-3xl px-8 py-8">
            <div className=" flex flex-col justify-between">
              <div className="text-[18px] text-[##DFDCDC] ">Balance</div>
              <div className="text-[40px] font-bold text-white">Rp120.000</div>
              <div className="text-[14px] text-[##DFDCDC] ">+62 813-9387-7946</div>
            </div>
            <div className="flex flex-col gap-4 justify-between">
              <div className="w-[162px]">
                <button className="w-full flex gap-4 btn btn-primary rounded-xl normal-case">
                  <div>
                    <AiOutlineArrowUp size={25} color="white" />
                  </div>
                  <div className="text-white">Transfer</div>
                </button>
              </div>
              <div className="w-[162px]">
                <button className="w-full flex gap-4 btn btn-primary rounded-xl normal-case">
                  <div>
                    <AiOutlinePlus size={25} color="white" />
                  </div>
                  <div className="text-white">Top Up</div>
                </button>
              </div>
            </div>
          </div>
          <div className="flex-1 flex gap-4">
            <div className="bg-white shadow-2xl w-[55%] rounded-3xl flex flex-col px-8 pt-8">
              <div className="flex justify-between">
                <div className="flex flex-col gap-2">
                  <div>
                    <AiOutlineArrowDown size={25} color="green" />
                  </div>
                  <div>Income</div>
                  <div>Rp2.120.000</div>
                </div>
                <div className="flex flex-col gap-2">
                  <div>
                    <AiOutlineArrowUp size={25} color="red" />
                  </div>
                  <div>Expense</div>
                  <div>Rp1.560.000</div>
                </div>
              </div>
            </div>
            <div className="bg-white  shadow-2xl flex-1 rounded-3xl flex flex-col gap-4 p-8">
              <div className="flex justify-between">
                <div className="font-bold">Transaction History</div>
                <button className="font-bold text-accent">See All</button>
              </div>
              <div className="flex justify-between items-center ">
                <div className="flex justify-center items-center gap-2">
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
        </div>
      </div>
      <footer>
        <Footers />
      </footer>
    </div>
  );
}
