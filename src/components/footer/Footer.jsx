// import React from 'react'
// import Logo from '../logo/Logo'
// import { Link } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import { setCurrentPage } from '../../features/pagination/pagination';
// import { fetchCategoryWiseData, setCategoryBtnValue } from '../../features/filter/filterSlice';
// // react icons 
// import { FaAnglesRight, FaSquareXTwitter } from "react-icons/fa6";
// import { FaInstagramSquare,FaYoutube } from "react-icons/fa";
// import { GrLinkedin } from "react-icons/gr";
// import { ImFacebook2 } from "react-icons/im";

// // Utility function for rendering social links
// const SocialLinks = () => {
//     const socialData = [
//         { href: 'https://www.linkedin.com/company/earthyfoods-pvt-ltd', icon: <GrLinkedin />, fontSize: "text-[30px]",label: "LinkedIn" },
//         { href: 'https://twitter.com/organicnation_', icon: <FaSquareXTwitter />, fontSize: "text-[34px]",label: "Twitter" },
//         { href: 'https://www.facebook.com/organicnation/', icon: <ImFacebook2 />, fontSize: "text-[29px]",label: "Facebook" },
//         { href: 'https://www.instagram.com/organicnation.co.in/', icon: <FaInstagramSquare />, fontSize: "text-[33px]" ,label: "Instagram"},
//         { href: 'https://www.youtube.com/channel/UCyUSaFyepi2jx_ViFKE0TkA/community?pvf=CAI%253D', icon: <FaYoutube />, fontSize: "text-[41px]",label: "YouTube" },
//     ];

//     return (
//         <div className="flex justify-center items-center gap-3">
//             {socialData.map(({ href, icon, fontSize,label }, index) => (
//                 <a key={index} href={href} target='_blank' rel="noopener noreferrer"  aria-label={label}>
//                     {React.cloneElement(icon, { className: ` ${fontSize} hover:text-[var(--bgColorPrimary)] hover:scale-125 transition-all duration-300` })}
//                 </a>
//             ))}
//         </div> 
//     );
// };

// // Utility function for rendering footer links
// const FooterLinks = ({ title, links }) => (
//     <div className="flex flex-col gap-3 md:pb-0 pb-4">
//         <h2 className="text-lg font-semibold uppercase">{title}</h2>
//         <ul className="flex flex-col gap-1">
//             {links.map(({ to, label, onClick }, index) => (
//                 <li key={index}>
//                     <Link to={to} onClick={onClick}>
//                         <span className="flex items-center gap-2 cursor-pointer hover:text-orange-500 hover:translate-x-1 transition-all duration-300 tracking-widest">
//                             <FaAnglesRight /> {label}
//                         </span>
//                     </Link>
//                 </li>
//             ))}
//         </ul>
//     </div>
// );

// const Footer = () => {
//     const dispatch = useDispatch();
//     const { categoryList } = useSelector((state) => state.product_data);
//     const productCategories = categoryList.filter(curItem => curItem.category !== 'All')


//     const qualities = [
//         {
//             img: 'https://organicnationmages.s3.ap-south-1.amazonaws.com/footer_images/sustainable.png',
//             text: 'Sustainable Farming Techniques'
//         },
//         {
//             img: 'https://organicnationmages.s3.ap-south-1.amazonaws.com/footer_images/chemicalFree.png',
//             text: 'Chemical Pesticide-free'
//         },
//         {
//             img: 'https://organicnationmages.s3.ap-south-1.amazonaws.com/footer_images/ethical.png',
//             text: 'Locally Ethically Sourced'
//         },
//         {
//             img: 'https://organicnationmages.s3.ap-south-1.amazonaws.com/footer_images/nonGmo.png',
//             text: 'Non-GMO Produce'
//         },
//         {
//             img: 'https://organicnationmages.s3.ap-south-1.amazonaws.com/footer_images/global.png',
//             text: 'Global Testing Standards'
//         },
//     ]

//     const companyLinks = [
//         { to: '/about-us', label: 'About Us' },
//         { to: '/contact-us', label: 'Contact Us' },
//     ];

