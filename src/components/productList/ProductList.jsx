import React from 'react';
import Product from '../../components/product/Product'


const ProductList = ({gridView}) => {
  return (
    <div className=''>
      <div className={`${!gridView && "flex-row gap-16"} flex justify-center flex-wrap gap-16 py-8`}>
                <Product gridView={gridView} />
                <Product gridView={gridView} />
                <Product gridView={gridView} />
                <Product gridView={gridView} />
                <Product gridView={gridView} />
                <Product gridView={gridView} />
                <Product gridView={gridView} />
                <Product gridView={gridView} />
                <Product gridView={gridView} />
            </div>
    </div>
  )
}

export default ProductList
