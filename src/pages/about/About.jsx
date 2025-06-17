// import React, { useEffect, useCallback, useState } from 'react';
// import SEO from '../../helper/SEO/SEO';

// // Content sections data
// const SECTIONS_DATA = [
//   {
//     id: 'mission',
//     title: 'Our Mission',
//     content: 'The mission of <span class="font-semibold">"Better than the Best in Organic & Natural Products"</span> is to provide consumers with the highest quality organic goods, ensuring sustainability, purity, and health benefits, while supporting eco-friendly farming and fair-trade practices. Driven by a deep respect for nature and a passion for healthy living, our mission is twofold: to cultivate a sustainable food ecosystem and to empower communities through ethical practices. We are dedicated to sourcing the finest organic ingredients, carefully selected from local farmers who share our values of environmental stewardship and fair trade. Every product we create is a testament to our commitment to health, sustainability, and ethical practices.',
//     imageSrc: 'https://organicnationmages.s3.ap-south-1.amazonaws.com/AboutUs/5.png',
//     imageFirst: false
//   },
//   {
//     id: 'harmony',
//     title: 'Harmony with Nature',
//     content: 'Our operations are deeply rooted in environmental stewardship. Set against the backdrop of Uttarakhand\'s lush landscapes, we harness the purity of this region to cultivate and process organic foods that are free from harmful chemicals and pesticides. By prioritizing eco-friendly practices, we strive to preserve the natural beauty and biodiversity of our surroundings. From eco-friendly production processes to sustainable packaging choices, every decision is guided by principles of reducing environmental impact and promoting biodiversity.',
//     imageSrc: 'https://organicnationmages.s3.ap-south-1.amazonaws.com/AboutUs/3.png',
//     imageFirst: true
//   },
//   {
//     id: 'empowering',
//     title: 'Empowering Local Communities',
//     content: 'ORGANIC NATION</span> , we believe in the power of community. Our partnerships with local farmers are built on the principles of fair trade, respect, and mutual growth. Through training programs and resources, we empower farmers to adopt sustainable agricultural practices that enrich soil health and biodiversity, ensuring their prosperity and the health of the land they cultivate. Our factory serves as a community hub where traditional knowledge meets innovative practices, fostering a network of mutual support and collaboration.',
//     imageSrc: 'https://organicnationmages.s3.ap-south-1.amazonaws.com/AboutUs/4.png',
//     imageFirst: false
//   },
//   {
//     id: 'quality',
//     title: 'Commitment to Quality',
//     content: 'Quality is the cornerstone of our philosophy. Each product is carefully processed to retain its natural goodness, ensuring that what you consume is as nourishing as it is delicious. Every product undergoes rigorous testing and adheres to the highest standards of organic certification. Our team of passionate food artisans continuously innovates, combining traditional wisdom with modern techniques to create flavors that delight the palate and nourish the body.',
//     imageSrc: 'https://organicnationmages.s3.ap-south-1.amazonaws.com/AboutUs/1.png',
//     imageFirst: true
//   },
//   {
//     id: 'transparency',
//     title: 'Transparency and Trust',
//     content: 'We believe that trust is built through transparency. Our customers can trace the journey of their food, knowing the exact origins and the ethical practices behind its production. By fostering open communication, we ensure that every purchase supports sustainable and humane practices. Our open-door policy invites you to connect with the land and the people who nurture it, fostering a deeper understanding and appreciation of the food you consume.',
//     imageSrc: 'https://organicnationmages.s3.ap-south-1.amazonaws.com/AboutUs/2.png',
//     imageFirst: false
//   },
//   {
//     id: 'journey',
//     title: 'Join Our Journey',
//     content: "  As we continue to grow, we invite you to join us at ORGANIC NATION and embark on a journey of natural goodness. Whether you are a health-conscious individual, a culinary enthusiast, or a supporter of sustainable living, we invite you to experience the exceptional quality and taste of our organic products. Together, we can make a positive impact - one organic meal at a time.Discover the essence of purity and tradition with ORGANIC NATION – where nature's bounty meets unparalleled craftsmanship.",
//     imageSrc: "https://organicnationmages.s3.ap-south-1.amazonaws.com/AboutUs/6.png",
//     imageFirst: true
//   },
//   // ... Add other sections similarly
// ];