//     const quickLinks = [
//         { to: '/our-blogs', label: 'Blogs' },
//         { to: '/our-recipes', label: 'Recipe' },
//         { to: '/frequently-asked-questions', label: "FAQ's" },
//         { to: '/privacy-policy', label: 'Privacy Policy' },
//         { to: '/termsandconditions', label: 'Terms & Conditions' },
//         { to: '/csr-policy', label: 'CSR Policy' },
//     ];

//     const categoryLinks = productCategories.map(item => ({
//         to: `/shop/${item.categoryUrl.toLowerCase()}`,
//         label: item.category,
//         onClick: () => {
//             dispatch(setCurrentPage(1));
//             dispatch(setCategoryBtnValue(item.categoryUrl));
//             dispatch(fetchCategoryWiseData(item.categoryUrl.toLowerCase()));
//             window.scrollTo(0, 0);
//         },
//     }));

//     return (
//         <footer
//             className="relative bg-[var(--hoverEffect)]  xs:px-10 px-1 py-6 text-sm text-[var(--themeColor)]"
//         >
//             <div className="lg:container mx-auto px-4">
//                 <div className='mb-4 flex  flex-wrap gap-8 justify-between items-center lg:pr-28'>
//                     <Logo />
//                     <SocialLinks />
//                 </div>
//                 <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-4   ">
//                     {/* First Column: About us*/}
//                     <div className='flex flex-col gap-3  md:pb-0 pb-4'>
//                         <h2 className="text-lg font-semibold uppercase ">About Us</h2>
//                         <p className='tracking-widest md:w-[90%] text-justify'>Welcome to ORGANIC NATION (A Unit of <span className='font-semibold'>Foodsbay India</span>) , we pride ourselves on producing 100% natural and homestyle pickles, chutneys, and murrabbas. Our products are crafted with traditional recipes and the finest organic ingredients, ensuring a delightful and authentic taste experience in every jar.</p>
//                     </div>

//                     {/* Second Column: Company Information */}
//                     <div className='flex flex-col gap-3  md:pb-0 pb-4'>
//                         <FooterLinks title="Company Information" links={companyLinks} />
//                         <FooterLinks title="Quick Links" links={quickLinks} />
//                     </div>
//                     {/* third Column: categories */}
//                     <FooterLinks title="Categories" links={categoryLinks} />
//                     {/* fourth Column: Get in touch */}
//                     <div className='flex flex-col gap-3 md:pb-0 pb-4'>
//                         <h2 className="text-lg font-semibold uppercase">Get in Touch</h2>
//                         <div className='flex flex-col gap-2 tracking-widest'>
//                             <p>Email: <a href="mailto:info@organicnation.co.in" className='underline underline-offset-2'>info@organicnation.co.in</a> </p>
//                             <p>Phone Number: <a href="tel:+919999532041" className='underline underline-offset-2 '>+91-9999532041</a> </p>
//                             <p><span className='font-semibold'>Work Address:</span> Foodsbay India, Bailparao,
//                                 Ramnagar Road, Nainital, Uttarakhand-263159</p>
//                             <p><span className='font-semibold'>Office Address:</span> Shop No - 336, Plot No - 134B,  Shopprix Mall, Sector-61, Noida, Gautam Buddha Nagar, Uttar Pradesh, 201301</p>
//                             <p><span className='font-semibold'>Phone</span> <a href="tel:+919999532041" className='underline underline-offset-2 '>+91-9999532041</a> (For Bulk Queries)</p>
//                         </div>
//                     </div>
//                 </div>

//                 <div>
//                     <div className='flex flex-wrap items-center gap-2'>
//                         <img src="https://organicnationmages.s3.ap-south-1.amazonaws.com/payments/maestro.png" alt="maestro" className='w-12' />
//                         <img src="https://organicnationmages.s3.ap-south-1.amazonaws.com/payments/visa.png" alt="visa" className='w-14' />
//                         <img src="https://organicnationmages.s3.ap-south-1.amazonaws.com/payments/rupay.png" alt="rupay" className=' h-16' />
//                         <img src="https://organicnationmages.s3.ap-south-1.amazonaws.com/payments/mastercard.png" alt="mastercard" className='w-12' />
//                         <img src="https://organicnationmages.s3.ap-south-1.amazonaws.com/payments/upi.png" alt="upi" className='w-16' />
//                     </div>
//                 </div>
//                 <div className='pb-5 pt-10'>
//                     <div className='flex flex-wrap justify-between items-center pr-10'>
//                         {qualities.map(({ img, text }, index) => (
//                             <div key={index} className="flex justify-center items-center">
//                                 <img src={img} alt={text} className="xs:w-20 w-16" />
//                                 <span className="font-medium xs:text-[16px]">{text}</span>
//                             </div>
//                         ))}
//                     </div>
//                 </div>
//             </div>
//         </footer>
//     )
// }

