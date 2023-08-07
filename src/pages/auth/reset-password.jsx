import React from 'react';
import Link from 'next/link';
import { BiLock } from 'react-icons/bi';
import { useState } from 'react';
import { FaEye } from 'react-icons/fa';
import { FaEyeSlash } from 'react-icons/fa';

import Image from 'next/image';
import logo from '../../assets/img/logo.png';
import bg_login_side from '../../assets/img/bg_login_side.png';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { useRouter } from 'next/router';
import { GoMail } from 'react-icons/go';
import { RiErrorWarningLine } from 'react-icons/ri';
import { AiOutlineCheckCircle } from 'react-icons/ai';
import http from '@/helpers/http';

export default function ResetPassword() {
  const [open, setOpen] = useState(false);
  const [openConfirmPassword, setOpenConfirmPassword] = useState(false);
  const [errorMsg, seterrorMsg] = useState('');
  const [successMsg, setsuccessMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const validationSchema = Yup.object({
    email: Yup.string().required('Email is required !'),
    newPassword: Yup.string().required('Create new password is empty !'),
    confirmPassword: Yup.string().required('Confirm new password is empty !'),
    confirmPassword: Yup.string()
      .required('confirm password si empty')
      .oneOf([Yup.ref('newPassword'), null], 'Password must be match'),
  });
  function showEyeCreatePassword() {
    setOpen(!open);
  }
  function showEyeConfirmPassword() {
    setOpenConfirmPassword(!openConfirmPassword);
  }

  async function doSubmit(values) {
    setLoading(true);
    try {
      const email = values.email;
      const newPassword = values.newPassword;
      const confirmPassword = values.confirmPassword;
      console.log(email);
      console.log(newPassword);
      console.log(confirmPassword);
      const form = new URLSearchParams({
        email,
        newPassword,
        confirmPassword,
      }).toString();
      const { data } = await http().post('/auth/reset-password', form);
      console.log(data);
      setLoading(false);
      if (data) {
        setsuccessMsg('Password has been set successfully');
        router.replace('/auth/sign-in');
      }
    } catch (err) {
      const message = err.response?.data?.message;
      if (message) {
        seterrorMsg('Error reset password');
      }
    }
    setLoading(false);
  }

  if (errorMsg || successMsg) {
    setTimeout(() => {
      seterrorMsg(false);
      setsuccessMsg(false);
    }, 3000);
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

          <Formik
            initialValues={{ email: '', newPassword: '', confirmPassword: '' }}
            validationSchema={validationSchema}
            onSubmit={doSubmit}
          >
            {({ values, errors, touched, handleBlur, handleSubmit, handleChange, isSubmitting }) => {
              return (
                <form onSubmit={handleSubmit} className="px-2 py-8 flex flex-col gap-4 w-full bg-white rounded-t-2xl">
                  {/*dekstop*/}
                  <div className=" md:flex-col md:gap-3 hidden md:block">
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
                  <div className="flex flex-col gap-4 justify-center items-center md:hidden">
                    <div className="text-[24px] font-bold">Reset Password</div>
                    <div className="text-center">Create and confirm your new password so you can login to ExonPay.</div>
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
                  <div className="relative border-b-2 w-full flex items-center justify-center">
                    <input
                      type={open ? 'text' : 'password'}
                      name="newPassword"
                      id="newPassword"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.newPassword}
                      placeholder="Create new password"
                      className="justify-center flex input w-full border-0 pl-12 outline-none hover:outline-none hover:border-0"
                    />
                    <div className="absolute bottom-3 left-2">
                      <BiLock size={30} />
                    </div>
                    <button type="button" onClick={showEyeCreatePassword}>
                      {open ? (
                        <FaEye size={25} className="absolute bottom-3 right-2" />
                      ) : (
                        <FaEyeSlash size={25} className="absolute bottom-3 right-2" />
                      )}
                    </button>
                  </div>
                  {errors.newPassword && touched.newPassword && (
                    <label htmlFor="newPassword" className="label p-0">
                      <span className="label-text-alt font-bold text-md text-error">{errors.newPassword}</span>
                    </label>
                  )}

                  <div className="relative border-b-2 w-full">
                    <input
                      type={openConfirmPassword ? 'text' : 'password'}
                      name="confirmPassword"
                      id="confirmPassword"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.confirmPassword}
                      placeholder="Confirm new password your"
                      className="input w-full border-0 pl-12 outline-none hover:outline-none hover:border-0"
                    />
                    <div className="absolute bottom-2 left-2">
                      <BiLock size={30} />
                    </div>
                    <button type="button" onClick={showEyeConfirmPassword}>
                      {openConfirmPassword ? (
                        <FaEye size={25} className="absolute bottom-3 right-2" />
                      ) : (
                        <FaEyeSlash size={25} className="absolute bottom-3 right-2" />
                      )}
                    </button>
                  </div>
                  {errors.confirmPassword && touched.confirmPassword && (
                    <label htmlFor="confirmPassword" className="label p-0">
                      <span className="label-text-alt font-bold text-md text-error">{errors.confirmPassword}</span>
                    </label>
                  )}
                  <div className="w-full mt-12">
                    <button
                      type="submit"
                      className="btn btn-primary normal-case max-w-lg w-full text-white shadow-2xl"
                      // disabled={isSubmitting}
                    >
                      {loading && <span className="loading loading-spinner loading-sm"></span>}
                      {!loading && 'Reset Password'}
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
