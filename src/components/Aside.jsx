import React from 'react';
import { RxDashboard } from 'react-icons/rx';
import { AiOutlineArrowUp, AiOutlinePlus, AiOutlineUser, AiOutlineLogout } from 'react-icons/ai';
import Link from 'next/link';
import cookieConfig from '@/helpers/cookieConfig';
import { withIronSessionSsr } from 'iron-session/next';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useState } from 'react';
import InputTransactions from '@/components/InputTransactions';

export const getServerSideProps = withIronSessionSsr(async function getServerSideProps({ req, res }) {
  const token = req.session?.token;
  if (!token) {
    res.setHeader('location', 'auth/sign-in');
    res.statusCode = 302;
    res.end();
    return {
      props: {},
    };
  }
  return {
    props: {
      token,
    },
  };
}, cookieConfig);

export default function Aside({ token }) {
  const [modalOpen, setModalOpen] = React.useState(false);
  const router = useRouter();
  const [modal, setCheckModal] = useState(false);

  const doLogout = async () => {
    await axios.get('/api/logout');
    router.replace('/auth/sign-in');
  };
  function checkModal() {
    setCheckModal(!modal);
  }
  const openModal = () => {
    if (modalOpen === true) {
      setModalOpen(false);
      setTimeout(() => {
        setModalOpen(true);
      }, 200);
    } else {
      setModalOpen(true);
    }
  };
  return (
    <div className="max-h-full bg-white shadow-2xl w-[30%] py-8 px-6 rounded-3xl flex flex-col  justify-between ">
      <div className="flex flex-col gap-8">
        <Link href="/dashboard">
          <div className="flex gap-8 ">
            <div>
              <RxDashboard size={25} color="#69BEB9" />
            </div>
            <div className="font-bold text-[#69BEB9]">Dashboard</div>
          </div>
        </Link>
        <Link href="/transactions/search-receiver">
          <div className="flex gap-8 ">
            <div>
              <AiOutlineArrowUp size={25} color="#69BEB9" />
            </div>
            <div className="font-bold text-[#69BEB9]">Transfer</div>
          </div>
        </Link>
        <div className="flex gap-8 items-center ">
          <div>
            <AiOutlinePlus size={25} color="#69BEB9" />
          </div>
          <div>
            {/* Open the modal using ID.showModal() method */}
            <div
              className="btn bg-transparent outline-none border-0 ml-[-16px] hover:bg-transparent hover:outline-none"
              onClick={() => {
                openModal();
              }}
            >
              <div className='className="font-bold text-[#69BEB9] normal-case text-[16px]"'>Top Up</div>
            </div>
            <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
              <form method="dialog" className="modal-box flex flex-col justify-starts">
                <h3 className="font-bold text-lg">Top Up</h3>
                <p className="py-4">Enter the amount of money, and click submit</p>
                <div className="modal-action">
                  <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                </div>
                <div className="flex flex-col gap-4">
                  <div>
                    <input type="number" className="input input-bordered w-full" />
                  </div>
                  <div>
                    <button type="submit" className="btn btn-primary w-[120px] rounded-2xl ">
                      Submit
                    </button>
                  </div>
                </div>
              </form>
            </dialog>
          </div>
        </div>

        <Link href="/profile/profile">
          <button className="flex gap-8 ">
            <div>
              <AiOutlineUser size={25} color="#69BEB9" />
            </div>
            <div className="font-bold text-[#69BEB9]">Profile</div>
          </button>
        </Link>
      </div>
      <div className="flex gap-8 ">
        <AiOutlineLogout size={25} color="red" />

        <button onClick={checkModal} className="font-bold text-[#FF0000]">
          Logout
        </button>
      </div>
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
      {modalOpen && <InputTransactions visibleModal={modalOpen} token={token} />}
    </div>
  );
}