// // Reusable section component
// const Section = React.memo(({ title, content, imageSrc, imageFirst, scrollProgress }) => {
//   const contentSection = (
//     <div className="w-full lg:w-[calc(50%-2px)] p-6 rounded-lg">
//       <p dangerouslySetInnerHTML={{ __html: content }} />
//     </div>
//   );

//   const imageSection = (
//     <div className="w-full lg:w-[calc(50%-2px)] bg-gray-200 h-72 rounded-lg overflow-hidden">
//       <img
//         src={imageSrc}
//         alt={title}
//         className="w-full h-full object-cover"
//         loading="lazy"
//       />
//     </div>
//   );

//   const progressLine = (
//     <div className="w-full h-0.5 lg:w-1 lg:h-64 bg-indigo-200 relative">
//       <div
//         className="absolute bg-[var(--themeColor)] transition-all duration-300 ease-out"
//         style={{
//           top: 0,
//           left: 0,
//           width: window.innerWidth >= 1024 ? '100%' : '0%',
//           height: window.innerWidth >= 1024 ? '0%' : '100%',
//           [window.innerWidth >= 1024 ? 'height' : 'width']: `${scrollProgress}%`
//         }}
//       />
//     </div>
//   );

//   return (
//     <div className="mb-24 relative">
//       <h1 className="mb-14 text-3xl font-extrabold text-gray-900 md:text-5xl lg:text-6xl">
//         <span className="text-transparent bg-clip-text bg-gradient-to-r to-green-700 from-[var(--themeColor)]">
//           {title}
//         </span>
//       </h1>
//       <div className="flex flex-col lg:flex-row gap-8 items-center">
//         {imageFirst ? imageSection : contentSection}
//         {progressLine}
//         {imageFirst ? contentSection : imageSection}
//       </div>
//     </div>
//   );
// });

// const About = () => {
//   const [scrollProgress, setScrollProgress] = useState({});

//   const handleScroll = useCallback(() => {
//     const scrollY = window.scrollY;
//     const updatedProgress = {};

//     SECTIONS_DATA.forEach(section => {
//       const element = document.getElementById(section.id);
//       if (element) {
//         const progress = Math.min(
//           ((scrollY - element.offsetTop + 200) / element.clientHeight) * 100,
//           100
//         );
//         updatedProgress[section.id] = Math.max(0, progress);
//       }
//     });

//     setScrollProgress(updatedProgress);
//   }, []);

//   useEffect(() => {
//     window.addEventListener('scroll', handleScroll);
//     handleScroll(); // Initial calculation

//     return () => window.removeEventListener('scroll', handleScroll);
//   }, [handleScroll]);


//    // const founders = [
//     //     { name: 'Jane Doe', role: 'CEO & Co-Founder', image: prodfileImage },
//     //     { name: 'John Smith', role: 'CTO & Co-Founder', image: prodfileImage },
//     // ];

//     // const teamMembers = [
//     //     { name: 'Alice Johnson', role: 'Marketing Director', image: prodfileImage },
//     //     { name: 'Bob Williams', role: 'Lead Developer', image: prodfileImage },
//     //     { name: 'Carol Brown', role: 'Product Manager', image: prodfileImage },
//     //     { name: 'David Lee', role: 'UX Designer', image: prodfileImage },
//     //     { name: 'Eva Garcia', role: 'Data Scientist', image: prodfileImage },
//     //     { name: 'Frank Chen', role: 'Operations Manager', image: prodfileImage },
//     // ];

