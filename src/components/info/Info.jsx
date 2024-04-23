import React from 'react'

const Info = ({text}) => {
  return (
    <div className='bg-[var(--bgColorPrimary)] w-full py-3 flex justify-center items-center'>
      <p className='text-white text-xs text-center'>{text}</p>
    </div>
  )
}

export default Info
