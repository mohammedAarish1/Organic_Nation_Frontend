import React from 'react'

const Info = ({ text, fontSize }) => {
  return (
    <div className='bg-[var(--bgColorPrimary)] w-full py-3 flex justify-center items-center'>
      <p className={`text-white xs:text-${fontSize} text-[15px] text-center`}>{text}</p>
    </div>
  )
}

export default Info;