//   return (
//     <div className="min-h-screen font-sans text-[var(--themeColor)] tracking-wide">
//       <SEO
//                 title="About Us - Organic Products in India | Organic Nation "
//                 description="An 'ORGANIC NATION' unit (Partnership Firm ) , a distinguished name in the realm of organic food processing. Established in 2019 Bailparao, Uttarakhand."
//                 canonicalUrl="https://organicnation.co.in/about-us"
//                 ogTitle="About Us - Organic Products in India | Organic Nation "
//                 ogDescription="An 'ORGANIC NATION' unit (Partnership Firm ) , a distinguished name in the realm of organic food processing. Established in 2019 Bailparao, Uttarakhand."
//                 ogUrl="https://organicnation.co.in/about-us"
//                 ogImage="https://organicnationmages.s3.ap-south-1.amazonaws.com/other_banners/banner_about.png"
//                 ogImageWidth=""
//                 ogImageHeight=""
//                 twitterTitle="About Us - Organic Products in India | Organic Nation "
//                 twitterDescription="An 'ORGANIC NATION' unit (Partnership Firm ) , a distinguished name in the realm of organic food processing. Established in 2019 Bailparao, Uttarakhand."
//                twitterImage="https://organicnationmages.s3.ap-south-1.amazonaws.com/other_banners/banner_about.png"
//                twitterSite="Organic Nation"
//                twitterCreator="organicnation_"
//            />
//       {/* Banner */}
//       {/* <div className="relative">
//         <img 
//           src={`https://organicnationmages.s3.ap-south-1.amazonaws.com/other_banners/banner_about.png`}
//           alt="banner-image"
//           className="w-full object-cover"
//           priority="true"
//         />
//       </div> */}

//       {/* Introduction */}
//       <div className="flex flex-col gap-3 mt-10 text-[17px] tracking-wide">
//         {/* ... Your existing introduction content ... */}
//         <div className='w-[80%] mx-auto flex justify-start gap-3'>
//                     {/* line  */}
//                     <div className='py-1 '>
//                         <div className='w-1 h-full bg-[var(--bgColorPrimary)]'></div>
//                     </div>
//                     {/* content  */}
//                     <div className='flex flex-col gap-2'>
//                         <p>Welcome to <span className='font-medium'>ORGANIC NATION -  A "FOODSBAY INDIA" unit (Partnership Firm ) </span>, a distinguished name in the realm of organic food processing. Established in 2019 and situated in the serene landscapes of Bailparao, Uttarakhand, we have swiftly emerged as the largest supplier of organic honey in North India.</p>
//                         <p>At <span className='font-medium'>ORGANIC NATION</span>, we pride ourselves on producing 100% natural and homestyle pickles, chutneys, and murrabbas. Our products are crafted with traditional recipes and the finest organic ingredients, ensuring a delightful and authentic taste experience in every jar.</p>
//                     </div>
//                 </div>
//                 <div className='w-[80%] mx-auto flex justify-start gap-3'>
//                     {/* line  */}
//                     <div className='py-1 '>
//                         <div className='w-1 h-full bg-[var(--bgColorPrimary)]'></div>
//                     </div>
//                     {/* content  */}
//                     <div className='flex flex-col gap-2'>
//                         <p>Our commitment to quality extends beyond <span className='font-semibold'>honey and preserves</span>. As a prominent trader and supplier, <span className='font-semibold'>we offer a diverse range of organic & Natural products including seasonings, vegetable powders, oats, vegan-friendly soya chaap, millet-based muesli, and granola</span>. Each product is a testament to our dedication to promoting <span className='font-semibold'>health and wellness</span> through natural, wholesome foods. Our journey is guided by a vision of sustainability and excellence. We adhere to rigorous organic farming practices, ensuring that our products are free from harmful chemicals and additives. This commitment not only nurtures your health but also supports environmentally friendly agricultural methods. <span className='font-semibold'> ORGANIC NATION's</span> reach goes beyond the Indian market, as <span className='font-semibold'>we proudly export our signature pickles to international destinations</span>. Our global presence allows us to share the <span className="font-semibold">rich and diverse flavors</span> of India with the world, celebrating the essence of our culinary heritage.</p>
//                     </div>
//                 </div>
//                 <div className='w-[80%] mx-auto flex justify-start gap-3'>
//                     {/* line  */}
//                     <div className='py-1 '>
//                         <div className='w-1 h-full bg-[var(--bgColorPrimary)]'></div>
//                     </div>
//                     {/* content  */}
//                     <div className='flex flex-col gap-2'>
//                         <p>We believe in nourishing both people and the planet through our commitment to organic food processing. Nestled in the pristine environment of Uttarakhand, our factory is dedicated to sustainability, community empowerment, and the purity of the Himalayas. Our journey began with a simple yet powerful mission: to provide wholesome, organic food options that prioritize nutrition and environmental stewardship without compromising taste or quality.</p>
//                     </div>
//                 </div>
//       </div>

