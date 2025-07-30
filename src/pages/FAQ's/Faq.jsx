import React from "react";
import AccordionItem from "../../components/accordionItem/AccordionItem";
import SEO from '../../helper/SEO/SEO';

const Faq = () => {
  // faq array 
  const faqs = [
    {
      id: 1,
      header: "What does 'organic' mean?",
      text: "'Organic' refers to the way agricultural products are grown and processed. Specific criteria and practices are followed to ensure that the products meet organic standards.",
    },
    {
      id: 2,
      header: "What do you mean by Processed Organic Foods?",
      text: "Processed organic foods are products made from organically grown ingredients that have undergone various processing methods to create a final food product. These foods maintain the principles of organic farming and production, which prioritize the use of natural substances and processes while minimizing the use of synthetic chemicals, pesticides, and genetically modified organisms (GMOs).",
    },
    {
      id: 3,
      header: "How can I identify  Processed Organic Foods?",
      text: "Processed organic foods can be identified by their labels, which indicate compliance with organic standards. Look for certifications from recognized organic bodies, such as the USDA Organic seal in the United States or the EU Organic logo in Europe. These labels ensure that the food is made from organic ingredients and processed according to organic guidelines. Additionally, processed organic foods often list their organic ingredients prominently on the packaging. However, they still undergo some level of processing, such as canning, freezing, or baking, which distinguishes them from fresh organic produce. Reading ingredient lists and certification labels is crucial in identifying these foods",
    },
    {
      id: 4,
      header: "What is difference between Jaggery powder and Sugar?",
      text: "Jaggery powder and sugar differ primarily in their source and processing: Sugar is typically derived from sugarcane or sugar beets, while jaggery is made from sugarcane juice or palm sap. Sugar undergoes refining and chemical processing to extract sucrose, whereas jaggery is prepared by evaporating water from sugarcane juice or palm sap without separating the molasses. Jaggery has a distinctive caramel-like flavor due to the presence of molasses, whereas sugar is neutral in flavor. Jaggery is often considered healthier than sugar due to its mineral content and lower glycemic index, though both are still high in calories and should be consumed in moderation.",
    },
    {
      id: 5,
      header: "What is Organic Honey?",
      text: "Organic honey is honey that is produced following organic beekeeping practices, which ensure that both the honey and the bees are treated with the highest standards of health and sustainability. Here's what distinguishes organic honey",
    },
    {
      id: 6,
      header: "How is organic Honey different from regular honey?",
      text: "Organic honey differs from regular honey primarily in its production methods and sourcing. Organic honey comes from bees that forage on flowers grown without synthetic pesticides, herbicides, or fertilizers, ensuring a more natural and environmentally friendly process. Additionally, the beekeeping practices for organic honey emphasize sustainability, such as using organic-certified hives and avoiding artificial feed or chemicals. As a result, organic honey is often considered purer and is free from contaminants commonly found in conventional honey, making it a preferred choice for health-conscious consumers.",
    },
    {
      id: 7,
      header: "How is raw filtered honey different from processed honey?",
      text: `Raw Filtered Honey:- Raw filtered honey is extracted directly from the hive and only lightly filtered to remove debris like beeswax and dead bees. This process retains most of the natural enzymes, vitamins, and minerals. Because it undergoes minimal processing, raw honey retains more nutrients, including antioxidants, pollen, and propolis, which are beneficial for health. Processed Honey:- Processed honey undergoes heating and fine filtering, which removes impurities as well as beneficial components like pollen. It is often pasteurized to extend shelf life. heating and filtration process can destroy many of the beneficial enzymes, vitamins, and minerals found in raw honey, reducing its nutritional value.`,
    },
    {
      id: 8,
      header: "How are homestyle pickles different from conventional commercial pickles?",
      text: `Homestyle Pickles:Typically use fresh, natural ingredients without preservatives. They often include garden-fresh cucumbers, herbs, spices, garlic, and sometimes vegetables from home gardens. The brine usually consists of vinegar, water, and salt Commercial Pickles: Often include preservatives, artificial flavors, and colorings to enhance shelf life and maintain uniform appearance. The brine might include additives like calcium chloride to keep pickles crisp and high fructose corn syrup for sweetness.`,
    },
    {
      id: 9,
      header: "How is rock salt healthier than conventional iodized salt?",
      text: "Rock salt, also known as Himalayan salt, is often perceived as healthier than conventional iodized salt due to several reasons: Rock salt is mined from natural salt deposits in the earth, whereas conventional table salt is typically heavily processed to remove impurities and often includes additives to prevent clumping. Himalayan rock salt is claimed to contain more minerals than table salt because it is less refined. These minerals include trace elements like potassium, magnesium, and calcium, which are believed to be beneficial for health in small amounts.",
    },
    {
      id: 10,
      header: "What is organic Brown sugar?",
      text: "Organic brown sugar is a type of sugar that is less refined than white sugar, retaining more of the natural molasses present in the sugarcane juice from which it is made. It is produced by crushing sugarcane to extract its juice, which is then evaporated and spun in a centrifuge to separate the molasses from the crystals.",
    },
    {
      id: 11,
      header: "How are processed Organic Foods different from conventional processed foods?",
      text: "Processed organic foods differ from conventional processed foods primarily in their production methods and ingredient standards. Organic processed foods are made from ingredients that are grown without synthetic pesticides, herbicides, and fertilizers, and they are free from genetically modified organisms (GMOs). The processing of these foods also avoids the use of artificial additives, preservatives, and irradiation. In contrast, conventional processed foods often contain synthetic additives, preservatives, and GMOs, and their ingredients may be produced using chemical fertilizers and pesticides. Organic certification ensures adherence to these stricter standards, aiming to provide a product that is considered healthier and more environmentally friendly",
    },
    {
      id: 12,
      header: "Where can I contact to track my order or any quality related services?",
      text: "You can contact our customer service team for assistance with tracking your order or any quality-related services. Please reach out to us through the following channels: Email: info@organicnation.co.in •	Phone: +91-9999532041",
    },
    {
      id: 13,
      header: "How is buyer data protected when they buy from this website?",
      text: "When you buy from our website, we take your data protection seriously. Here's how we safeguard your information: We use industry-standard encryption to ensure that your payment information is protected during transmission. Your personal details are kept confidential and are only used for processing your order and communicating with you about it. We have a clear Privacy Policy that outlines how we collect, use, and protect your information. You can review it to understand your rights and how we handle your data.",
    },
    {
      id: 14,
      header: "What are the quality credentials of this website & company?",
      text: "Certainly! Our website and company uphold stringent quality credentials to ensure trust and reliability for our users and customers. Here are some key aspects of our quality credentials: We bring years of industry expertise and experience to our services, backed by a team of professionals who are leaders in their respective fields. Quality is at the core of everything we do. We adhere to high standards in content creation, product development, and customer service. Our priority is customer satisfaction. We consistently gather feedback and make improvements based on user experiences to ensure we meet and exceed expectations.",
    },
    {
      id: 15,
      header: "Is there any grievance redressal process of this website ?",
      text: "Certainly! We take grievances seriously and have a structured grievance redressal process in place. If you have any concerns or complaints, you can contact our customer support team directly through the designated channels provided on our website. Our team is committed to addressing and resolving issues promptly and fairly to ensure a positive experience for all users. Your feedback is valuable to us in improving our services.",
    },
  ]

  return (
    <section className="relative z-20 overflow-hidden pb-12 pt-20 px-10 lg:pb-[90px]">
      <div>
        <SEO
          title="FAQs About Organic Products - Organic Nation"
          description="Here you will find the answers to the most frequently asked questions about the organic and natural Products range of Organic Nation."
          canonicalUrl="https://organicnation.co.in/frequently-asked-questions"
          ogTitle="FAQs About Organic Products - Organic Nation"
          ogDescription="Here you will find the answers to the most frequently asked questions about the organic and natural Products range of Organic Nation"
          ogUrl="https://organicnation.co.in/frequently-asked-questions"
          ogImage="https://organicnationmages.s3.ap-south-1.amazonaws.com/logo/logo.png"
          ogImageWidth="478"
          ogImageHeight="446"
          twitterTitle="FAQs About Organic Products - Organic Nation"
          twitterDescription="Here you will find the answers to the most frequently asked questions about the organic and natural Products range of Organic Nation"
          twitterImage="https://organicnationmages.s3.ap-south-1.amazonaws.com/logo/logo.png"
          twitterSite="Organic Nation"
          twitterCreator="organicnation_"
        />
      </div>
      <div className="container mx-auto">
        <div className="-mx-4 flex flex-wrap">
          <div className="w-full px-4">
            <div className="mx-auto mb-[60px] max-w-[520px] text-center lg:mb-20">
              <span className="mb-2 block text-4xl font-semibold text-black">
                FAQ's
              </span>
              <h2 className="mb-4 text-3xl font-bold text-[var(--text-color)]  sm:text-[40px]/[48px]">
                Any Questions? Look Here
              </h2>
              <p className="text-base  ">
                There are many variations of passages of Lorem Ipsum available
                but the majority have suffered alteration in some form.
              </p>
            </div>
          </div>
        </div>

        <div className="-mx-4 flex md:flex-row flex-col flex-wrap justify-center items-start gap-5 ">

          {faqs.map((faq) => <AccordionItem key={faq.id} faq={faq} />)}


        </div>
      </div>

      {/* background effect  */}
      <div className="absolute bottom-0 right-0 z-[-1]">
        <svg
          width="1440"
          height="886"
          viewBox="0 0 1440 886"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            opacity="0.5"
            d="M193.307 -273.321L1480.87 1014.24L1121.85 1373.26C1121.85 1373.26 731.745 983.231 478.513 729.927C225.976 477.317 -165.714 85.6993 -165.714 85.6993L193.307 -273.321Z"
            fill="url(#paint0_linear)"
          />
          <defs>
            <linearGradient
              id="paint0_linear"
              x1="1308.65"
              y1="1142.58"
              x2="602.827"
              y2="-418.681"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#3056D3" stopOpacity="0.36" />
              <stop offset="1" stopColor="#F5F2FD" stopOpacity="0" />
              <stop offset="1" stopColor="#F5F2FD" stopOpacity="0.096144" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </section>
  );
};

export default Faq;
