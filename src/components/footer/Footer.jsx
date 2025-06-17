// import React, { memo,  useMemo } from 'react';
// import Logo from '../logo/Logo';
// import { Link } from 'react-router-dom';
// import {  useSelector } from 'react-redux';
// // import { setCurrentPage } from '../../features/pagination/pagination';
// // import { fetchCategoryWiseData, setCategoryBtnValue } from '../../features/filter/filterSlice';
// import { FaAnglesRight, FaSquareXTwitter } from "react-icons/fa6";
// import { FaInstagramSquare, FaYoutube } from "react-icons/fa";
// import { GrLinkedin } from "react-icons/gr";
// import { ImFacebook2 } from "react-icons/im";

// // Move static data outside component to prevent recreating on each render
// const socialData = [
//     { href: 'https://www.linkedin.com/company/earthyfoods-pvt-ltd', icon: <GrLinkedin />, fontSize: "text-[30px]", label: "LinkedIn" },
//     { href: 'https://twitter.com/organicnation_', icon: <FaSquareXTwitter />, fontSize: "text-[34px]", label: "Twitter" },
//     { href: 'https://www.facebook.com/organicnation/', icon: <ImFacebook2 />, fontSize: "text-[29px]", label: "Facebook" },
//     { href: 'https://www.instagram.com/organicnation.co.in/', icon: <FaInstagramSquare />, fontSize: "text-[33px]", label: "Instagram" },
//     { href: 'https://www.youtube.com/channel/UCyUSaFyepi2jx_ViFKE0TkA/community?pvf=CAI%253D', icon: <FaYoutube />, fontSize: "text-[41px]", label: "YouTube" },
// ];

// const qualities = [
//     {
//         img: 'https://organicnationmages.s3.ap-south-1.amazonaws.com/footer_images/sustainable.png',
//         text: 'Sustainable Farming Techniques'
//     },
//     {
//         img: 'https://organicnationmages.s3.ap-south-1.amazonaws.com/footer_images/chemicalFree.png',
//         text: 'Chemical Pesticide-free'
//     },
//     {
//         img: 'https://organicnationmages.s3.ap-south-1.amazonaws.com/footer_images/ethical.png',
//         text: 'Locally Ethically Sourced'
//     },
//     {
//         img: 'https://organicnationmages.s3.ap-south-1.amazonaws.com/footer_images/nonGmo.png',
//         text: 'Non-GMO Produce'
//     },
//     {
//         img: 'https://organicnationmages.s3.ap-south-1.amazonaws.com/footer_images/global.png',
//         text: 'Global Testing Standards'
//     },
// ];

// const companyLinks = [
//     { to: '/about-us', label: 'About Us' },
//     { to: '/contact-us', label: 'Contact Us' },
// ];

// const quickLinks = [
//     { to: '/our-blogs', label: 'Blogs' },
//     { to: '/our-recipes', label: 'Recipe' },
//     { to: '/frequently-asked-questions', label: "FAQ's" },
//     { to: '/privacy-policy', label: 'Privacy Policy' },
//     { to: '/termsandconditions', label: 'Terms & Conditions' },
//     { to: '/csr-policy', label: 'CSR Policy' },
// ];

// // Memoize components that don't depend on props
// const SocialLinks = React.memo(() => (
//     <div className="flex justify-center items-center gap-3">
//         {socialData.map(({ href, icon, fontSize, label }, index) => (
//             <a key={index} href={href} target='_blank' rel="noopener noreferrer" aria-label={label}>
//                 {React.cloneElement(icon, { className: `${fontSize} hover:text-[var(--bgColorPrimary)] hover:scale-125 transition-all duration-300` })}
//             </a>
//         ))}
//     </div>
// ));

