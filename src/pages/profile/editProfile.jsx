import React from 'react';

import Headers from '@/components/Header';
import Footers from '@/components/Footers';
import Aside from '@/components/Aside';
import Image from 'next/image';

import Link from 'next/link';
import default_picture from '../../assets/img/default.jpg';
import { AiOutlineEdit, AiOutlineArrowRight, AiOutlineLoading3Quarters } from 'react-icons/ai';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { withIronSessionSsr } from 'iron-session/next';
import cookieConfig from '@/helpers/cookieConfig';
import { useDispatch, useSelector } from 'react-redux';
import http from '@/helpers/http';
import { BsPencil } from 'react-icons/bs';
import profilePict from '../../assets/img/default.jpg';
import { FiEdit2, FiUser } from 'react-icons/fi';
import { Formik } from 'formik';
import checkCredentials from '@/helpers/checkCredentials';
import { setProfile } from '@/redux/reducers/profile';
import Layout from '@/components/Layout';
import { GoFileDirectory } from 'react-icons/go';
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

function EditProfile({ token, user }) {
  const dispatch = useDispatch();
  const [selectedPicture, setSelectedPicture] = React.useState(false);
  const [openModal, setOpenModal] = React.useState(false);
  const [pictureURI, setPictureURI] = React.useState('');

  const updateDisplay = () => {
    dispatch(getProfileAction(token));
  };

  const handleShow = () => {
    setShow(!show);
  };
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

  const getDataProfile = React.useCallback(async () => {
    const { data } = await http(token).get('/profile');
    dispatch(setProfile(data.results));
  }, [token, dispatch]);

  React.useEffect(() => {}, [selectedPicture]);

  const editProfile = async (values) => {
    setOpenModal(true);
    const form = new FormData();
    Object.keys(values).forEach((key) => {
      if (values[key]) {
        form.append(key, values[key]);
      }
    });
    if (selectedPicture) {
      form.append('picture', selectedPicture);
    }
    try {
      const { data } = await http(token).patch('/profile', form, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      getDataProfile();
    } catch (err) {
      console.log(err);
    }
    setOpenModal(false);
    updateDisplay();
  };

  return (
    <Layout token={token}>
      <div className="flex-1 bg-white rounded-3xl flex px-12 py-8 w-full">
        <Formik
          initialValues={{
            username: user?.username,
            fullName: user?.fullName,
            email: user?.email,
          }}
          onSubmit={editProfile}
          enableReinitialize={true}
        >
          {({ handleSubmit, handleChange, handleBlur, values }) => (
            <form
              onSubmit={handleSubmit}
              className="flex-1 flex flex-col gap-3 bg-white justify-center items-center h-auto rounded-xl "
            >
              <div className="font-bold text-xl mb-12">Edit Profile</div>
              <div className="gap-16 w-[850px] flex flex-reverse justify-center items-center p-7">
                <div className="flex flex-col gap-2 justify-center items-center">
                  <div>
                    {!selectedPicture && (
                      <div className="w-44 h-[180px] object-cover border rounded-lg flex justify-center items-center">
                        <Image
                          className="bg-cover w-full h-full rounded-lg"
                          src={user.picture}
                          alt="profile"
                          width={500}
                          height={500}
                        />
                      </div>
                    )}
                    {selectedPicture && (
                      <div className="w-44 h-[180px] object-cover border rounded-lg flex justify-center items-center">
                        <Image
                          className="bg-cover w-full h-full rounded-lg"
                          src={pictureURI}
                          alt="profile"
                          width={500}
                          height={500}
                        />
                      </div>
                    )}
                  </div>
                  <div className="w-full">
                    <label className="btn bg-gray-500 w-full text-accent normal-case text-lg border-red-50 border-2">
                      <GoFileDirectory size={25} />
                      <span className="text-sm">Select File</span>
                      <input onChange={changePicture} name="picture" type="file" className="hidden" />
                    </label>
                  </div>
                </div>
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col gap-1 w-full">
                    <label className="font-semibold text-sm" htmlFor="username">
                      Username
                    </label>
                    <input
                      type="text"
                      name="username"
                      placeholder="Input New Username"
                      className="input input-bordered w-full max-w-xs"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.username}
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="font-semibold text-sm" htmlFor="email">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      className="input input-bordered w-full max-w-xs"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.email}
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="font-semibold text-sm" htmlFor="fullName">
                      Fullname
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      placeholder="Input New Fullname"
                      className="input input-bordered w-full max-w-xs"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.fullName}
                    />
                  </div>
                  <button
                    type="submit"
                    className="btn bg-accent text-black font-bold cursor-pointer capitalize hover:text-cyan-700"
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </form>
          )}
        </Formik>
      </div>
      <input type="checkbox" id="loading" className="modal-toggle" checked={openModal} />
      <div className="modal">
        <div className="modal-box bg-transparent shadow-none">
          <div className="justify-center flex ">
            <AiOutlineLoading3Quarters className="animate-spin " color="white" size={60} />
          </div>
        </div>
      </div>
    </Layout>
  );
}
export default EditProfile;
