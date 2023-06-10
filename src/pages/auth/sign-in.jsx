import React from 'react';
import Link from 'next/link';
import { GoMail } from 'react-icons/go';
import { BiLock } from 'react-icons/bi';
import { AiOutlineUser } from 'react-icons/ai';

import Image from 'next/image';
import logo from '../../assets/img/logo.png';
import bg_login_side from '../../assets/img/bg_login_side.png';
import * as Yup from 'yup';
import { Formik } from 'formik';

export default function login() {
  const validationSchema = Yup.object({
    email: Yup.string().required('Email is empty !'),
    password: Yup.string().required('Password is empty !'),
  });

  return (
    <div className="md:flex h-m-screen">
      <div className="bg-login w-[60%] bg-cover bg-no-repeat md:block hidden md:flex md:flex-col px-12 py-8">
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
      <div className=" flex md:flex-1 md:pl-16 md:pr-[110px]  py-4">
        <div className=" w-full md:px-0 px-4">
          {/*mobile*/}
          <div className="md:hidden  w-full h-[150px] bg-[#69BEB9] shadow-4xl flex items-center justify-center">
            <Link href="/">
              <Image src={logo} className="w-[85px] h-[30px]" alt="picture_logo" />
            </Link>
          </div>

          <Formik initialValues={{ email: '', password: '' }} validationSchema={validationSchema}>
            {({ values, errors, touched, handleBlur, handleSubmit, handleChange, isSubmitting }) => {
              return (
                <form
                  onSubmit={handleSubmit}
                  className="flex flex-col gap-3 w-full rounded-xl md:shadow-none shadow-2xl"
                >
                  {/*dekstop*/}
                  <div className="md:flex md:flex-col md:gap-3 hidden md:block">
                    <div className="text-[24px] leading-[33px] font-bold w-full pt-8">
                      <div> Start Accessing Banking Needs With All Devices and All Platforms With 30.000+ Users</div>
                    </div>
                    <div className="font-semi-bold text-[16px] leading-[30px]">
                      Transfering money is eassier than ever, you can access Exon wherever you are. Desktop, laptop,
                      mobile phone? we cover all of that for you!
                    </div>
                  </div>
                  {/*mobile*/}
                  <div className="flex flex-col justify-center items-center md:hidden">
                    <div className="text-[24px]">Login</div>
                    <div className="text-center">
                      Login to your existing account to access all the features in ExonPay.
                    </div>
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
                  <div className="relative border-b-2 w-full">
                    <input
                      type="password"
                      name="password"
                      id="password"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.password}
                      placeholder="Enter your password"
                      className="input w-full border-0 pl-10 outline-none hover:outline-none hover:border-0"
                    />
                    <div className="absolute bottom-2 left-0">
                      <BiLock size={30} />
                    </div>
                  </div>
                  {errors.password && touched.password && (
                    <label htmlFor="password" className="label p-0">
                      <span className="label-text-alt font-bold text-md text-error">{errors.password}</span>
                    </label>
                  )}
                  <div className="w-full mt-12">
                    <button disabled={isSubmitting} className="btn  bg-[#69BEB9] w-full">
                      login
                    </button>
                  </div>
                  <p className="text-right">
                    <Link className="font-bold" href="/auth/forgot-password">
                      Forgot Password?
                    </Link>
                  </p>
                  <div className="flex items-center justify-center">
                    <div className="mt-8">
                      Don`t have an account?
                      <Link className="font-bold" href="/auth/sign-up">
                        Sign Up
                      </Link>
                    </div>
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
