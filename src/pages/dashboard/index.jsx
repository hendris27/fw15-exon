import Layout from '@/components/Layout';
import checkCredentials from '@/helpers/checkCredentials';
import cookieConfig from '@/helpers/cookieConfig';
import { withIronSessionSsr } from 'iron-session/next';
import Link from 'next/link';
import React from 'react';
import { AiOutlineArrowDown, AiOutlineArrowUp, AiOutlinePlus, AiOutlineUser } from 'react-icons/ai';
import { useSelector } from 'react-redux';
import Image from 'next/image';
import graphic from '../../assets/img/graphic.png';
import http from '@/helpers/http';
import { FiUser } from 'react-icons/fi';
import InputTransactions from '@/components/InputTransactions';

export const getServerSideProps = withIronSessionSsr(async function getServerSideProps({ req, res }) {
  const token = req.session?.token;
  checkCredentials(token, res, '/auth/profile');

  return {
    props: {
      userToken: token,
    },
  };
}, cookieConfig);

function Dasboard({ userToken }) {
  const [modalOpen, setModalOpen] = React.useState(false);
  const [trx, setTrx] = React.useState([]);
  const user = useSelector((state) => state.profile.data);
  const getTransaction = React.useCallback(async () => {
    const { data } = await http(userToken).get('/transactions', { params: { limit: 4 } });
    setTrx(data.results);
  }, [userToken]);

  React.useEffect(() => {
    getTransaction();
  }, [getTransaction]);
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
    <Layout token={userToken}>
      <div className="flex flex-col gap-4 h-full">
        <div className="bg-[#69BEB9] shadow-2xl flex justify-between max-h-[190px] w-full  rounded-3xl px-8 py-8">
          <div className=" flex flex-col justify-between ">
            <div className="text-[22px] text-[#DFDCDC] ">Balance</div>
            <div className="text-[40px] font-bold text-white">
              {user?.balance ? `Rp${Number(user?.balance).toLocaleString('id')}` : `Rp.0`}
            </div>
            <div className="text-[14px] text-[##DFDCDC] ">{user?.email}</div>
          </div>
          <div className="flex flex-col gap-4 justify-between">
            <div className="w-[162px]">
              <div className="w-full flex gap-4 btn bg-[#57C5B6] rounded-xl normal-case">
                <AiOutlineArrowUp size={25} color="white" />
                <Link href="/transaction/transfer">
                  <div className="text-white">Transfer</div>
                </Link>
              </div>
            </div>
            <button
              onClick={() => {
                openModal();
              }}
              className="w-[162px]"
            >
              <div className="w-full flex gap-4 btn bg-[#57C5B6] rounded-xl normal-case">
                <AiOutlinePlus size={25} color="white" />
                <div className="text-white">Top Up</div>
              </div>
            </button>
          </div>
        </div>
        <div className="h-[100%] flex gap-4">
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
            <div className="flex justify-center">
              <Image src={graphic} alt="picture_graphic" />
            </div>
          </div>
          <div className="shadow-2xl  rounded-3xl flex flex-col gap-4 p-8">
            <div className="flex justify-between">
              <div className="font-bold">Transaction History</div>
              <Link href="/transactions">
                <div className="font-bold text-accent">See All</div>
              </Link>
            </div>
            <Link href="transactions/input-amount">
              <div className="flex flex-col">
                {trx.map((item) => (
                  <div key={`trx-list-${item.id}`} className="flex justify-between px-7 py-2">
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
                                  <div className="w-12 h-12 border rounded-lg overflow-hidden object-cover ">
                                    <Image
                                      className="rounded object-cover"
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
            </Link>
          </div>
          {modalOpen && <InputTransactions visibleModal={modalOpen} token={userToken} />}
        </div>
      </div>
    </Layout>
  );
}

export default Dasboard;
