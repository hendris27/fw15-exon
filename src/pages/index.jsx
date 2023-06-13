import Link from 'next/link';
import Image from 'next/image';
import default_picture from '../assets/img/default.jpg';

import logo from '../assets/img/logo.png';
import picture_home from '../assets/img/picture_home.png';
import picture_sponsor from '../assets/img/sponsor.png';
import picture_features from '../assets/img/picture_features.png';
import { AiOutlinePhone, AiFillLock, AiOutlineDownload, AiOutlineUser, AiOutlineLogout } from 'react-icons/ai';
import cookieConfig from '@/helpers/cookieConfig';
import { withIronSessionSsr } from 'iron-session/next';
import { useRouter } from 'next/router';
import { useState } from 'react';
import axios from 'axios';

export const getServerSideProps = withIronSessionSsr(async function getServerSideProps({ req }) {
  const token = req.session?.token || null;

  return {
    props: {
      token,
    },
  };
}, cookieConfig);

export default function Home({ token }) {
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
    <main className="h-screen">
      <div className="bg-login h-[800px] bg-cover bg-no-repeat relative ">
        <header className="flex justify-between px-[100px] pt-8 items-center">
          <Link href="/home">
            <Image src={logo} className="w-[160px] h-[45px]" alt="picture_logo" />
          </Link>

          {token ? (
            <div className="dropdown dropdown-bottom dropdown-end z-10">
              <label tabIndex={0} className="btn m-1 bg-transparent outline-none border-0 hover:bg-transparent ">
                <div className="rounded-xl overflow-hidden h-12 w-12 border-[#444cd4]">
                  <Image src={default_picture} className="w-full h-full" alt="picture_logo" />
                </div>
              </label>
              <ul
                tabIndex={0}
                className="dropdown-content menu p-2 shadow  bg-base-100 rounded-box w-[200px] px-2s flex flex-col items-center justify-between "
              >
                <li>
                  <Link href="/profile/profile" className="hover:bg-white">
                    <div className="flex gap-4 hover:bg-white items-center justify-center">
                      <div>
                        <AiOutlineUser size={30} />
                      </div>
                      <div className="font-bold text-medium hover:bg-white hover:text-accent ">My Profile</div>
                    </div>
                  </Link>
                </li>
                <div className="border-b-2 w-full hover:bg-white"></div>
                <li className="font-bold text-primary">
                  <button onClick={checkModal} className="hover:bg-white flex gap2 ">
                    <AiOutlineLogout size={25} color="red" />
                    <div className="text-[#ff0000] font-bold hover:text-[16px] ">Logout</div>
                  </button>
                </li>
              </ul>
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
          ) : (
            <div className="flex gap-4">
              <div>
                <Link href="/auth/sign-in">
                  <button className="btn hover:bg-[#69BEB9] h-[35px] normal-case bg-transparent">Login</button>
                </Link>
              </div>
              <div>
                <Link href="auth/sign-up">
                  <button className="btn  normal-case">Sign up</button>
                </Link>
              </div>
            </div>
          )}
        </header>
        <div className="flex px-[100px]">
          <div className="flex gap-24 absolute bottom-[0px] z-0 ">
            <div className="flex-col flex pt-24 gap-12">
              <div className="text-[60px] font-bold leading-[93px]">
                Awesome App <p>For Saving Time.</p>
              </div>
              <div className="text-[18px] ">
                We bring you a mobile app for banking problems that <br />
                oftenly wasting much of your times.
              </div>
              <div>
                <button className="btn normal-case border-0">Try It Free</button>
              </div>
            </div>
            <div className="pl-8 w-[580px] h-[700px] ">
              <Image src={picture_home} className="w-full h-full " alt="picture_home" />
            </div>
          </div>
        </div>
      </div>
      <div className="flex px-[100px] py-12 ">
        <div className="">
          <Image src={picture_sponsor} className="w-full h-full " alt="picture_sponsor" />
        </div>
      </div>
      <div className="px-[100px] py-[100px]">
        <div className="flex flex-col gap-12">
          <div className="flex flex-col gap-12 justify-center items-center">
            <div className="text-[#69BEB9] text-[60px] font-bold">
              About&nbsp;<span className="text-black text-[60px] font-bold">the Application.</span>
            </div>
            <div className="text-[18px] flex flex-col items-center justify-center w-[567px] ">
              <div>We have some great features from the application and it’s totally free</div>
              <div>free to use by all users around the world.</div>
            </div>
          </div>
          <div className="flex justify-between">
            <div className="flex flex-col gap-8 items-center w-[300px]">
              <div>
                <AiOutlinePhone size={30} />
              </div>
              <div className="text-[24px] font-bold ">24/7 Support</div>
              <div className="text-[18px]  text-center">
                We have 24/7 contact support so you can contact us whenever you want and we will respond it.
              </div>
            </div>
            <div className="flex flex-col gap-8 items-center w-[300px]">
              <div>
                <AiFillLock size={30} />
              </div>
              <div className="text-[24px] font-bold ">Data Privacy</div>
              <div className="text-[18px]  text-center">
                We make sure your data is safe in our database and we will encrypt any data you submitted to us.
              </div>
            </div>
            <div className="flex flex-col gap-8 items-center w-[300px]">
              <div>
                <AiOutlineDownload size={30} />
              </div>
              <div className="text-[24px] font-bold ">Easy Download</div>
              <div className="text-[18px]  text-center">
                Zwallet is 100% totally free to use it’s now available on Google Play Store and App Store.
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className=" flex px-[100px]">
        <div className=" flex w-[50%] justify-center ">
          <div className="w-[420px] h-[850px] flex jutsify-ce ">
            <Image src={picture_features} className="w-full h-full" alt="picture_logo" />
          </div>
        </div>
        <div className=" flex-1 flex items-center ">
          <div className="flex flex-col gap-12 ">
            <div className="flex flex-col  text-[60px] font-bold ">
              <div>
                All The <span className="text-[#69BEB9]">Great</span>{' '}
              </div>
              <div>FazzPay Features.</div>
            </div>
            <div className="font-bold text-[18px] bg-white rounded-xl shadow-xl px-2 py-5 ">
              1.&nbsp; &nbsp; Small Fee{' '}
              <p className="font-normal">We only charge 5% of every success transaction done in FazzPay app.</p>
            </div>
            <div className="font-bold text-[18px] bg-white rounded-xl shadow-xl px-2 py-5  ">
              2.&nbsp; &nbsp; Data Secured{' '}
              <p className="font-normal">All your data is secured properly in our system and it’s encrypted.</p>
            </div>
            <div className="font-bold text-[18px] bg-white rounded-xl shadow-xl px-2 py-5  ">
              3.&nbsp; &nbsp; User Friendly{' '}
              <p className="font-normal">FazzPay come up with modern and sleek design and not complicated.</p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center w-full pt-[150px] pb-[0px] gap-8 ">
        <div className="text-[60px] font-bold">
          What Users are <span className="text-[#69BEB9]">Saying.</span>
        </div>
        <div className="max-w-[567px] text-lg text-center">
          We have some great features from the application and it’s totally free to use by all users around the world.
        </div>
        <div className="flex min-w-[988px] py-10">
          <div className="flex flex-col items-center rounded-2xl w-full h-[496px] text-center py-[60px]">
            <div className="bg-gray-300 w-14 h-14 rounded-full flex justify-center items-center"></div>
            <div className="text-[26px] pt-[30px] font-semibold">Hendri</div>
            <div className="text-xl pt-2">Programmer</div>
            <div className="text-lg max-w-[869px] pt-11">
              “This is the most outstanding app that I’ve ever try in my live, this app is such an amazing masterpiece
              and it’s suitable for you who is bussy with their bussiness and must transfer money to another person aut
              there. Just try this app and see the power!”
            </div>
          </div>
        </div>
      </div>
      <footer className="bg-[#69BEB9] px-[100px] py-[80px] ">
        <div className="flex flex-col gap-8 ">
          <Image src={logo} className="w-[125px] h-[40px]" alt="picture_logo" />

          <div className="max-w-[285px] text-[18px] ">
            Simplify financial needs and saving much time in banking needs with one single app.
          </div>
          <div className="border border-b-2"></div>
          <div className="flex justify-between">
            <div>2020 FazzPay. All right reserved.</div>
            <div className="flex gap-3">
              <div>+62 5637 8882 9901</div>
              <div>contact@fazzpay.com</div>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
