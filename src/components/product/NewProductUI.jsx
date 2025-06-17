// import React from 'react'
// import { motion } from 'framer-motion'
// import { FiHeart, FiShoppingCart } from 'react-icons/fi'

// const NewProductUI = () => {

//  const products = [
//     {
//       id: 1,
//       name: 'Organic Mango Pickle',
//       category: 'Pickles',
//       price: 8.99,
//       image: 'https://organic-nation-product-images.s3.ap-south-1.amazonaws.com/products/Chilly-Flakes/lg/front.webp',
//       badge: 'Bestseller',
//       rating: 4.8,
//       reviews: 124,
//     },
//     {
//       id: 2,
//       name: 'Raw Forest Honey',
//       category: 'Honey',
//       price: 12.99,
//       image: 'https://organic-nation-product-images.s3.ap-south-1.amazonaws.com/products/Garlic-Pickle/lg/front.webp',
//       badge: 'Organic',
//       rating: 4.9,
//       reviews: 89,
//     },
//     {
//       id: 3,
//       name: 'Mint Coriander Chutney',
//       category: 'Dips & Chutney',
//       price: 6.49,
//       image: '/api/placeholder/300/300',
//       rating: 4.7,
//       reviews: 56,
//     },
//     {
//       id: 4,
//       name: 'Himalayan Pink Salt',
//       category: 'Salt',
//       price: 5.99,
//       image: '/api/placeholder/300/300',
//       badge: 'Natural',
//       rating: 4.8,
//       reviews: 112,
//     },
//     {
//       id: 5,
//       name: 'Green Tea with Lemongrass',
//       category: 'Organic Tea',
//       price: 9.99,
//       image: '/api/placeholder/300/300',
//       badge: 'Limited',
//       rating: 4.6,
//       reviews: 78,
//     },
//     {
//       id: 6,
//       name: 'Cold Pressed Olive Oil',
//       category: 'Oils',
//       price: 14.99,
//       image: '/api/placeholder/300/300',
//       badge: 'Premium',
//       rating: 4.9,
//       reviews: 145,
//     },
//     {
//       id: 7,
//       name: 'Mixed Berry Preserve',
//       category: 'Fruit Preserves',
//       price: 7.49,
//       image: '/api/placeholder/300/300',
//       rating: 4.5,
//       reviews: 67,
//     },
//     {
//       id: 8,
//       name: 'Multigrain Oats',
//       category: 'Oats',
//       price: 6.99,
//       image: '/api/placeholder/300/300',
//       badge: 'Vegan',
//       rating: 4.7,
//       reviews: 92,
//     },
//   ];

//   return (
//      <section className="py-12 md:py-16">
//              <div className="container mx-auto px-4">
//                <div className="flex justify-between items-center mb-8">
//                  <h2 className="text-2xl md:text-3xl font-bold text-[#7A2E1D]">Bestselling Products</h2>
//                  <a href="#" className="text-[#9B7A2F] font-medium hover:underline">View All</a>
//                </div>
               
//                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//                  {products.slice(0, 8).map((product, index) => (
//                    <motion.div 
//                      key={product.id}
//                      className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
//                      initial={{ opacity: 0, y: 20 }}
//                      animate={{ opacity: 1, y: 0 }}
//                      transition={{ delay: index * 0.1 }}
//                    >
//                      <div className="relative">
//                        <img 
//                          src={product.image} 
//                          alt={product.name} 
//                          className="w-full h-48 object-cover"
//                        />
//                        {product.badge && (
//                          <div className="absolute top-2 right-2 bg-[#D87C45] text-white text-xs px-2 py-1 rounded-full">
//                            {product.badge}
//                          </div>
//                        )}
//                        <button className="absolute bottom-2 right-2 bg-white rounded-full p-2 shadow-md hover:bg-[#9B7A2F] hover:text-white transition-colors">
//                          <FiHeart size={18} />
//                        </button>
//                      </div>
                     
//                      <div className="p-4">
//                        <div className="text-xs text-[#6B8E23] font-medium mb-1">{product.category}</div>
//                        <h3 className="text-[#3E2C1B] font-medium text-lg mb-1">{product.name}</h3>
//                        <div className="flex items-center mb-2">
//                          <div className="flex text-[#9B7A2F]">
//                            {'★'.repeat(Math.floor(product.rating))}
//                            {'☆'.repeat(5 - Math.floor(product.rating))}
//                          </div>
//                          <span className="text-xs text-[#3E2C1B] ml-1">({product.reviews})</span>
//                        </div>
//                        <div className="flex justify-between items-center">
//                          <div className="text-[#7A2E1D] font-bold">${product.price}</div>
//                          <button className="bg-[#6B8E23] hover:bg-[#7A2E1D] text-white rounded-full p-2 transition-colors">
//                            <FiShoppingCart size={16} />
//                          </button>
//                        </div>
//                      </div>
//                    </motion.div>
//                  ))}
//                </div>
//              </div>
//            </section>
//   )
// }

// export default NewProductUI
