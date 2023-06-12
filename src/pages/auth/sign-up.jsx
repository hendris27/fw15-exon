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
import { useState } from 'react';
import { FaEye } from 'react-icons/fa';
import { FaEyeSlash } from 'react-icons/fa';
import { withIronSessionSsr } from 'iron-session/next';

import coockieConfig from '@/helpers/cookieConfig';
import axios from 'axios';
import { saveEmail } from '@/redux/reducers/auth';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { MdError } from 'react-icons/md';

export const getServerSideProps = withIronSessionSsr(async function getServerSideProps({ req, res }) {
  const token = req.session?.token;

  if (token) {
    res.setHeader('location', '/auth/login');
    res.statusCode = 302;
    res.end();
    return { prop: { token } };
  }

  return {
    props: {
      token: null,
    },
  };
}, coockieConfig);

function SignUp() {
  const dispatch = useDispatch();
  const router = useRouter();
  const [loading, setLoading] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState('');

  const [open, setOpen] = useState(false);
  const validationSchema = Yup.object({
    username: Yup.string().required('username is empty !'),
    email: Yup.string().required('Email is empty !'),
    password: Yup.string().required('Password is empty !'),
  });

  const doRegister = async (values) => {
    try {
      setLoading(true);
      setErrorMessage('');
      const form = new URLSearchParams({
        username: values.username,
        email: values.email,
        password: values.password,
      }).toString();

      const { data } = await axios.post('http://localhost:3000/api/register', form);
      console.log(data);

      if (data.success === true) {
        dispatch(saveEmail(values.email));
        router.push('/auth/create-pin');
      }
      const message = data.message;
      if (message?.includes('duplicate')) {
        setErrorMessage('Email already used');
      }
    } finally {
      setLoading(false);
    }
  };

  function showEye() {
    setOpen(!open);
  }
  return (
    <div className="md:flex h-min-screen">
      <div className="bg-login w-[60%] bg-cover bg-no-repeat md:block hidden md:flex md:flex-col px-12 py-8">
        <div className="">
          <Link href="/">
            <Image src={logo} className="w-[85px] h-[20px]" alt="picture_logo" />
          </Link>
        </div>
        <div className="flex flex-col gap-4  items-center">
          <Image src={bg_login_side} className="w-[55%] mt-[-30px] " alt="picture_bg" />

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
            initialValues={{
              email: '',
              password: '',
              username: '',
            }}
            validationSchema={validationSchema}
            onSubmit={doRegister}
          >
            {({ values, errors, touched, handleBlur, handleSubmit, handleChange, isSubmitting }) => {
              return (
                <form onSubmit={handleSubmit} className="px-2 flex flex-col gap-4 w-full rounded-t-2xl bg-white">
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
                  {errorMessage && (
                    <div className="flex flex-row justify-center alert alert-error shadow-lg text-white text-lg">
                      <MdError size={30} />
                      {errorMessage}
                    </div>
                  )}
                  {/*mobile*/}
                  <div className="flex flex-col justify-center items-center md:hidden">
                    <div className="text-[24px]">Sign Up</div>
                    <div className="text-center">Create your account to access FazzPay.</div>
                  </div>
                  <div className="relative border-b-2 w-full pt-8">
                    <input
                      type="text"
                      name="username"
                      id="username"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.username}
                      placeholder="Enter your username"
                      className="input w-full  pl-12 border-0 outline-none hover:outline-none hover:border-0"
                    />
                    <div className="absolute bottom-2 left-2">
                      <AiOutlineUser size={30} />
                    </div>
                  </div>
                  {errors.username && touched.username && (
                    <label htmlFor="username" className="label pl-4">
                      <span className="label-text-alt font-bold text-md text-error">{errors.firstname}</span>
                    </label>
                  )}

                  <div className="relative border-b-2 w-full">
                    <input
                      type="email"
                      name="email"
                      id="email"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.email}
                      placeholder="Enter your e-mail"
                      className="input w-full  pl-12 border-0 outline-none hover:outline-none hover:border-0"
                    />
                    <div className="absolute bottom-2 left-2">
                      <GoMail size={30} />
                    </div>
                  </div>
                  {errors.email && touched.email && (
                    <label htmlFor="email" className="label pl-4">
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
                      placeholder="Create your password"
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
                    <label htmlFor="password" className="label pl-4">
                      <span className="label-text-alt font-bold text-md text-error">{errors.password}</span>
                    </label>
                  )}
                  {loading ? (
                    <button type="submit" className="btn btn-primary normal-case text-white">
                      <span className="loading loading-spinner loading-sm"></span>
                    </button>
                  ) : (
                    <button type="submit" className="btn btn-primary normal-case text-white">
                      Sign Up
                    </button>
                  )}

                  <div className="flex pt-4 flex justify-center text-center">
                    <div className="text-center">
                      Already have an account?
                      <Link className="font-bold" href="/auth/sign-in">
                        Login
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

export default SignUp;
