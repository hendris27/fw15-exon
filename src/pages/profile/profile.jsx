import React from 'react';

import Headers from '@/components/Header';
import Footers from '@/components/Footers';
import Aside from '@/components/Aside';
import Image from 'next/image';
import Link from 'next/link';
import default_picture from '../../assets/img/default.jpg';
import { AiOutlineEdit, AiOutlineArrowRight } from 'react-icons/ai';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { withIronSessionSsr } from 'iron-session/next';
import cookieConfig from '@/helpers/cookieConfig';
import { useDispatch, useSelector } from 'react-redux';
import http from '@/helpers/http';
import { setProfile } from '@/redux/reducers/profile';
import { BsPencil } from 'react-icons/bs';
import profilePict from '../../assets/img/default.jpg';
import { FiEdit2, FiUser } from 'react-icons/fi';

export const getServerSideProps = withIronSessionSsr(async function getServerSideProps({ req }) {
  const token = req.session?.token || null;
  // const profile = useSelector((state) => state.profile.data)
  const { data } = await http(token).get('/profile');
  console.log(data);
  return {
    props: {
      token,
      user: data.results,
    },
  };
}, cookieConfig);

function Profile({ token, user }) {
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.profile.data);
  const [pictureURI, setPictureURI] = React.useState('');
  const [selectedPicture, setSelectedPicture] = React.useState({});
  const [loading, setLoading] = React.useState(false);
  const router = useRouter();
  const [modalOpen, setModalOpen] = React.useState(false);
  const [modal, setCheckModal] = useState(false);

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

  const doChangePicture = async (values) => {
    setLoading(true);
    const form = new FormData();
    Object.keys(values).forEach((key) => {
      if (values[key]) {
        form.append(key, values[key]);
      }
    });
    if (selectedPicture) {
      form.append('picture', selectedPicture);
    }
    if (token) {
      const { data } = await http(token).patch('/profile', form, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      dispatch(setProfile(data.results));
      setLoading(false);
      setPictureURI('');
    }
  };

  const doLogout = async () => {
    await axios.get('/api/logout');
    router.replace('/auth/sign-in');
  };
  function checkModal() {
    setCheckModal(!modal);
  }
  return (
    <div className="min-h-screen">
      <Headers token={token} user={user} />
      <div className="flex bg-[#E8F6EF] px-[100px] py-[50px] gap-4 h-full w-full ">
        <Aside />
        <form className="flex-1 bg-white rounded-3xl flex px-12 py-8 w-full">
          <div className=" p-7 lg:p-16 flex flex-col  justify-center gap-9">
            <div className="flex flex-col gap-1 justify-center items-center">
              <div>
                {!user.picture && (
                  <div className="w-28 h-28 border rounded-lg flex justify-center items-center">
                    <FiUser size={30} />
                  </div>
                )}
                {user.picture && (
                  <div className="w-28 h-28 border rounded-lg overflow-hidden bg-cover">
                    <Image
                      className="rounded object-fit bg-cover"
                      src={user.picture}
                      alt={user.fullName || user.email}
                      width={120}
                      height={120}
                    />
                  </div>
                )}
              </div>
              <Link href="/profile/editProfile">
                <label className="btn btn-ghost normal-case opacity-50">
                  <FiEdit2 />
                  Edit
                </label>
              </Link>
              <div className="flex flex-col justify-center items-center gap-1">
                <div className="font-bold text-xl">{user?.username}</div>
                <div className="opacity-60">+6281393877946</div>
              </div>
            </div>

            <Link href="/profile/detail-profile">
              <div className="btn btn-accent flex justify-between px-4 min-w-[400px] normal-case ">
                <div>Personal Information</div>
                <div>
                  <AiOutlineArrowRight />
                </div>
              </div>
            </Link>
            <Link href="/profile/change-password">
              <div className="btn btn-accent flex justify-between px-4 min-w-[400px] normal-case ">
                <div>Change Password</div>
                <div>
                  <AiOutlineArrowRight />
                </div>
              </div>
            </Link>
            <Link href="/profile/change-pin">
              <div className="btn btn-accent flex justify-between px-4 min-w-[400px] normal-case ">
                <div>Change PIN</div>
                <div>
                  <AiOutlineArrowRight />
                </div>
              </div>
            </Link>
            <button
              onClick={checkModal}
              className="btn btn-accent flex justify-between px-4 min-w-[400px] normal-case hover:text-[16px] text-[#ff0000]  "
            >
              Logout
            </button>
            <input type="checkbox" id="my_modal_6" className="modal-toggle" checked={modal} />
            <div className="modal">
              <div className="modal-box">
                <h3 className="font-bold text-lg">Attention !</h3>
                <p className="py-4">Are you sure to Logout?</p>
                <div className="modal-action">
                  <button onClick={doLogout} className="btn btn-error text-white normal-case">
                    Yes
                  </button>
                  <button onClick={checkModal} className="btn btn-success text-white normal-case">
                    No
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
      <footer>
        <Footers />
      </footer>
    </div>
  );
}
export default Profile;
