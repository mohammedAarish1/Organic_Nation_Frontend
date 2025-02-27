import React, { lazy, Suspense, useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import ProductImages from '../../components/product-images/ProductImages';
import SingleReview from '../../components/reviews/SingleReview';
// import ReviewsAndRatings from '../../helper/ReviewsAndRatings';
import OfferBanner from '../../components/offerBanner/OfferBanner';
import SEO from '../../helper/SEO/SEO';
// import YouMayAlsoLike from '../../components/module/product-details/YouMayAlsoLike';
import ProductInfo from '../../components/module/product-details/ProductInfo';
import Loader from '../../components/common/Loader'
import ProductAdditionalInfo from '../../components/module/product-details/ProductAdditionalInfo';
import ProductShare from '../../components/module/product-details/ProductShare';
import Title from '../../components/title/Title';

const YouMayAlsoLike = lazy(() => import('../../components/module/product-details/YouMayAlsoLike'));
const ReviewsAndRatings = lazy(() => import('../../helper/ReviewsAndRatings'));
const apiUrl = import.meta.env.VITE_BACKEND_URL;


// const productInfo = [
//   {
//     title: 'Description',
//     content: [
//       {
//         subTitle: '',
//         subContent: "Organic Nation's Light Flora Honey is a pure, unprocessed honey sourced from the pristine Himalayan region. It is harvested from bees that collect nectar from a variety of wild, organic flora, offering a unique and natural flavor profile. This honey is certified organic and tested for purity, ensuring a high-quality product."
//       }
//     ]
//   },
//   {
//     title: 'Benefits',
//     content: [
//       {
//         subTitle: "Natural Sweetener:",
//         subContent: 'A healthier alternative to refined sugar, honey provides sweetness without the artificial additives.'
//       },
//       {
//         subTitle: "Rich in Nutrients:",
//         subContent: "Contains essential vitamins, minerals, and antioxidants that support overall health."
//       },
//       {
//         subTitle: "Antibacterial Properties:",
//         subContent: "Helps fight infections and promote wound healing. Immune System Boost: Can strengthen the immune system and protect against illness."
//       },
//       {
//         subTitle: "Digestive Aid:",
//         subContent: "May improve digestion and alleviate digestive discomfort."
//       },
//     ]
//   },
//   {
//     title: 'Usage',
//     content: [
//       {
//         subTitle: "Sweetener:",
//         subContent: "Add to tea, coffee, yogurt, or oatmeal."
//       },
//       {
//         subTitle: "Baking:",
//         subContent: "Use as a natural sweetener in baked goods like cakes, cookies, and bread. Topical Application: Apply to minor cuts, scrapes, or burns for its antibacterial properties."
//       },
//       {
//         subTitle: "Skincare:",
//         subContent: "Incorporate into homemade face masks or moisturizers for a natural glow. Cough Relief: Mix with warm water and lemon for a soothing cough remedy."
//       },
//     ],
//   }
// ];

// const faq = [
//   {
//     title: 'heading1',
//     content: ['testing testing']
//   },
//   {
//     title: 'heading1',
//     content: ['testing testing']
//   },
//   {
//     title: 'heading1',
//     content: ['testing testing']
//   },
// ]


// const productone = {
//   _id: "672c90fd6582a38d3147800d",
//   product_id: 1,
//   name: "Organic Light Flora Honey",
//   "name-url": "Organic-Light-Flora-Honey",
//   weight: "500 gm",
//   grossWeight: "768 gm",
//   price: 450,
//   discount: 20,
//   tax: 5,
//   "hsn-code": "4090000",
//   category: "Organic Honey",
//   "category-url": "Organic-Honey",
//   description: "Introducing our Light Flora Honey, a premium product sourced from the finest flowers and crafted with utmost care",
//   availability: 75,
//   img: [
//     {
//       blur: "https://organic-nation-product-images.s3.amazonaws.com/products/Organic-Light-Flora-Honey/blur/back.webp",
//       sm: "https://organic-nation-product-images.s3.amazonaws.com/products/Organic-Light-Flora-Honey/sm/back.webp",
//       md: "https://organic-nation-product-images.s3.amazonaws.com/products/Organic-Light-Flora-Honey/md/back.webp",
//       lg: "https://organic-nation-product-images.s3.amazonaws.com/products/Organic-Light-Flora-Honey/lg/back.webp",
//       _id: "676e75b1ac8842f1442f5373"
//     },
//     {
//       blur: "https://organic-nation-product-images.s3.amazonaws.com/products/Organic-Light-Flora-Honey/blur/front.webp",
//       sm: "https://organic-nation-product-images.s3.amazonaws.com/products/Organic-Light-Flora-Honey/sm/front.webp",
//       md: "https://organic-nation-product-images.s3.amazonaws.com/products/Organic-Light-Flora-Honey/md/front.webp",
//       lg: "https://organic-nation-product-images.s3.amazonaws.com/products/Organic-Light-Flora-Honey/lg/front.webp",
//       _id: "676e75b1ac8842f1442f5374"
//     },
//     {
//       blur: "https://organic-nation-product-images.s3.amazonaws.com/products/Organic-Light-Flora-Honey/blur/left.webp",
//       sm: "https://organic-nation-product-images.s3.amazonaws.com/products/Organic-Light-Flora-Honey/sm/left.webp",
//       md: "https://organic-nation-product-images.s3.amazonaws.com/products/Organic-Light-Flora-Honey/md/left.webp",
//       lg: "https://organic-nation-product-images.s3.amazonaws.com/products/Organic-Light-Flora-Honey/lg/left.webp",
//       _id: "676e75b1ac8842f1442f5375"
//     },
//     {
//       blur: "https://organic-nation-product-images.s3.amazonaws.com/products/Organic-Light-Flora-Honey/blur/right.webp",
//       sm: "https://organic-nation-product-images.s3.amazonaws.com/products/Organic-Light-Flora-Honey/sm/right.webp",
//       md: "https://organic-nation-product-images.s3.amazonaws.com/products/Organic-Light-Flora-Honey/md/right.webp",
//       lg: "https://organic-nation-product-images.s3.amazonaws.com/products/Organic-Light-Flora-Honey/lg/right.webp",
//       _id: "676e75b1ac8842f1442f5376"
//     }
//   ],
//   meta: {
//     buy: 2,
//     get: 1,
//     season_special: false,
//     new_arrivals: false,
//     best_seller: false,
//     deal_of_the_day: false
//   },
//   updatedAt: new Date(1735292337798)
// };

const ProductDetails = () => {
  const { nameUrl } = useParams();
  const [product, setProduct] = useState(null);
  const [curProductSeoData, setProductSeoData] = useState({});

  const getProductDetail = async (nameUrl) => {

    try {
      const response = await axios.get(`${apiUrl}/products/product/details/${nameUrl}`);
      if (response.status === 200) {
        setProductSeoData(response.data.seoData)
        setProduct(response.data);
      }
    } catch (error) {
      throw error
    }
  }


  useEffect(() => {
    getProductDetail(nameUrl)

  }, [nameUrl]);


  if (!product) {
    return (
      <div className='min-h-screen flex justify-center items-center'>
        <div className='loader'></div>
      </div>
    )
  }
  return (
    <div>
      <SEO
        title={curProductSeoData?.title || ''}
        description={curProductSeoData?.description || ''}
        canonicalUrl={curProductSeoData?.canonicalUrl || ''}
        ogTitle={curProductSeoData?.title || ''}
        ogDescription={curProductSeoData?.description || ''}
        ogUrl={curProductSeoData?.canonicalUrl || ''}
        ogImage={curProductSeoData?.image || ''}
        ogImageWidth="478"
        ogImageHeight="446"
        twitterTitle={curProductSeoData?.title || ''}
        twitterDescription={curProductSeoData?.description || ''}
        twitterImage={curProductSeoData?.image || ''}
        twitterSite="Organic Nation"
        twitterCreator="organicnation_"
      />
      <div>
        <OfferBanner />
      </div>
      <section className='xs:py-20 py-5  '>
        {/* visible in mobile devices  */}
        <h2 className=' md:hidden block font-semibold xs:text-3xl text-xl xs:px-10 px-4 mb-3' >{product.details.name}</h2>
        {/* visible in mobile devices  */}
        <div className='flex md:flex-row flex-col'>
          {/* left side  */}
          <ProductImages productImgs={product.details?.img?.length >= 1 && product.details?.img} />
          {/* right side  */}
          <ProductInfo product={product} />
        </div>

      </section>

      <section className='xs:w-[80%] w-[100%] mx-auto'>
        <ProductShare
          url={window.location.href}
          title={`Hey I have found this amazing "${product.details?.name}". Check it out!`}
          description={product.details?.description}
        />
      </section>

      {/* ============== product general info=============  */}
      {product?.productInfo && (
        <section className='pt-20'>
          <ProductAdditionalInfo data={product.productInfo} />
        </section>
      )}



      {/* =============== product info =============  */}
      {/* <section className=''>
        <h3 className='text-center text-[var(--themeColor)] text-xl font-semibold pb-10'>FAQ's</h3>
        <div>
          <Accordion data={faq} />
        </div>
      </section> */}
      {/* =============== product reviews and ratings ========== */}

      <section className='xs:py-20 py-10'>
        <div className=' text-center xs:text-2xl tracking-widest  w-[80%]  mx-auto mb-5'>
          <Title text='Reviews and Ratings' />
          {/* <h3 className='text-center text-[var(--themeColor)] text-xl font-semibold xs:pb-10'>Reviews and Ratings</h3> */}
        </div>
        <div className=' xs:w-[80%] w-[95%]   mx-auto flex flex-col gap-16'>
          {/* {loading && (<div>loading.....</div>)} */}
          {product.reviews?.length > 0 && (
            product.reviews.map((reviews) => (

              <SingleReview key={reviews._id} reviews={reviews} />

            ))
          )}

        </div>
        <div className=' xs:w-[80%] w-[90%] mt-10 mx-auto '>
          {/* ============add reviews =========== */}
          <div>
            <h3 className='tracking-widest mb-2'>Add Review:</h3>
          </div>
          <Suspense fallback={<Loader height='200px' />}>
            <ReviewsAndRatings productName={nameUrl} insideProductDetails={true} />
          </Suspense>
        </div>
      </section>


      {/* =============== you may also like section ========== */}
      <Suspense fallback={<Loader height='300px' />}>
        <YouMayAlsoLike categoryUrl={product.details['category-url'].toLowerCase()} />
      </Suspense>

    </div>
  )
}

export default ProductDetails;





