import React from 'react';
import Link from 'next/link';

import Image from 'next/image';
import logo from '../../assets/img/logo.png';
import bg_login_side from '../../assets/img/bg_login_side2.png';
import Head from 'next/head';

import cookieConfig from '@/helpers/cookieConfig';
import { withIronSessionSsr } from 'iron-session/next';
import PinInput from '@/components/PinInput';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';

export const getServerSideProps = withIronSessionSsr(async function getServerSideProps({ req, res }) {
  const token = req.session?.token;
  if (token) {
    res.setHeader('location', '/auth/sign-in');
    res.statusCode = 302;
    res.end();
    return { props: { token } };
  }
  return {
    props: {
      token: null,
    },
  };
}, cookieConfig);

export default function SetPin() {
  const router = useRouter();
  const email = useSelector((state) => state.auth.email);
  const [pin, setPin] = React.useState('');

  React.useEffect(() => {
    if (!email) {
      router.back('/auth/sign-in');
    }
  }),
    [email, router];

  return (
    <>
      <Head>
        <title>ExonPay | create-pin </title>
      </Head>
      <div className="md:flex h-screen">
        <div className="bg-login md:flex-1  bg-cover bg-no-repeat md:block hidden md:flex md:flex-col px-12 py-8">
          <Link href="/">
            <Image src={logo} className="w-[85px] h-[20px]" alt="picture_logo" />
          </Link>

          <div className="flex flex-col gap-2  items-center">
            <Image src={bg_login_side} className="w-[55%] mt-[-30px]" alt="picture_bg" />
            <div className="font-bold text-[24px] ">App that Covering Banking Needs.</div>
            <div className="text-left w-[498px] ">
              Exon is an application that focussing in banking needs for all users in the world. Always updated and
              always following world trends. 5000+ users registered in FazzPay everyday with worldwide users coverage.
            </div>
          </div>
        </div>
        <div className=" flex md:max-w-lg md:pl-16 md:pr-[110px]  py-4">
          <div className=" w-full md:px-0 px-4">
            {/*mobile*/}
            <div className="md:hidden  w-full h-[150px] bg-[#69BEB9] shadow-4xl flex items-center justify-center">
              <Link href="/">
                <Image src={logo} className="w-[85px] h-[30px]" alt="picture_logo" />
              </Link>
            </div>

            <div className="md:flex md:flex-col md:gap-3 hidden md:block">
              <div className="text-[24px] leading-[33px] font-bold w-full pt-8">
                <div> Start Accessing Banking Needs With All Devices and All Platforms With 30.000+ Users</div>
              </div>
              <div className="font-semi-bold text-[16px] leading-[30px]">
                Transfering money is eassier than ever, you can access Exon wherever you are. Desktop, laptop, mobile
                phone? we cover all of that for you!
              </div>
            </div>
            {/*mobile*/}
            <div className="flex flex-col justify-center items-center md:hidden">
              <div className="text-[24px] font-bold">Create Security PIN</div>
              <div className="text-center">
                Create a PIN that’s contain 6 digits number for security purpose in ExonPay.
              </div>
            </div>
            <form action="" className="mt-[90px] flex flex-col gap-4">
              <PinInput onChangePin={setPin} />
              <div>
                <button className="btn btn-primary normal-case w-full">Create Pin</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