//       {/* Sections */}
//       <div className="max-w-6xl mx-auto px-4 py-16">
//         {SECTIONS_DATA.map(section => (
//           <div key={section.id} id={section.id}>
//             <Section
//               {...section}
//               scrollProgress={scrollProgress[section.id] || 0}
//             />
//           </div>
//         ))}
//       </div>

//         {/* Founders Section */}
//             {/* <div className="mb-24 max-w-6xl mx-auto px-4 py-16">
//                 <h1 className="mb-14 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl"><span className="text-transparent bg-clip-text bg-gradient-to-r to-green-700 from-[var(--themeColor)]">Meet the Founders</span></h1>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
//                     {founders.map((founder, index) => (
//                         <div key={index} className=" flex flex-col justify-center items-center   overflow-hidden transform transition duration-300 hover:scale-105">
//                             <img src={founder.image} alt={founder.name} className=" h-72 object-contain  rounded-2xl" />
//                             <div className="p-6 text-center">
//                                 <h3 className="text-2xl font-semibold text-[var(--themeColor)]">{founder.name}</h3>
//                                 <p className="text-green-600 mt-2">{founder.role}</p>
//                             </div>
//                         </div>
//                     ))}
//                 </div>
//             </div> */}


//             {/* Team Members Section */}
//             {/* <div className="mb-24 max-w-6xl mx-auto px-4 py-16">
//                 <h1 className="mb-14 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl"><span className="text-transparent bg-clip-text bg-gradient-to-r to-green-700 from-[var(--themeColor)]">Our Team</span></h1>
//                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
//                     {teamMembers.map((member, index) => (
//                         <div key={index} className="group relative">
//                             <div className="aspect-w-1 aspect-h-1 rounded-full overflow-hidden">
//                                 <img
//                                     src={member.image}
//                                     alt={member.name}
//                                     className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
//                                 />
//                             </div>
//                             <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6 rounded-full">

//                             </div>
//                             <div className="mt-4 text-center">
//                                 <h3 className="text-xl font-semibold text-[var(--themeColor)] group-hover:text-indigo-600 transition-colors duration-300">{member.name}</h3>
//                                 <p className="text-green-600 mt-1">{member.role}</p>
//                             </div>
//                         </div>
//                     ))}
//                 </div>
//             </div> */}
//     </div>
//   );
// };

// export default About;


