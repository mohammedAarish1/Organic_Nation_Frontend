import AddToCartBtn from '../add-to-cart-btn/AddToCartBtn';
import Image from '../image/Image';

// QuickView Modal Component
const QuickViewModal = ({ product, onClose }) => {
  const discountedPrice = Math.round(product.price - (product.price * product.discount / 100));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50" onClick={onClose}>
      <div className="relative w-full max-w-md px-6 pb-6 bg-white rounded-lg shadow-xl" onClick={e => e.stopPropagation()}>
        <div className='text-end pt-4'>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="flex flex-col gap-4">
          <div className="aspect-square w-full relative max-h-[250px]">
            <Image
              src={{
                sm: product.img[0].sm,
                md: product.img[0].md,
                lg: product.img[0].lg
              }}
              blurSrc={product.img[0].blur}
              alt={product.name}
              className="w-full h-full object-contain"
            />
          </div>

          <div className="space-y-2">
            <h3 className="text-xl font-semibold text-gray-900">{product.name}</h3>
            <p className="text-sm text-gray-600">{product.description}</p>

            <div className="flex items-center gap-3">
              <span className="text-2xl font-bold text-gray-900">₹{discountedPrice}</span>
              <span className="text-sm text-gray-500 line-through">₹{product.price}</span>
              <span className="px-2 py-1 text-sm font-semibold text-green-600 bg-green-50 rounded-full">
                {product.discount}% off
              </span>
            </div>
            <div>
              <span className='text-gray-600 text-sm'>(Inclusive of all taxes)</span>
            </div>

            <AddToCartBtn item={product} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickViewModal;