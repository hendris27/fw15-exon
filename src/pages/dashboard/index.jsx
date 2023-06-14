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
  const [trx, setTrx] = React.useState([]);
  const user = useSelector((state) => state.profile.data);
  const getTransaction = React.useCallback(async () => {
    const { data } = await http(userToken).get('/transactions', { params: { limit: 4 } });
    setTrx(data.results);
  }, [userToken]);

  React.useEffect(() => {
    getTransaction();
  }, [getTransaction]);
  return (
    <Layout token={userToken}>
      <div className="bg-[#69BEB9] shadow-2xl flex justify-between h-[180px] rounded-3xl px-8 py-8">
        <div className=" flex flex-col justify-between">
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
          <div className="w-[162px]">
            <div className="w-full flex gap-4 btn bg-[#57C5B6] rounded-xl normal-case">
              <AiOutlinePlus size={25} color="white" />
              <div className="text-white">Top Up</div>
            </div>
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
          <div className="flex justify-center">
            <Image src={graphic} alt="picture_graphic" />
          </div>
        </div>
        <div className="bg-white  shadow-2xl flex-1 rounded-3xl flex flex-col gap-4 p-8">
          <div className="flex justify-between">
            <div className="font-bold">Transaction History</div>
            <Link href="/transactions">
              <div className="font-bold text-accent">See All</div>
            </Link>
          </div>
          <Link href="transactions/input-amount">
            <div className="flex flex-col gap-5">
              {trx.map((item) => (
                <div className="flex justify-between items-center" key={`trx-list-${item.id}`}>
                  <div className="flex justify-between items-center gap-3">
                    {item.type === 'TOP-UP' && (
                      <>
                        <div>
                          {!item.recipient.picture && (
                            <div className="w-14 h-14 bg-white border rounded flex justify-center items-center">
                              <AiOutlineUser size={35} />
                            </div>
                          )}
                          {item.recipient.picture && <div className="w-14 h-14 bg-black border rounded" />}
                        </div>
                        <div className="flex flex-col gap-2">
                          <p className="font-semibold">{item.recipient.fullName || item.recipient.email}</p>
                          <p className="text-sm text-[#6A6A6A]">Topup</p>
                        </div>
                      </>
                    )}
                  </div>
                  <div>
                    <p className="font-semibold">Rp.{Number(item.amount).toLocaleString('id')}</p>
                  </div>
                </div>
              ))}
            </div>
          </Link>
        </div>
      </div>
    </Layout>
  );
}

export default Dasboard;
