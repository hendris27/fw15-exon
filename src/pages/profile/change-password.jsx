import React from 'react';

import Headers from '@/components/Header';
import Footers from '@/components/Footers';
import Aside from '@/components/Aside';
import { BiLock } from 'react-icons/bi';
import { useState } from 'react';
import { FaEye } from 'react-icons/fa';
import { FaEyeSlash } from 'react-icons/fa';
import { withIronSessionSsr } from 'iron-session/next';
import checkCredentials from '@/helpers/checkCredentials';
import cookieConfig from '@/helpers/cookieConfig';
import { Formik } from 'formik';
import { MdCheck, MdError } from 'react-icons/md';
import * as Yup from 'yup';
import http from '@/helpers/http';

export const getServerSideProps = withIronSessionSsr(async function getServerSideProps({ req, res }) {
  const token = req.session?.token;
  checkCredentials(token, res, '/auth/sign-in');

  return {
    props: {
      token,
    },
  };
}, cookieConfig);

const validationSchema = Yup.object({
  oldPassword: Yup.string().required('Old password don`t be empty'),
  newPassword: Yup.string().min(6, 'must have input 6 characters').required('New password don`t be empty'),
  confirmPassword: Yup.string()
    .min(6, 'must have input 6 characters')
    .oneOf([Yup.ref('newPassword'), null], 'Passwords must match'),
});

