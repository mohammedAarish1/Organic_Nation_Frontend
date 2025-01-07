import { lazy, Suspense } from "react";
import CartDetails from "../../components/cart-details/CartDetails";
// import CheckoutForm from "../../components/checkoutForm/CheckoutForm";

const CheckoutForm = lazy(() => import('../../components/checkoutForm/CheckoutForm'))

const Checkout = () => {


    return (
        <div className='xs:px-10 px-3 py-5'>
            <div className="font-[sans-serif]">
                <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap- h-full">
                    {/* left side  */}
                        <CartDetails />
                    {/* <div className="sticky top-[85px] z-10"> 
                    </div> */}
                    {/* right side  */}
                    {/* <CheckoutForm /> */}
                    <Suspense fallback={<div className="h-48 animate-pulse bg-gray-100" />}>
                        <CheckoutForm />
                    </Suspense>
                </div>
            </div>


        </div>
    )
}

export default Checkout;


