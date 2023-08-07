import React from 'react';
import Headers from '@/components/Header';
import { FiUser } from 'react-icons/fi';
import Footer from '@/components/Footers';
import Image from 'next/image';
import { BsCheckCircleFill } from 'react-icons/bs';
import Link from 'next/link';
import cookieConfig from '@/helpers/cookieConfig';
import checkCredentials from '@/helpers/checkCredentials';
import { withIronSessionSsr } from 'iron-session/next';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import http from '@/helpers/http';
import moment from 'moment/moment';
import Aside from '@/components/Aside';

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

function TransferStatusTransactions({ token, user }) {
  const [recipient, setRecipient] = React.useState({});
  const amount = useSelector((state) => state.transfer.amount);
  const {
    query: { id },
  } = useRouter();
  const [data, setData] = React.useState({});
  const getData = React.useCallback(async () => {
    const { data } = await http(token).get('/transactions/' + id);
    if (data.results) {
      setData(data.results);
      setRecipient(data.results.recipient);
    }
  }, [id, token]);

  React.useEffect(() => {
    getData();
  }, [getData]);

  return (
    <div className="min-h-screen">
      <Headers token={token} user={user} />
      <div className="flex bg-[#E8F6EF] px-[100px] py-[50px] gap-4 h-full ">
        <Aside />
        <div className="flex-1 flex flex-col">
          <div className="bg-white w-[850px] h-auto rounded-xl">
            <div className="flex flex-col justify-between px-7 py-3 gap-6">
              <div className="flex flex-col justify-center items-center gap-5 py-6">
                <div>
                  <BsCheckCircleFill size={50} color="green" />
                </div>
                <div className="font-bold text-xl">Transfer Success</div>
              </div>
              <div className="flex flex-col gap-5">
                <div className="shadow-lg shadow-gray-300/20 flex flex-col justify-center items-start p-3 rounded-xl">
                  <div className="text-[16px]">Amount</div>
                  <div className="text-xl font-bold">Rp{Number(data.amount).toLocaleString('id')}</div>
                </div>
                <div className="shadow-lg shadow-gray-300/20 flex flex-col justify-center items-start p-3 rounded-xl">
                  <div className="text-[16px]">Balance Left</div>
                  <div className="text-xl font-bold">Rp{Number(user.balance - amount).toLocaleString('id')}</div>
                </div>
                <div className="shadow-lg shadow-gray-300/20 flex flex-col justify-center items-start p-3 rounded-xl">
                  <div className="text-[16px]">Date & Time </div>
                  <div className="text-xl font-bold">{moment(new Date()).format('MMMM DD, YYYY - HH.mm')}</div>
                </div>
                <div className="shadow-lg shadow-gray-300/20 flex flex-col justify-center items-start p-3 rounded-xl">
                  <div className="text-[16px]">Notes</div>
                  <div className="text-xl font-bold">{data.notes || '-'}</div>
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <div className="text-md font-extrabold">Transfer To</div>
                <div className="shadow-lg shadow-gray-300/20 flex justify-start items-center gap-5 p-5 rounded-xl">
                  <div>
                    {!recipient?.picture && (
                      <div className="w-12 h-12 border rounded-lg flex justify-center items-center">
                        <FiUser size={30} />
                      </div>
                    )}
                    {recipient?.picture && (
                      <div className="w-12 h-12 border rounded-lg overflow-hidden">
                        <Image
                          className="rounded object-fit "
                          src={recipient?.picture}
                          alt={recipient?.fullName || recipient?.email}
                          width={100}
                          height={100}
                        />
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col gap-1">
                    <div className="font-semibold text-xl">{recipient?.fullName}</div>
                    <div className="text-sm opacity-70">{recipient?.phoneNumber || recipient?.email}</div>
                  </div>
                </div>
              </div>
              <div className="flex justify-end items-end gap-4 mt-10 pb-5">
                <Link href="/dashboard">
                  <label className="btn btn-accent normal-case w-[170px]">Back to Dashboard</label>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default TransferStatusTransactions;
