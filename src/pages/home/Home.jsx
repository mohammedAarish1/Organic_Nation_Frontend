import React from 'react'
import Banner from '../../components/banner/Banner'
import Title from '../../components/title/Title'
import Button from '../../components/button/Button'
import Product from '../../components/product/Product'
import Content from '../../components/recipes-testimonials/Content'

const Home = () => {

    const betterImages = [
        {
            img: "images/better/noaddedcolour.png",
            text: "No Added Colour"
        },
        {
            img: "images/better/organic.png",
            text: "100% Naturally Organic"
        },
        {
            img: "images/better/homestyle.png",
            text: "Homestyle Prepared"
        },
        {
            img: "images/better/processed.png",
            text: "Minimally Processed"
        },
        {
            img: "images/better/recipes.png",
            text: "Authentic Indian Recipes"
        },
    ]

    const certificates = [
        "images/certificates/haccp.webp",
        "images/certificates/jaivik.webp",
        "images/certificates/fssi.webp",
        "images/certificates/ecocert.webp",
        "images/certificates/organic.webp",
        "images/certificates/usda.webp",
    ]
    return (
        <>
            <Banner />
            {/* spotlight  */}
            <div className='py-20'>
                <div className='flex justify-center xs:gap-4 gap-1 items-center'>
                    <div className='h-1 md:w-[30%] xs:w-[20%] w-[10%] bg-gradient-to-r from-[#6D613B] to-[#D3BB71]'></div>
                    <Title text="In the Spotlight" />
                    <div className='h-1 md:w-[30%] xs:w-[20%] w-[10%] bg-gradient-to-r from-[#D3BB71] to-[#6D613B]'></div>
                </div>
            </div>
            {/* buttons  */}
            <div className=' flex justify-center lg:gap-16'>
                <Button title="New Arrival" />
                <Button title="Deal of the Day" />
                <Button title="Best Seller" />
                <Button title="Seasons Special" />
            </div>
            <div className='flex justify-center flex-wrap gap-14 py-16 '>
                <Product />
                <Product />
                <Product />
            </div>
            {/* dots */}
            <div className='flex justify-center items-center'>
                <div className='flex gap-2'>
                    <button className='w-3 h-3 rounded-full bg-[var(--titleTextColor)] '></button>
                    <button className='w-3 h-3 rounded-full bg-[var(--titleTextColor)] '></button>
                    <button className='w-3 h-3 rounded-full bg-[var(--titleTextColor)] '></button>
                    <button className='w-3 h-3 rounded-full bg-[var(--titleTextColor)] '></button>
                </div>
            </div>
            {/* how we are better */}
            <div>
                <div className='text-center pt-32 pb-20 px-10'>
                    <Title text="How we are Better !" />
                </div>
                {/* horozontal line */}
                <div className='px-10'>
                    <div className='w-full h-1 bg-gradient-to-r from-[#6D613B] to-[#D3BB71]'></div>
                </div>
                {/* content  */}
                <div className='px-10 py-12'>
                    <div className='bg-[var(--hoverEffect)] flex flex-wrap justify-center gap-20 items-center py-7'>
                        {betterImages.map((item, index) => (
                            <div key={index} className=' flex flex-col  justify-center items-center'>
                                <img src={item.img} alt="No Added Colour" className='w-32 mb-2 animate-pulse' />
                                <span className='whitespace text-center w-28 text-[var(--paraTextColor)] font-medium'>{item.text}</span>
                            </div>
                        ))}

                    </div>
                </div>
            </div>
            {/* certificates  */}
            <div>
                <div className='text-center pt-32 pb-20 px-10'>
                    <Title text="Organic" />
                    <Title text="Certifications" />
                </div>
                {/* horozontal line */}
                <div className='px-10'>
                    <div className='w-full h-1 bg-gradient-to-r from-[#6D613B] to-[#D3BB71]'></div>
                </div>
                {/* content  */}
                <div className='px-10 py-12'>
                    <div className='bg-[var(--hoverEffect)] flex flex-wrap justify-center gap-20 items-center py-7'>
                        {certificates.map((certificate, index) => (
                            <div key={index} className=' flex flex-col  justify-center items-center'>
                                <img src={certificate} alt="certificate" className='w-32 mb-2 animate-pulse' />
                            </div>
                        ))}

                    </div>
                </div>
            </div>
            {/* our recipes  */}
           <Content title="Our Recipes" para="Get recipes, tips, and exclusive offers delivered to your inbox." imgSrc="images/recipes/recipes.webp" path="our-recipes" showBtn={true} />
            {/* testimonials  */}
           <Content title="Love From Our Customers" para="Testimonials" imgSrc="images/customers/customer.webp" path="testimonials" showBtn={true} />
        </>
    )
}

export default Home
