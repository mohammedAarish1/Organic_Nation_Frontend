import React from 'react'
import Logo from '../logo/Logo'
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentPage } from '../../features/pagination/pagination';
import { fetchCategoryWiseData, setCategoryBtnValue } from '../../features/filter/filterSlice';
// react icons 
import { FaAnglesRight, FaSquareXTwitter } from "react-icons/fa6";
import { GrLinkedin } from "react-icons/gr";
import { ImFacebook2 } from "react-icons/im";
import { FaInstagramSquare } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";

const Footer = ({ moveToTop }) => {

    const dispatch = useDispatch();
    const { categoryList } = useSelector((state) => state.product_data);
    const productCategories = categoryList.filter(curItem => curItem.category !== 'All')


    const qualities = [
        {
            img: 'https://organicnationmages.s3.ap-south-1.amazonaws.com/footer_images/sustainable.png',
            text: 'Sustainable Farming Techniques'
        },
        {
            img: 'https://organicnationmages.s3.ap-south-1.amazonaws.com/footer_images/chemicalFree.png',
            text: 'Chemical Pesticide-free'
        },
        {
            img: 'https://organicnationmages.s3.ap-south-1.amazonaws.com/footer_images/ethical.png',
            text: 'Locally Ethically Sourced'
        },
        {
            img: 'https://organicnationmages.s3.ap-south-1.amazonaws.com/footer_images/nonGmo.png',
            text: 'Non-GMO Produce'
        },
        {
            img: 'https://organicnationmages.s3.ap-south-1.amazonaws.com/footer_images/global.png',
            text: 'Global Testing Standards'
        },
    ]

    return (
        <footer className="bg-[var(--hoverEffect)]  xs:px-10 px-1 py-6 text-sm text-[var(--themeColor)]"
            data-aos="zoom-in"
            data-aos-duration="1000"
        >
            <div className="lg:container mx-auto px-4">
                <div className='mb-4 flex  flex-wrap gap-8 justify-between items-center lg:pr-28'>
                    <Logo />
                    <div className='flex justify-center items-center gap-3'>
                        <a href=" https://www.linkedin.com/company/earthyfoods-pvt-ltd" target='_blank'><GrLinkedin className='text-[30px] hover:text-[var(--bgColorPrimary)] hover:scale-125 transition-all duration-300 rounded-md' /></a>
                        <a href="https://twitter.com/organicnation_" target='_blank'><FaSquareXTwitter className='text-[34px] hover:text-[var(--bgColorPrimary)] hover:scale-125 transition-all duration-300 rounded-lg' /></a>
                        <a href="https://www.facebook.com/organicnation/" target='_blank'><ImFacebook2 className='text-[29px] hover:text-[var(--bgColorPrimary)] hover:scale-125 transition-all duration-300 rounded-md' /></a>
                        <a href="https://www.instagram.com/organicnationadmin/" target='_blank'><FaInstagramSquare className='text-[33px] hover:text-[var(--bgColorPrimary)] hover:scale-125 transition-all duration-300' /></a>
                        <a href="https://www.youtube.com/channel/UCyUSaFyepi2jx_ViFKE0TkA/community?pvf=CAI%253D" target='_blank'><FaYoutube className='text-[41px] hover:text-[var(--bgColorPrimary)] hover:scale-125 transition-all duration-300' /></a>

                    </div>
                </div>
                <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-4   ">
                    {/* First Column: About us*/}
                    <div className='flex flex-col gap-3  md:pb-0 pb-4'>
                        <h2 className="text-lg font-semibold uppercase ">About Us</h2>
                        <p className='tracking-widest md:w-[90%] text-justify'>ORGANIC NATION All products are made with care, minimally processed, and chemical-free. In a small way, when we make a choice for products for our consumers that are relevant for well-being in today's stressful and urban lifestyle, we also bring prosperity to the lives of the people who make the products.  </p>
                    </div>

                    {/* Second Column: Company Information */}
                    <div className='flex flex-col gap-3  md:pb-0 pb-4'>
                        <h2 className="text-lg font-semibold uppercase ">Company Information</h2>
                        <ul className='flex flex-col gap-1'>
                            <li><Link to="/about-us"> <span className="flex items-center max-w-max gap-2 cursor-pointer hover:text-orange-500 hover:translate-x-1 transition-all duration-300 tracking-widest"><FaAnglesRight />About Us</span></Link></li>
                            <li><Link to="/contact-us"> <span className="flex items-center gap-2 max-w-max cursor-pointer hover:text-orange-500 hover:translate-x-1 transition-all duration-300 tracking-widest"><FaAnglesRight />Contact Us</span></Link></li>

                        </ul>
                        <h2 className="text-lg font-semibold  uppercase">Quick Links</h2>
                        <ul className='flex flex-col gap-1'>
                            <li><Link to="/our-blogs"> <span className="flex items-center max-w-max gap-2 cursor-pointer hover:text-orange-500 hover:translate-x-1 transition-all duration-300 tracking-widest"><FaAnglesRight />Blogs</span></Link></li>
                            <li><Link to="/our-recipes"> <span className="flex items-center max-w-max gap-2 cursor-pointer hover:text-orange-500 hover:translate-x-1 transition-all duration-300 tracking-widest"><FaAnglesRight />Recipe</span></Link></li>
                            <li><Link to="frequently-asked-questions"> <span className="flex items-center max-w-max gap-2 cursor-pointer hover:text-orange-500 hover:translate-x-1 transition-all duration-300 tracking-widest"><FaAnglesRight />FAQ's</span></Link></li>
                            <li><Link to="privacy-policy"> <span className="flex items-center gap-2 max-w-max cursor-pointer hover:text-orange-500 hover:translate-x-1 transition-all duration-300 tracking-widest"><FaAnglesRight />Privacy Policy</span></Link></li>
                            <li><Link to="terms&conditions"> <span className="flex items-center gap-2 max-w-max cursor-pointer hover:text-orange-500 hover:translate-x-1 transition-all duration-300 tracking-widest"><FaAnglesRight />Terms & Conditions</span></Link></li>
                            {/* <li><Link to="return-refund-policy"> <span className="flex items-center max-w-max gap-2 cursor-pointer hover:text-orange-500 hover:translate-x-1 transition-all duration-300"><FaAnglesRight />Return & Refund Policy</span></Link></li> */}
                            <li><Link to="csr-policy"> <span className="flex items-center max-w-max gap-2 cursor-pointer hover:text-orange-500 hover:translate-x-1 transition-all duration-300 tracking-widest"><FaAnglesRight />CSR Policy</span></Link></li>
                            {/* <li><Link to="bulk-order"> <span className="flex items-center gap-2 cursor-pointer max-w-max hover:text-orange-500 hover:translate-x-1 transition-all duration-300 tracking-widest"><FaAnglesRight />Bulk Orders </span></Link></li> */}

                        </ul>
                        <div>

                        </div>
                    </div>
                    {/* third Column: categories */}
                    <div className='flex flex-col gap-3  md:pb-0 pb-4'>
                        <h2 className="text-lg font-semibold uppercase ">Categories</h2>
                        <ul className='flex flex-col gap-1'>
                            {productCategories.map((curItem) => (
                                <li key={curItem.category}>
                                    <Link
                                        to={`/shop/${curItem.categoryUrl.toLowerCase()}`}
                                        onClick={() => {
                                            dispatch(setCurrentPage(1))
                                            dispatch(setCategoryBtnValue(curItem.categoryUrl))
                                            dispatch(fetchCategoryWiseData(curItem.categoryUrl.toLowerCase()))
                                            window.scrollTo(0, 0);

                                        }}
                                    >
                                        <span className="flex items-center max-w-max gap-2 cursor-pointer hover:text-orange-500 hover:translate-x-1 transition-all duration-300 tracking-widest"><FaAnglesRight />{curItem.category}
                                        </span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                        <div>
                        </div>
                    </div>

                    {/* fourth Column: Get in touch */}
                    <div className='flex flex-col gap-3 md:pb-0 pb-4'>
                        <h2 className="text-lg font-semibold uppercase">Get in Touch</h2>
                        <div className='flex flex-col gap-2 tracking-widest'>
                            <p>Email: <a href="mailto:info@organicnation.co.in" className='underline underline-offset-2'>info@organicnation.co.in</a> </p>
                            <p>Phone Number: <a href="tel:+919999532041" className='underline underline-offset-2 '>+91-9999532041</a> </p>
                            <p><span className='font-semibold'>Work Address:</span> Foodsbay India, Bailparao,
                                Ramnagar Road, Nainital, Uttarakhand-263159</p>
                            <p><span className='font-semibold'>Office Address:</span> Shop No - 336, Plot No - 134B,  Shopprix Mall, Sector-61, Noida, Gautam Buddha Nagar, Uttar Pradesh, 201301</p>
                            <p><span className='font-semibold'>Phone</span> <a href="tel:+919999532041" className='underline underline-offset-2 '>+91-9999532041</a> (For Bulk Queries)</p>
                        </div>
                    </div>
                </div>
                <div className='pb-5 pt-10'>
                    <div className='flex flex-wrap justify-between items-center pr-10'>
                        {qualities.map(quality => (
                            <div key={quality.text} className='flex justify-center items-center '>
                                <img src={quality.img} alt="logo-image" className='xs:w-20 w-16' />
                                <span className='font-medium xs:text-[16px]'>{quality.text}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer



