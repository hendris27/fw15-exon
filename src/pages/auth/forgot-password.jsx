import React from 'react';
import Link from 'next/link';
import { GoMail } from 'react-icons/go';
import { BiLock } from 'react-icons/bi';

import Image from 'next/image';
import logo from '../../assets/img/logo.png';
import bg_login_side from '../../assets/img/bg_login_side.png';

export default function ForgotPassword() {
  return (
    <div className="flex h-screen">
      <div className="bg-login w-[60%] bg-cover bg-no-repeat md:block hidden flex flex-col items-center px-12 py-8">
        <div className="">
          <Link href="/">
            <Image src={logo} className="w-[155px] h-[40px]" alt="picture_logo" />
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
      <div className="bg-white flex flex-1 pl-16 pr-[110px] py-8 justify-center items-center">
        <div className="">
          <form className="flex flex-col gap-3 w-full ">
            <div className="text-[24px] leading-[33px] font-bold w-full pr-8">
              <div> Did You Forgot Your Password? Don’t Worry, You Can Reset Your Password In a Minutes.</div>
            </div>
            <div className="font-semi-bold text-[16px] leading-[30px] ">
              To reset your password, you must type your e-mail and we will send a link to your email and you will be
              directed to the reset password screens.
            </div>
            <div className="relative border-b-2 w-full">
              <input
                type="email"
                placeholder="Enter your e-mail"
                className="input w-full  pl-10 outline-none hover:outline-none hover:border-0"
              />
              <div className="absolute bottom-2 left-0">
                <GoMail size={30} />
              </div>
            </div>

            <div className="w-full pt-12">
              <button className="btn  bg-[#69BEB9] normal-case w-full">Confirm</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
