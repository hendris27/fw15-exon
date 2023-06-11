import React from 'react';
import Image from 'next/image';
import default_picture from '../assets/img/default.jpg';
import logo from '../assets/img/logo-home.png';
import Link from 'next/link';
import { MdNotificationsNone } from 'react-icons/md';
import { AiOutlineArrowUp, AiOutlineUser, AiOutlineLogout } from 'react-icons/ai';

export default function Header() {
  return (
    <div className="rounded-b-[20px] shadow-2xl flex justify-between px-[100px] py-8 items-center h-24">
      <div className="">
        <Link href="/home">
          <Image src={logo} className="w-[105px] h-[30px]" alt="picture_logo" />
        </Link>
      </div>
      <div className="flex gap-4 items-center">
        <div className="dropdown dropdown-bottom dropdown-end">
          <label tabIndex={0} className="btn m-1 bg-white outline-none border-0 hover:bg-white ">
            <div className="rounded-xl overflow-hidden h-14 w-14 border-4 border-[#444cd4]">
              <Image src={default_picture} className="w-full h-full" alt="picture_logo" />
            </div>
          </label>
          <ul
            tabIndex={0}
            className="dropdown-content menu p-2 shadow  bg-base-100 rounded-box w-[200px] px-2s flex flex-col items-center justify-between "
          >
            <li>
              <Link href="/profile/profile" className="hover:bg-white">
                <div className="flex gap-4 hover:bg-white items-center justify-center">
                  <div>
                    <AiOutlineUser size={30} />
                  </div>
                  <div className="font-bold text-medium hover:bg-white hover:text-accent ">My Profile</div>
                </div>
              </Link>
            </li>
            <div className="border-b-2 w-full hover:bg-white"></div>
            <li className="font-bold text-primary">
              <div className="hover:bg-white flex gap2 ">
                <AiOutlineLogout size={25} color="red" />
                <div className="text-[#ff0000] font-bold hover:text-[16px] ">Logout</div>
              </div>
            </li>
          </ul>
        </div>
        <div className="flex flex-col gap-1">
          <div>name</div>
          <div>phone number</div>
        </div>
        <div className="dropdown dropdown-bottom dropdown-end">
          <label tabIndex={0} className="btn m-1 bg-white outline-none border-0 hover:bg-white ">
            <MdNotificationsNone size={30} />
          </label>
          <ul
            tabIndex={0}
            className="dropdown-content menu p-2 shadow  bg-base-100 rounded-box w-[350px] px-2s flex flex-col items-center justify-between "
          >
            <li>
              <div className="flex flex-col gap-4 hover:bg-white items-center justify-center p-2">
                <div className="flex bg-white rounded-xl shadow-xl w-[320px] gap-6 p-5 hover:bg-green-100">
                  <div>
                    <AiOutlineArrowUp size={25} color="#69BEB9" />
                  </div>
                  <div className="flex flex-col gap-3">
                    <div className="text-[14px]">Accept from Joshua Lee</div>
                    <div className="text-[18px] font-bold">Rp220.000</div>
                  </div>
                </div>
                <div className="flex bg-white rounded-xl shadow-xl w-[320px] gap-6 p-5">
                  <div>
                    <AiOutlineArrowUp size={25} color="#69BEB9" />
                  </div>
                  <div className="flex flex-col gap-3">
                    <div className="text-[14px]">Accept from Joshua Lee</div>
                    <div className="text-[18px] font-bold">Rp220.000</div>
                  </div>
                </div>
              </div>
            </li>
            <div className="border-b-2 w-full hover:bg-white"></div>
            <li className="font-bold text-primary">
              <div className="hover:bg-white flex gap2 ">
                <button className="text-accent font-bold hover:text-[16px] ">See More</button>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}