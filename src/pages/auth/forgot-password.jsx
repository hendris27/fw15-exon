import React, { useState } from 'react';
import Link from 'next/link';
import { GoMail } from 'react-icons/go';
import { RiErrorWarningLine } from 'react-icons/ri';

import Image from 'next/image';
import logo from '../../assets/img/logo.png';
import bg_login_side from '../../assets/img/bg_login_side.png';
import * as Yup from 'yup';
import { Formik } from 'formik';
import http from '@/helpers/http';
import { useRouter } from 'next/router';
import { AiOutlineCheckCircle } from 'react-icons/ai';

function ForgotPassword() {
  const [successMsg, setSuccessMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const router = useRouter();
  const validationSchema = Yup.object({
    email: Yup.string().required('Email is required !'),
  });

  async function doSubmit(values) {
    try {
      setLoading(true);
      const email = values.email;
      const form = new URLSearchParams({ email }).toString();
      const { data } = await http().post('/auth/forgot-password', form);
      setLoading(false);
      if (data) {
        setSuccessMsg('Reset password Sucess');
      }
      setTimeout(() => {
        router.push('/auth/reset-password');
      }, 3000);
    } catch (err) {
      const message = err.response?.data?.message;
      if (message === 'auth_wrong_user') {
        setErrorMsg('Your Email Is Invalid');
      }

      if (message === 'auth_forgot_already_requested') {
        setErrorMsg('Request already sent');
      }

      setTimeout(() => {
        setErrorMsg(false);
        setSuccessMsg(false);
      }, 3000);
    }

    setLoading(false);
  }

  return (
    <div className="md:flex h-m-screen">
      <div className="bg-login w-[60%] bg-cover bg-no-repeat md:block hidden md:flex-col px-12 py-8">
        <div className="">
          <Link href="/">
            <Image src={logo} className="w-[85px] h-[20px]" alt="picture_logo" />
          </Link>
        </div>
        <div className="flex flex-col gap-4  items-center">
          <Image src={bg_login_side} className="w-[65%] h-[100%]" alt="picture_bg" />

          <div className="font-bold text-[24px] ">App that Covering Banking Needs.</div>
          <div className="text-left w-[498px] ">
            Exon is an application that focussing in banking needs for all users in the world. Always updated and always
            following world trends. 5000+ users registered in FazzPay everyday with worldwide users coverage.
          </div>
        </div>
      </div>
      <div className=" flex md:flex-1 md:pl-16 md:pr-[110px] md:bg-white bg-[#69BEB9]">
        <div className=" w-full">
          {/*mobile*/}
          <div className="md:hidden  w-full h-[150px]  shadow-4xl flex items-center justify-center">
            <Link href="/">
              <Image src={logo} className="w-[85px] h-[30px]" alt="picture_logo" />
            </Link>
          </div>

          <Formik initialValues={{ email: '' }} validationSchema={validationSchema} onSubmit={doSubmit}>
            {({ values, errors, touched, handleBlur, handleSubmit, handleChange, isSubmitting }) => {
              return (
                <form onSubmit={handleSubmit} className="px-2 py-4 flex flex-col gap-3 w-full rounded-t-2xl bg-white">
                  {/*dekstop*/}
                  <div className="md:flex-col md:gap-3 hidden md:block">
                    <div className="text-[24px] leading-[33px] font-bold w-full pt-8">
                      <div> Start Accessing Banking Needs With All Devices and All Platforms With 30.000+ Users</div>
                    </div>

                    <div className="font-semi-bold text-[16px] leading-[30px]">
                      Transfering money is eassier than ever, you can access Exon wherever you are. Desktop, laptop,
                      mobile phone? we cover all of that for you!
                    </div>
                    {errorMsg && (
                      <div className="alert alert-error text-xl text-white text-center">
                        <RiErrorWarningLine />
                        {errorMsg}
                      </div>
                    )}
                    {successMsg && (
                      <div className="alert alert-success text-xl text-white text-center">
                        <AiOutlineCheckCircle />
                        {successMsg}
                      </div>
                    )}
                  </div>
                  {/*mobile*/}
                  <div className="flex flex-col gap-4 justify-center items-center md:hidden py-8">
                    <div className="text-[24px] font-bold">Reset Password</div>
                    <div className="text-center">
                      Enter your FazzPay e-mail so we can send you a password reset link.
                    </div>
                    {errorMsg && (
                      <div className="alert alert-error text-xl text-white text-center">
                        <RiErrorWarningLine />
                        {errorMsg}
                      </div>
                    )}
                    {successMsg && (
                      <div className="alert alert-success text-xl text-white text-center">
                        <AiOutlineCheckCircle />
                        {successMsg}
                      </div>
                    )}
                  </div>
                  <div className="relative border-b-2 w-full pt-8">
                    <input
                      type="email"
                      name="email"
                      id="email"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.email}
                      placeholder="Enter your e-mail"
                      className="input w-full  pl-10 border-0 outline-none hover:outline-none hover:border-0"
                    />
                    <div className="absolute bottom-2 left-0">
                      <GoMail size={30} />
                    </div>
                  </div>
                  {errors.email && touched.email && (
                    <label htmlFor="email" className="label p-0">
                      <span className="label-text-alt font-bold text-md text-error">{errors.email}</span>
                    </label>
                  )}

                  <div>
                    <button
                      type="submit"
                      className="btn btn-primary normal-case max-w-lg w-full text-white shadow-2xl"
                      disabled={isSubmitting}
                    >
                      {loading && <span className="loading loading-spinner loading-sm"></span>}
                      {!loading && 'Confirm'}
                    </button>
                  </div>
                </form>
              );
            }}
          </Formik>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
