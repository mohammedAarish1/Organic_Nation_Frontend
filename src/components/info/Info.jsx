import React, { memo } from 'react'

const Info = ({ text, fontSize }) => {
  return (
    // <div className='bg-[var(--accent-color)] w-full py-2 tracking-widest flex justify-center items-center font-light italic px-2'>
    //   <p className={`text-white xs:text-${fontSize} text-[10px] text-center`}>{text}</p>
    // </div>

     <div className="bg-[var(--themeColor)] text-[#FFFFFF] py-2 text-center text-[10px]">
       {text}
      </div>
  )
}

export default memo(Info);
