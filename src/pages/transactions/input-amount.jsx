import React from 'react';

import Headers from '@/components/Header';
import Footers from '@/components/Footers';
import Aside from '@/components/Aside';
import { AiOutlineEdit } from 'react-icons/ai';
import Link from 'next/link';

import Image from 'next/image';
import default_picture from '../../assets/img/default.jpg';

export default function InputAmount() {
  return (
    <div className="h-min-screen">
      <Headers />
      <div className="flex bg-[#E8F6EF] px-[100px] py-[50px] gap-4 h-full ">
        <Aside />
        <div className="flex-1 bg-white rounded-3xl flex flex-col gap-4 p-8">
          <div className="flex justify-between">
            <div className="font-bold">Transfer Money</div>
          </div>
          <div className="flex bg-white shadow-xl rounded-xl p-5 ">
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
          <div className="w-[336px] pt-8 ">
            Type the amount you want to transfer and then press continue to the next steps.
          </div>
          <div className="flex flex-col justify-center items-center pt-24 gap-8">
            <div className="flex flex-col gap-4 items-center justify-center">
              <div className="text-center flex items-center">
                <input type="number" placeholder="00.00" className="input text-center w-72 text-[50px] max-w-xs" />
              </div>
              <div className="font-bold">Rp120.000 Available</div>
              <div className="flex gap-2  border-b-2 items-center w-full">
                <div>
                  <AiOutlineEdit />
                </div>
                <div>
                  <input type="text" placeholder="Add some note" className="text-[#A9A9A9] border-0 outline-none" />
                </div>
              </div>
            </div>
          </div>
          <button className="flex justify-end pt-24">
            <Link href="/transactions/confirmation">
              <button className="btn btn-primary normal-case w-[200px] rounded-2xl ">Continue</button>
            </Link>
          </button>
        </div>
      </div>
      <footer>
        <Footers />
      </footer>
    </div>
  );
}
