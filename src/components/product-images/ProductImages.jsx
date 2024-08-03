import React, { useEffect, useState } from 'react'
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

const ProductImages = ({ productImgs }) => {


    const [mainImage, setMainImage] = useState(productImgs[0]);



    useEffect(() => {
        setMainImage(productImgs[0])
    }, [productImgs])

    return (

        <div className="md:w-[50%]  flex xs:flex-row flex-col justify-center md:justify-end items-center gap-10 py-6 px-10 ">
            <div className="flex xs:flex-col justify-center items-center gap-4 xs:-order-none max-h-[400px]  order-2  ">
                {productImgs?.map((img, index) => {
                    return (
                        <div key={index}>
                            <img
                                src={img}
                                alt="image"
                                className={`${img === mainImage ? 'border-2 border-[var(--themeColor)] p-2' : ''} w-20 max-h-24 object-contain cursor-pointer hover:scale-90 transition-all duration-400`}
                                key={index}
                                onClick={() => setMainImage(img)}
                            />
                        </div>
                    );
                })}

            </div>
            {/* 2nd column  */}

            <div className=" flex justify-center overflow-hidden  ">
                <Zoom>
                    <img
                        src={mainImage && mainImage}
                        alt={'image-main'}
                        // width={400}
                        // height={400}
                        style={{ display: 'block', maxWidth: '100%' }}
                        className='xs:w-96 w-72 xs:max-h-[600px] max-h-[400px] object-contain'
                    />
                </Zoom>

            </div>
        </div>



    )
}

export default ProductImages;
