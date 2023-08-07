import React from 'react';

import { AiOutlineArrowUp, AiOutlineArrowDown, AiOutlinePlus } from 'react-icons/ai';
import Headers from '@/components/Header';
import Footers from '@/components/Footers';
import Aside from '@/components/Aside';
import Image from 'next/image';
import { FiUser } from 'react-icons/fi';
import default_picture from '../assets/img/default.jpg';
import cookieConfig from '@/helpers/cookieConfig';
import { withIronSessionSsr } from 'iron-session/next';
import Link from 'next/link';
import checkCredentials from '@/helpers/checkCredentials';
import { useRouter } from 'next/router';
import http from '@/helpers/http';

export const getServerSideProps = withIronSessionSsr(async function getServerSideProps({ req, res }) {
  const token = req.session?.token;
  checkCredentials(token, res, '/auth/sign-in');

  const { data } = await http(token).get('/profile');
  console.log(data);

  return {
    props: {
      token,
      user: data.results,
    },
  };
}, cookieConfig);

function Dashboard({ token, user }) {
  const router = useRouter();
  const [trx, setTrx] = React.useState([]);
  const getTransactions = React.useCallback(async () => {
    const { data } = await http(token).get('/transactions', { params: { limit: 2 } });
    setTrx(data.results);
  }, [token]);

  React.useEffect(() => {
    getTransactions();
  }, [getTransactions]);

  const topUp = async (event) => {
    event.preventDefault();
    try {
      const { value: amount } = event.target.elements.amount;
      const form = new URLSearchParams({ amount });
      const { data } = await http(token).post('/transactions/topup', form.toString());
      console.log(data);
      router.reload('/home');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="h-screen">
      <Headers />
      <div className="flex bg-[#E8F6EF] px-[100px] py-[50px] gap-4 h-full ">
        <Aside />
        <div className="flex-1 rounded-3xl flex flex-col gap-4">
          <div className="bg-[#69BEB9] shadow-2xl flex justify-between h-[180px] rounded-3xl px-8 py-8">
            <div className=" flex flex-col justify-between">
              <div className="text-[18px] text-[#DFDCDC] ">Balance</div>
              <div className="text-[40px] font-bold text-white">
                {user?.balance ? `Rp ${Number(user?.balance).toLocaleString('id')}` : `Rp-0`}
              </div>
              <div className="text-[14px] text-[##DFDCDC] ">{user?.email}</div>
            </div>
            <div className="flex flex-col gap-4 justify-between">
              <div className="w-[162px]">
                <button className="w-full flex gap-4 btn bg-[#57C5B6] rounded-xl normal-case">
                  <AiOutlineArrowUp size={25} color="white" />
                  <Link href="/transaction/transfer">
                    <button className="text-white">Transfer</button>
                  </Link>
                </button>
              </div>
              <div className="w-[162px]">
                <button className="w-full flex gap-4 btn bg-[#57C5B6] rounded-xl normal-case">
                  <AiOutlinePlus size={25} color="white" />
                  <button className="text-white">Top Up</button>
                </button>
              </div>
            </div>
          </div>
          <div className="flex-1 flex gap-4">
            <div className="bg-white shadow-2xl w-[55%] rounded-3xl flex flex-col px-8 pt-8">
              <div className="flex justify-between">
                <div className="flex flex-col gap-2">
                  <div>
                    <AiOutlineArrowDown size={25} color="green" />
                  </div>
                  <div>Income</div>
                  <div>Rp2.120.000</div>
                </div>
                <div className="flex flex-col gap-2">
                  <div>
                    <AiOutlineArrowUp size={25} color="red" />
                  </div>
                  <div>Expense</div>
                  <div>Rp1.560.000</div>
                </div>
              </div>
            </div>
            <div className="bg-white  shadow-2xl flex-1 rounded-3xl flex flex-col gap-4 p-8">
              <div className="flex justify-between">
                <div className="font-bold">Transaction History</div>
                <button className="font-bold text-accent">See All</button>
              </div>

              {trx.map((item) => (
                <div key={`trx-list-${item.id}`} className="flex justify-between px-7 py-6">
                  <div className="flex gap-2">
                    {item.type === 'TRANSFER' && (
                      <>
                        {item.recipient.id !== user.id && (
                          <>
                            <div>
                              {!item.recipient.picture && (
                                <div className="w-12 h-12 border rounded-lg flex justify-center items-center">
                                  <FiUser size={30} />
                                </div>
                              )}
                              {item.recipient.picture && (
                                <div className="w-12 h-12 border rounded-lg overflow-hidden">
                                  <Image
                                    className="rounded object-fit "
                                    src={item.recipient.picture}
                                    alt={item.recipient.fullName || item.recipient.email}
                                    width={100}
                                    height={100}
                                  />
                                </div>
                              )}
                            </div>
                            <div className="flex flex-col gap-1">
                              <div className="font-semibold">{item.recipient.fullName || item.recipient.email}</div>
                              <div className="text-sm opacity-70">Outcome</div>
                            </div>
                          </>
                        )}
                        {item.recipient.id === user.id && (
                          <>
                            <div>
                              {!item.sender.picture && (
                                <div className="w-12 h-12 border rounded-lg flex justify-center items-center">
                                  <FiUser size={30} />
                                </div>
                              )}
                              {item.sender.picture && (
                                <div className="w-12 h-12 border rounded-lg overflow-hidden">
                                  <Image
                                    className="rounded object-fit "
                                    src={item.sender.picture}
                                    alt={item.sender.fullName || item.sender.email}
                                    width={100}
                                    height={100}
                                  />
                                </div>
                              )}
                            </div>
                            <div className="flex flex-col gap-1">
                              <div className="font-semibold">{item.sender.fullName || item.sender.email}</div>
                              <div className="text-sm opacity-70">Outcome</div>
                            </div>
                          </>
                        )}
                      </>
                    )}
                    {item.type === 'TOP-UP' && (
                      <>
                        <div>
                          {!item.picture && (
                            <div className="w-12 h-12 border rounded-lg flex justify-center items-center">
                              <FiUser size={30} />
                            </div>
                          )}
                          {item.picture && (
                            <div className="w-12 h-12 border rounded-lg overflow-hidden">
                              <Image
                                className="rounded object-fit "
                                src={item.picture}
                                alt={item.fullName || item.email}
                                width={100}
                                height={100}
                              />
                            </div>
                          )}
                        </div>
                        <div className="flex flex-col gap-1">
                          <div className="font-semibold">{item.recipient.fullName || item.recipient.email}</div>
                          <div className="text-sm opacity-70">Income</div>
                        </div>
                      </>
                    )}
                  </div>
                  <div>
                    {item.type === 'TOP-UP' && (
                      <div className="font-semibold text-green-500">Rp{Number(item.amount).toLocaleString('id')}</div>
                    )}
                    {item.type === 'TRANSFER' &&
                      (item.recipient.id === user.id ? (
                        <div className="text-green-500">Rp{Number(item.amount).toLocaleString('id')}</div>
                      ) : (
                        <div className="text-red-500">Rp{Number(item.amount).toLocaleString('id')}</div>
                      ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <footer>
        <Footers />
      </footer>
    </div>
  );
}
export default Dashboard;
