import React from 'react';

import Headers from '@/components/Header';
import Footers from '@/components/Footers';
import Aside from '@/components/Aside';
import PinInput from '@/components/PinInput';
import { withIronSessionSsr } from 'iron-session/next';
import checkCredentials from '@/helpers/checkCredentials';
import cookieConfig from '@/helpers/cookieConfig';
import { BsCheckCircleFill } from 'react-icons/bs';
import { useRouter } from 'next/router';
import http from '@/helpers/http';

export const getServerSideProps = withIronSessionSsr(async function getServerSideProps({ req, res }) {
  const token = req.session?.token;
  checkCredentials(token, res, '/auth/sign-in');

  return {
    props: {
      token,
    },
  };
}, cookieConfig);

function ChangePin({ token }) {
  const [oldPin, setOldPin] = React.useState('');
  const [newPin, setNewPin] = React.useState('');
  const [confirmPin, setConfirmPin] = React.useState('');
  const [modalPinOld, setModalPinOld] = React.useState(true);
  const [modalPinnew, setModalPinNew] = React.useState(false);
  const [modalConfirmPinNew, setModalConfirmPinNew] = React.useState(false);
  const [successMessage, setSuccessMessage] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState('');

  const router = useRouter();

  const actionOldpin = () => {
    setErrorMessage('');
    if (oldPin.length === 6) {
      setModalPinOld(false);
      setModalPinNew(true);
    } else {
      setErrorMessage('Pin must be 6 digits');
    }
  };

  const actionNewPin = () => {
    setErrorMessage('');
    if (newPin.length === 6) {
      setModalPinNew(false);
      setModalConfirmPinNew(true);
    } else {
      setErrorMessage('Pin must be 6 digits');
    }
  };

  const actionChangePin = async () => {
    setErrorMessage('');
    if (newPin === oldPin) {
      setErrorMessage('Pin must be different from the old your pin');
      setModalPinOld(true);
      setModalPinNew(false);
      setModalConfirmPinNew(false);
      setOldPin('');
      setNewPin('');
      setConfirmPin('');
    }
    if (newPin !== confirmPin) {
      setErrorMessage('Confirm Pin does not match');
    } else if (newPin.length === 6 && newPin !== oldPin) {
      const form = new URLSearchParams({
        oldPin: oldPin,
        newPin: newPin,
        confirmPin: confirmPin,
      }).toString();

      try {
        const { data } = await http(token).patch('/profile/change-pin', form);
        console.log(data);
        if (data) {
          router.push('/profile/profile');
          setSuccessMessage(true);
          setModalPinNew(false);
          setModalConfirmPinNew(false);
          setModalPinOld(true);
          setOldPin('');
          setNewPin('');
          setConfirmPin('');
        }
      } catch (error) {
        setErrorMessage('Your Old password Wrong, Please try again!');
        setModalPinOld(true);
        setModalConfirmPinNew(false);
      }
    } else if (confirmPin.length < 6) {
      setErrorMessage('Pin must be 6 digits');
    }
  };

  const handleSubmitOldPin = (e) => {
    e.preventDefault();
    actionOldpin();
  };

  const handleSubmitNewPin = (e) => {
    e.preventDefault();
    actionNewPin();
  };

  const handleSubmitChangePin = (e) => {
    e.preventDefault();
    actionChangePin();
  };
  return (
    <div className="min-h-screen">
      <Headers token={token} />
      <div className="flex bg-[#E8F6EF] px-[100px] py-[50px] gap-4 h-full ">
        <Aside token={token} />
        <div className="flex-1 bg-white rounded-3xl flex px-12 py-16">
          <div className="h-full w-full flex flex-col gap-4">
            <div className="flex flex-col gap-4">
              <div className="font-bold text-[18px] ">Change PIN</div>
              <div className="font-normal text-[16px] w-[340px] ">
                Enter your current 6 digits Fazzpay PIN below to continue to the next steps.
              </div>
            </div>
            <div className=" flex flex-col gap-12 items-center pt-12 px-4 ">
              <div className="w-[400px] flex flex-col gap-6 ">
                {modalPinOld && (
                  <form
                    onSubmit={handleSubmitOldPin}
                    className="w-full flex flex-col gap-7 items-center justify-center"
                  >
                    {successMessage && (
                      <div>
                        <div className="w-full flex flex-row justify-center text-white text-lg">
                          <BsCheckCircleFill className="text-green-400" size={60} />
                        </div>
                        <div className="text-[16px] text-black">Update Change Succes</div>
                      </div>
                    )}
                    {/* {errorMessage && (
                      <div className="w-full flex flex-row justify-center text-red-500 font-semibold text-base">
                        *{errorMessage}
                      </div>
                    )} */}
                    <div className="w-full flex flex-row justify-center text-black font-semibold text-base">
                      Input Your Old PIN
                    </div>
                    {errorMessage && (
                      <div className="w-full flex flex-row justify-center text-red-500 font-semibold text-base">
                        *{errorMessage}
                      </div>
                    )}
                    <PinInput onChangePin={setOldPin} />
                    <button type="submit" className="btn btn-primary w-full normal-case">
                      Continue
                    </button>
                  </form>
                )}
                {modalPinnew && (
                  <form
                    onSubmit={handleSubmitNewPin}
                    className="w-full flex flex-col gap-7 items-center justify-center"
                  >
                    {successMessage && (
                      <div className="w-full flex flex-row justify-center text-white text-lg">
                        <BsCheckCircleFill className="text-green-400" size={60} />
                      </div>
                    )}
                    <div className="w-full flex flex-row justify-center text-black font-semibold text-base">
                      Input New PIN
                    </div>
                    {errorMessage && (
                      <div className="w-full flex flex-row justify-center text-red-500 font-semibold text-base">
                        *{errorMessage}
                      </div>
                    )}
                    <PinInput onChangePin={setNewPin} />
                    <button type="submit" className="btn btn-primary w-full normal-case">
                      Continue
                    </button>
                  </form>
                )}
                {modalConfirmPinNew && (
                  <form
                    onSubmit={handleSubmitChangePin}
                    className="w-full flex flex-col gap-7 items-center justify-center"
                  >
                    {successMessage && (
                      <div className="w-full flex flex-row justify-center text-white text-lg">
                        <BsCheckCircleFill className="text-green-400" size={60} />
                      </div>
                    )}
                    <div className="w-full flex flex-row justify-center text-black font-semibold text-base">
                      Input PIN Confirmation
                    </div>
                    {errorMessage && (
                      <div className="w-full flex flex-row justify-center text-red-500 font-semibold text-base">
                        *{errorMessage}
                      </div>
                    )}
                    <PinInput onChangePin={setConfirmPin} />
                    <button type="submit" className="btn btn-primary w-full normal-case">
                      Continue
                    </button>
                  </form>
                )}
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
export default ChangePin;