// export default Footer;




import React, { memo,  useMemo } from 'react';
import Logo from '../logo/Logo';
import { Link } from 'react-router-dom';
import {  useSelector } from 'react-redux';
// import { setCurrentPage } from '../../features/pagination/pagination';
// import { fetchCategoryWiseData, setCategoryBtnValue } from '../../features/filter/filterSlice';
import { FaAnglesRight, FaSquareXTwitter } from "react-icons/fa6";
import { FaInstagramSquare, FaYoutube } from "react-icons/fa";
import { GrLinkedin } from "react-icons/gr";
import { ImFacebook2 } from "react-icons/im";

// Move static data outside component to prevent recreating on each render
const socialData = [
    { href: 'https://www.linkedin.com/company/earthyfoods-pvt-ltd', icon: <GrLinkedin />, fontSize: "text-[30px]", label: "LinkedIn" },
    { href: 'https://twitter.com/organicnation_', icon: <FaSquareXTwitter />, fontSize: "text-[34px]", label: "Twitter" },
    { href: 'https://www.facebook.com/organicnation/', icon: <ImFacebook2 />, fontSize: "text-[29px]", label: "Facebook" },
    { href: 'https://www.instagram.com/organicnation.co.in/', icon: <FaInstagramSquare />, fontSize: "text-[33px]", label: "Instagram" },
    { href: 'https://www.youtube.com/channel/UCyUSaFyepi2jx_ViFKE0TkA/community?pvf=CAI%253D', icon: <FaYoutube />, fontSize: "text-[41px]", label: "YouTube" },
];

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
];

const companyLinks = [
    { to: '/about-us', label: 'About Us' },
    { to: '/contact-us', label: 'Contact Us' },
];

const quickLinks = [
    { to: '/our-blogs', label: 'Blogs' },
    { to: '/our-recipes', label: 'Recipe' },
    { to: '/frequently-asked-questions', label: "FAQ's" },
    { to: '/privacy-policy', label: 'Privacy Policy' },
    { to: '/termsandconditions', label: 'Terms & Conditions' },
    { to: '/csr-policy', label: 'CSR Policy' },
];

// Memoize components that don't depend on props
const SocialLinks = React.memo(() => (
    <div className="flex justify-center items-center gap-3">
        {socialData.map(({ href, icon, fontSize, label }, index) => (
            <a key={index} href={href} target='_blank' rel="noopener noreferrer" aria-label={label}>
                {React.cloneElement(icon, { className: `${fontSize} hover:text-[var(--bgColorPrimary)] hover:scale-125 transition-all duration-300` })}
            </a>
        ))}
    </div>
));

const FooterLinks = React.memo(({ title, links }) => (
    <div className="flex flex-col gap-3 md:pb-0 pb-4">
        <h2 className="text-lg font-semibold uppercase">{title}</h2>
        <ul className="flex flex-col gap-1">
            {links.map(({ to, label }, index) => (
                <li key={index}>
                    <Link to={to}
                        // onClick={onClick}
                    >
                        <span className="flex items-center gap-2 cursor-pointer hover:text-orange-500 hover:translate-x-1 transition-all duration-300 tracking-widest">
                            <FaAnglesRight /> {label}
                        </span>
                    </Link>
                </li>
            ))}
        </ul>
    </div>
));


// Create a selector outside the component
const selectCategoryList = state => state.filterData.categoryList;

