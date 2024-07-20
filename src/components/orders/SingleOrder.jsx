import React, { useEffect, useState } from 'react'
import ButtonTwo from '../button/ButtonTwo';
import ReviewsAndRatings from '../../helper/ReviewsAndRatings';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart, getAllCartItems } from '../../features/cart/cart';
import { toast } from 'react-toastify';
// react icons
import { IoIosCloseCircleOutline } from "react-icons/io";




const SingleOrder = ({ curOrder }) => {

    let nameUrl = curOrder[0];
    const dispatch = useDispatch();
    const [singleOrderItem, setSingleOrderItem] = useState('');
    const [showProductReview, setShowProductReview] = useState(false);


    const getCurOrderItem = async () => {

        try {
            const response = await axios.get(`http://localhost:8000/category/organic-honey/${nameUrl}`);
            console.log('singleitem', response.data.product[0])
            if (response.data.product[0]) {
                setSingleOrderItem(response.data.product[0])
            }
        } catch (error) {
            console.log("error in fetching single product", error)
        }
    }

    useEffect(() => {
        getCurOrderItem()
    }, [nameUrl])




    if (!singleOrderItem) {
        return <div>Loading...</div>;
    };

    return (
        <div className='flex flex-col gap-4'>
            <div className='flex xs:flex-row flex-col gap-5 xs:gap-0 justify-between xs:items-center'>
                <div className='flex justify-start xs:gap-5 gap-5 items-center'>
                    <div>
                        <img src={Array.isArray(singleOrderItem.img) ? singleOrderItem.img.filter(path => path.toLowerCase().includes('front'))[0] : null} className='xs:w-16 w-12 rounded-xl' alt="product-image" />
                    </div>
                    <div className='flex flex-col justify-start xs:gap-3 gap-1 text-sm xs:text-[16px] text-white '>
                        <p>{singleOrderItem.name}</p>
                        <p>Quantity : {curOrder[2]} Pcs.</p>
                        <p>Price: ₹ {singleOrderItem.price}</p>
                    </div>
                </div>
                {/* ==================buttons============ */}

                <div className='flex xs:flex-col justify-center items-end xs:gap-2 gap-1'>

                    {/* ====== View Product Button ==============  */}

                    <Link to={`/shop/${nameUrl}`} >
                        <ButtonTwo text="View Product" />
                    </Link>

                    {/* ====== Buy again button ==============  */}
                    <div onClick={() => {
                        dispatch(addToCart({ productId: singleOrderItem._id, quantity: 1, productName: singleOrderItem['name-url'] }))
                            .then(() => {
                                dispatch(getAllCartItems());
                                toast.success("Product added to the Cart")

                            })
                    }}>
                        <ButtonTwo text="Buy again" />
                    </div>

                    {/* ====== Review Product Button ==============  */}

                    <div
                        onClick={() => {
                            console.log(curOrder[0])
                            setShowProductReview(true)
                        }}>
                        <ButtonTwo text="Review Product" />
                    </div>
                </div>
                {/* =================== review modal ==========  */}
                <div className={`product-review-modal-bg ${showProductReview ? 'active' : ''}`} onClick={() => setShowProductReview(false)}>
                    <div className={`text-white product-review-modal ${showProductReview ? 'active' : ''}`} onClick={(e) => e.stopPropagation()}>
                        <div className="flex justify-end" >
                            <button><IoIosCloseCircleOutline className='cursor-pointer text-3xl hover:scale-110' onClick={() => setShowProductReview(false)} /></button>
                        </div>
                        <h2 className='text-xl font-mono mb-3'>Give your Valuable Feedback</h2>

                        <ReviewsAndRatings productName={nameUrl} />
                    </div>
                </div>
            </div>

            {/* horozontal line */}
            <div className='px-10'>
                <div className='w-full h-[1px] bg-gradient-to-r from-[#bdb7a3] to-[#a28223]'></div>
            </div>
        </div>
    )
}

export default SingleOrder
