import React, { useEffect, useCallback, useState } from 'react';
import SEO from '../../helper/SEO/SEO';

// Content sections data
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
    content: 'ORGANIC NATION</span> , we believe in the power of community. Our partnerships with local farmers are built on the principles of fair trade, respect, and mutual growth. Through training programs and resources, we empower farmers to adopt sustainable agricultural practices that enrich soil health and biodiversity, ensuring their prosperity and the health of the land they cultivate. Our factory serves as a community hub where traditional knowledge meets innovative practices, fostering a network of mutual support and collaboration.',
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
    content: "  As we continue to grow, we invite you to join us at ORGANIC NATION and embark on a journey of natural goodness. Whether you are a health-conscious individual, a culinary enthusiast, or a supporter of sustainable living, we invite you to experience the exceptional quality and taste of our organic products. Together, we can make a positive impact - one organic meal at a time.Discover the essence of purity and tradition with ORGANIC NATION – where nature's bounty meets unparalleled craftsmanship.",
    imageSrc: "https://organicnationmages.s3.ap-south-1.amazonaws.com/AboutUs/6.png",
    imageFirst: true
  },
  // ... Add other sections similarly
];

// Reusable section component
const Section = React.memo(({ title, content, imageSrc, imageFirst, scrollProgress }) => {
  const contentSection = (
    <div className="w-full lg:w-[calc(50%-2px)] p-6 rounded-lg">
      <p dangerouslySetInnerHTML={{ __html: content }} />
    </div>
  );

  const imageSection = (
    <div className="w-full lg:w-[calc(50%-2px)] bg-gray-200 h-72 rounded-lg overflow-hidden">
      <img
        src={imageSrc}
        alt={title}
        className="w-full h-full object-cover"
        loading="lazy"
      />
    </div>
  );

  const progressLine = (
    <div className="w-full h-0.5 lg:w-1 lg:h-64 bg-indigo-200 relative">
      <div
        className="absolute bg-[var(--themeColor)] transition-all duration-300 ease-out"
        style={{
          top: 0,
          left: 0,
          width: window.innerWidth >= 1024 ? '100%' : '0%',
          height: window.innerWidth >= 1024 ? '0%' : '100%',
          [window.innerWidth >= 1024 ? 'height' : 'width']: `${scrollProgress}%`
        }}
      />
    </div>
  );

  return (
    <div className="mb-24 relative">
      <h1 className="mb-14 text-3xl font-extrabold text-gray-900 md:text-5xl lg:text-6xl">
        <span className="text-transparent bg-clip-text bg-gradient-to-r to-green-700 from-[var(--themeColor)]">
          {title}
        </span>
      </h1>
      <div className="flex flex-col lg:flex-row gap-8 items-center">
        {imageFirst ? imageSection : contentSection}
        {progressLine}
        {imageFirst ? contentSection : imageSection}
      </div>
    </div>
  );
});