import React, { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { FaLeaf, FaHandshake, FaAward, FaEye, FaSeedling, FaHeart } from 'react-icons/fa';
import SEO from '../../helper/SEO/SEO';

const About = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize(); // Initial check
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="min-h-screen bg-[var(--background-color)] font-sans text-[var(--text-color)] tracking-wide overflow-x-hidden">
      <SEO
        title="About Us - Organic Products in India | Organic Nation"
        description="An 'ORGANIC NATION' unit (Partnership Firm), a distinguished name in the realm of organic food processing. Established in 2019 Bailparao, Uttarakhand."
        canonicalUrl="https://organicnation.co.in/about-us"
        ogTitle="About Us - Organic Products in India | Organic Nation"
        ogDescription="An 'ORGANIC NATION' unit (Partnership Firm), a distinguished name in the realm of organic food processing. Established in 2019 Bailparao, Uttarakhand."
        ogUrl="https://organicnation.co.in/about-us"
        ogImage="https://organicnationmages.s3.ap-south-1.amazonaws.com/other_banners/banner_about.png"
        ogImageWidth=""
        ogImageHeight=""
        twitterTitle="About Us - Organic Products in India | Organic Nation"
        twitterDescription="An 'ORGANIC NATION' unit (Partnership Firm), a distinguished name in the realm of organic food processing. Established in 2019 Bailparao, Uttarakhand."
        twitterImage="https://organicnationmages.s3.ap-south-1.amazonaws.com/other_banners/banner_about.png"
        twitterSite="Organic Nation"
        twitterCreator="organicnation_"
      />

      {/* Hero Banner */}
      <HeroBanner />

      {/* Introduction */}
      <IntroSection />

      {/* Values & Mission */}
      <ValueSection />

      {/* Content sections */}
      <ContentSections isMobile={isMobile} />

      {/* Testimonial or impact section */}
      {/* <ImpactSection /> */}
    </div>
  );
};

// Hero Banner Component
const HeroBanner = () => {
  return (
    <div className="relative w-full h-[60vh] md:h-[50vh] overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 bg-gradient-to-r from-[var(--themeColor)] to-[var(--accent-color)]">
        <div className="absolute inset-0 bg-[var(--themeColor)]/40" />
      </div>

      {/* Content */}
      <div className="relative h-full flex flex-col justify-center items-center text-[var(--text-light-color)] px-4 text-center z-10">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-6xl font-bold mb-4 drop-shadow-lg"
        >
          Our Story
        </motion.h1>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="w-24 h-1 bg-[var(--accent-color)] mb-6"
        />
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-lg md:text-xl max-w-2xl drop-shadow-md"
        >
          Rooted in tradition. Committed to purity. Dedicated to sustainability.
        </motion.p>
      </div>

      {/* Decorative elements */}
      <div className="absolute bottom-0 left-0 w-full">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120" className="w-full">
          <path
            fill="var(--background-color)"
            fillOpacity="1"
            d="M0,96L48,85.3C96,75,192,53,288,53.3C384,53,480,75,576,80C672,85,768,75,864,69.3C960,64,1056,64,1152,58.7C1248,53,1344,43,1392,37.3L1440,32L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z"
          />
        </svg>
      </div>
    </div>
  );
};

