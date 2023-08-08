import React from 'react';

import Headers from '@/components/Header';
import Footers from '@/components/Footers';
import Aside from '@/components/Aside';
import Link from 'next/link';
import { withIronSessionSsr } from 'iron-session/next';
import checkCredentials from '@/helpers/checkCredentials';
import cookieConfig from '@/helpers/cookieConfig';
import http from '@/helpers/http';

export const getServerSideProps = withIronSessionSsr(async function getServerSideProps({ req, res }) {
  const token = req.session?.token;
  checkCredentials(token, res, '/auth/sign-in');

  const { data } = await http(token).get('/profile');

  return {
    props: {
      token,
      user: data.results,
    },
  };
}, cookieConfig);

export default function DetailProfile({ token, user }) {
  return (
    <div className="min-h-screen">
      <Headers token={token} user={user} />
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

            <div className="flex bg-white shadow-xl rounded-xl p-6  shadow-gray-700/20 ">
              <div className="w-full flex  items-center gap-4 ">
                <div className="flex flex-col ">
                  <div className="text-[16px] font-bold ">Username</div>
                  <div className="text-[22px] font-bold">{user?.username}</div>
                </div>
              </div>
            </div>

            <div className="flex bg-white shadow-xl rounded-xl p-6  shadow-gray-700/20">
              <div className="w-full flex  items-center gap-4 ">
                <div className="flex flex-col font-bold ">
                  {!user.fullName && <div className="opacity-40 text-md">No set</div>}
                  {user?.fullName && <div>{user?.fullName}</div>}
                </div>
              </div>
            </div>
            <div className="flex bg-white shadow-xl rounded-xl p-6  shadow-gray-700/20 ">
              <div className="w-full flex  items-center gap-4 ">
                <div className="flex flex-col ">
                  <div className="text-[16px] font-bold ">Verified E-mail</div>
                  <div className="text-[22px] font-bold">{user?.email}</div>
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
