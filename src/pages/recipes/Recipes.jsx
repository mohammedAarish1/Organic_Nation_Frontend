import React from 'react'
import RecipeSection from '../../components/recipe-section/RecipeSection';


const Recipes = () => {
  return (
    <div>
      <SEO
        title="Delicious Recipes with Our Products at Organic Nation"
        description="Transform ordinary meals into extraordinary experiences. Our versatile products are the secret ingredient to countless culinary creations."
        canonicalUrl="https://organicnation.co.in/our-recipes"
        ogTitle="Delicious Recipes with Our Products at Organic Nation"
        ogDescription="Transform ordinary meals into extraordinary experiences. Our versatile products are the secret ingredient to countless culinary creations."
        ogUrl="https://organicnation.co.in/our-recipes"
        ogImage="https://organicnationmages.s3.ap-south-1.amazonaws.com/other_banners/recipeBanner.png"
        ogImageWidth=""
        ogImageHeight=""
        twitterTitle="Delicious Recipes with Our Products at Organic Nation"
        twitterDescription="Transform ordinary meals into extraordinary experiences. Our versatile products are the secret ingredient to countless culinary creations."
        twitterImage="https://organicnationmages.s3.ap-south-1.amazonaws.com/other_banners/recipeBanner.png"
        twitterSite="Organic Nation"
        twitterCreator="organicnation_"
      />
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