const Footer = () => {


    // const dispatch = useDispatch();
    const categoryList = useSelector(selectCategoryList, (prev, next) => {
        if (!prev || !next) return false;
        return JSON.stringify(prev) === JSON.stringify(next);
    });



    // Memoize the category handling function
    // const handleCategoryClick = useCallback((categoryUrl) => {
    //     dispatch(setCurrentPage(1));
    //     dispatch(setCategoryBtnValue(categoryUrl));
    //     dispatch(fetchCategoryWiseData(categoryUrl.toLowerCase()));
    //     window.scrollTo(0, 0);
    // }, [dispatch]);


    // Memoize category links creation
    const categoryLinks = useMemo(() => {
        const productCategories = categoryList.filter(curItem => curItem.category !== 'All');
        return productCategories.map(item => ({
            to: `/shop/${item.categoryUrl.toLowerCase()}`,
            label: item.category,
            // onClick: () => handleCategoryClick(item.categoryUrl)
        }));
    }, [categoryList]);
    return (
        <footer className="relative bg-[var(--hoverEffect)] xs:px-10 px-1 py-6 text-sm text-[var(--themeColor)]">
            <div className="lg:container mx-auto px-4">
                <div className='mb-4 flex flex-wrap gap-8 justify-between items-center lg:pr-28'>
                    <Logo />
                    <SocialLinks />
                </div>
                <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-4">
                    <div className='flex flex-col gap-3 md:pb-0 pb-4'>
                        <h2 className="text-lg font-semibold uppercase">About Us</h2>
                        <p className='tracking-widest md:w-[90%] text-justify'>
                            Welcome to ORGANIC NATION (A Unit of <span className='font-semibold'>Foodsbay India</span>), we pride ourselves on producing 100% natural and homestyle pickles, chutneys, and murrabbas. Our products are crafted with traditional recipes and the finest organic ingredients, ensuring a delightful and authentic taste experience in every jar.
                        </p>
                    </div>

                    <div className='flex flex-col gap-3 md:pb-0 pb-4'>
                        <FooterLinks title="Company Information" links={companyLinks} />
                        <FooterLinks title="Quick Links" links={quickLinks} />
                    </div>

                    <FooterLinks title="Categories" links={categoryLinks} />

                    <div className='flex flex-col gap-3 md:pb-0 pb-4'>
                        <h2 className="text-lg font-semibold uppercase">Get in Touch</h2>
                        <div className='flex flex-col gap-2 tracking-widest'>
                            <p>Email: <a href="mailto:info@organicnation.co.in" className='underline underline-offset-2'>info@organicnation.co.in</a></p>
                            <p>Phone Number: <a href="tel:+919999532041" className='underline underline-offset-2'>+91-9999532041</a></p>
                            <p><span className='font-semibold'>Work Address:</span> Foodsbay India, Bailparao, Ramnagar Road, Nainital, Uttarakhand-263159</p>
                            <p><span className='font-semibold'>Office Address:</span> Shop No - 336, Plot No - 134B, Shopprix Mall, Sector-61, Noida, Gautam Buddha Nagar, Uttar Pradesh, 201301</p>
                            <p><span className='font-semibold'>Phone</span> <a href="tel:+919999532041" className='underline underline-offset-2'>+91-9999532041</a> (For Bulk Queries)</p>
                        </div>
                    </div>
                </div>

                <div>
                    <div className='flex flex-wrap items-center gap-2'>
                        <img src="https://organicnationmages.s3.ap-south-1.amazonaws.com/payments/maestro.png" alt="maestro" className='w-12' />
                        <img src="https://organicnationmages.s3.ap-south-1.amazonaws.com/payments/visa.png" alt="visa" className='w-14' />
                        <img src="https://organicnationmages.s3.ap-south-1.amazonaws.com/payments/rupay.png" alt="rupay" className='h-16' />
                        <img src="https://organicnationmages.s3.ap-south-1.amazonaws.com/payments/mastercard.png" alt="mastercard" className='w-12' />
                        <img src="https://organicnationmages.s3.ap-south-1.amazonaws.com/payments/upi.png" alt="upi" className='w-16' />
                    </div>
                </div>

                <div className='pb-5 pt-10'>
                    <div className='flex flex-wrap justify-between items-center pr-10'>
                        {qualities.map(({ img, text }, index) => (
                            <div key={index} className="flex justify-center items-center">
                                <img src={img} alt={text} className="xs:w-20 w-16" />
                                <span className="font-medium xs:text-[16px]">{text}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default memo(Footer);

