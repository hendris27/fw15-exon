import React from 'react';
import Link from 'next/link';
import { GoMail } from 'react-icons/go';
import { BiLock } from 'react-icons/bi';
import { AiOutlineUser } from 'react-icons/ai';
import Image from 'next/image';
import bg_login_side from '../../assets/img/bg_login_side.png';
import logo from '../../assets/img/logo.png';

export default function register() {
  return (
    <div className="flex min-h-screen">
      <div className="bg-login w-[60%] bg-cover bg-no-repeat md:block hidden flex flex-col items-center px-12 py-8">
        <div className="">
          <Link href="/">
            <Image src={logo} className="w-[85px] h-[20px]" alt="picture_logo" />
          </Link>
        </div>
        <div className="flex flex-col gap-8  items-center justify-center">
          <Image src={bg_login_side} className="w-[45%] h-[100%]" alt="picture_bg" />

          <div className="font-bold text-[24px] ">App that Covering Banking Needs.</div>
          <div className="text-left w-[498px] ">
            Exon is an application that focussing in banking needs for all users in the world. Always updated and always
            following world trends. 5000+ users registered in FazzPay everyday with worldwide users coverage.
          </div>
        </div>
      </div>
      <div className="bg-white flex flex-1 pl-16 pr-[110px] py-4  justify-center items-center">
        <div className="">
          <form className="flex flex-col gap-3 w-full ">
            <div className="text-[24px] leading-[33px] font-bold w-full pr-8">
              <div> Start Accessing Banking Needs With All Devices and All Platforms With 30.000+ Users</div>
            </div>
            <div className="font-semi-bold text-[16px] leading-[30px] ">
              Transfering money is eassier than ever, you can access Exon wherever you are. Desktop, laptop, mobile
              phone? we cover all of that for you!
            </div>
            <div className="relative border-b-2 w-full">
              <input
                type="text"
                placeholder="Enter your firstname"
                className="input w-full  pl-10 outline-none hover:outline-none hover:border-0"
              />
              <div className="absolute bottom-2 left-0">
                <AiOutlineUser size={30} />
              </div>
            </div>
            <div className="relative border-b-2 w-full">
              <input
                type="text"
                placeholder="Enter your lastname"
                className="input w-full  pl-10 outline-none hover:outline-none hover:border-0"
              />
              <div className="absolute bottom-2 left-0">
                <AiOutlineUser size={30} />
              </div>
            </div>
            <div className="relative border-b-2 w-full">
              <input
                type="password"
                placeholder="Enter your password"
                className="input w-full  pl-10 outline-none hover:outline-none hover:border-0"
              />
              <div className="absolute bottom-2 left-0">
                <GoMail size={30} />
              </div>
            </div>
            <div className="relative border-b-2 w-full">
              <input
                type="password"
                placeholder="Enter your password"
                className="input w-full  pl-10 outline-none hover:outline-none hover:border-0"
              />
              <div className="absolute bottom-2 left-0">
                <BiLock size={30} />
              </div>
            </div>
            <div className="w-full pt-2">
              <button className="btn  bg-[#69BEB9] normal-case w-full">Register</button>
            </div>
          </form>
          <div className="flex pt-4 flex justify-center text-center">
            <div className="text-center">
              Already have an account?
              <Link className="font-bold" href="/auth/login">
                Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
