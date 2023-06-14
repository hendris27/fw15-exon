import React from 'react';
import Headers from '@/components/Header';

import axios from 'axios';
import { useRouter } from 'next/router';
import { useState } from 'react';

import { AiOutlineArrowUp, AiOutlinePlus, AiOutlineUser, AiOutlineLogout, AiOutlineDashboard } from 'react-icons/ai';
import Link from 'next/link';

// export const getServerSideProps = withIronSessionSsr(async function getServerSideProps({ req, res }) {
//   const token = req.session?.token;
//   if (!token) {
//     res.setHeader('location', 'auth/login');
//     res.statusCode = 302;
//     res.end();
//     return {
//       props: {},
//     };
//   }
//   return {
//     props: {
//       token,
//     },
//   };
// }, cookieConfig);
function Layout({ children, token: userToken }) {
  const [modal, setCheckModal] = useState(false);
  const router = useRouter();
  const doLogout = async () => {
    await axios.get('/api/logout');
    router.replace('/auth/sign-in');
  };
  function checkModal() {
    setCheckModal(!modal);
  }
  return (
    <div className="flex flex-col gap-2 h-min-screen bg-gray-300 ">
      <Headers token={userToken} className="" />
      <div className="flex items-center">
        <div className="md:block hidden w-[400px] md:flex md:justify-center items-center h-[calc(theme(height.screen)-theme(height.24))]">
          <div className="py-8 pl-8 flex flex-col w-[90%]  h-[calc(theme(height.screen)-theme(height.40))] bg-white rounded-xl justify-between ">
            <div className="flex flex-col gap-8">
              <Link href="/home">
                <div className="flex gap-8 ">
                  <div>
                    <AiOutlineDashboard size={25} color="#69BEB9" />
                  </div>
                  <div className="font-bold text-[#69BEB9]">Dashboard</div>
                </div>
              </Link>
              <Link href="/transaction/transfer">
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
                    onClick={() => window.my_modal_5.showModal()}
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
          </div>
        </div>
        <div className="flex-1 bg-white h-[calc(theme(height.screen)-theme(height.40))] mr-4 rounded-lg p-5 flex flex-col gap-5">
          {children}
        </div>
      </div>
      <div className="md:block hidden bg-[#69BEB9] h-16 flex justify-between px-[100px] py-[20px] text-white">
        <div>2023 Exon. All right reserved.</div>
        <div className="flex gap-4">
          <div>+62 857 1430 4309</div>
          <div>contact@exon.com</div>
        </div>
      </div>
    </div>
  );
}

export default Layout;
