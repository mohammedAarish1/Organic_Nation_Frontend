import React from 'react'

const Title = ({ text }) => {
  return (
    // <h2 className='xs:text-[30px] text-2xl font-medium text-[var(--themeColor)] md:tracking-widest'>{text}</h2>
    <h2
      className="mb-4 text-2xl md:text-4xl lg:text-5xl  font-extrabold text-gray-900 dark:text-white "
    >
      <span
        className="text-transparent bg-clip-text bg-gradient-to-r to-green-700 from-[var(--themeColor)]"
      >
        {text}
      </span>
    </h2>
  )
}

export default Title
