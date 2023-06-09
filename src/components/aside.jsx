import React from 'react';
import { RxDashboard } from 'react-icons/rx';
import { AiOutlineArrowUp, AiOutlinePlus, AiOutlineUser, AiOutlineLogout } from 'react-icons/ai';
import Link from 'next/link';

export default function Aside() {
  return (
    <div className="max-h-full bg-white shadow-2xl w-[30%] py-8 px-6 rounded-3xl flex flex-col  justify-between ">
      <div className="flex flex-col gap-8">
        <Link href="/home">
          <button className="flex gap-8 ">
            <div>
              <RxDashboard size={25} color="#69BEB9" />
            </div>
            <div className="font-bold text-[#69BEB9]">Dashboard</div>
          </button>
        </Link>
        <Link href="/transaction/transfer">
          <button className="flex gap-8 ">
            <div>
              <AiOutlineArrowUp size={25} color="#69BEB9" />
            </div>
            <div className="font-bold text-[#69BEB9]">Transfer</div>
          </button>
        </Link>
        <button className="flex gap-8 items-center ">
          <div>
            <AiOutlinePlus size={25} color="#69BEB9" />
          </div>
          <div>
            {/* Open the modal using ID.showModal() method */}
            <button
              className="btn bg-transparent outline-none border-0 ml-[-16px] hover:bg-transparent hover:outline-none"
              onClick={() => window.my_modal_5.showModal()}
            >
              <div className='className="font-bold text-[#69BEB9] normal-case text-[16px]"'>Top Up</div>
            </button>
            <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
              <form method="dialog" className="modal-box flex flex-col justify-starts">
                <h3 className="font-bold text-lg">Top Up</h3>
                <p className="py-4">Enter the amount of money, and click submit</p>
                <div className="modal-action">
                  <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                </div>
                <div className="flex flex-col gap-4">
                  <div>
                    <input type="number" className="input input-bordered w-full" />
                  </div>
                  <div>
                    <button type="submit" className="btn btn-primary w-[120px] rounded-2xl ">
                      Submit
                    </button>
                  </div>
                </div>
              </form>
            </dialog>
          </div>
        </button>

        <Link href="/profile/profile">
          <button className="flex gap-8 ">
            <div>
              <AiOutlineUser size={25} color="#69BEB9" />
            </div>
            <div className="font-bold text-[#69BEB9]">Profile</div>
          </button>
        </Link>
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
