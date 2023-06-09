import React from 'react';
import Link from 'next/link';

import Image from 'next/image';
import logo from '../../assets/img/logo.png';
import bg_login_side from '../../assets/img/bg_login_side.png';

import { useState } from 'react';

export default function CreatePin() {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);

  const handleOtpChange = (e, index) => {
    const newOtp = [...otp];
    newOtp[index] = e.target.value;
    setOtp(newOtp);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };
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
          <div className="flex flex-col gap-3 w-full ">
            <div className="text-[24px] leading-[33px] font-bold w-full pr-8">
              <div> Secure Your Account, Your Wallet, and Your Data With 6 Digits PIN That You Created Yourself.</div>
            </div>
            <div className="font-semi-bold text-[16px] leading-[30px] ">
              Create 6 digits pin to secure all your money and your data in FazzPay app. Keep it secret and don’t tell
              anyone about your FazzPay account password and the PIN.
            </div>
            <div className="w-full">
              <form onSubmit={handleSubmit}>
                <div className="flex gap-4">
                  {otp.map((value, index) => (
                    <input
                      key={index}
                      type="text"
                      value={value}
                      onChange={(e) => handleOtpChange(e, index)}
                      maxLength={1}
                      className="w-12 h-12 text-center border border-gray-300 rounded"
                    />
                  ))}
                </div>
                <div className="w-full pt-12">
                  <button type="submit" className="btn  bg-[#69BEB9] normal-case w-full">
                    Confirm
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