// Introduction Section
const IntroSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px 0px" });

  return (
    <div ref={ref} className="py-16 px-4 md:px-8 lg:px-16">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col gap-8"
        >
          <div className="flex flex-col items-center text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[var(--themeColor)] mb-4">Welcome to <span className="text-[var(--accent-color)]">ORGANIC NATION</span></h2>
            <div className="w-16 h-1 bg-[var(--secondary-color)]" />
          </div>

          <div className="bg-white/80 backdrop-blur-sm p-6 md:p-8 rounded-2xl shadow-lg border border-[var(--neutral-color)]">
            <div className="flex flex-col gap-6">
              <p className="text-lg">
                Welcome to <span className="font-medium text-[var(--themeColor)]">ORGANIC NATION - A "FOODSBAY INDIA" unit (Partnership Firm) </span>, a distinguished name in the realm of organic food processing. Established in 2019 and situated in the serene landscapes of Bailparao, Uttarakhand, we have swiftly emerged as the largest supplier of organic honey in North India.
              </p>

              <div className="relative pl-6 border-l-4 border-[var(--secondary-color)]">
                <p className="italic text-lg">
                  At <span className="font-medium text-[var(--themeColor)]">ORGANIC NATION</span>, we pride ourselves on producing 100% natural and homestyle pickles, chutneys, and murrabbas. Our products are crafted with traditional recipes and the finest organic ingredients, ensuring a delightful and authentic taste experience in every jar.
                </p>
              </div>

              <p className="text-lg">
                Our commitment to quality extends beyond <span className="font-semibold">honey and preserves</span>. As a prominent trader and supplier, <span className="font-semibold">we offer a diverse range of organic & Natural products including seasonings, vegetable powders, oats, vegan-friendly soya chaap, millet-based muesli, and granola</span>. Each product is a testament to our dedication to promoting <span className="font-semibold">health and wellness</span> through natural, wholesome foods.
              </p>

              <p className="text-lg">
                Our journey is guided by a vision of sustainability and excellence. We adhere to rigorous organic farming practices, ensuring that our products are free from harmful chemicals and additives. This commitment not only nurtures your health but also supports environmentally friendly agricultural methods. <span className="font-semibold">ORGANIC NATION's</span> reach goes beyond the Indian market, as <span className="font-semibold">we proudly export our signature pickles to international destinations</span>. Our global presence allows us to share the <span className="font-semibold">rich and diverse flavors</span> of India with the world, celebrating the essence of our culinary heritage.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

// Values Section
const ValueSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px 0px" });

  const values = [
    {
      icon: <FaLeaf className="text-4xl text-[var(--secondary-color)]" />,
      title: "Sustainability",
      description: "Committed to eco-friendly practices throughout our supply chain."
    },
    {
      icon: <FaHandshake className="text-4xl text-[var(--accent-color)]" />,
      title: "Community",
      description: "Supporting local farmers and empowering rural communities."
    },
    {
      icon: <FaAward className="text-4xl text-[var(--themeColor)]" />,
      title: "Quality",
      description: "Ensuring excellence in every product we create and distribute."
    },
    {
      icon: <FaEye className="text-4xl text-[var(--alert-color)]" />,
      title: "Transparency",
      description: "Open about our processes, sources, and sustainable practices."
    },
  ];

  return (
    <div ref={ref} className="py-16 px-4 md:px-8 lg:px-16 bg-gradient-to-b from-[var(--background-color)] to-[var(--neutral-color)]/30">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 1 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-[var(--themeColor)] mb-4">Our Core Values</h2>
          <div className="w-16 h-1 bg-[var(--secondary-color)] mx-auto mb-6" />
          <p className="text-lg max-w-3xl mx-auto">
            We believe in nourishing both people and the planet through our commitment to organic food processing. Our journey began with a simple yet powerful mission:
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: index * 0.1 + 0.3 }}
              className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-6 text-center flex flex-col items-center hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="mb-4 p-4 rounded-full bg-[var(--neutral-color)]/30">
                {value.icon}
              </div>
              <h3 className="text-xl font-bold mb-2 text-[var(--text-color)]">{value.title}</h3>
              <p>{value.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Animated Section Component
const AnimatedSection = ({ title, content, imageSrc, imageFirst, index }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px 0px" });

  const contentSection = (
    <motion.div
      initial={{ opacity: 0, x: imageFirst ? 50 : -50 }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: imageFirst ? 50 : -50 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className="w-full lg:w-1/2 p-6 md:p-8"
    >
      <h3 className="text-2xl md:text-3xl font-bold mb-4 text-[var(--themeColor)]">{title}</h3>
      <div className="w-12 h-1 bg-[var(--accent-color)] mb-4" />
      <p
        className="text-lg leading-relaxed"
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </motion.div>
  );

  const imageSection = (
    <motion.div
      initial={{ opacity: 0, x: imageFirst ? -50 : 50 }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: imageFirst ? -50 : 50 }}
      transition={{ duration: 0.8 }}
      className="w-full lg:w-1/2 overflow-hidden rounded-xl"
    >
      <div className="h-full overflow-hidden group">
        <img
          src={imageSrc}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
          loading="lazy"
        />
      </div>
    </motion.div>
  );

  return (
    <div
      ref={ref}
      className={`mb-24 ${index % 2 === 0 ? 'bg-[var(--neutral-color)]/20' : ''} rounded-2xl overflow-hidden shadow-lg`}
    >
      <div className="flex flex-col lg:flex-row">
        {imageFirst ? imageSection : contentSection}
        {imageFirst ? contentSection : imageSection}
      </div>
    </div>
  );
};

// Content Sections Component
const ContentSections = ({ isMobile }) => {
  const SECTIONS_DATA = [
    {
      id: 'mission',
      title: 'Our Mission',
      content: 'The mission of <span class="font-semibold">"Better than the Best in Organic & Natural Products"</span> is to provide consumers with the highest quality organic goods, ensuring sustainability, purity, and health benefits, while supporting eco-friendly farming and fair-trade practices. Driven by a deep respect for nature and a passion for healthy living, our mission is twofold: to cultivate a sustainable food ecosystem and to empower communities through ethical practices. We are dedicated to sourcing the finest organic ingredients, carefully selected from local farmers who share our values of environmental stewardship and fair trade. Every product we create is a testament to our commitment to health, sustainability, and ethical practices.',
      imageSrc: 'https://organicnationmages.s3.ap-south-1.amazonaws.com/AboutUs/5.png',
      imageFirst: false
    },
    {
      id: 'harmony',
      title: 'Harmony with Nature',
      content: 'Our operations are deeply rooted in environmental stewardship. Set against the backdrop of Uttarakhand\'s lush landscapes, we harness the purity of this region to cultivate and process organic foods that are free from harmful chemicals and pesticides. By prioritizing eco-friendly practices, we strive to preserve the natural beauty and biodiversity of our surroundings. From eco-friendly production processes to sustainable packaging choices, every decision is guided by principles of reducing environmental impact and promoting biodiversity.',
      imageSrc: 'https://organicnationmages.s3.ap-south-1.amazonaws.com/AboutUs/3.png',
      imageFirst: true
    },
    {
      id: 'empowering',
      title: 'Empowering Local Communities',
      content: 'At <span class="font-semibold">ORGANIC NATION</span>, we believe in the power of community. Our partnerships with local farmers are built on the principles of fair trade, respect, and mutual growth. Through training programs and resources, we empower farmers to adopt sustainable agricultural practices that enrich soil health and biodiversity, ensuring their prosperity and the health of the land they cultivate. Our factory serves as a community hub where traditional knowledge meets innovative practices, fostering a network of mutual support and collaboration.',
      imageSrc: 'https://organicnationmages.s3.ap-south-1.amazonaws.com/AboutUs/4.png',
      imageFirst: false
    },
    {
      id: 'quality',
      title: 'Commitment to Quality',
      content: 'Quality is the cornerstone of our philosophy. Each product is carefully processed to retain its natural goodness, ensuring that what you consume is as nourishing as it is delicious. Every product undergoes rigorous testing and adheres to the highest standards of organic certification. Our team of passionate food artisans continuously innovates, combining traditional wisdom with modern techniques to create flavors that delight the palate and nourish the body.',
      imageSrc: 'https://organicnationmages.s3.ap-south-1.amazonaws.com/AboutUs/1.png',
      imageFirst: true
    },
    {
      id: 'transparency',
      title: 'Transparency and Trust',
      content: 'We believe that trust is built through transparency. Our customers can trace the journey of their food, knowing the exact origins and the ethical practices behind its production. By fostering open communication, we ensure that every purchase supports sustainable and humane practices. Our open-door policy invites you to connect with the land and the people who nurture it, fostering a deeper understanding and appreciation of the food you consume.',
      imageSrc: 'https://organicnationmages.s3.ap-south-1.amazonaws.com/AboutUs/2.png',
      imageFirst: false
    },
    {
      id: 'journey',
      title: 'Join Our Journey',
      content: "As we continue to grow, we invite you to join us at ORGANIC NATION and embark on a journey of natural goodness. Whether you are a health-conscious individual, a culinary enthusiast, or a supporter of sustainable living, we invite you to experience the exceptional quality and taste of our organic products. Together, we can make a positive impact - one organic meal at a time. Discover the essence of purity and tradition with ORGANIC NATION – where nature's bounty meets unparalleled craftsmanship.",
      imageSrc: "https://organicnationmages.s3.ap-south-1.amazonaws.com/AboutUs/6.png",
      imageFirst: true
    },
  ];

  return (
    <div className="py-16 px-4 md:px-8 lg:px-16">
      <div className="max-w-6xl mx-auto">
        <div className="mb-16 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px 0px" }}
            transition={{ duration: 0.8 }}
            className="text-3xl md:text-4xl font-bold mb-4"
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--themeColor)] to-[var(--secondary-color)]">
              Our Commitment to Excellence
            </span>
          </motion.h2>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, margin: "-100px 0px" }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="w-24 h-1 bg-[var(--accent-color)] mx-auto mb-6"
          />
        </div>

        {SECTIONS_DATA.map((section, index) => (
          <AnimatedSection
            key={section.id}
            title={section.title}
            content={section.content}
            imageSrc={section.imageSrc}
            imageFirst={isMobile ? false : section.imageFirst}
            index={index}
          />
        ))}
      </div>
    </div>
  );
};

