import React from 'react';

import Headers from '@/components/Header';
import Footers from '@/components/Footers';
import Aside from '@/components/Aside';
import { BiLock } from 'react-icons/bi';
import { useState } from 'react';
import { FaEye } from 'react-icons/fa';
import { FaEyeSlash } from 'react-icons/fa';

export default function ChangePassword() {
  const [openCurrentPassword, setOpenCurrentPassword] = useState(false);
  const [openNewPassword, setOpenNewPassword] = useState(false);
  const [openConfirmNewPassword, setOpenConfirmNewPassword] = useState(false);

  function showEyeCurrentPassword() {
    setOpenCurrentPassword(!openCurrentPassword);
  }
  function showEyeNewPassword() {
    setOpenNewPassword(!openNewPassword);
  }
  function showEyeConfirmNewPassword() {
    setOpenConfirmNewPassword(!openConfirmNewPassword);
  }
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
                  <div className="relative w-full flex flex-1 bg-red-100">
                    <input
                      type={openCurrentPassword ? 'text' : 'password'}
                      placeholder="Current password"
                      className="flex flex-1 border-0 outline-none "
                    />
                    <button type="button" onClick={showEyeCurrentPassword}>
                      {openCurrentPassword ? (
                        <FaEye size={25} className="absolute bottom-2 right-2" />
                      ) : (
                        <FaEyeSlash size={25} className="absolute bottom-2 right-2" />
                      )}
                    </button>
                  </div>
                </div>
              </div>
              <div className=" w-[400px] ">
                <div className="flex border-b-2 gap-4 items-center justify-center w-full p-2">
                  <div className="flex w-8 ">
                    <BiLock size={30} />
                  </div>
                  <div className="w-full flex flex-1 relative">
                    <input
                      type={openNewPassword ? 'text' : 'password'}
                      placeholder="New password"
                      className="flex flex-1 border-0 outline-none"
                    />
                    <button type="button" onClick={showEyeNewPassword}>
                      {openNewPassword ? (
                        <FaEye size={25} className="absolute bottom-2 right-2" />
                      ) : (
                        <FaEyeSlash size={25} className="absolute bottom-2 right-2" />
                      )}
                    </button>
                  </div>
                </div>
              </div>
              <div className=" w-[400px] ">
                <div className="flex border-b-2 gap-4 items-center justify-center w-full p-2">
                  <div className="flex w-8 ">
                    <BiLock size={30} />
                  </div>
                  <div className="w-full flex flex-1 relative">
                    <input
                      type={openConfirmNewPassword ? 'text' : 'password'}
                      placeholder="Repeat new password"
                      className="flex flex-1 border-0 outline-none"
                    />
                    <button type="button" onClick={showEyeConfirmNewPassword}>
                      {openConfirmNewPassword ? (
                        <FaEye size={25} className="absolute bottom-2 right-2" />
                      ) : (
                        <FaEyeSlash size={25} className="absolute bottom-2 right-2" />
                      )}
                    </button>
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
