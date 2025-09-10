// import React, { useEffect } from 'react'
// import Title from '../title/Title'
// import { Link } from 'react-router-dom';
// // react icons 
// import { useDispatch, useSelector } from 'react-redux';
// import { getAllRecipes } from '../../imports';


// const RecipeSection = ({ showBtn = false }) => {

// const dispatch=useDispatch()
//     const { recipes, loading } = useSelector(state => state.blog)

//     // array for img src is pending

//     useEffect(()=>{
//               dispatch(getAllRecipes());
//     },[])




//     if (loading) return (<div>loading........</div>)
//     return (
//         <div className=''>
//             <div className='flex flex-col justify-center items-center gap-2 xs:pt-32 xs:pb-20 pt-16 pb-10 px-10'>
//                 <Title heading="Our Recipes"  subHeading='Organic Nation offers healthy, delicious recipes made from the freshest organic ingredients. Enjoy nutritious meals that are good for you!'/>
//             </div>
//             <div className='flex flex-wrap justify-center items-center gap-10 px-10 py-10'>
//                 {recipes?.map(recipe => (
//                     <Link
//                         to={`/recipes/${recipe['title-url']}`}
//                         key={recipe._id}
//                         className='flex md:w-1/4  flex-col gap-2 '
//                         data-aos="flip-up"
//                         data-aos-duration="1000"
//                     >
//                         <div className='flex flex-col gap-5'>
//                             <div className='md:w-full h-[300px] '>
//                                 <img src={recipe.image} alt="recipes" className='w-full h-full object-cover rounded-2xl ' />
//                             </div>
//                             <p className='text-sm text-gray-800 font-serif tracking-widest '>{new Date(recipe?.date).toDateString()}</p>

//                         </div>

//                         <div className=' flex flex-col justify-between gap-  h-full'>
//                             <p className=' text-[var(--background-color)] font-semibold  text-[18px]'>{recipe.title}</p>

//                             <div className='place-self-end'>
//                                 <div className=" flex  text-[var(--themeColor)] hover:text-orange-500 justify-end items-center gap-2 py-1   font-semibold rounded-lg  uppercase "><span className='underline-hover text-sm'>Continue Reading</span> <FaArrowRightLong /></div>
//                             </div>

//                         </div>

//                     </Link>
//                 ))}


//             </div>

//             {showBtn && (
//                 <div className='text-center text-white uppercase '>
//                     <Link to="/our-recipes" className='bg-[var(--themeColor)] px-5 py-4 uppercase font-semibold transition-all duration-500 hover:tracking-widest' >View More</Link>
//                 </div>
//             )}


//         </div>
//     )
// }

// export default RecipeSection;





import React, { useEffect } from 'react'
import { motion } from 'framer-motion'
import Title from '../title/Title'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getAllRecipes } from '../../imports'
import SubmitButton from '../button/SubmitButton'
import { ArrowRight, Calendar, Clock, Heart, Leaf, Star, Utensils } from 'lucide-react'

