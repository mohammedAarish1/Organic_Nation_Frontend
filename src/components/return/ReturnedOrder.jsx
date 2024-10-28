import React, { useEffect, useState } from "react";
import {
  getAllOrders,
} from "../../features/manageOrders/manageOrders";
import { useDispatch } from "react-redux";
import Alert from "../alert/Alert";
// react icons
import {  MdOutlineCancel } from "react-icons/md";
import { GoDotFill } from "react-icons/go";

import { toast } from "react-toastify";
import { GrInProgress } from "react-icons/gr";
import { MdOutlineFileDownloadDone } from "react-icons/md";
import axios from "axios";
import ButtonTwo from "../button/ButtonTwo";
import { Link, useNavigate } from "react-router-dom";
import { addToCart, getAllCartItems } from "../../features/cart/cart";
import { cancelReturnRequest, getAllReturnItems } from "../../features/manage-returns/manageReturns";

const apiUrl = import.meta.env.VITE_BACKEND_URL;

const ReturnedOrder = ({ singleReturn }) => {

  const statusIcons = {
    requested: <GoDotFill className="text-xl text-green-500" />,
    rejected: <MdOutlineCancel  className="text-xl text-red-500" />,
    inProgress: <GrInProgress  className="text-sm text-orange-500" />,
    completed: <MdOutlineFileDownloadDone  className="text-xl text-green-500" />, // Cancelled icon
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [itemDetails, setItemDetails] = useState("");

  const [isAlertOpen, setIsAlertOpen] = useState(false);

  const showAlert = () => {
    setIsAlertOpen(true);
  };

  const hideAlert = () => {
    setIsAlertOpen(false);
  };

  const getCurReturnedItem = async () => {
    try {
      const response = await axios.get(
        `${apiUrl}/category/organic-honey/${singleReturn.itemName}`
      );
      if (response.data.product) {
        setItemDetails(response.data.product);
      }
    } catch (error) {
      throw error;
    }
  };

  const handleReturnCancel = () => {
      dispatch(cancelReturnRequest(singleReturn._id))
          .then(res => {
              if (res.meta.requestStatus === 'fulfilled') {
                dispatch(getAllReturnItems())
                  dispatch(getAllOrders())
                  toast.info('Cancelled Successfully')
              }
          })
          setIsAlertOpen(false);
      // navigate('/manage-returns')

  };

  useEffect(() => {
    getCurReturnedItem();

  }, [singleReturn.itemName]);

  return (
    <>
      {/* order 1 start */}
      <div className="shadow-xl font-sans">
        <div>
          {/* order details heading  */}
          <div className="flex sm:justify-between justify-center items-center bg-[var(--bgColorPrimary)] text-white sm:text-[16px] text-[10px] py-3 px-4 uppercase">
            <div className="flex justify-start items-center gap-10 ">
              <div className="">
                <p>Order Number</p>
                <p className="text-gray-300 ">
                  #{singleReturn?.invoiceNumber}
                </p>
              </div>
              <div className="">
                <p>Return Requested</p>
                <p className="text-gray-300 capitalize">
                  {new Date(singleReturn?.createdAt).toDateString()}
                </p>
              </div>
              {/* <div className='lg:block hidden'>
                                <p>Payment Method</p>
                                <p className='text-gray-300 text-sm capitalize'>{order?.paymentMethod}</p>
                            </div> */}
              <div className="">
                <p>Status</p>
                <p className="flex justify-center items-center gap-1 text-gray-300 capitalize">
                  {singleReturn?.returnStatus}{" "}
                  {statusIcons[singleReturn.returnStatus]
                    ? statusIcons[singleReturn.returnStatus]
                    : null}
                </p>
              </div>
            </div>
            <div className="flex gap-3 font-mono">
                {/* order detail button  */}
              {/* <div className="flex gap-3 text-sm xs:text-[16px]">
                <button
                  className=" flex  justify-center items-center gap-2 underline underline-offset-2 bg-green-700 xs:px-5 px-2 py-2 rounded-md text-white hover:bg-green-800 xs:text-[16px] text-sm"
                  onClick={() => setShowOrderDetails(true)}
                >
                  Order Details <FaArrowRight />{" "}
                </button>
              </div> */}

              {/* order details modal  */}
              {/* <div className={`modal-background ${showOrderDetails ? 'active' : ''}`} onClick={() => setShowOrderDetails(false)}>
                                <div className={`text-white modal ${showOrderDetails ? 'active' : ''}`} onClick={(e) => e.stopPropagation()}>

                                    <p className="flex justify-end" ><IoIosCloseCircleOutline className='cursor-pointer text-3xl hover:scale-110' onClick={() => setShowOrderDetails(false)} /></p>
                                    <h2 className='text-xl font-medium'>Order Details</h2>
                                    <div className='mt-4'>
                                        <div className='flex justify-between items-center  border-gray-400 border-b-2 py-2'>
                                            <span>Order Status</span>
                                            <span className=' flex justify-center items-center gap-2 text-gray-400'>{order?.orderStatus} {statusIcons[order.orderStatus] ? statusIcons[order.orderStatus] : null}</span>
                                        </div>
                                        <div className='flex justify-between items-center  border-gray-400 border-b-2 py-2'>
                                            <span>Order Number</span>
                                            <span className='text-gray-400 '>#{order?.orderNo}</span>
                                        </div>
                                        <div className='flex justify-between items-center  border-gray-400 border-b-2 py-2'>
                                            <span>Order Date</span>
                                            <span className='text-gray-400 capitalize'>{new Date(order?.createdAt).toDateString()}</span>
                                        </div>
                                        <div className='flex justify-between items-center  border-gray-400 border-b-2 py-2'>
                                            <span>Email</span>
                                            <span className='text-gray-400 lowercase'>{order?.userEmail}</span>
                                        </div>
                                        <div className='flex justify-between items-center  border-gray-400 border-b-2 py-2'>
                                            <span>Phone</span>
                                            <span className='text-gray-400'>{order.receiverDetails.phoneNumber}</span>
                                        </div>
                                        <div className='flex justify-between items-center  border-gray-400 border-b-2 py-2'>
                                            <span>Payment Method</span>
                                            <span className='text-gray-400'>{order?.paymentMethod}</span>
                                        </div>
                                        <div className='flex justify-between items-center  border-gray-400 border-b-2 py-2'>
                                            <span>Shipping Address</span>
                                            <span className='text-gray-400 sm:w-1/3 text-end'>{order.shippingAddress}</span>
                                        </div>
                                        <div className='flex justify-between items-center  border-gray-400 border-b-2 py-2'>
                                            <span>Total Price <span className='text-sm capitalize'> (including shippingFee)</span></span>
                                            <span className='text-gray-400'>₹{order.subTotal + order.shippingFee}</span>
                                        </div>
                                    </div>
                                </div>
                            </div> */}
            </div>
          </div>
          {/* order details body  */}
          <div className=" p-4  bg-gradient-to-r from-[#6D613B] to-[#D3BB71]">
            {/* product details  */}
<h4 className="text-white text-xl mb-4 italic">Item Description:</h4>
            <div className="flex flex-col gap-4 font-sans">
              <div className="flex xs:flex-row flex-col gap-5 xs:gap-0 justify-between xs:items-center">
                <div className="flex justify-start xs:gap-5 gap-5 items-center">
                  <div>
                    <img
                      src={
                        Array.isArray(itemDetails?.img)
                          ? itemDetails?.img.filter((path) =>
                              path.toLowerCase().includes("front")
                            )[0]
                          : null
                      }
                      className="xs:w-16 w-12 rounded-xl"
                      alt="product-image"
                    />
                  </div>
                  <div className="flex flex-col justify-start xs:gap-3 gap-1 text-sm xs:text-[16px] text-white ">
                    <p>{itemDetails.name}</p>
                    <p>Quantity : {singleReturn.quantity} Pcs.</p>
                    <p>Amount Paid: ₹ {singleReturn.price} </p>
                  </div>
                </div>
                {/* ==================buttons============ */}

                <div className="flex xs:flex-col justify-center items-end xs:gap-2 gap-1">
                  {/* ====== View Product Button ==============  */}

                  <Link to={`/shop/all/${singleReturn.itemName}`}>
                    <ButtonTwo text="View Product" />
                  </Link>

                  {/* ====== Buy again button ==============  */}
                  <div
                    onClick={() => {
                      dispatch(
                        addToCart({
                          productId: itemDetails._id,
                          quantity: 1,
                          productName: itemDetails["name-url"],
                        })
                      ).then(() => {
                        dispatch(getAllCartItems());
                        toast.success("Product added to the Cart");
                      });
                    }}
                  >
                    <ButtonTwo text="Buy again" />
                  </div>
                </div>
              </div>

              {/* horozontal line */}
              {/* <div className='px-10'>
                <div className='w-full h-[1px] bg-gradient-to-r from-[#bdb7a3] to-[#a28223]'></div>
            </div> */}
            </div>
          </div>

          {/* order footer section  */}
          <div className=' bg-[#6D613B] '>

                        {/* <div className='text-white xs:px-5 px-1 py-3 xs:text-[16px] text-[12px]'>
                            <div className='flex justify-between '>
                                <p className='text-end '>Sub Total:</p>
                                <p> ₹ {order?.subTotal}</p>
                            </div>

                            <div className='flex justify-between items-center xs:text-[12px] text-[12px]'>
                                <p className='text-end '>Shipping Fee:</p>
                                <p> ₹ {order?.shippingFee}</p>
                            </div>
                            <div className='flex justify-between items-center xs:text-[20px]  font-semibold'>
                                <p className='text-end '>Total Amount Payable:</p>
                                <p> ₹ {order?.subTotal + order?.shippingFee}</p>
                            </div>
                        </div> */}
                        <div className={`${singleReturn?.returnStatus === 'completed'?'bg-[#D3BB71] opacity-35':'bg-[#D3BB71] hover:bg-[#e0cf9c] '} `}>
                            <button
                                className='flex w-full h-full justify-center  py-3 gap-1 items-center'
                                onClick={showAlert}
                                disabled={singleReturn?.returnStatus === 'completed'}
                            >
                                {/* <span> <BsCartX className={`${singleReturn?.returnStatus !== 'requested' ? 'text-red-400' : 'text-red-500'} text-xl  `} /></span> */}
                                <span className={` `}>Cancel Returning Item</span>
                            </button>
                        </div>
                    </div>
        </div>
        {/* alert for cancelling order  */}
        <Alert
          isOpen={isAlertOpen}
          alertMessage="Do You want cancel 'returning the item' ?"
          actionMessageOne="Yes, Cancel"
          actionMessageTwo=" Go back"
          hideAlert={hideAlert}
          handleAction1={handleReturnCancel}
        />
      </div>
      {/* order 1 end */}
    </>
  );
};

export default ReturnedOrder;