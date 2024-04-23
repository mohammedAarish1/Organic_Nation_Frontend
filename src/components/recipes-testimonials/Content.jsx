import React from 'react'
import Title from '../title/Title'
import { Link } from 'react-router-dom';

const Content = ({title,para,imgSrc,path,showBtn=false}) => {

// array for img src in pending
  return (
    <div className=' pb-20'>
                <div className='text-center pt-32 pb-20 px-10'>
                    <Title text={title} />
                    <p>{para}</p>
                </div>
                <div className='flex flex-wrap justify-center items-center gap-10 px-10 py-10'>
                    <div>
                        <img src={imgSrc} alt="recipes" className='w-96 rounded-2xl' />
                    </div>
                    <div>
                        <img src={imgSrc} alt="recipes" className='w-96 rounded-2xl' />
                    </div>
                    <div>
                        <img src={imgSrc} alt="recipes" className='w-96 rounded-2xl' />
                    </div>


                </div>
                {showBtn &&(

                    <div className='text-center text-white uppercase '>
                    <Link to={path}  className='bg-[var(--bgColorPrimary)] px-5 py-4 uppercase font-semibold transition-all duration-500 hover:tracking-widest' >View More</Link>
                </div>
                )}
            </div>
  )
}

export default Content;
