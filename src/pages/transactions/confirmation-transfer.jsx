import React from 'react';

import Headers from '@/components/Header';
import Footers from '@/components/Footers';
import Aside from '@/components/Aside';
import Image from 'next/image';
import PinInput from '@/components/PinInput';
import { FiUser } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import cookieConfig from '@/helpers/cookieConfig';
import checkCredentials from '@/helpers/checkCredentials';
import { withIronSessionSsr } from 'iron-session/next';
import http from '@/helpers/http';
import moment from 'moment/moment';
import { clearTransferState, setRecipient as setRecipientAction } from '@/redux/reducers/transfer';

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

function ConfirmationTransfer({ token, user }) {
  const dispatch = useDispatch();
  const router = useRouter();
  const recipient = useSelector((state) => state.transfer.user);
  const amount = useSelector((state) => state.transfer.amount);
  const notes = useSelector((state) => state.transfer.notes);
  const [pin, setPin] = React.useState('');

  const actionTransfer = async () => {
    if (!recipient || !recipient.id) {
      console.error('Recipient is undefined or has no ID');
      return;
    }
    const form = new URLSearchParams({
      recipientId: recipient.id,
      notes,
      amount,
      pin,
    }).toString();
    const { data } = await http(token).post('/transactions/transfer', form);
    console.log(data);
    dispatch(clearTransferState());
    router.replace('/transactions/' + data.results.id);
  };

  return (
    <div className="min-h-screen">
      <Headers token={token} user={user} />
      <div className="flex bg-[#E8F6EF] px-[100px] py-[50px] gap-4 h-full ">
        <Aside />
        <div className="flex-1 bg-white rounded-3xl flex p-8">
          <div className="flex flex-col justify-between px-7 py-3 gap-6">
            <div className="text-xl font-bold">Transfer To</div>
            <div className="shadow-lg shadow-gray-500/20 flex justify-start items-center gap-5 p-5 rounded-xl">
              {!recipient.picture && (
                <div className="w-12 h-12 border rounded-lg flex justify-center items-center">
                  <FiUser size={30} />
                </div>
              )}
              {recipient.picture && (
                <div className="w-12 h-12 border rounded-lg overflow-hidden">
                  <Image
                    className="rounded object-fit "
                    src={recipient.picture}
                    alt={recipient.fullName || recipient.email}
                    width={100}
                    height={100}
                  />
                </div>
              )}
              <div className="flex flex-col gap-1">
                <div className="font-semibold text-xl">{recipient.fullName}</div>
                <div className="text-sm opacity-70">{recipient?.phoneNumber || recipient.email}</div>
              </div>
            </div>
            <div className="flex flex-col gap-5">
              <div>
                <div className="w-[336px] font-bold text-xl">Details Transfer</div>
              </div>
              <div className="shadow-lg shadow-gray-500/20 flex flex-col justify-center items-start p-3 rounded-xl">
                <div className="text-sm opacity-60">Amount</div>
                <div className="text-xl font-bold">Rp{Number(amount).toLocaleString('id')}</div>
              </div>
              <div className="shadow-lg shadow-gray-500/20 flex flex-col justify-center items-start p-3 rounded-xl">
                <div className="text-sm opacity-60">Balance Left</div>
                <div className="text-xl font-bold">Rp{Number(user.balance - amount).toLocaleString('id')}</div>
              </div>
              <div className="shadow-lg shadow-gray-500/20 flex flex-col justify-center items-start p-3 rounded-xl">
                <div className="text-sm opacity-60">Date & Time </div>
                <div className="text-xl font-bold">{moment(new Date()).format('MMMM DD, YYYY - HH.mm')}</div>
              </div>
              <div className="shadow-lg shadow-gray-500/20 flex flex-col justify-center items-start p-4 rounded-xl">
                <div className="text-sm opacity-60">Notes</div>
                <div className="text-xl font-bold">{notes || '-'}</div>
              </div>
            </div>
            <div className="flex justify-end items-end">
              <label htmlFor="pinInput" className="btn btn-accent normal-case max-w-[160px]">
                Continue
              </label>
            </div>
            <input type="checkbox" id="pinInput" className="modal-toggle" />
            <div className="modal">
              <div className="modal-box">
                <h3 className="font-bold text-lg">Enter PIN to Transfer</h3>
                <p className="py-4">Enter your 6 digits PIN for confirmation to continue transferring money. </p>
                <div>
                  <PinInput onChangePin={setPin} />
                </div>
                <div className="modal-action">
                  <button
                    onClick={actionTransfer}
                    disabled={!(pin.length >= 6)}
                    className="btn btn-primary normal-case"
                  >
                    Continue
                  </button>
                </div>
              </div>
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
export default ConfirmationTransfer;