const About = () => {
  const [scrollProgress, setScrollProgress] = useState({});

  const handleScroll = useCallback(() => {
    const scrollY = window.scrollY;
    const updatedProgress = {};
    
    SECTIONS_DATA.forEach(section => {
      const element = document.getElementById(section.id);
      if (element) {
        const progress = Math.min(
          ((scrollY - element.offsetTop + 200) / element.clientHeight) * 100,
          100
        );
        updatedProgress[section.id] = Math.max(0, progress);
      }
    });

    setScrollProgress(updatedProgress);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial calculation

    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);


   // const founders = [
    //     { name: 'Jane Doe', role: 'CEO & Co-Founder', image: prodfileImage },
    //     { name: 'John Smith', role: 'CTO & Co-Founder', image: prodfileImage },
    // ];

    // const teamMembers = [
    //     { name: 'Alice Johnson', role: 'Marketing Director', image: prodfileImage },
    //     { name: 'Bob Williams', role: 'Lead Developer', image: prodfileImage },
    //     { name: 'Carol Brown', role: 'Product Manager', image: prodfileImage },
    //     { name: 'David Lee', role: 'UX Designer', image: prodfileImage },
    //     { name: 'Eva Garcia', role: 'Data Scientist', image: prodfileImage },
    //     { name: 'Frank Chen', role: 'Operations Manager', image: prodfileImage },
    // ];

  return (
    <div className="min-h-screen font-sans text-[var(--themeColor)] tracking-wide">
      <SEO
                title="About Us - Organic Products in India | Organic Nation "
                description="An 'ORGANIC NATION' unit (Partnership Firm ) , a distinguished name in the realm of organic food processing. Established in 2019 Bailparao, Uttarakhand."
                canonicalUrl="https://organicnation.co.in/about-us"
                ogTitle="About Us - Organic Products in India | Organic Nation "
                ogDescription="An 'ORGANIC NATION' unit (Partnership Firm ) , a distinguished name in the realm of organic food processing. Established in 2019 Bailparao, Uttarakhand."
                ogUrl="https://organicnation.co.in/about-us"
                ogImage="https://organicnationmages.s3.ap-south-1.amazonaws.com/other_banners/banner_about.png"
                ogImageWidth=""
                ogImageHeight=""
                twitterTitle="About Us - Organic Products in India | Organic Nation "
                twitterDescription="An 'ORGANIC NATION' unit (Partnership Firm ) , a distinguished name in the realm of organic food processing. Established in 2019 Bailparao, Uttarakhand."
               twitterImage="https://organicnationmages.s3.ap-south-1.amazonaws.com/other_banners/banner_about.png"
               twitterSite="Organic Nation"
               twitterCreator="organicnation_"
           />
      {/* Banner */}
      <div className="relative">
        <img 
          src={`https://organicnationmages.s3.ap-south-1.amazonaws.com/other_banners/banner_about.png`}
          alt="banner-image"
          className="w-full object-cover"
          priority="true"
        />
      </div>

      {/* Introduction */}
      <div className="flex flex-col gap-3 mt-10 text-[17px] tracking-wide">
        {/* ... Your existing introduction content ... */}
        <div className='w-[80%] mx-auto flex justify-start gap-3'>
                    {/* line  */}
                    <div className='py-1 '>
                        <div className='w-1 h-full bg-[var(--bgColorPrimary)]'></div>
                    </div>
                    {/* content  */}
                    <div className='flex flex-col gap-2'>
                        <p>Welcome to <span className='font-medium'>ORGANIC NATION -  A "FOODSBAY INDIA" unit (Partnership Firm ) </span>, a distinguished name in the realm of organic food processing. Established in 2019 and situated in the serene landscapes of Bailparao, Uttarakhand, we have swiftly emerged as the largest supplier of organic honey in North India.</p>
                        <p>At <span className='font-medium'>ORGANIC NATION</span>, we pride ourselves on producing 100% natural and homestyle pickles, chutneys, and murrabbas. Our products are crafted with traditional recipes and the finest organic ingredients, ensuring a delightful and authentic taste experience in every jar.</p>
                    </div>
                </div>
                <div className='w-[80%] mx-auto flex justify-start gap-3'>
                    {/* line  */}
                    <div className='py-1 '>
                        <div className='w-1 h-full bg-[var(--bgColorPrimary)]'></div>
                    </div>
                    {/* content  */}
                    <div className='flex flex-col gap-2'>
                        <p>Our commitment to quality extends beyond <span className='font-semibold'>honey and preserves</span>. As a prominent trader and supplier, <span className='font-semibold'>we offer a diverse range of organic & Natural products including seasonings, vegetable powders, oats, vegan-friendly soya chaap, millet-based muesli, and granola</span>. Each product is a testament to our dedication to promoting <span className='font-semibold'>health and wellness</span> through natural, wholesome foods. Our journey is guided by a vision of sustainability and excellence. We adhere to rigorous organic farming practices, ensuring that our products are free from harmful chemicals and additives. This commitment not only nurtures your health but also supports environmentally friendly agricultural methods. <span className='font-semibold'> ORGANIC NATION's</span> reach goes beyond the Indian market, as <span className='font-semibold'>we proudly export our signature pickles to international destinations</span>. Our global presence allows us to share the <span className="font-semibold">rich and diverse flavors</span> of India with the world, celebrating the essence of our culinary heritage.</p>
                    </div>
                </div>
                <div className='w-[80%] mx-auto flex justify-start gap-3'>
                    {/* line  */}
                    <div className='py-1 '>
                        <div className='w-1 h-full bg-[var(--bgColorPrimary)]'></div>
                    </div>
                    {/* content  */}
                    <div className='flex flex-col gap-2'>
                        <p>We believe in nourishing both people and the planet through our commitment to organic food processing. Nestled in the pristine environment of Uttarakhand, our factory is dedicated to sustainability, community empowerment, and the purity of the Himalayas. Our journey began with a simple yet powerful mission: to provide wholesome, organic food options that prioritize nutrition and environmental stewardship without compromising taste or quality.</p>
                    </div>
                </div>
      </div>

      {/* Sections */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        {SECTIONS_DATA.map(section => (
          <div key={section.id} id={section.id}>
            <Section
              {...section}
              scrollProgress={scrollProgress[section.id] || 0}
            />
          </div>
        ))}
      </div>

        {/* Founders Section */}
            {/* <div className="mb-24 max-w-6xl mx-auto px-4 py-16">
                <h1 className="mb-14 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl"><span className="text-transparent bg-clip-text bg-gradient-to-r to-green-700 from-[var(--themeColor)]">Meet the Founders</span></h1>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    {founders.map((founder, index) => (
                        <div key={index} className=" flex flex-col justify-center items-center   overflow-hidden transform transition duration-300 hover:scale-105">
                            <img src={founder.image} alt={founder.name} className=" h-72 object-contain  rounded-2xl" />
                            <div className="p-6 text-center">
                                <h3 className="text-2xl font-semibold text-[var(--themeColor)]">{founder.name}</h3>
                                <p className="text-green-600 mt-2">{founder.role}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div> */}


            {/* Team Members Section */}
            {/* <div className="mb-24 max-w-6xl mx-auto px-4 py-16">
                <h1 className="mb-14 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl"><span className="text-transparent bg-clip-text bg-gradient-to-r to-green-700 from-[var(--themeColor)]">Our Team</span></h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
                    {teamMembers.map((member, index) => (
                        <div key={index} className="group relative">
                            <div className="aspect-w-1 aspect-h-1 rounded-full overflow-hidden">
                                <img
                                    src={member.image}
                                    alt={member.name}
                                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                                />
                            </div>
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6 rounded-full">
                               
                            </div>
                            <div className="mt-4 text-center">
                                <h3 className="text-xl font-semibold text-[var(--themeColor)] group-hover:text-indigo-600 transition-colors duration-300">{member.name}</h3>
                                <p className="text-green-600 mt-1">{member.role}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div> */}
    </div>
  );
};

export default About;