export default function ChangePassword({ token }) {
  const [loading, setLoading] = React.useState(false);
  const [openCurrentPassword, setOpenCurrentPassword] = useState(false);
  const [openNewPassword, setOpenNewPassword] = useState(false);
  const [openConfirmNewPassword, setOpenConfirmNewPassword] = useState(false);
  const [errorMessage, setErrorMessage] = React.useState('');
  const [successMessage, setSuccessMessage] = React.useState('');

  const doChangePassword = async (values, { resetForm }) => {
    setErrorMessage('');
    setSuccessMessage('');
    setLoading(true);

    try {
      const form = new URLSearchParams({
        oldPassword: values.oldPassword,
        newPassword: values.newPassword,
        confirmPassword: values.confirmPassword,
      }).toString();

      const { data } = await http(token).patch('/profile/change-password', form);
      if (data.success === true) {
        setSuccessMessage('Change password success!');
        setTimeout(() => {
          setSuccessMessage('');
        }, 2000);
        setLoading(false);
        resetForm();
      }
    } catch (error) {
      const message = 'Your old password is wrong, try again!';
      setErrorMessage(message);
      setLoading(false);
    }
  };

  function showEyeCurrentPassword() {
    setOpenCurrentPassword(!openCurrentPassword);
  }
  function showEyeNewPassword() {
    setOpenNewPassword(!openNewPassword);
  }
  function showEyeConfirmNewPassword() {
    setOpenConfirmNewPassword(!openConfirmNewPassword);
  }
  return (
    <div className="min-h-screen">
      <Headers token={token} />
      <div className="flex bg-[#E8F6EF] px-[100px] py-[50px] gap-4 h-full ">
        <Aside token={token} />
        <div className="flex-1 bg-white rounded-3xl flex px-12 py-16">
          <div className="h-full w-full flex flex-col gap-4">
            <div className="flex flex-col gap-4">
              <div className="font-bold text-[18px] ">Change Password</div>
              <div className="font-normal text-[16px] w-[340px] ">
                You must enter your current password and then type your new password twice.
              </div>
            </div>
            {errorMessage && (
              <div className="flex flex-row justify-center text-red-600 text-lg gap-3">
                <MdError size={30} />
                {errorMessage}
              </div>
            )}
            {successMessage && (
              <div className="flex flex-row justify-center text-green-500 text-lg gap-3">
                <MdCheck size={30} />
                {successMessage}
              </div>
            )}
            <Formik
              initialValues={{
                oldPassword: '',
                newPassword: '',
                confirmPassword: '',
              }}
              validationSchema={validationSchema}
              onSubmit={doChangePassword}
            >
              {({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => (
                <form onSubmit={handleSubmit} className=" flex flex-col gap-12 items-center pt-12 px-4 ">
                  <div className=" w-[400px] ">
                    <div className="flex border-b-2 gap-4 items-center justify-center w-full p-2">
                      <div className="flex w-8 ">
                        <BiLock size={30} />
                      </div>
                      <div className="relative w-full flex flex-1 bg-red-100">
                        <input
                          type={openCurrentPassword ? 'text' : 'password'}
                          placeholder="Current password"
                          className="flex flex-1 border-0 outline-none "
                          name="oldPassword"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.oldPassword}
                        />
                        <button type="button" onClick={showEyeCurrentPassword}>
                          {openCurrentPassword ? (
                            <FaEye size={25} className="absolute bottom-2 right-2" />
                          ) : (
                            <FaEyeSlash size={25} className="absolute bottom-2 right-2" />
                          )}
                        </button>
                      </div>
                    </div>
                    {errors.oldPassword && touched.oldPassword && (
                      <label className="label">
                        <span className="label-text-alt text-error">{errors.oldPassword}</span>
                      </label>
                    )}
                  </div>
                  <div className=" w-[400px] ">
                    <div className="flex border-b-2 gap-4 items-center justify-center w-full p-2">
                      <div className="flex w-8 ">
                        <BiLock size={30} />
                      </div>
                      <div className="w-full flex flex-1 relative">
                        <input
                          type={openNewPassword ? 'text' : 'password'}
                          placeholder="New password"
                          className="flex flex-1 border-0 outline-none"
                          name="newPassword"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.newPassword}
                        />
                        <button type="button" onClick={showEyeNewPassword}>
                          {openNewPassword ? (
                            <FaEye size={25} className="absolute bottom-2 right-2" />
                          ) : (
                            <FaEyeSlash size={25} className="absolute bottom-2 right-2" />
                          )}
                        </button>
                      </div>
                    </div>
                    {errors.newPassword && touched.newPassword && (
                      <label className="label">
                        <span className="label-text-alt text-error">{errors.newPassword}</span>
                      </label>
                    )}
                  </div>
                  <div className=" w-[400px] ">
                    <div className="flex border-b-2 gap-4 items-center justify-center w-full p-2">
                      <div className="flex w-8 ">
                        <BiLock size={30} />
                      </div>
                      <div className="w-full flex flex-1 relative">
                        <input
                          type={openConfirmNewPassword ? 'text' : 'password'}
                          placeholder="Repeat new password"
                          className="flex flex-1 border-0 outline-none"
                          onChange={handleChange}
                          name="confirmPassword"
                          onBlur={handleBlur}
                          value={values.confirmPassword}
                        />
                        <button type="button" onClick={showEyeConfirmNewPassword}>
                          {openConfirmNewPassword ? (
                            <FaEye size={25} className="absolute bottom-2 right-2" />
                          ) : (
                            <FaEyeSlash size={25} className="absolute bottom-2 right-2" />
                          )}
                        </button>
                      </div>
                    </div>
                    {errors.confirmPassword && touched.confirmPassword && (
                      <label className="label">
                        <span className="label-text-alt text-error">{errors.confirmPassword}</span>
                      </label>
                    )}
                  </div>
                  <div className="w-[400px] ">
                    {loading ? (
                      <button className="w-full btn bg-gray-300 capitalize text-base text-white font-semibold hover:font-bold">
                        <span className="loading loading-spinner loading-sm"></span>
                      </button>
                    ) : (
                      <button type="submit" className="btn btn-accent w-full normal-case">
                        {' '}
                        Change Password
                      </button>
                    )}
                  </div>
                </form>
              )}
            </Formik>
          </div>
        </div>
      </div>
      <footer>
        <Footers />
      </footer>
    </div>
  );
}
