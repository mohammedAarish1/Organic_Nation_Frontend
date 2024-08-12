import React, { useEffect } from 'react'
import ProductQty from '../../components/productQty/ProductQty';
import { useDispatch, useSelector } from 'react-redux';
// react icons 
import { IoIosArrowRoundForward } from "react-icons/io";
import { BsEmojiAstonished } from "react-icons/bs";
import { MdDelete } from "react-icons/md";
import { FaArrowLeftLong } from "react-icons/fa6";
import { ImSpinner9 } from "react-icons/im";
// product image tempoeary 
import { Link } from 'react-router-dom';
import { getAllCartItems, clearCart, removeFromCart, updateQty } from '../../features/cart/cart';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { calculateShippingFee, checkDeliveryAvailability, setIsAvailable } from '../../features/check-delivery/checkDelivery';
import { resetCheckoutStatus } from '../../features/manageOrders/manageOrders';
import { toast } from 'react-toastify';




const Cart = () => {


  const { user } = useSelector(state => state.user);
  const { cartItemsList, loading, totalCartAmount, totalWeight } = useSelector((state) => state.cart);
  const { isAvailable, message, checking } = useSelector(state => state.delivery);
  const dispatch = useDispatch()



  const pincodeRegExp = /^(\+\d{1,3}[- ]?)?\d{6}$/;

  const validationSchema = Yup.object({
    pincode: Yup.string().required('Please enter your pin code').matches(pincodeRegExp, 'Pin Code is not valid'),
  })

  const handleSubmit = (values, errros) => {
    if (values) {
      if (localStorage.getItem('deliveryChargeToken')) {
        localStorage.removeItem('deliveryChargeToken')
      }
      dispatch(checkDeliveryAvailability(values.pincode))
        .then((res) => {

          if (res.payload.available) {
            dispatch(calculateShippingFee({ pinCode: res.meta.arg, weight: totalWeight }))
              .then((res) => {
                if (res.meta.requestStatus === 'fulfilled') {

                  localStorage.setItem('deliveryChargeToken', res?.payload?.token);
                }
              })

          }
        })
    }
  }


  useEffect(() => {
    dispatch(setIsAvailable())

  }, [setIsAvailable])


  return (
    <div className=' py-10'>
      {/* shopping btn and clear cart  */}
      <div className='flex justify-between items-center mb-3 lg:w-[80%] w-[90%] mx-auto '>
        <div>
          <Link to="/shop/all" className=" flex underline-hover text-[var(--bgColorPrimary)] hover:text-orange-500 justify-center items-center gap-2 py-1   font-semibold rounded-lg  uppercase "> <FaArrowLeftLong /><span className='text-sm sm:text-[16px]'>Continue Shopping</span></Link>
        </div>
        {cartItemsList?.length !== 0 && (
          <div>
            <button className='bg-red-500 text-sm px-4 py-2 text-white hover:bg-red-600' onClick={() => {
              dispatch(clearCart()).then(() => dispatch(getAllCartItems()))
              // dispatch(getAllCartItems())
            }}>CLEAR CART</button>
          </div>
        )}

      </div>
      {/* shopping btn and clear cart end */}
      <div className="overflow-x-auto lg:w-[80%] w-[90%] mx-auto">

        <table className="table-auto min-w-full divide-y divide-gray-200">
          {/*============= heading start ===================== */}
          <thead className="bg-[var(--bgColorPrimary)] text-white">
            <tr>
              <th className="px-6 py-3 text-center text-xs font-medium  uppercase tracking-wider ">
                S No.
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium  uppercase tracking-wider lg:table-cell hidden">
                Image
              </th>
              <th className="px-6  py-3 text-center text-xs font-medium  uppercase tracking-wider">
                Products
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium  uppercase tracking-wider lg:table-cell hidden">
                Price
              </th>
              <th className="px-6 py-3   text-xs font-medium  uppercase tracking-wider">
                Quantity
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium  uppercase tracking-wider ">
                Subtotal
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider">
                Remove
              </th>
            </tr>
          </thead>
          {/*========================== heading start end ========================*/}

          {/* cart items start */}
          {/* {cartItems?.map((curItem, index) => (<SingleCartItem key={curItem.productId} curItem={curItem} index={index} />))} */}
          {cartItemsList?.map((curItem, index) => (
            <tbody key={curItem._id} className=" divide-y divide-gray-200">

              <tr>
                <td className="px-6 py-4 text-center whitespace-nowrap ">
                  <div className=" text-gray-900 ">{index + 1}.</div>
                </td>
                <td className="px-6 py-4 text-center whitespace-nowrap lg:table-cell hidden">
                  <div className="font-semibold text-gray-900">
                    <img
                      src={Array.isArray(curItem.img) ? curItem.img.filter(path => path.includes('front'))[0] : null}
                      className='w-20 max-h-24 object-contain'
                      alt={curItem.name}
                    />
                  </div>
                </td>
                <td className="px-6 py-4 text-center whitespace-nowrap ">
                  <div className="font-semibold text-gray-900 ">{curItem.name}</div>
                </td>
                <td className="px-6 py-4 text-center whitespace-nowrap lg:table-cell hidden">
                  <div className=" text-gray-900">₹ {Math.round(curItem.price - (curItem.price * curItem.discount / 100))}</div>
                </td>
                <td className="px-6 py-4 text-center   whitespace-nowrap">
                  {/* <div className=" text-gray-900 flex justify-center items-center "><ProductQty qty={curItem.qty} increaseQty={() => dispatch(increaseProductQty(curItem.id))} decreaseQty={() => dispatch(decreaseProductQty(curItem.id))} /></div> */}
                  <div className=" text-gray-900 flex justify-center items-center ">
                    <ProductQty
                      qty={curItem.quantity}
                      increaseQty={() => {
                        if (curItem.quantity === curItem.availability) {
                          toast.error(`No Quanity left in stock.`);
                          return;

                        }
                        dispatch(updateQty({ productId: curItem._id, type: 'increase' }))
                          .then(() => {
                            dispatch(getAllCartItems());
                          })
                      }
                      }
                      decreaseQty={() =>
                        dispatch(updateQty({ productId: curItem._id, type: 'decrease' }))
                          .then(() => {
                            dispatch(getAllCartItems());
                          })
                      }
                    />

                  </div>
                </td>
                <td className="px-6 py-4 text-center whitespace-nowrap ">
                  <div className=" text-gray-900">
                    ₹ {Math.round((curItem.price - (curItem.price * curItem.discount / 100)) * curItem.quantity)}
                  </div>
                </td>
                <td className="px-6 py-4  text-center whitespace-nowrap">
                  <button
                    onClick={() => {
                      dispatch(removeFromCart(curItem._id)).then(() => dispatch(getAllCartItems()));

                    }}
                    className="text-red-500 hover:text-red-700"
                  >
                    <MdDelete className='text-xl' />
                  </button>
                </td>
              </tr>

            </tbody>
          ))}


          {/* cart items end */}

        </table>

        {loading && cartItemsList?.length === 0 && (
          <div className='flex items-center justify-center sm:text-4xl text-xl mt-5 py-5  w-full'>
            <div className='flex justify-center items-center gap-5'>
              <p>Loading..</p>
            </div>
          </div>
        )}


        {/* cart empty message section start */}
        {cartItemsList?.length === 0 && !loading && (
          <div className='flex items-center justify-center sm:text-4xl text-xl mt-5 py-5  w-full'>
            <div className='flex justify-center items-center gap-5'>
              <p>Your Cart is Empty</p>
              <span> <BsEmojiAstonished /></span>
            </div>
          </div>
        )}
        {/* cart empty message section end */}

        <div className='w-full h-[1px] bg-[var(--bgColorPrimary)] mt-8'></div>

      </div>

      {/*================================ total price section starts =====================*/}
      <div className='flex  lg:w-[80%] w-[90%] mx-auto mt-10 sm:justify-end justify-center font-sans uppercase text-sm tracking-widest'>
        <div className='bg-[var(--hoverEffect)] flex flex-col  gap-4 p-5 md:w-[35%] '>
          <div className='flex justify-between items-center gap-10'>
            <span>Subtotal:</span>
            <span>₹ {Math.round(totalCartAmount || 0)}</span>
          </div>
          {/* tax  */}
          {/* <div className='flex justify-between items-center gap-10'>
            <span>Total tax: (+)</span>
            <span>₹ {cartItemsList?.length > 0 ? totalTax : 0}</span>
          </div> */}
          {/* coupon  */}
          {/* <div className="flex  items-center">
            <input type="text" placeholder="Enter coupon code" className="border border-gray-300 p-1 rounded-l-md focus:outline-none   focus:border-transparent w-full" />
            <button className="bg-green-500 text-white px-4 py-1 rounded-r-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50">Apply</button>
          </div> */}
          {/* coupon  */}
          <hr />
          <div className='flex justify-between items-center gap-10'>
            <span>Order Total:</span>
            <span className='font-semibold'>₹ {totalCartAmount || 0}</span>
          </div>
          {/* pin code availability check  */}
          <div className='flex flex-col gap-2'>
            <h3>Check Delivery Availability:</h3>
            <div>
              <Formik
                initialValues={{ pincode: "" }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                {({ values, errors, handleChange, touched }) => (
                  <Form>
                    <div className='flex items-center '>
                      <Field
                        type="text"
                        name="pincode"
                        placeholder="Enter pin code"
                        className="border border-gray-300 rounded-tl-md rounded-bl-md px-2 py-1 outline-none tracking-wide w-full "
                      />
                      <button
                        type='submit'
                        className='px-4 py-1 rounded-tr-md rounded-br-md bg-orange-400 hover:bg-orange-500'
                      >
                        {checking ? (<ImSpinner9 className='animate-spin' />) : "Check"}

                      </button>
                    </div>
                    <ErrorMessage name="pincode" component="div" className='text-red-600 text-[14px]' />
                    <div className='max-w-1/3'>
                      {isAvailable ? (
                        <p className='text-center text-green-700 text-[13px] py-1 break-all'>{message}</p>
                      ) : (
                        <p className='text-center text-red-500 text-[13px] py-1 break-all'>{isAvailable === false && message}</p>
                      )}
                    </div>
                  </Form>
                )}
              </Formik>
            </div>


          </div>
          {/* chec button  */}
          <Link
            to={user ? '/cart/checkout' : '/register'}
            onClick={() => dispatch(resetCheckoutStatus(true))}
          >
            <div className={`${cartItemsList?.length === 0 || !isAvailable ? 'bg-green-400' : 'hover:scale-90 bg-green-500 hover:bg-green-700'} flex justify-center items-center gap-2    transition-all duration-700 text-white rounded-md`}>
              <button
                type='button'
                className='py-3'
                disabled={cartItemsList?.length === 0 || !isAvailable}
              >
                Proceed to Checkout
              </button>
              <IoIosArrowRoundForward className='text-3xl' />
            </div>
          </Link>
        </div>
      </div>
      {/* total price section end */}

    </div >
  )
}

export default Cart;

