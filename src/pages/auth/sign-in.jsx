import React from 'react';
import Link from 'next/link';
import { GoMail } from 'react-icons/go';
import { BiLock } from 'react-icons/bi';

import Image from 'next/image';
import logo from '../../assets/img/logo.png';
import bg_login_side from '../../assets/img/bg_login_side2.png';
import * as Yup from 'yup';
import { Formik } from 'formik';
import Head from 'next/head';

import cookieConfig from '@/helpers/cookieConfig';
import { withIronSessionSsr } from 'iron-session/next';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { FaEye } from 'react-icons/fa';
import { FaEyeSlash } from 'react-icons/fa';
import { MdError } from 'react-icons/md';

export const getServerSideProps = withIronSessionSsr(async function getServerSideProps({ req, res }) {
  const token = req.session?.token;
  if (token) {
    res.setHeader('location', '/home');
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

export default function SignIn() {
  const [open, setOpen] = useState(false);

  const validationSchema = Yup.object({
    email: Yup.string().required('Email is empty !'),
    password: Yup.string().required('Password is empty !'),
  });
  const router = useRouter();
  const [load, setLoad] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState('');

  const dologin = async (values) => {
    setLoad(true);
    const form = new URLSearchParams({
      email: values.email,
      password: values.password,
    }).toString();

    const { data } = await axios.post('/api/login', form);
    console.log(data.success);
    if (data.success === false) {
      setErrorMessage('email or password is invalid');
      setLoad(false);
    }
    if (data.success === true) {
      router.push('/');
      setLoad(false);
    }
  };
  function showEye() {
    setOpen(!open);
  }
  return (
    <>
      <Head>
        <title>ExonPay | sign-in</title>
      </Head>
      <div className="md:flex h-min-screen">
        <div className="bg-login w-[60%] bg-cover bg-no-repeat md:block hidden md:flex-col px-12 py-8">
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
        <div className="flex md:flex-1 md:pl-16 md:pr-[110px] md:bg-white md:py-4 bg-[#69BEB9]">
          <div className=" w-full md:px-0 px-0">
            {/*mobile*/}
            <div className="md:hidden  w-full h-[150px]  bg-[#69BEB9] flex items-center justify-center">
              <Link href="/">
                <Image src={logo} className="w-[85px] h-[30px]" alt="picture_logo" />
              </Link>
            </div>

            <Formik initialValues={{ email: '', password: '' }} validationSchema={validationSchema} onSubmit={dologin}>
              {({ values, errors, touched, handleBlur, handleSubmit, handleChange, isSubmitting }) => {
                return (
                  <form
                    onSubmit={handleSubmit}
                    className="flex flex-col px-2 md:gap-3 gap-12 w-full bg-white rounded-t-2xl border-0"
                  >
                    {/*dekstop*/}
                    <div className="md:flex-col md:gap-3  hidden md:block">
                      <div className="text-[24px] leading-[33px] font-bold w-full pt-8">
                        <div> Start Accessing Banking Needs With All Devices and All Platforms With 30.000+ Users</div>
                      </div>
                      <div className="font-semi-bold text-[16px] leading-[30px]">
                        Transfering money is eassier than ever, you can access Exon wherever you are. Desktop, laptop,
                        mobile phone? we cover all of that for you!
                      </div>
                      {errorMessage && (
                        <div className="max-w-[400px] flex flex-col gap-0 justify-center alert alert-error shadow-xl text-white text-lg">
                          <MdError size={25} />
                          {errorMessage}
                        </div>
                      )}
                    </div>

                    {/*mobile*/}
                    <div className="flex flex-col justify-center gap-8 items-center md:hidden">
                      <div className="text-[24px]">Login</div>
                      <div className="text-center">
                        Login to your existing account to access all the features in ExonPay.
                      </div>
                      {errorMessage && (
                        <div className="max-w-[300px] flex gap-0 flex-col justify-center alert alert-error shadow-xl text-white text-lg">
                          <MdError size={30} />
                          {errorMessage}
                        </div>
                      )}
                    </div>
                    <div className="relative border-b-2 w-full pt-4">
                      <input
                        type="email"
                        name="email"
                        id="email"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.email}
                        placeholder="Enter your e-mail"
                        className={` input w-full  pl-12 border-0 outline-none hover:outline-none hover:border-0 ${
                          errors.password && touched.password && 'border-error'
                        }`}
                      />
                      <div className="absolute bottom-2 left-2">
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
                        type={open ? 'text' : 'password'}
                        name="password"
                        id="password"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.password}
                        placeholder="Enter your password"
                        className="input w-full border-0 pl-12 outline-none hover:outline-none hover:border-0"
                      />
                      <div className="absolute bottom-2 left-2">
                        <BiLock size={30} />
                      </div>
                      <button type="button" onClick={showEye}>
                        {open ? (
                          <FaEye size={25} className="absolute bottom-2 right-2" />
                        ) : (
                          <FaEyeSlash size={25} className="absolute bottom-2 right-2" />
                        )}
                      </button>
                    </div>
                    {errors.password && touched.password && (
                      <label htmlFor="password" className="label p-0">
                        <span className="label-text-alt font-bold text-md text-error">{errors.password}</span>
                      </label>
                    )}
                    <div className="w-full mt-8">
                      {load ? (
                        <button type="submit" className="w-full btn btn-primary normal-case text-white">
                          <span className="loading loading-spinner loading-sm"></span>
                        </button>
                      ) : (
                        <button type="submit" className=" w-full btn btn-primary normal-case text-white">
                          Sign In
                        </button>
                      )}
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
    </>
  );
}
