import { lazy, Suspense } from "react";
import CartDetails from "../../components/cart-details/CartDetails";
import ClearanceSaleText from "../../components/ClearanceSaleText";
// import CheckoutForm from "../../components/checkoutForm/CheckoutForm";

const CheckoutForm = lazy(() => import('../../components/checkoutForm/CheckoutForm'))

const Checkout = () => {


    return (
        <div className='xs:px-10 px-3 py-5'>
            <ClearanceSaleText/>
            <div className="font-[sans-serif]">
                <div className="grid lg:grid-cols-2 xl:grid-cols-3 h-full">


                    {/* right side  */}
                    <Suspense fallback={<div className="h-48 animate-pulse bg-gray-100" />}>
                        <CheckoutForm />
                    </Suspense>
                    {/* left side  */}
                    <CartDetails />

                </div>
            </div>


        </div>
    )
}

export default Checkout;


