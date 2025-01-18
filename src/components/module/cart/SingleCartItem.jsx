import React, { memo, useCallback } from 'react'
import Image from '../../image/Image';
import { Link } from 'react-router-dom';
import ProductQty from '../../productQty/ProductQty';
import { MdDelete } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import { getAllCartItems, removeFromCart, updateQty } from '../../../features/cart/cart';

const SingleCartItem =  memo(({ curItem, index }) => {
    const dispatch=useDispatch();

    const handleIncreaseQty = useCallback( () => {
      if (curItem.quantity === curItem.availability) {
        toast.error('No Quantity left in stock.');
        return;
      }
       dispatch(updateQty({
        productName: curItem['name-url'],
        type: 'increase'
      })).then(()=>dispatch(getAllCartItems()))
    }, [curItem.quantity, curItem.availability, curItem['name-url'], dispatch]);
  
    const handleDecreaseQty = useCallback( () => {
       dispatch(updateQty({
        productName: curItem['name-url'],
        type: 'decrease'
      })).then(()=>dispatch(getAllCartItems()));
    }, [curItem['name-url'], dispatch]);

  return (
    <tbody className=" divide-y divide-gray-200">
    <tr>
      <td className=" text-center whitespace-nowrap">
      {index + 1}.
        {/* <div className=" text-gray-900 px-6 py-4 "></div> */}
      </td>
      <td className=" text-center whitespace-nowrap lg:table-cell hidden">
        <Link to={`/shop/${curItem['category-url'].toLowerCase()}/${curItem['name-url']}`}>

          <span className="font-semibold text-gray-900 px-6 py-4">
            <Image
              src={{
                // sm: leftImage.sm,
                sm: Array.isArray(curItem.img) ? curItem.img.filter((path) => path.sm.includes("front"))[0].sm : null,
                md: Array.isArray(curItem.img) ? curItem.img.filter((path) => path.md.includes("front"))[0].md : null,
                lg: Array.isArray(curItem.img) ? curItem.img.filter((path) => path.lg.includes("front"))[0].lg : null,
                // md: leftImage.md,
                // lg: leftImage.lg
              }}
              // blurSrc={leftImage.blur}
              alt={curItem.name}
              className="w-20 max-h-24 object-contain"
            />
          </span>
        </Link>
      </td>
      <td className=" text-center whitespace-nowrap">
        <Link to={`/shop/${curItem['category-url'].toLowerCase()}/${curItem['name-url']}`}>
          <span className="font-semibold text-gray-900 px-6 py-4 ">
            {curItem.name}
          </span>
        </Link>
      </td>
      <td className="text-center whitespace-nowrap lg:table-cell hidden">
        {/* <div className=" text-gray-900 px-6 py-4"> */}
          ₹{" "}
          {Math.round(
            curItem.price - (curItem.price * curItem.discount) / 100
          )}
        {/* </div> */}
      </td>
      <td className=" text-center whitespace-nowrap px-6 py-4">
        {/* <div className=" text-gray-900 flex justify-center items-center "><ProductQty qty={curItem.qty} increaseQty={() => dispatch(increaseProductQty(curItem.id))} decreaseQty={() => dispatch(decreaseProductQty(curItem.id))} /></div> */}
          {/* <ProductQty
            qty={curItem.quantity}
            increaseQty={() => {
              if (curItem.quantity === curItem.availability) {
                toast.error(`No Quanity left in stock.`);
                return;
              }
              dispatch(
                updateQty({
                  productName: curItem['name-url'],
                  type: "increase",
                })
              ).then(() => {
                dispatch(getAllCartItems());
              });
            }}
            decreaseQty={() =>
              dispatch(
                updateQty({
                  productName: curItem['name-url'],
                  type: "decrease",
                })
              ).then(() => {
                dispatch(getAllCartItems());
              })
            }
          /> */}
           <ProductQty
            qty={curItem.quantity}
            increaseQty={handleIncreaseQty}
            decreaseQty={handleDecreaseQty}
          />
      </td>
      <td className=" text-center whitespace-nowrap ">
        <span className=" text-gray-900 px-6 py-4">
          ₹{" "}
          {Math.round(
            (curItem.price -
              (curItem.price * curItem.discount) / 100) *
            curItem.quantity
          )}
        </span>
      </td>
      <td className=" text-center whitespace-nowrap">
        <button
          onClick={() => {
            dispatch(removeFromCart(curItem['name-url'])).then(() =>
              dispatch(getAllCartItems())
            );
          }}
          className="text-red-500 hover:text-red-700 px-6 py-4 "
        >
          <MdDelete className="text-xl" />
        </button>
      </td>
    </tr>
  </tbody>
  )
});

SingleCartItem.displayName = 'SingleCartItem';

export default SingleCartItem;
