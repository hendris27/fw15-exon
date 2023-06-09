import React from 'react';

import Headers from '@/components/header';
import Footers from '@/components/footers';
import Aside from '@/components/aside';
import { BiLock } from 'react-icons/bi';

export default function ChangePassword() {
  return (
    <div className="min-h-screen">
      <Headers />
      <div className="flex bg-[#E8F6EF] px-[100px] py-[50px] gap-4 h-full ">
        <Aside />
        <div className="flex-1 bg-white rounded-3xl flex px-12 py-16">
          <div className="h-full w-full flex flex-col gap-4">
            <div className="flex flex-col gap-4">
              <div className="font-bold text-[18px] ">Change Password</div>
              <div className="font-normal text-[16px] w-[340px] ">
                You must enter your current password and then type your new password twice.
              </div>
            </div>
            <div className=" flex flex-col gap-12 items-center pt-12 px-4 ">
              <div className=" w-[400px] ">
                <div className="flex border-b-2 gap-4 items-center justify-center w-full p-2">
                  <div className="flex w-8 ">
                    <BiLock size={30} />
                  </div>
                  <div className="w-full flex flex-1">
                    <input
                      type="password"
                      placeholder="Current password"
                      className="flex flex-1 border-0 outline-none"
                    />
                  </div>
                </div>
              </div>
              <div className=" w-[400px] ">
                <div className="flex border-b-2 gap-4 items-center justify-center w-full p-2">
                  <div className="flex w-8 ">
                    <BiLock size={30} />
                  </div>
                  <div className="w-full flex flex-1">
                    <input type="password" placeholder="New password" className="flex flex-1 border-0 outline-none" />
                  </div>
                </div>
              </div>
              <div className=" w-[400px] ">
                <div className="flex border-b-2 gap-4 items-center justify-center w-full p-2">
                  <div className="flex w-8 ">
                    <BiLock size={30} />
                  </div>
                  <div className="w-full flex flex-1">
                    <input
                      type="password"
                      placeholder="Repeat new password"
                      className="flex flex-1 border-0 outline-none"
                    />
                  </div>
                </div>
              </div>
              <div className="w-[400px] ">
                <button className="btn btn-accent w-full normal-case"> Change Password</button>
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
