import React from 'react'
import { FaMinus, FaPlus } from 'react-icons/fa6';
import { ImSpinner9 } from 'react-icons/im';
import { useSelector } from 'react-redux';



const ProductQty = ({ qty, increaseQty, decreaseQty }) => {

    const { loading } = useSelector(state => state.cart);


    return (
        <div className="  max-w-max">
            <div className="amount-toggle flex justify-start items-center gap-5">
                <button
                    className='outline-none p-1 cursor-pointer bg-gray-500 hover:bg-gray-600 text-white rounded-sm'
                    onClick={() => {
                        decreaseQty();
                    }}>
                    <FaMinus />
                </button>
                <p className="text-xl">{loading ? (<ImSpinner9 className='animate-spin text-xs' />) : qty}</p>
                {/* <input
                    type="text"
                    value={qty}
                    className='w-max'
                    onChange={(e) => handleChange(e)}
                /> */}
                <button
                    className='outline-none p-1 cursor-pointer bg-green-700 hover:bg-green-900 text-white rounded-sm'
                    onClick={() => {

                        increaseQty();
                    }}>
                    <FaPlus />
                </button>
            </div>
        </div>
    )
}

export default ProductQty;