// Impact Section
// const ImpactSection = () => {
//   const ref = useRef(null);
//   const isInView = useInView(ref, { once: true, margin: "-100px 0px" });

//   const stats = [
//     { icon: <FaSeedling className="text-3xl" />, value: "100%", label: "Organic" },
//     { icon: <FaHandshake className="text-3xl" />, value: "500+", label: "Farmer Partners" },
//     { icon: <FaHeart className="text-3xl" />, value: "10K+", label: "Happy Customers" },
//   ];

//   return (
//     <div ref={ref} className="py-20 px-4 md:px-8 lg:px-16 bg-[var(--themeColor)]">
//       <div className="absolute inset-0 bg-[var(--themeColor)]/90" />

//       <div className="max-w-6xl mx-auto relative z-10">
//         <motion.div
//           initial={{ opacity: 0, y: 30 }}
//           animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
//           transition={{ duration: 0.8 }}
//           className="text-center mb-16"
//         >
//           <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Our Impact</h2>
//           <div className="w-16 h-1 bg-[var(--accent-color)] mx-auto mb-6" />
//           <p className="text-lg text-white/90 max-w-2xl mx-auto">
//             We're proud of the positive difference we've made in the lives of our customers,
//             our farmer partners, and the environment.
//           </p>
//         </motion.div>

