import React from 'react'
// images 
import recipesImg from '../../images/recipes/recipes.webp'
import profile from '../../images/profile.jpeg'

// react icons 
import { FaArrowLeftLong } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa";
import { ImLinkedin } from "react-icons/im";
import { Link } from 'react-router-dom';



const RecipeDetails = () => {
    return (
        <div>
            {/* Banner */}
            <div className="relative">
                {/* Background Image */}
                <img src={recipesImg} alt="Banner" className="w-full h-96 object-cover blur-m" />

                {/* Overlay */}
                <div className="absolute inset-0 bg-black opacity-50"></div>

                {/* Content */}
                <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white">
                    <h1 className="text-5xl font-bold mb-4">Lorem ipsum dolor sit amet.</h1>
                    <p className="text-lg mb-8">by <span className='text-red-400'>John Wick</span> | <span className='text-gray-300 text-sm tracking-widest'>May 22,2024</span></p>
                    {/* <button className="bg-white text-gray-800 px-6 py-3 rounded-lg font-semibold shadow-lg hover:bg-gray-200 transition duration-300 ease-in-out">Explore Now</button> */}
                </div>
            </div>

            {/* Content */}
            <div className="container w-[80%]  mx-auto px-4 py-8">
                <div className="mx-auto flex flex-col gap-6">
                    <h2 className='text-5xl'>Chocolate Pancakes</h2>
                    {/* Ingredients */}
                    <div className=' flex md:flex-row gap-10 md:gap-0 flex-col justify-between'>
                        <div className="mb-8">
                            <h2 className="text-2xl font-bold mb-4">Ingredients</h2>
                            <ul className="list-disc ml-6">
                                <li>1 and 1/4 cups All Purpose Flour</li>
                                <li>3 Tbsp Granulated Sugar</li>
                                <li>2 Tsp Baking Powder</li>
                                <li>1/4 tsp Salt</li>
                                <li>3/4 cup soy milk</li>
                                <li>1 Flax Egg (1 Tbsp ground Flax seed with 3 Tbsp Hot Water)</li>
                                <li>1 Tbsp Coconut Oil</li>
                                {/* Add more ingredients as needed */}
                            </ul>
                        </div>
                        {/* author  */}
                        <div className='md:w-52 shadow-2xl md:order-last order-first border-2  px-4 md:-translate-y-20 py-3 flex flex-col justify-ce items-center gap-2'>
                            <div>
                                <img src={profile} alt="profile-image" className='md:w-24 w-16 rounded-full' />
                            </div>
                            <p className=' text-justify text-sm'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ducimus magni doloribus quam inventore animi iusto officia delectus distinctio esse saepe.</p>
                            <div className='flex justify-center items-center gap-2 '>
                                <span>Follow:</span>
                                <a href="#" className='text-xl'><FaInstagram /></a>
                                <a href="#" className='text-xl'><ImLinkedin /></a>
                            </div>
                        </div>

                    </div>


                    {/* horozontal line */}
                    <div className=''>
                        <div className='w-full h-1 bg-gradient-to-r from-[#6D613B] to-[#D3BB71]'></div>
                    </div>
                    {/* Methods */}
                    <div>
                        <h2 className="text-2xl font-bold mb-4">Methods</h2>

                        <p>Sift the flour into a mixing bowl. Add the sugar, baking powder, salt and mix together. Prepare your flax egg by mixing 1 Tbsp Ground Flaxseed Meal with 3 Tbsp Hot Water and allowing it to sit for 15-20 minutes to thicken. Add the soy milk (or other non-dairy milk), flax egg and coconut oil to the dry ingredients and mix in. The batter should be smooth and pouring consistency. Heat up a pan and grease lightly with a little coconut oil. The pan should be very hot, but not smoking, before you pour in your first batch of batter. Add batter to the pan in roughly 1/4 cup measures. Now for the technical bit, once the bubbles on the top stop popping and the holes become firm that’s when you FLIP! (the pancake of course!) Cook until nicely browned on both sides. Douse in oodles of nutella, or drizzle with maple syrup and load up with fresh strawberries- these are sure to make your day look bright and cheery! Take off flame, and pour in clay “kulhads” garnish with some Jiwa Flax seeds and relish it hot. This particular way of raabdi is eaten in the cold winter desert months in Rajasthan to generate heat in the body and keep cosy.</p>
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
