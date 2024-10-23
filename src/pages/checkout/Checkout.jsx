import CartDetails from "../../components/cart-details/CartDetails";
import CheckoutForm from "../../components/checkoutForm/CheckoutForm";


const Checkout = () => {


    return (
        <div className='xs:px-10 px-3 py-5'>
            <div className="font-[sans-serif]">
                <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap- h-full">
                    {/* left side  */}
                   <CartDetails/>
                    {/* right side  */}
                    <CheckoutForm />
                </div>
            </div>


        </div>
    )
}

export default Checkout;