// const FooterLinks = React.memo(({ title, links }) => (
//     <div className="flex flex-col gap-3 md:pb-0 pb-4">
//         <h2 className="text-lg font-semibold uppercase">{title}</h2>
//         <ul className="flex flex-col gap-1">
//             {links.map(({ to, label }, index) => (
//                 <li key={index}>
//                     <Link to={to}
//                         // onClick={onClick}
//                     >
//                         <span className="flex items-center gap-2 cursor-pointer hover:text-orange-500 hover:translate-x-1 transition-all duration-300 tracking-widest">
//                             <FaAnglesRight /> {label}
//                         </span>
//                     </Link>
//                 </li>
//             ))}
//         </ul>
//     </div>
// ));


// // Create a selector outside the component
// const selectCategoryList = state => state.filterData.categoryList;

// const Footer = () => {


//     // const dispatch = useDispatch();
//     const categoryList = useSelector(selectCategoryList, (prev, next) => {
//         if (!prev || !next) return false;
//         return JSON.stringify(prev) === JSON.stringify(next);
//     });



//     // Memoize the category handling function
//     // const handleCategoryClick = useCallback((categoryUrl) => {
//     //     dispatch(setCurrentPage(1));
//     //     dispatch(setCategoryBtnValue(categoryUrl));
//     //     dispatch(fetchCategoryWiseData(categoryUrl.toLowerCase()));
//     //     window.scrollTo(0, 0);
//     // }, [dispatch]);


//     // Memoize category links creation
//     const categoryLinks = useMemo(() => {
//         const productCategories = categoryList.filter(curItem => curItem.category !== 'All');
//         return productCategories.map(item => ({
//             to: `/shop/${item.categoryUrl.toLowerCase()}`,
//             label: item.category,
//             // onClick: () => handleCategoryClick(item.categoryUrl)
//         }));
//     }, [categoryList]);
//     return (
//         <footer className="relative bg-[var(--hoverEffect)] xs:px-10 px-1 py-6 text-sm text-[var(--themeColor)]">
//             <div className="lg:container mx-auto px-4">
//                 <div className='mb-4 flex flex-wrap gap-8 justify-between items-center lg:pr-28'>
//                     <Logo />
//                     <SocialLinks />
//                 </div>
//                 <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-4">
//                     <div className='flex flex-col gap-3 md:pb-0 pb-4'>
//                         <h2 className="text-lg font-semibold uppercase">About Us</h2>
//                         <p className='tracking-widest md:w-[90%] text-justify'>
//                             Welcome to ORGANIC NATION (A Unit of <span className='font-semibold'>Foodsbay India</span>), we pride ourselves on producing 100% natural and homestyle pickles, chutneys, and murrabbas. Our products are crafted with traditional recipes and the finest organic ingredients, ensuring a delightful and authentic taste experience in every jar.
//                         </p>
//                     </div>

//                     <div className='flex flex-col gap-3 md:pb-0 pb-4'>
//                         <FooterLinks title="Company Information" links={companyLinks} />
//                         <FooterLinks title="Quick Links" links={quickLinks} />
//                     </div>

//                     <FooterLinks title="Categories" links={categoryLinks} />

//                     <div className='flex flex-col gap-3 md:pb-0 pb-4'>
//                         <h2 className="text-lg font-semibold uppercase">Get in Touch</h2>
//                         <div className='flex flex-col gap-2 tracking-widest'>
//                             <p>Email: <a href="mailto:info@organicnation.co.in" className='underline underline-offset-2'>info@organicnation.co.in</a></p>
//                             <p>Phone Number: <a href="tel:+919999532041" className='underline underline-offset-2'>+91-9999532041</a></p>
//                             <p><span className='font-semibold'>Work Address:</span> Foodsbay India, Bailparao, Ramnagar Road, Nainital, Uttarakhand-263159</p>
//                             <p><span className='font-semibold'>Office Address:</span> Shop No - 336, Plot No - 134B, Shopprix Mall, Sector-61, Noida, Gautam Buddha Nagar, Uttar Pradesh, 201301</p>
//                             <p><span className='font-semibold'>Phone</span> <a href="tel:+919999532041" className='underline underline-offset-2'>+91-9999532041</a> (For Bulk Queries)</p>
//                         </div>
//                     </div>
//                 </div>

