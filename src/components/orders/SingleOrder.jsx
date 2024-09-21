import React, { useEffect, useRef, useState } from 'react'
import ButtonTwo from '../button/ButtonTwo';
import ReviewsAndRatings from '../../helper/ReviewsAndRatings';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, getAllCartItems } from '../../features/cart/cart';
import { toast } from 'react-toastify';
// react icons
import { IoIosCloseCircleOutline } from "react-icons/io";
import ReturnItemForm from '../returnItemForm/ReturnItemForm';
const apiUrl = import.meta.env.VITE_BACKEND_URL;





const SingleOrder = ({ curOrder, paymentMethod, orderNo }) => {

    let nameUrl = curOrder["name-url"];
    const dispatch = useDispatch();
    const [singleOrderItem, setSingleOrderItem] = useState('');
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [showProductReview, setShowProductReview] = useState(false);
    // const { isLoading, productData } = useSelector((state) => state.product_data);

    const modalRef = useRef();

    const getCurOrderItem = async () => {

        try {
            const response = await axios.get(`${apiUrl}/category/organic-honey/${nameUrl}`);
            if (response.data.product) {
                setSingleOrderItem(response.data.product)
            }
        } catch (error) {
            throw error
        }
    }


    const handleClickOutside = (event) => {
        if (modalRef.current && !modalRef.current.contains(event.target)) {
            // setSelectedOrder(null);
            setIsFormVisible(false)
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);


        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);


    const handleFormSubmit = () => {
        setIsFormVisible(false);
        // fetchProducts();
    };

    const handleFormCancel = () => {
        setIsFormVisible(false);
    };



    useEffect(() => {
        getCurOrderItem()
    }, [nameUrl])




    if (!singleOrderItem) {
        return <div>Loading...</div>;
    };

    return (
        <div className='flex flex-col gap-4 font-sans'>
            <div className='flex xs:flex-row flex-col gap-5 xs:gap-0 justify-between xs:items-center'>
                <div className='flex justify-start xs:gap-5 gap-5 items-center'>
                    <div>
                        <img src={Array.isArray(singleOrderItem.img) ? singleOrderItem.img.filter(path => path.toLowerCase().includes('front'))[0] : null} className='xs:w-16 w-12 rounded-xl' alt="product-image" />
                    </div>
                    <div className='flex flex-col justify-start xs:gap-3 gap-1 text-sm xs:text-[16px] text-white '>
                        <p>{singleOrderItem.name}</p>
                        <p>Quantity : {curOrder.quantity} Pcs.</p>
                        <p>Rate Per Quantity: ₹ {Math.round(singleOrderItem.price - (singleOrderItem.price * singleOrderItem.discount / 100))} <span className='text-green-300 text-sm'>({singleOrderItem.discount}% off)</span></p>
                    </div>
                </div>
                {/* ==================buttons============ */}

                <div className='flex xs:flex-col justify-center items-end xs:gap-2 gap-1'>

                    {/* ====== View Product Button ==============  */}

                    <Link to={`/shop/all/${nameUrl}`} >
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
                            setShowProductReview(true)
                        }}
                    >
                        <ButtonTwo text="Review Product" />
                    </div>
                    {/* ====== Return items ==============  */}

                    {/* <div
                        onClick={() => {
                            setIsFormVisible(true);
                        }}
                    >
                        <ButtonTwo text="Return Item" />
                    </div> */}
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


            {/* ================ edit product section ===========  */}
            {isFormVisible && (
                <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-40">
                    <div
                        ref={modalRef}
                        className="bg-white p-6 mt-20 rounded-lg max-w-3xl w-full max-h-[70vh] overflow-y-auto"
                    >
                        <h2 className="text-2xl font-bold mb-4">Product Details</h2>

                        <ReturnItemForm
                            product={curOrder}
                            paymentMethod={paymentMethod}
                            amountPaid={Math.round(singleOrderItem.price - (singleOrderItem.price * singleOrderItem.discount / 100))}
                            orderNo={orderNo}
                            onSubmit={handleFormSubmit}
                            onCancel={handleFormCancel}

                        />

                    </div>
                </div>
            )}
        </div>
    )
}

export default SingleOrder;
