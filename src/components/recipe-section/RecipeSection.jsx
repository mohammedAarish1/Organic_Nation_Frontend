import React, { useEffect } from 'react'
import Title from '../title/Title'
import { Link } from 'react-router-dom';
// react icons 
import { FaArrowRightLong } from "react-icons/fa6";
import { useDispatch, useSelector } from 'react-redux';
import { getAllRecipes } from '../../imports';


const RecipeSection = ({ showBtn = false }) => {

const dispatch=useDispatch()
    const { recipes, loading } = useSelector(state => state.blog)

    // array for img src is pending

    useEffect(()=>{
              dispatch(getAllRecipes());
    },[])




    if (loading) return (<div>loading........</div>)
    return (
        <div className=''>
            <div className='flex flex-col justify-center items-center gap-2 xs:pt-32 xs:pb-20 pt-16 pb-10 px-10'>
                <Title heading="Our Recipes"  subHeading='Organic Nation offers healthy, delicious recipes made from the freshest organic ingredients. Enjoy nutritious meals that are good for you!'/>
            </div>
            <div className='flex flex-wrap justify-center items-center gap-10 px-10 py-10'>
                {recipes?.map(recipe => (
                    <Link
                        to={`/recipes/${recipe['title-url']}`}
                        key={recipe._id}
                        className='flex md:w-1/4  flex-col gap-2 '
                        data-aos="flip-up"
                        data-aos-duration="1000"
                    >
                        <div className='flex flex-col gap-5'>
                            <div className='md:w-full h-[300px] '>
                                <img src={recipe.image} alt="recipes" className='w-full h-full object-cover rounded-2xl ' />
                            </div>
                            <p className='text-sm text-gray-800 font-serif tracking-widest '>{new Date(recipe?.date).toDateString()}</p>

                        </div>

                        <div className=' flex flex-col justify-between gap-  h-full'>
                            <p className=' text-[var(--bgColorPrimary)] font-semibold  text-[18px]'>{recipe.title}</p>

                            <div className='place-self-end'>
                                <div className=" flex  text-[var(--themeColor)] hover:text-orange-500 justify-end items-center gap-2 py-1   font-semibold rounded-lg  uppercase "><span className='underline-hover text-sm'>Continue Reading</span> <FaArrowRightLong /></div>
                            </div>

                        </div>

                    </Link>
                ))}


            </div>

            {showBtn && (
                <div className='text-center text-white uppercase '>
                    <Link to="/our-recipes" className='bg-[var(--themeColor)] px-5 py-4 uppercase font-semibold transition-all duration-500 hover:tracking-widest' >View More</Link>
                </div>
            )}


        </div>
    )
}

export default RecipeSection;



