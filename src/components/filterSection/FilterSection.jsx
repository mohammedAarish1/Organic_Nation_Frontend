import React from 'react'

const FilterSection = () => {

const categories=[
    "All",
    "Authentic Pickle",
    "Seasonings",
    "Organic Tea",
    "Organic Oil",
    "Sweeteners",
    "Organic Honey",
    "Herbs",
]

  return (
    <div className='px-4 pt-16'>
      <div>
        <h2 className='text-xl mb-2'>Category</h2>
        <div className='flex flex-col gap-2'>
            {categories.map((category,index)=>(
                <p key={index} className='text-[var(--titleTextColor)] hover:border-b-2 border-gray-600 w-max cursor-pointer'>{category}</p>
            ))}
            
        </div>
      </div>
    </div>
  )
}

export default FilterSection
