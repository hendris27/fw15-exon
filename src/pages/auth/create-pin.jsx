import React from 'react';
import Link from 'next/link';
import { MdErrorOutline } from 'react-icons/md';

import Image from 'next/image';
import logo from '../../assets/img/logo.png';
import bg_login_side from '../../assets/img/bg_login_side2.png';
import Head from 'next/head';
import http from '@/helpers/http';
import PinInput from '@/components/PinInput';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';

function SetPin() {
  const router = useRouter();
  const email = useSelector((state) => state.auth.email);
  const [pin, setPin] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState('');
  // const [successMessage, setSuccessMassage] = React.useState(false);

  React.useEffect(() => {
    if (!email) {
      router.replace('/auth/sign-up');
    }
  }),
    [email, router];

  const setUserPin = async (e) => {
    try {
      e.preventDefault();
      setLoading(true);
      const form = new URLSearchParams({
        email,
        pin,
      }).toString();
      console.log(form);
      const { data } = await http().post('/auth/set-pin', form);
      if (data.success === false) {
        setLoading(false);
        setErrorMessage(false);
      }
      if (data.success === true) {
        setLoading(false);
        setTimeout(() => {
          router.replace('/auth/sign-in');
        }, 2000);
      }
    } catch (error) {
      console.log(error);
      const message = error?.response?.data.message;
      if (message?.includes('Internal')) {
      }
    } finally {
      setLoading(false);
    }
  };

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
        <div className=" flex md:max-w-lg md:pl-16 md:pr-[110px]  md:bg-white bg-[#69BEB9] ">
          <div className=" w-full">
            {/*mobile*/}
            <div className=" md:hidden  w-full h-[150px] flex items-center justify-center">
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

            <form onSubmit={setUserPin} className="px-2 py-8 md:mt-[90px] flex flex-col gap-4 rounded-t-2xl bg-white ">
              {/*mobile*/}
              <div className="flex flex-col gap-6 justify-center items-center md:hidden ">
                <div className="text-[24px] font-bold">Create Security PIN</div>
                <div className="text-center">
                  Create a PIN that’s contain 6 digits number for security purpose in ExonPay.
                </div>
              </div>

              <div className="w-full flex flex-col gap-6">
                <div className="flex justify-between items-center">
                  <div className="flex flex-col gap-10 form-control w-full">
                    {errorMessage && (
                      <div className="flex flex-row justify-center alert alert-error shadow-lg text-white text-lg">
                        <MdErrorOutline size={30} />
                        {errorMessage}
                      </div>
                    )}
                    <PinInput onChangePin={setPin} />
                  </div>
                </div>
              </div>

              {loading ? (
                <button className="btn btn-primary normal-case text-white">
                  <span className="loading loading-spinner loading-sm"></span>
                </button>
              ) : (
                <button className="btn btn-primary normal-case text-white">Create Pin</button>
              )}
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
export default SetPin;
