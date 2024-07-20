import React from 'react'

const Title = ({text }) => {
  return (
    <h2 className='xs:text-[30px] text-2xl font-medium text-[var(--themeColor)] md:tracking-widest'>{text}</h2>
  )
}

export default Title