//                 <div>
//                     <div className='flex flex-wrap items-center gap-2'>
//                         <img src="https://organicnationmages.s3.ap-south-1.amazonaws.com/payments/maestro.png" alt="maestro" className='w-12' />
//                         <img src="https://organicnationmages.s3.ap-south-1.amazonaws.com/payments/visa.png" alt="visa" className='w-14' />
//                         <img src="https://organicnationmages.s3.ap-south-1.amazonaws.com/payments/rupay.png" alt="rupay" className='h-16' />
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
//     );
// };

// export default memo(Footer);


import React, { memo, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import Newsletter from './Newsletter'
import { 
  FaAnglesRight, 
  FaSquareXTwitter, 
//   FaInstagramSquare, 
  FaYoutube, 
  FaPhone, 
  FaEnvelope, 
  FaLocationDot, 
  FaBuilding,
  FaLeaf,
  FaSeedling
} from "react-icons/fa6";
import { GrInstagram } from "react-icons/gr";
import { GrLinkedin } from "react-icons/gr";
import { ImFacebook2 } from "react-icons/im";
import { MdOutlineSecurity, MdNaturePeople } from "react-icons/md";
// import { GiMicroorganisms } from "react-icons/gi";
import { FaGlobeAmericas } from "react-icons/fa";
import { BiBlock } from "react-icons/bi";

const socialData = [
  { 
    href: 'https://www.linkedin.com/company/earthyfoods-pvt-ltd',
    icon: <GrLinkedin />,
    label: "LinkedIn",
    color: "#7A2E1D"
  },
  { 
    href: 'https://www.facebook.com/organicnation/',
    icon: <ImFacebook2 />,
    label: "Facebook",
    color: "#7A2E1D"
  },
  { 
    href: 'https://www.instagram.com/organicnation.co.in/',
    icon: <GrInstagram />,
    label: "Instagram",
    color: "#7A2E1D"
  },
   { 
    href: 'https://twitter.com/organicnation_',
    icon: <FaSquareXTwitter />,
    label: "Twitter",
    color: '#7A2E1D'
  },
  { 
    href: 'https://www.youtube.com/channel/UCyUSaFyepi2jx_ViFKE0TkA/community?pvf=CAI%253D',
    icon: <FaYoutube />,
    label: "YouTube",
    color: "#7A2E1D"
  }
];

const qualities = [
  {
    icon: <FaSeedling className="text-3xl text-[var(--secondary-color)]" />,
    text: 'Sustainable Farming Techniques'
  },
  {
    icon: <MdOutlineSecurity className="text-3xl text-[var(--secondary-color)]" />,
    text: 'Chemical Pesticide-free'
  },
  {
    icon: <MdNaturePeople className="text-3xl text-[var(--secondary-color)]" />,
    text: 'Locally Ethically Sourced'
  },
  {
    icon: <BiBlock  className="text-3xl text-[var(--secondary-color)]" />,
    text: 'Non-GMO Produce'
  },
  {
    icon: <FaGlobeAmericas className="text-3xl text-[var(--secondary-color)]" />,
    text: 'Global Testing Standards'
  }
];

const companyLinks = [
  { to: '/about-us', label: 'About Us' },
  { to: '/contact-us', label: 'Contact Us' },
];

const quickLinks = [
  { to: '/our-blogs', label: 'Blogs' },
  { to: '/our-recipes', label: 'Recipes' },
  { to: '/frequently-asked-questions', label: "FAQ's" },
  { to: '/privacy-policy', label: 'Privacy Policy' },
  { to: '/termsandconditions', label: 'Terms & Conditions' },
  { to: '/csr-policy', label: 'CSR Policy' },
];

const SocialLinks = memo(() => (
  <div className="flex justify-center items-center gap-4">
    {socialData.map(({ href, icon, label, color }, index) => (
      <motion.a 
        key={index} 
        href={href} 
        target="_blank" 
        rel="noopener noreferrer" 
        aria-label={label}
        whileHover={{ scale: 1.2 }}
        transition={{ type: "spring", stiffness: 400, damping: 10 }}
        className="text-3xl hover:text-[var(--accent-color)] transition-all duration-300"
        style={{ color }}
      >
        {icon}
      </motion.a>
    ))}
  </div>
));

const FooterLinks = memo(({ title, links }) => (
  <div className="flex flex-col gap-3">
    <h2 className="text-lg font-semibold uppercase border-b-2 border-[var(--accent-color)] pb-2 inline-block">
      {title}
    </h2>
    <ul className="flex flex-col gap-2">
      {links.map(({ to, label }, index) => (
        <motion.li 
          key={index}
          whileHover={{ x: 8 }}
          transition={{ type: "spring", stiffness: 300, damping: 10 }}
        >
          <Link to={to} className="flex items-center gap-2 hover:text-[var(--accent-color)]">
            <FaAnglesRight className="text-[var(--accent-color)]" /> 
            <span className="tracking-wide">{label}</span>
          </Link>
        </motion.li>
      ))}
    </ul>
  </div>
));

const ContactItem = memo(({ icon, content, href, label }) => (
  <motion.div 
    className="flex items-start gap-3 group"
    whileHover={{ x: 5 }}
    transition={{ type: "spring", stiffness: 300, damping: 10 }}
  >
    <div className="mt-1 text-[var(--accent-color)]">{icon}</div>
    {href ? (
      <a 
        href={href} 
        aria-label={label} 
        className="tracking-wide group-hover:text-[var(--accent-color)]"
      >
        {content}
      </a>
    ) : (
      <p className="tracking-wide">{content}</p>
    )}
  </motion.div>
));

const QualityBadge = memo(({ icon, text }) => (
  <motion.div 
    className="flex items-center gap-2 bg-[var(--background-color)] p-3 rounded-lg shadow-sm"
    whileHover={{ y: -5 }}
    transition={{ type: "spring", stiffness: 300, damping: 10 }}
  >
    {icon}
    <span className="font-medium text-[var(--text-color)] text-sm md:text-base">{text}</span>
  </motion.div>
));



const Logo = memo(() => (
  <Link to="/" className="flex items-center gap-2">
    <div className="relative w-12 h-12 md:w-16 md:h-16">
      <div className="absolute inset-0 bg-[var(--accent-color)] rounded-full opacity-20"></div>
      <FaLeaf className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-[var(--themeColor)] text-3xl md:text-4xl" />
    </div>
    <div className="flex flex-col">
      <span className="font-bold text-xl md:text-2xl tracking-wide text-[var(--themeColor)]">ORGANIC NATION</span>
      <span className="text-xs md:text-sm text-[var(--accent-color)]">100% Natural & Organic</span>
    </div>
  </Link>
));

const Footer = () => {
  const selectCategoryList = state => state.filterData.categoryList;
  const categoryList = useSelector(selectCategoryList, (prev, next) => {
    if (!prev || !next) return false;
    return JSON.stringify(prev) === JSON.stringify(next);
  });
  
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const categoryLinks = React.useMemo(() => {
    const productCategories = categoryList.filter(curItem => curItem.category !== 'All');
    return productCategories.map(item => ({
      to: `/shop/${item.categoryUrl.toLowerCase()}`,
      label: item.category,
    }));
  }, [categoryList]);

  return (
    <>
      {/* Scroll to top button */}
      {/* {showScrollTop && (
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-50 bg-[var(--themeColor)] text-white p-3 rounded-full shadow-lg"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        </motion.button>
      )} */}

      <footer className="bg-gradient-to-b from-[var(--background-color)] to-white pt-10 text-[var(--text-color)]">
        {/* Wavy divider */}
        <div className="relative h-12 overflow-hidden">
          <svg viewBox="0 0 500 150" preserveAspectRatio="none" className="w-full h-full">
            <path 
              d="M0.00,49.98 C149.99,150.00 349.20,-49.98 500.00,49.98 L500.00,150.00 L0.00,150.00 Z" 
              className="fill-[var(--themeColor)] opacity-10"
            ></path>
          </svg>
        </div>
        
        <div className="container mx-auto px-4">
          {/* Top section with logo and social links */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex flex-col md:flex-row justify-between items-center gap-6 mb-10"
          >
            <Logo />
            <SocialLinks />
          </motion.div>
          
          {/* Main footer content */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
            {/* About us section */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="flex flex-col gap-4"
            >
              <h2 className="text-lg font-semibold uppercase border-b-2 border-[var(--accent-color)] pb-2 inline-block">
                About Us
              </h2>
              <p className="tracking-wide text-sm leading-relaxed">
                Welcome to <span className="font-bold text-[var(--themeColor)]">ORGANIC NATION</span> (A Unit of <span className="font-semibold">Foodsbay India</span>), we pride ourselves on producing 100% natural and homestyle pickles, chutneys, and murrabbas. Our products are crafted with traditional recipes and the finest organic ingredients, ensuring a delightful and authentic taste experience in every jar.
              </p>
              <Newsletter />
            </motion.div>

            {/* Company & Quick Links */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-col gap-6"
            >
              <FooterLinks title="Company Information" links={companyLinks} />
              <FooterLinks title="Quick Links" links={quickLinks} />
            </motion.div>

            {/* Categories */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <FooterLinks title="Categories" links={categoryLinks} />
            </motion.div>

            {/* Contact Information */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-col gap-4"
            >
              <h2 className="text-lg font-semibold uppercase border-b-2 border-[var(--accent-color)] pb-2 inline-block">
                Get in Touch
              </h2>
              <div className="flex flex-col gap-4">
                <ContactItem 
                  icon={<FaEnvelope />} 
                  content="info@organicnation.co.in" 
                  href="mailto:info@organicnation.co.in"
                  label="Email"
                />
                <ContactItem 
                  icon={<FaPhone />} 
                  content="+91-9999532041" 
                  href="tel:+919999532041"
                  label="Phone"
                />
                <ContactItem 
                  icon={<FaBuilding />} 
                  content={<>
                    <span className="font-semibold">Office Address:</span> Shop No - 336, Plot No - 134B, Shopprix Mall, Sector-61, Noida, Gautam Buddha Nagar, Uttar Pradesh, 201301
                  </>}
                />
                <ContactItem 
                  icon={<FaLocationDot />} 
                  content={<>
                    <span className="font-semibold">Work Address:</span> Foodsbay India, Bailparao, Ramnagar Road, Nainital, Uttarakhand-263159
                  </>}
                />
              </div>
            </motion.div>
          </div>
          
          {/* Quality badges */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-10"
          >
            {qualities.map((quality, index) => (
              <QualityBadge key={index} {...quality} />
            ))}
          </motion.div>
          
          {/* Payment methods */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="mb-10"
          >
            <h3 className="text-lg font-semibold mb-4 text-center">Secure Payment Options</h3>
            <div className="flex flex-wrap justify-center items-center gap-6">
              <motion.img whileHover={{ scale: 1.1 }} src="https://organicnationmages.s3.ap-south-1.amazonaws.com/payments/maestro.png" alt="maestro" className="h-10" />
              <motion.img whileHover={{ scale: 1.1 }} src="https://organicnationmages.s3.ap-south-1.amazonaws.com/payments/visa.png" alt="visa" className="h-10" />
              <motion.img whileHover={{ scale: 1.1 }} src="https://organicnationmages.s3.ap-south-1.amazonaws.com/payments/rupay.png" alt="rupay" className="h-10" />
              <motion.img whileHover={{ scale: 1.1 }} src="https://organicnationmages.s3.ap-south-1.amazonaws.com/payments/mastercard.png" alt="mastercard" className="h-10" />
              <motion.img whileHover={{ scale: 1.1 }} src="https://organicnationmages.s3.ap-south-1.amazonaws.com/payments/upi.png" alt="upi" className="h-10" />
            </div>
          </motion.div>
        </div>
        
        {/* Copyright bar */}
        <div className="bg-[var(--themeColor)] py-4 text-[var(--text-light-color)]">
          <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-2 text-sm">
            <p>© {new Date().getFullYear()} Organic Nation - All Rights Reserved</p>
            <p>A Unit of Foodsbay India</p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default memo(Footer);