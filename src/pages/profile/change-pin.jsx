import React from 'react';

import Headers from '@/components/Header';
import Footers from '@/components/Footers';
import Aside from '@/components/Aside';
import PinInput from '@/components/PinInput';

export default function ChangePin() {
  // const router = useRouter();
  // const email = useSelector((state) => state.auth.email);
  const [pin, setPin] = React.useState('');
  // const [showAlert, setShowAlert] = React.useState(false);
  const submitPin = () => {
    console.log(pin);
  };
  return (
    <div className="min-h-screen">
      <Headers />
      <div className="flex bg-[#E8F6EF] px-[100px] py-[50px] gap-4 h-full ">
        <Aside />
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
                <PinInput onChangePin={setPin} />
                <div>
                  <button onClick={submitPin} className="btn btn-accent w-full normal-case">
                    {' '}
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
