import React from 'react';

import Headers from '@/components/header';
import Footers from '@/components/footers';
import Aside from '@/components/aside';
import { FaCheckCircle, FaDownload } from 'react-icons/fa';
import { ImCancelCircle } from 'react-icons/im';

import Image from 'next/image';
import default_picture from '../assets/img/default.jpg';

export default function Succes() {
  return (
    <div className="min-h-screen">
      <Headers />
      <div className="flex bg-[#E8F6EF] px-[100px] py-[50px] gap-4 h-full ">
        <Aside />
        <div className="flex-1 bg-white rounded-3xl flex p-8">
          <div className="h-full w-full flex flex-col gap-4">
            {/* succes */}
            <div className="flex gap-4 flex-col items-center">
              <div className="">
                <FaCheckCircle size={80} color="green" />
              </div>
              <div className="font-bold">Transfer Success</div>
            </div>
            {/* failed */}
            <div className="flex gap-4 flex-col items-center">
              <div className="">
                <ImCancelCircle size={80} color="red" />
              </div>
              <div className="font-bold">Transfer Failed</div>
              <p className="w-[590px] text-center ">
                We can’t transfer your money at the moment, we recommend you to check your internet connection and try
                again.
              </p>
            </div>

            <div className="flex bg-white shadow-xl rounded-xl p-6 ">
              <div className="w-full flex  items-center gap-4 ">
                <div className="flex flex-col ">
                  <div className="text-[16px] font-bold ">Amount</div>
                  <div className="text-[22px] font-bold">Rp100.000</div>
                </div>
              </div>
            </div>
            <div className="flex bg-white shadow-xl rounded-xl p-6 ">
              <div className="w-full flex  items-center gap-4 ">
                <div className="flex flex-col ">
                  <div className="text-[16px] font-bold ">Balance Left</div>
                  <div className="text-[22px] font-bold">Rp10.000</div>
                </div>
              </div>
            </div>
            <div className="flex bg-white shadow-xl rounded-xl p-6 ">
              <div className="w-full flex  items-center gap-4 ">
                <div className="flex flex-col ">
                  <div className="text-[16px] font-bold ">Date & Time</div>
                  <div className="text-[22px] font-bold">May 11, 2020 - 12.20</div>
                </div>
              </div>
            </div>
            <div className="flex bg-white shadow-xl rounded-xl p-6 ">
              <div className="w-full flex  items-center gap-4 ">
                <div className="flex flex-col ">
                  <div className="text-[16px] font-bold ">Notes</div>
                  <div className="text-[22px] font-bold">Paymanet Token Listrik</div>
                </div>
              </div>
            </div>
            <div className="font-bold text-[18px] ">Transfer To</div>
            <div className="flex bg-white shadow-xl rounded-xl p-6 ">
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
            <div className="flex gap-3 justify-end">
              <button className="flex gap-3 btn bg-[#69BEB9] normal-case">
                <div>
                  <FaDownload />
                </div>
                <div>Download PDF</div>
              </button>

              {/* You can open the modal using ID.showModal() method */}
              <button className="btn btn-primary normal-case" onClick={() => window.my_modal_3.showModal()}>
                Confirmation
              </button>
              <dialog id="my_modal_3" className="modal">
                <form method="dialog" className="modal-box">
                  <button htmlFor="my-modal-3" className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                    ✕
                  </button>
                  <h3 className="font-bold text-lg">Enter PIN to Transfer</h3>
                  <p className="py-4 w-[320px] ">
                    Enter your 6 digits PIN for confirmation to continue transferring money.
                  </p>
                </form>
              </dialog>
              <button className=" btn bg-[#69BEB9] normal-case">
                <div>Try Again</div>
              </button>
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
