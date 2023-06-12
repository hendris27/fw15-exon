import React from 'react';

import Headers from '@/components/Header';
import Footers from '@/components/Footers';
import Aside from '@/components/Aside';
import Link from 'next/link';

export default function DetailProfile() {
  return (
    <div className="min-h-screen">
      <Headers />
      <div className="flex bg-[#E8F6EF] px-[100px] py-[50px] gap-4 h-full ">
        <Aside />
        <div className="flex-1 bg-white rounded-3xl flex p-8">
          <div className="h-full w-full flex flex-col gap-4">
            <div className="flex flex-col gap-4">
              <div className="font-bold text-[18px] ">Personal Information</div>
              <div className="font-normal text-[16px] w-[340px] ">
                We got your personal information from the sign up proccess. If you want to make changes on your
                information, contact our support.
              </div>
            </div>
            <div className="flex bg-white shadow-xl rounded-xl p-6 ">
              <div className="w-full flex  items-center gap-4 ">
                <div className="flex flex-col ">
                  <div className="text-[16px] font-bold ">First Name</div>
                  <div className="text-[22px] font-bold">Hendri</div>
                </div>
              </div>
            </div>
            <div className="flex bg-white shadow-xl rounded-xl p-6 ">
              <div className="w-full flex  items-center gap-4 ">
                <div className="flex flex-col ">
                  <div className="text-[16px] font-bold ">Last Name</div>
                  <div className="text-[22px] font-bold">Setiadi</div>
                </div>
              </div>
            </div>
            <div className="flex bg-white shadow-xl rounded-xl p-6 ">
              <div className="w-full flex  items-center gap-4 ">
                <div className="flex flex-col ">
                  <div className="text-[16px] font-bold ">First Name</div>
                  <div className="text-[22px] font-bold">pewdiepie1@gmail.com</div>
                </div>
              </div>
            </div>
            <div className="flex justify-between items-center bg-white shadow-xl rounded-xl p-6 ">
              <div className="w-full flex  items-center gap-4 ">
                <div className="flex flex-col ">
                  <div className="text-[16px] font-bold ">Phone Number</div>
                  <div className="text-[22px] font-bold">+62 813-9387-7946</div>
                </div>
              </div>
              <div className="flex justify-center">
                <Link href="/profile/manage-phone-number">
                  <button className="text-accent hover:font-bold">Manage</button>
                </Link>
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
