import { PricingTable } from '@clerk/nextjs';
import React from 'react';

const Subscription = () => {
  return (
      <div className="flex justify-center items-center flex-col h-[120vh] px-10">
          <h1 className='text-[50px] mb-10 italic border-b-2 border-b-red-800'>Upgrade The MemberShip To <span className='text-[#865D36] text-[58px]'>Enjoy More Feature!</span></h1>
      <PricingTable
        appearance={{
          elements: {
                pricingTableCardBody: 'bg-[#865D36]',
                pricingTableCardHeader: 'bg-slate-200',
          },
        }}
      />
    </div>
  );
};

export default Subscription;
