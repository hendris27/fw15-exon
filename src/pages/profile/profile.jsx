import React from 'react';

import Headers from '@/components/header';
import Footers from '@/components/footers';
import Aside from '@/components/aside';
import Image from 'next/image';
import Link from 'next/link';
import default_picture from '../../assets/img/default.jpg';
import { AiOutlineEdit, AiOutlineArrowRight } from 'react-icons/ai';

export default function Profile() {
  return (
    <div className="min-h-screen">
      <Headers />
      <div className="flex bg-[#E8F6EF] px-[100px] py-[50px] gap-4 h-full ">
        <Aside />
        <div className="flex-1 bg-white rounded-3xl flex px-12 py-8">
          <div className="bg-red-100 flex flex-col w-full items-center gap-2">
            <div className="rounded-xl overflow-hidden h-14 w-14 border-[#444cd4]">
              <Image src={default_picture} className="w-full h-full" alt="picture_logo" />
            </div>
            <div className="flex gap-3 items-center">
              <div>
                <AiOutlineEdit />
              </div>
              <div className="text-[16px] text-accent ">Edit</div>
            </div>
            <div className="flex flex-col justify-center items-center gap-1">
              <div className="font-bold text-[24px] ">Hendri</div>
              <div>+62 813-9387-7946</div>
            </div>
            <Link href="/profile/detail-profile">
              <button className="btn btn-accent flex justify-between px-4 min-w-[400px] normal-case ">
                <div>Personal Information</div>
                <div>
                  <AiOutlineArrowRight />
                </div>
              </button>
            </Link>
            <Link href="/profile/change-password">
              <button className="btn btn-accent flex justify-between px-4 min-w-[400px] normal-case ">
                <div>Change Password</div>
                <div>
                  <AiOutlineArrowRight />
                </div>
              </button>
            </Link>
            <Link href="/profile/change-pin">
              <button className="btn btn-accent flex justify-between px-4 min-w-[400px] normal-case ">
                <div>Change PIN</div>
                <div>
                  <AiOutlineArrowRight />
                </div>
              </button>
            </Link>
            <Link href="/">
              <button className="btn btn-accent flex justify-between px-4 min-w-[400px] normal-case ">
                <div className="hover:text-[16px] text-[#ff0000] ">Logout</div>
              </button>
            </Link>
          </div>
        </div>
      </div>
      <footer>
        <Footers />
      </footer>
    </div>
  );
}
