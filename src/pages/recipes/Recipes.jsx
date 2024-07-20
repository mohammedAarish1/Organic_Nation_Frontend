import React from 'react'
// recipe images 
import bannerImg from '../../images/recipeBanner.png'
import RecipeSection from '../../components/recipe-section/RecipeSection';


const Recipes = () => {
  return (
    <div>
      <div>
        <img src={bannerImg} alt="recipe-image" className='w-full h-[600px] md:object-fill sm:object-cover' />
      </div>
      <div>
        <RecipeSection />
      </div>
    </div>
  )
}

export default Recipes