const RecipeSection = ({ showBtn = false }) => {
    const dispatch = useDispatch()
    const { recipes, loading } = useSelector(state => state.blog)

    useEffect(() => {
        dispatch(getAllRecipes())
    }, [])

    // Enhanced loading component
    if (loading) {
        return (
            <div className="min-h-[400px] flex items-center justify-center">
                <motion.div
                    className="flex space-x-3"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                >
                    {[0, 1, 2, 3].map((i) => (
                        <motion.div
                            key={i}
                            className="w-4 h-4 rounded-full"
                            style={{ backgroundColor: 'var(--secondary-color)' }}
                            animate={{
                                scale: [1, 1.5, 1],
                                opacity: [0.3, 1, 0.3]
                            }}
                            transition={{
                                duration: 1.2,
                                repeat: Infinity,
                                delay: i * 0.15
                            }}
                        />
                    ))}
                </motion.div>
            </div>
        )
    }

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
                delayChildren: 0.2
            }
        }
    }

    const cardVariants = {
        hidden: {
            opacity: 0,
            y: 60,
            rotateX: -15
        },
        visible: {
            opacity: 1,
            y: 0,
            rotateX: 0,
            transition: {
                type: "spring",
                stiffness: 80,
                damping: 15
            }
        }
    }

    const imageVariants = {
        hover: {
            scale: 1.1,
            rotateZ: 2,
            transition: {
                duration: 0.5,
                ease: "easeOut"
            }
        }
    }

    // Mock data for recipe details (you can replace with actual data from your backend)
    const getRecipeDetails = (recipe, index) => ({
        cookTime: ['15 min', '25 min', '30 min', '20 min', '35 min'][index % 5],
        difficulty: ['Easy', 'Medium', 'Easy', 'Hard', 'Medium'][index % 5],
        rating: [4.8, 4.5, 4.9, 4.2, 4.7][index % 5],
        servings: [2, 4, 6, 3, 4][index % 5],
        isVegan: [true, false, true, false, true][index % 2]
    })

    return (
        <div className="relative overflow-hidden ">
            {/* Background decorative elements - Food themed */}
            <div className="absolute inset-0 opacity-3">
                {/* <div className="absolute top-16 left-8 w-40 h-40 rounded-full border border-[var(--secondary-color)] border-dashed"></div> */}
                <div className="absolute bottom-24 right-12 w-28 h-28 rounded-full bg-gradient-to-br from-[var(--accent-color)]/10 to-[var(--secondary-color)]/10"></div>
                <div className="absolute top-1/3 right-1/4 w-20 h-20 rounded-full border-2 border-[var(--alert-color)]/20"></div>
                {/* Floating leaf icons */}
                <motion.div
                    className="absolute top-1/4 left-1/3 text-[var(--secondary-color)] opacity-10"
                    animate={{
                        y: [0, -10, 0],
                        rotate: [0, 5, 0]
                    }}
                    transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                >
                    <Leaf size={24} />
                </motion.div>
                <motion.div
                    className="absolute bottom-1/3 right-1/3 text-[var(--accent-color)] opacity-10"
                    animate={{
                        y: [0, 10, 0],
                        rotate: [0, -5, 0]
                    }}
                    transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 1
                    }}
                >
                    <Utensils size={20} />
                </motion.div>
            </div>

            {/* Header Section */}
            <motion.div
                className="flex flex-col justify-center items-center gap-6 pt-20 pb-16 px-4 sm:px-6 lg:px-10"
                initial={{ opacity: 0, y: -40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
            >
                <Title
                    heading="Our Recipes"
                    subHeading='Organic Nation offers healthy, delicious recipes made from the freshest organic ingredients. Enjoy nutritious meals that are good for you!'
                />

                {/* Decorative elements */}
                <div className="flex items-center gap-4">
                    <motion.div
                        className="w-16 h-1 rounded-full"
                        style={{ backgroundColor: 'var(--secondary-color)' }}
                        initial={{ width: 0 }}
                        animate={{ width: 64 }}
                        transition={{ duration: 1, delay: 0.5 }}
                    />
                    <motion.div
                        style={{ color: 'var(--accent-color)' }}
                        animate={{ rotate: [0, 360] }}
                        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                    >
                        <Utensils size={20} />
                    </motion.div>
                    <motion.div
                        className="w-16 h-1 rounded-full"
                        style={{ backgroundColor: 'var(--secondary-color)' }}
                        initial={{ width: 0 }}
                        animate={{ width: 64 }}
                        transition={{ duration: 1, delay: 0.7 }}
                    />
                </div>
            </motion.div>

            {/* Recipe Cards Grid */}
            <motion.div
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-8 px-4 sm:px-6 lg:px-10 py-12"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                {recipes?.map((recipe, index) => {
                    const details = getRecipeDetails(recipe, index)

                    return (
                        <motion.div
                            key={recipe._id}
                            variants={cardVariants}
                            whileHover={{ y: -12, rotateY: 2 }}
                            className="group relative"
                        >
                            <Link
                                to={`/recipes/${recipe['title-url']}`}
                                className="block h-full"
                            >
                                {/* Card Container */}
                                <div className="bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden h-full flex flex-col relative border border-[var(--neutral-color)]/20">

                                    {/* Image Container */}
                                    <div className="relative overflow-hidden rounded-t-3xl aspect-[4/3] bg-gradient-to-br from-[var(--background-color)] to-[var(--neutral-color)]/50">
                                        <motion.img
                                            src={recipe.image}
                                            alt={recipe.title}
                                            className="w-full h-full object-cover"
                                            variants={imageVariants}
                                            whileHover="hover"
                                        />

                                        {/* Gradient overlay */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60" />

                                        {/* Floating badges */}
                                        <div className="absolute top-4 left-4 flex flex-col gap-2">
                                            {details.isVegan && (
                                                <motion.div
                                                    className="bg-[var(--secondary-color)] text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 shadow-lg"
                                                    initial={{ scale: 0, rotate: -180 }}
                                                    animate={{ scale: 1, rotate: 0 }}
                                                    transition={{ delay: 0.3, type: "spring" }}
                                                >
                                                    <Leaf size={14} />
                                                    Vegan
                                                </motion.div>
                                            )}
                                            <motion.div
                                                className="bg-[var(--alert-color)] text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg"
                                                initial={{ scale: 0, rotate: 180 }}
                                                animate={{ scale: 1, rotate: 0 }}
                                                transition={{ delay: 0.5, type: "spring" }}
                                            >
                                                {details.difficulty}
                                            </motion.div>
                                        </div>

                                        {/* Heart icon */}
                                        <motion.div
                                            className="absolute top-4 right-4 p-2 bg-white/20 backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300"
                                            whileHover={{ scale: 1.1 }}
                                            whileTap={{ scale: 0.9 }}
                                        >
                                            <Heart color='brown' size={20} />
                                        </motion.div>

                                        {/* Recipe stats overlay */}
                                        <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                                            <div className="bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center gap-1 text-xs font-medium text-[var(--text-color)]">
                                                <Clock size={16} />
                                                <span>{details.cookTime}</span>
                                            </div>
                                            <div className="bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center gap-1 text-xs font-medium text-[var(--text-color)]">
                                                <Utensils size={14}  />
                                                <span>{details.servings} servings</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Content Container */}
                                    <div className="p-6 flex flex-col flex-grow">

                                        {/* Date and Rating */}
                                        <div className="flex items-center justify-between mb-4">
                                            <div className="flex items-center gap-2">
                                                <Calendar size={16}
                                                    style={{ color: 'var(--accent-color)' }}
                                                />
                                                <span
                                                    className="text-xs font-medium tracking-wide"
                                                    style={{ color: 'var(--text-color)' }}
                                                >
                                                    {new Date(recipe?.date).toLocaleDateString('en-US', {
                                                        month: 'short',
                                                        day: 'numeric'
                                                    })}
                                                </span>
                                            </div>

                                            <div className="flex items-center gap-1">
                                                <Star className="text-yellow-400" size={16} />
                                                <span
                                                    className="text-sm font-semibold"
                                                    style={{ color: 'var(--text-color)' }}
                                                >
                                                    {details.rating}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Title */}
                                        <h3
                                            className="text-xl font-bold mb-4 line-clamp-2 group-hover:text-[var(--secondary-color)] transition-colors duration-300"
                                            style={{ color: 'var(--text-color)' }}
                                        >
                                            {recipe.title}
                                        </h3>

                                        {/* Recipe Info */}
                                        <div className="flex items-center justify-between mb-6 p-3 rounded-2xl" style={{ backgroundColor: 'var(--background-color)' }}>
                                            <div className="text-center">
                                                <div className="text-sm font-semibold" style={{ color: 'var(--themeColor)' }}>
                                                    {details.cookTime}
                                                </div>
                                                <div className="text-xs" style={{ color: 'var(--text-color)' }}>
                                                    Cook Time
                                                </div>
                                            </div>
                                            <div className="w-px h-8 bg-[var(--neutral-color)]"></div>
                                            <div className="text-center">
                                                <div className="text-sm font-semibold" style={{ color: 'var(--themeColor)' }}>
                                                    {details.servings}
                                                </div>
                                                <div className="text-xs" style={{ color: 'var(--text-color)' }}>
                                                    Servings
                                                </div>
                                            </div>
                                            <div className="w-px h-8 bg-[var(--neutral-color)]"></div>
                                            <div className="text-center">
                                                <div className="text-sm font-semibold" style={{ color: 'var(--themeColor)' }}>
                                                    {details.difficulty}
                                                </div>
                                                <div className="text-xs" style={{ color: 'var(--text-color)' }}>
                                                    Level
                                                </div>
                                            </div>
                                        </div>

                                        {/* Cook Now Button */}
                                        <motion.div
                                            className="mt-auto"
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                        >
                                            <div className="flex items-center justify-between p-4 rounded-2xl group/btn cursor-pointer transition-all duration-300"
                                                style={{ backgroundColor: 'var(--accent-color)' }}
                                            >
                                                <div className="flex items-center gap-3">
                                                    <motion.div
                                                        className="p-2 rounded-full bg-white/20"
                                                        whileHover={{ rotate: 360 }}
                                                        transition={{ duration: 0.5 }}
                                                    >
                                                        <Utensils className="text-white" size={16} />
                                                    </motion.div>
                                                    <span className="text-white font-semibold text-sm">
                                                        Start Cooking
                                                    </span>
                                                </div>
                                                <motion.div
                                                    className="text-white"
                                                    animate={{ x: [0, 3, 0] }}
                                                    transition={{
                                                        duration: 1.5,
                                                        repeat: Infinity,
                                                        ease: "easeInOut"
                                                    }}
                                                >
                                                    <ArrowRight size={20} />
                                                </motion.div>
                                            </div>
                                        </motion.div>
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    )
                })}
            </motion.div>

            {/* View More Button */}
            {showBtn && (
                <motion.div
                    // className="text-center"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 1 }}
                >
                    <Link to="/our-recipes" className='flex justify-center'>

                        <SubmitButton id='exploreRecipeBtn' text='Explore All Recipes' />

                    </Link>
                </motion.div>
            )}
        </div>
    )
}

export default RecipeSection