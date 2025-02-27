import React, { useState } from 'react';

const ProductAdditionalInfo = ({data}) => {
  const [activeTab, setActiveTab] = useState(0);
  
  // const data = {
  //   "name-url": "Organic-Light-Flora-Honey",
  //   "productInfo": [
  //     {
  //       "title": "Product Description",
  //       "content": "Organic Nation's Light Flora Honey is a pure, unprocessed honey sourced from the pristine Himalayan region. It is harvested from bees that collect nectar from a variety of wild, organic flora, offering a unique and natural flavor profile. This honey is certified organic and tested for purity, ensuring a high-quality product."
  //     },
  //     {
  //       "title": "Benefits",
  //       "content": [
  //         "A healthier alternative to refined sugar, honey provides sweetness without the artificial additives.",
  //         "A healthier alternative to refined sugar, honey provides sweetness without the artificial additives.",
  //         "A healthier alternative to refined sugar, honey provides sweetness without the artificial additives.",
  //         "A healthier alternative to refined sugar, honey provides sweetness without the artificial additives.",
  //       ]
  //     },
  //     {
  //       "title": "Usage",
  //       "content": [
  //         "Add to tea, coffee, yogurt, or oatmeal.",
  //         "Add to tea, coffee, yogurt, or oatmeal.",
  //         "Add to tea, coffee, yogurt, or oatmeal.",
  //         "Add to tea, coffee, yogurt, or oatmeal.",
  //         "Add to tea, coffee, yogurt, or oatmeal.",
  //         "Add to tea, coffee, yogurt, or oatmeal.",
  //       ]
  //     }
  //   ]
  // };

  return (
    <div className="xs:w-[80%] w-[90%] mx-auto bg-gradient-to-br from-white to-gray-50 rounded-xl overflow-hidden border-gray-100">
      {/* Product Title */}
      {/* <div className="bg-gradient-to-r from-amber-50 to-amber-100 p-6 border-b border-amber-200"> */}
      {/* <div className="bg-green-900 p-4">
        <h2 className="text-2xl font-semibold text-amber-800 tracking-tight">
          Organic Light Flora Honey
        </h2>
        <p className="text-amber-600 mt-1 text-sm">Pure & Natural Himalayan Honey</p>
      </div> */}

      {/* Tab Headers */}
      <div className="flex border-b bg-white">
        {data.productInfo.map((tab, index) => (
          <button
            key={tab.title}
            onClick={() => setActiveTab(index)}
            className={`flex-1 px-6 py-4 text-sm font-medium transition-all duration-300 relative
              ${activeTab === index 
                ? 'text-black '
                : 'text-gray-600 hover:text-amber-600 hover:bg-amber-50'
              }`}
          >
            {tab.title}
            {activeTab === index && (
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[var(--themeColor)]" />
            )}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="p-8 bg-white ">
        {data.productInfo.map((tab, index) => (
          <div
            key={tab.title}
            className={`transition-all duration-300 transform
              ${activeTab === index 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-4 hidden'
              }`}
          >
            {typeof tab.content === "string" ? (
              <div className="prose max-w-none">
                <p className="text-gray-700 leading-relaxed">{tab.content}</p>
              </div>
            ) : (
              <ul className="space-y-4">
                {tab.content.map((item, i) => (
                  <li key={i} className="flex items-start group">
                    <span className="flex-shrink-0 w-2 h-2 mt-2.5 rounded-full bg-[var(--themeColor)] mr-4 
                      group-hover:bg-amber-500 transition-colors duration-200" />
                    <span className="text-gray-700 group-hover:text-gray-900 transition-colors duration-200">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>

      {/* Footer Accent */}
      {/* <div className="h-1 bg-[var(--themeColor)]" /> */}
    </div>
  );
};


export default ProductAdditionalInfo
