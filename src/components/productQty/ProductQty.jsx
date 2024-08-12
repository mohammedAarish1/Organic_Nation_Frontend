import React from 'react'
import { FaMinus, FaPlus } from 'react-icons/fa6';



const ProductQty = ({ qty, increaseQty, decreaseQty }) => {


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
                <p className="text-xl">{qty}</p>
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
