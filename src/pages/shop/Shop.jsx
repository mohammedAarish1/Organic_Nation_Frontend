import  { useEffect, useState } from 'react'
// import FilterSection from '../../components/filterSection/FilterSection';
import ProductList from '../../components/productList/ProductList';
import SortSection from '../../components/sort/SortSection';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchCategoryWiseData, setCategoryBtnValue } from '../../features/filter/filterSlice';
import { setCurrentPage } from '../../features/pagination/pagination';
import { productCategoriesData } from '../../helper/SEO/SEOdata';
import SEO from '../../helper/SEO/SEO';
import FilterSidebar from '../../components/module/shop/FilterSidebar';
import CategoryCarousel from '../../components/productCategories/CategoryCarousel';
// import OfferBanner from '../../components/offerBanner/OfferBanner';



const Shop = () => {
  const dispatch = useDispatch();
  const { category } = useParams();
  const [gridView, setGridView] = useState(true);
  const { filteredProducts,searchInputValue ,loading,categoryBtnValue} = useSelector(state => state.filterData);

  const [curCategorySeoData, setCategorySeoData] = useState(productCategoriesData.all);





  useEffect(() => {
    if (category) {
      dispatch(fetchCategoryWiseData(category));
      dispatch(setCategoryBtnValue(category));
      dispatch(setCurrentPage(1))
    }
  }, [category])


  useEffect(() => {
    setCategorySeoData(productCategoriesData[categoryBtnValue] || productCategoriesData.all);
  }, [categoryBtnValue])


  if (loading) return (
    <div className='py-52 flex justify-center items-center'>
      <div className="loader"></div>
    </div>
  )

  return (
    <div className=" min-h-screen py-2" >
      <SEO
        title={curCategorySeoData.title}
        description={curCategorySeoData.description}
        keywords={curCategorySeoData.keywords}
        canonicalUrl={curCategorySeoData.canonicalUrl}
        ogTitle={curCategorySeoData.title}
        ogDescription={curCategorySeoData.description}
        ogUrl={curCategorySeoData.canonicalUrl}
        ogImage="https://organicnationmages.s3.ap-south-1.amazonaws.com/logo/logo.png"
        ogImageWidth="478"
        ogImageHeight="446"
        twitterTitle={curCategorySeoData.title}
        twitterDescription={curCategorySeoData.description}
        twitterImage="https://organicnationmages.s3.ap-south-1.amazonaws.com/logo/logo.png"
        twitterSite="Organic Nation"
        twitterCreator="organicnation_"
      />
      <div>
        <img src="https://organicnationmages.s3.ap-south-1.amazonaws.com/shoppage_banner.webp" alt="banner_image" className=' object-fill'/>
      </div>
<div>
            <CategoryCarousel />
  
</div>

        {/* Filter Sidebar */}
      <FilterSidebar />
      {/* <div className='pb-8'>
        <OfferBanner />
      </div> */}
      {/* number of products available  */}
      {/* {categoryBtnValue !== 'all' && (
        <div>
          {searchInputValue && searchInputValue.length > 1 ? (
            <div className='text-center text-xl'>
              <p>
                Search result for <span className='font-bold text'> "{searchInputValue}" </span>
              </p>
            </div>
          ) : (
            <div className='text-center md:pb-10 md:mt-0 mt-5 font-thin px-2 font-sans '>
              
             
               <p className="text-[var(--text-color)] font-medium">
                Showing {filteredProducts?.length} product(s)
              </p>
            </div>
            
          )}
        </div>
      )} */}


      {/* number of products available end */}

      <div className={`xs:max-w-[90%] max-w-[95%] mx-auto mt-5 flex md:flex-row flex-col `}>
        {/* <div className={` filters-container ${showFilters ? 'active' : ''}`}>
          <FilterSection />
        </div> */}

        <section className=" w-[100%] mx-auto">
          <div className="">
            <SortSection gridView={gridView} setGridView={setGridView} />

          </div>
          <div className="">
            <ProductList gridView={gridView} />
          </div>
        </section>
      </div>
    </div>
  )


};

export default Shop;




