import Image from 'next/image';
import React from 'react'

const BigLogo = () => {
  return (
    <div className="ml-6 cursor-pointer -z-10">
      <Image
        className="object-contain"
        src="/10TPB.png"
        height={83}
        width={90}
      />
    </div>
  );
}

export default BigLogo