//         <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//           {stats.map((stat, index) => (
//             <motion.div
//               key={index}
//               initial={{ opacity: 0, y: 30 }}
//               animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
//               transition={{ duration: 0.6, delay: index * 0.2 + 0.3 }}
//               className="bg-white/10 backdrop-blur-sm rounded-xl p-8 text-center flex flex-col items-center hover:bg-white/20 transition-all duration-300"
//             >
//               <div className="text-[var(--accent-color)] mb-4">
//                 {stat.icon}
//               </div>
//               <h3 className="text-3xl md:text-4xl font-bold text-white mb-2">{stat.value}</h3>
//               <p className="text-lg text-white/80">{stat.label}</p>
//             </motion.div>
//           ))}
//         </div>

//         <motion.div
//           initial={{ opacity: 0, y: 30 }}
//           animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
//           transition={{ duration: 0.8, delay: 0.9 }}
//           className="mt-16 text-center"
//         >
//           <a
//             href="/products"
//             className="inline-block bg-[var(--accent-color)] text-white py-3 px-8 rounded-full font-medium text-lg hover:bg-[var(--accent-color)]/90 transition-colors duration-300 transform hover:scale-105"
//           >
//             Explore Our Products
//           </a>
//         </motion.div>
//       </div>
//     </div>
//   );
// };

export default About;