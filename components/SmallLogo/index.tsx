import Image from 'next/image';
import React from 'react'

const SmallLogo = () => {
  return (
    <div className='ml-6 cursor-pointer -z-10'>
      <Image
        className="object-contain"
        src="/10TPB.png"
        height={60}
        width={58}
      />
    </div>
  );
}

export default SmallLogo