import React from 'react'
import Content from '../../components/recipes-testimonials/Content'

const Recipes = () => {
  return (
    <div>
      <div>
        <img src="images/recipes.webp" alt="recipe-image" className='w-full h-[600px] md:object-fill sm:object-cover' />
      </div>
      <div>
         {/* our recipes  */}
         <Content title="Our Recipes" para="Get recipes, tips, and exclusive offers delivered to your inbox." imgSrc="images/recipes/recipes.webp" path="our-recipes"  />
            {/* testimonials  */}
      </div>
    </div>
  )
}

export default Recipes
