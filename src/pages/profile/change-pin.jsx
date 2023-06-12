import React from 'react';

import Headers from '@/components/Header';
import Footers from '@/components/Footers';
import Aside from '@/components/Aside';

export default function ChangePin() {
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
                <div className="flex gap-4 justify-between">
                  <div>
                    <input type="number" className="w-12 h-12 text-center border border-gray-300 rounded" />
                  </div>
                  <div>
                    <input type="number" className="w-12 h-12 text-center border border-gray-300 rounded" />
                  </div>
                  <div>
                    <input type="number" className="w-12 h-12 text-center border border-gray-300 rounded" />
                  </div>
                  <div>
                    <input type="number" className="w-12 h-12 text-center border border-gray-300 rounded" />
                  </div>
                  <div>
                    <input type="number" className="w-12 h-12 text-center border border-gray-300 rounded" />
                  </div>
                  <div>
                    <input type="number" className="w-12 h-12 text-center border border-gray-300 rounded" />
                  </div>
                </div>
                <div>
                  <button className="btn btn-accent w-full normal-case"> Continue</button>
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
