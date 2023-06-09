import React from 'react';
import { RxDashboard } from 'react-icons/rx';
import { AiOutlineArrowUp, AiOutlinePlus, AiOutlineUser, AiOutlineLogout } from 'react-icons/ai';

export default function Aside() {
  return (
    <div className="max-h-full bg-white shadow-2xl w-[30%] py-8 px-6 rounded-3xl flex flex-col  justify-between ">
      <div className="flex flex-col gap-8">
        <button className="flex gap-8 ">
          <div>
            <RxDashboard size={25} color="#69BEB9" />
          </div>
          <div className="font-bold text-[#69BEB9]">Dashboard</div>
        </button>
        <button className="flex gap-8 ">
          <div>
            <AiOutlineArrowUp size={25} color="#69BEB9" />
          </div>
          <div className="font-bold text-[#69BEB9]">Transfer</div>
        </button>
        <button className="flex gap-8 ">
          <div>
            <AiOutlinePlus size={25} color="#69BEB9" />
          </div>
          <div className="font-bold text-[#69BEB9]">Top Up</div>
        </button>
        <button className="flex gap-8 ">
          <div>
            <AiOutlineUser size={25} color="#69BEB9" />
          </div>
          <div className="font-bold text-[#69BEB9]">Profile</div>
        </button>
      </div>
      <button className="flex gap-8 ">
        <div>
          <AiOutlineLogout size={25} color="red" />
        </div>
        <div className="font-bold text-[#FF0000]">Logout</div>
      </button>
    </div>
  );
}
