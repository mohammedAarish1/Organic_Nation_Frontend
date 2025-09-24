import { lazy, Suspense, useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import SEO from '../../helper/SEO/SEO';
import Loader from '../../components/common/Loader'
import ProductShare from '../../components/module/product-details/ProductShare';
import ProductDetailsPage from './ProductDetailsPage';

const YouMayAlsoLike = lazy(() => import('../../components/module/product-details/YouMayAlsoLike'));
// const SingleReview = lazy(() => import('../../components/reviews/SingleReview'));
const ReviewsAndRatings = lazy(() => import('../../helper/ReviewsAndRatings'));
const ReviewSection = lazy(() => import('./ReviewSection'));
const ProductAdditionalInfo = lazy(() => import('../../components/module/product-details/ProductAdditionalInfo'));


const apiUrl = import.meta.env.VITE_BACKEND_URL;






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

const pData =
{
  "name-url": "pineapple-conserve",
  "description": "Bright, tropical, and irresistibly delicious — our Pineapple Conserve is packed with the natural goodness of sun-ripened pineapples. Crafted using traditional methods, this preserve captures the tangy-sweet flavour and golden freshness of pineapple in every spoonful. Perfect for those looking for pineapple jam, pineapple fruit spread, or tropical fruit conserve, this jar brings a burst of sunshine to your breakfast and snacks. Smooth yet fruity in texture, it spreads beautifully and pairs effortlessly with both Indian and continental dishes. A delightful blend of taste and tradition, our Pineapple Conserve is your go-to choice for adding a tropical twist to everyday meals.",
  "caution": "",
  "brand": "Organic Nation",
  "manufacturer": "",
  "countryOfOrigin": "India",
  "shelfLife": "12 Months",
  "features": [
    "Smooth and fruity texture for easy spreading.",
    "Authentic recipe crafted with traditional methods.",
    "Versatile conserve — works as spread, topping, or dessert base.",
    "Perfect for breakfast, snacks, and gourmet pairings."
  ],
  "usage": [
    "Spread on toast, croissants, or parathas for a fruity breakfast.",
    "Layer between cakes, pastries, or muffins for a tropical dessert.",
    "Mix into yogurt, smoothies, or shakes for added flavour.",
    "Serve as a topping for pancakes, waffles, or ice cream.",
    "Pair with cheese platters or crackers for a gourmet twist."
  ]
}



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
        keywords={curProductSeoData?.keywords || ''}
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


      {/* <div>
        <OfferBanner />
      </div> */}
      <div style={{ backgroundColor: '#F5EFE6' }}>
        <section className='xs:py-5 py-5 '>
          <ProductDetailsPage product={product} />
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
          <Suspense fallback={<Loader height='300px' />}>
            <section className='pt-20'>
              <ProductAdditionalInfo productInfo={product?.productInfo} />
            </section>
          </Suspense>
        )}
        {/* <ProductAdditionalInfo productInfo={product?.productInfo} /> */}

        {/* =============== you may also like section ========== */}
        <Suspense fallback={<Loader height='300px' />}>
          <YouMayAlsoLike categoryUrl={product.details['category-url'].toLowerCase()} />
        </Suspense>

        {/* =============== product reviews and ratings ========== */}

        <section>
          <Suspense fallback={<Loader height='100px' />} >
            <ReviewSection product={product} />
          </Suspense>

          <div className=' xs:w-[80%] w-[90%] mt-10 mx-auto '>
            {/* ============add reviews =========== */}
            <Suspense fallback={<Loader height='200px' />}>
              <ReviewsAndRatings productName={nameUrl} insideProductDetails={true} />
            </Suspense>
          </div>
        </section>


      </div>
    </div>
  )
}

export default ProductDetails;





