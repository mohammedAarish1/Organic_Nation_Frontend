import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../button/Button';
import Title from '../title/Title';
import Product from '../product/Product';
import { getSpotlightProducts } from '../../features/spotlightProducts/spotlightProducts';

const ProductSkeleton = () => (
    <div className="animate-pulse">
        <div className="bg-gray-200 h-64 w-64 rounded-lg"></div>
        <div className="mt-4 bg-gray-200 h-4 w-48 rounded"></div>
        <div className="mt-2 bg-gray-200 h-4 w-24 rounded"></div>
    </div>
);

const SpotlightSection = () => {
    const [isLoading, setIsLoading] = useState(true);
    const dispatch = useDispatch();
    const  products  = useSelector((state) => state.filterData.products);
    const { spotlightProducts, productsType } = useSelector((state) => state.spotlight);
    useEffect(() => {
        const loadProducts = () => {
            setIsLoading(true);
            dispatch(getSpotlightProducts({ type: "new_arrivals", products }));
            setIsLoading(false);
        };

        if (products) {
            loadProducts();
        }
    }, [products, dispatch]);

    const buttonTypes = [
        { title: "New Arrival", basis: "new_arrivals" },
        { title: "Deal of the Day", basis: "deal_of_the_day" },
        { title: "Best Seller", basis: "best_seller" },
        { title: "Seasons Special", basis: "season_special" }
    ];

    return (
        <div className=""> {/* Reserve minimum height */}
            <div className="sm:pb-10  sm:pt-10 mt-5 sm:mt-0">
                {/* <div className="flex justify-center xs:gap-4 gap-1 items-center"> */}
                    {/* <div className="h-1 md:w-[30%] xs:w-[20%] w-[20%] bg-gradient-to-r from-[#712522] to-[#bb7d7b]"></div> */}
                    <Title heading="In the Spotlight" />
                    {/* <div className="h-1 md:w-[30%] xs:w-[20%] w-[20%] bg-gradient-to-r from-[#bb7d7b] to-[#712522]"></div> */}
                {/* </div> */}
            </div>

            <div className="flex justify-center lg:gap-16 flex-wrap">
                {buttonTypes.map((btn) => (
                    <Button
                        key={btn.basis}
                        title={btn.title}
                        basis={btn.basis}
                        className="mb-4"
                    />
                ))}
            </div>

            <div className="flex justify-center flex-wrap sm:gap-14 xs:gap-7 gap-x-2 gap-y-8 py-4 sm:py-16  min-h-[300px]">
                {isLoading ? (
                    // Show skeleton grid with same dimensions as actual products
                    Array(8).fill(0).map((_, index) => (
                        <div key={index} className="w-64">
                            <ProductSkeleton />
                        </div>
                    ))
                ) : (
                    spotlightProducts?.map((product) => (
                        <div key={product._id} className="">
                            <Product product={product} gridView={true} />
                        </div>
                    ))
                )}
            </div>

            <div className="flex justify-center items-center h-16"> {/* Fixed height for dots */}
                <div className="flex gap-2 justify-center items-center">
                    {buttonTypes.map((type) => (
                        <button
                            key={type.basis}
                            className={`transition-all duration-300 rounded-full cursor-auto ${productsType === type.basis
                                    ? 'bg-[var(--bgColorPrimary)] w-5 h-5'
                                    : 'bg-[var(--themeColor)] w-3 h-3'
                                }`}
                            aria-label={`${type.title} indicator`}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SpotlightSection;
