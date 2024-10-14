import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { spotlighProducts } from '../../features/spotlightProducts/spotlightProducts';


const Button = ({ title, basis }) => {
  const dispatch = useDispatch();
  const { productData } = useSelector((state) => state.product_data);
  const { productsType } = useSelector((state) => state.spotlight);

  return (

    <button
      className={`${productsType == basis && 'bg-[var(--bgColorPrimary)] text-white'} text-[var(--themeColor)] btn`}
      onClick={() => dispatch(spotlighProducts({ type: basis, productData }))}
      // data-aos="zoom-in"  //for animation
      // data-aos-duration="500"
    >

      {title}
    </button>

  )
}

export default Button;




