import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';


// react icons 
import { FaArrowLeftLong } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa";
import { ImLinkedin } from "react-icons/im";
import { Link, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import axios from 'axios';

const apiUrl = import.meta.env.VITE_BACKEND_URL;



const RecipeDetails = () => {


    const dispatch = useDispatch()
    const [singleRecipe, setSingleRecipe] = useState({});
    const { id } = useParams()

    const getSingleRecipe = async (id) => {

        try {
            const response = await axios.get(`${apiUrl}/api/recipes/${id}`);
            if (response.status === 200) {
                setSingleRecipe(response.data)
            }
        } catch (error) {
            throw error
        }
    }


    useEffect(() => {
        getSingleRecipe(id)
    }, [id, dispatch])




    return (
        <div>
            {/* Banner */}
            <div className="relative">
                {/* Background Image */}
                <img src={singleRecipe.image} alt="Banner" className="w-full h-96 object-cover blur-m" />

                {/* Overlay */}
                <div className="absolute inset-0 bg-black opacity-50"></div>

                {/* Content */}
                <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white">
                    <h1 className="text-5xl font-bold mb-4">{singleRecipe?.title}</h1>
                    <p className="text-lg mb-8">by <span className='text-red-400'>{singleRecipe.author}</span> | <span className='text-gray-300 text-sm tracking-widest'>{new Date(singleRecipe?.date).toDateString()}</span></p>
                    {/* <button className="bg-white text-gray-800 px-6 py-3 rounded-lg font-semibold shadow-lg hover:bg-gray-200 transition duration-300 ease-in-out">Explore Now</button> */}
                </div>
            </div>

            {/* Content */}
            <div className="container w-[80%]  mx-auto px-4 py-8">
                <div className="mx-auto flex flex-col gap-6">
                    <h2 className='text-4xl'>{singleRecipe.title}</h2>
                    {/* Ingredients */}
                    <div className=' flex md:flex-row gap-10 md:gap-0 flex-col justify-between'>
                        <div className="mb-8">
                            <ReactMarkdown>{singleRecipe.description?.replace(/\\n/g, '\n')}</ReactMarkdown>
                        </div>
                        {/* author  */}
                        {/* <div className='md:w-52 shadow-2xl md:order-last order-first border-2  px-4 md:-translate-y-20 py-3 flex flex-col justify-ce items-center gap-2'>
                            <div>
                                <img src={profile} alt="profile-image" className='md:w-24 w-16 rounded-full' />
                            </div>
                            <p className=' text-justify text-sm'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ducimus magni doloribus quam inventore animi iusto officia delectus distinctio esse saepe.</p>
                            <div className='flex justify-center items-center gap-2 '>
                                <span>Follow:</span>
                                <a href="#" className='text-xl'><FaInstagram /></a>
                                <a href="#" className='text-xl'><ImLinkedin /></a>
                            </div>
                        </div> */}

                    </div>


                    {/* horozontal line */}
                    <div className=''>
                        <div className='w-full h-1 bg-gradient-to-r from-[#6D613B] to-[#D3BB71]'></div>
                    </div>
                    {/* Methods */}
                    <div>
                        <ReactMarkdown>{singleRecipe.ingredients?.replace(/\\n/g, '\n')}</ReactMarkdown>
                    </div>
                    <div>
                        <Link to='/our-recipes'>
                            <button className='flex  justify-center items-center gap-5 bg-gradient-to-r from-[#6D613B] to-[#D3BB71]  px-5 py-3 tracking-widest hover:text-yellow-200 '><FaArrowLeftLong /> Explore more Recipes</button>
                        </Link>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default RecipeDetails
