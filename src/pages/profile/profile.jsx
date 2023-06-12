import React from 'react';

import Headers from '@/components/Header';
import Footers from '@/components/Footers';
import Aside from '@/components/Aside';
import Image from 'next/image';
import Link from 'next/link';
import default_picture from '../../assets/img/default.jpg';
import { AiOutlineEdit, AiOutlineArrowRight } from 'react-icons/ai';
import { useState } from 'react';

export default function Profile() {
  const [selectedPicture, setSelectedPicture] = useState(false);
  const [pictureURI, setPictureURI] = useState('');

  const fileToDataUrl = (file) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => {
      setPictureURI(reader.result);
    });
    reader.readAsDataURL(file);
  };

  const changePicture = (e) => {
    const file = e.target.files[0];
    setSelectedPicture(file);
    fileToDataUrl(file);
  };
  if (selectedPicture) {
    form.append('picture', selectedPicture);
  }
  return (
    <div className="min-h-screen">
      <Headers />
      <div className="flex bg-[#E8F6EF] px-[100px] py-[50px] gap-4 h-full ">
        <Aside />
        <div className="flex-1 bg-white rounded-3xl flex px-12 py-8">
          <div className="flex flex-col w-full items-center gap-2">
            <div className="rounded-xl overflow-hidden h-14 w-14 border-[#444cd4]">
              <div className="w-full h-full border-4 border-dashed flex justify-center items-center rounded-xl">
                {setSelectedPicture ? (
                  <Image src={pictureURI} alt="Selected Cover Photo" className="w-full h-full object-cover" />
                ) : (
                  <Image src={default_picture} className="w-full h-full" alt="picture_logo" />
                )}
              </div>
            </div>
            <div className="flex gap-3 items-center">
              <div>
                <AiOutlineEdit />
              </div>
              <div className="text-[16px] text-accent ">Edit</div>
              <div className=" rounded-xl">
                <label className="btn bg-transparent hover:bg-transparent w-full h-full border-0">
                  <span className="text-black normal-case">Choose profile picture</span>
                  <input className="hidden " type="file" name="picture" onChange={changePicture} />
                </label>
              </div>
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
