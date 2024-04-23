import React from 'react'
import Logo from '../logo/Logo'
// react icons 
import { GrLinkedin } from "react-icons/gr";
import { FaSquareXTwitter } from "react-icons/fa6";
import { ImFacebook2 } from "react-icons/im";
import { FaInstagramSquare } from "react-icons/fa";
import { Link } from 'react-router-dom';

const Footer = ({moveToTop}) => {
    return (
        <footer className="bg-[var(--hoverEffect)]  px-10 py-6 text-sm text-[var(--otherTextColor)]">
            <div className="container mx-auto px-4">
                <div className='mb-4 flex  flex-wrap gap-8 justify-between items-center pr-40'>
                    <Logo />
                    <div className='flex justify-center items-center gap-3'>
                        <a href=" https://www.linkedin.com/company/earthyfoods-pvt-ltd" target='_blank'><GrLinkedin className='text-[30px] hover:text-[var(--bgColorPrimary)]' /></a>
                        <a href="https://twitter.com/organicnation_" target='_blank'><FaSquareXTwitter className='text-[33px] hover:text-[var(--bgColorPrimary)]' /></a>
                        <a href="https://www.facebook.com/organicnation/" target='_blank'><ImFacebook2 className='text-[29px] hover:text-[var(--bgColorPrimary)]' /></a>
                        <a href="https://www.instagram.com/organicnationadmin/" target='_blank'><FaInstagramSquare className='text-[33px] hover:text-[var(--bgColorPrimary)]' /></a>

                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4  md:place-items-center ">
                    {/* First Column: Company Information */}
                    <div className='flex flex-col gap-3 md:border-r-2  md:border-b-0 border-b-2 border-[var(--otherColor)]'>
                        <h2 className="text-lg font-semibold ">Company Information</h2>

                        <Link to="about-us" onClick={moveToTop}> <span className="border-b-2 border-[var(--otherTextColor)] cursor-pointer hover:text-[var(--titleTextColor)]">About us</span></Link>
                        <p><span className='font-semibold'>Work Address:</span> M/s Earthy Foods Private Limited Bailparao,
                            Ramnagar Road, Nainital, Uttarakhand-263159</p>
                        <p><span className='font-semibold'>Office Address:</span> C-806, i thum Sector 62, Noida (UP) - 201301</p>
                        <p><span className='font-semibold'>Phone</span> +91-9999532041 (For Bulk Queries)</p>
                    </div>


                    {/* Second Column: Contact Information */}
                    <div className='md:place-self-center md:self-start md:border-r-2 md:border-b-0 border-b-2 border-[var(--otherColor)] flex flex-col gap-2 h-full  w-full'>
                        <h2 className="text-lg font-semibold mb-4">Contact Information</h2>
                        <p><span className='font-semibold'>Phone:</span> +91-9999532041</p>
                        <p><span className='font-semibold'>Email:</span> info@earthyfoods.net</p>
                    </div>


                    {/* Third Column: Quick Links */}
                    <div className='md:place-self-center md:self-start w-full'>
                        <h2 className="text-lg font-semibold mb-4">Quick Links</h2>
                        <ul className='flex flex-col gap-1'>
                            <li><a to="#"> <span className="border-b-2 border-[var(--otherTextColor)] cursor-pointer hover:text-[var(--titleTextColor)]">FAQ's</span></a></li>
                            <li><a to="#"> <span className="border-b-2 border-[var(--otherTextColor)] cursor-pointer hover:text-[var(--titleTextColor)]">Privacy Policy</span></a></li>
                            <li><a to="#"> <span className="border-b-2 border-[var(--otherTextColor)] cursor-pointer hover:text-[var(--titleTextColor)]">Terms & Conditions</span></a></li>
                            <li><a to="#"> <span className="border-b-2 border-[var(--otherTextColor)] cursor-pointer hover:text-[var(--titleTextColor)]">Return & Refund Policy</span></a></li>
                            <li><a to="#"> <span className="border-b-2 border-[var(--otherTextColor)] cursor-pointer hover:text-[var(--titleTextColor)]">CSR Policy</span></a></li>
                            <li><a to="#"> <span className="border-b-2 border-[var(--otherTextColor)] cursor-pointer hover:text-[var(--titleTextColor)]">Bulk Orders </span></a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer
