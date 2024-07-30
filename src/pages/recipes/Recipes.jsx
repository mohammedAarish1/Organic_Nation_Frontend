import React from 'react'
import RecipeSection from '../../components/recipe-section/RecipeSection';


const Recipes = () => {
  return (
    <div>
      <div>
        <img src='https://organicnationmages.s3.ap-south-1.amazonaws.com/other_banners/recipeBanner.png' alt="recipe-image" className='w-full sm:h-[600px] md:object-fill sm:object-cover object-contain' />
      </div>
      <div>
        <RecipeSection />
      </div>
    </div>
  )
}

export default Recipes
