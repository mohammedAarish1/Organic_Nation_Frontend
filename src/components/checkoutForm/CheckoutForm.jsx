import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { checkoutSchema } from "../../form-validation/checkoutSchema";
import { clearCart } from "../../features/cart/cart";
import { addOrders } from "../../features/manageOrders/manageOrders";

// state list
import { states } from "../../helper/stateList";
// react icons
import { MdEmail, MdOutlinePhoneAndroid, MdLocationCity } from "react-icons/md";
import { FaUserEdit } from "react-icons/fa";
import { PiFileZipFill } from "react-icons/pi";
import { BsArrowRight } from "react-icons/bs";
import {
  generateTransactionID,
  address,
  calculateDiscountAndTaxIncluded,
  checkDeliveryAndCalculateShippingFee,
} from "../../helper/helperFunctions";

// formik
import { Formik, Form, Field } from "formik";
import { initiatePayment } from "../../features/orderPayment/payment";
import { ImSpinner9 } from "react-icons/im";
import { handleSavingLocalAdd } from "../../features/check-delivery/checkDelivery";

const InputField = ({ name, label, icon, errors, touched }) => {
  return (
    <div className="relative z-0">
      <Field
        type="text"
        id={name}
        name={name}
        className="block py-2.5 tracking-widest  w-full text-sm bg-transparent border-0 border-b-2  appearance-none  dark:border-gray-600 dark:focus:border-green-700 focus:outline-none focus:ring-0  peer"
        placeholder=" "
        autoComplete="off"
      />

      <label
        htmlFor={name}
        className="absolute tracking-widest text-sm text-gray-400  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0]  peer-focus:dark:text-green-700 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4"
      >
        {label}
      </label>
      {icon}
      {errors?.name && touched?.name ? (
        <p className="text-red-600">*{errors?.name}</p>
      ) : null}
    </div>
  );
};

const CheckoutForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);
  const {
    cartItemsList,
    totalCartAmount,
    totalTax,
    totalWeight,
  } = useSelector((state) => state.cart);
  const { addingNewOrder } = useSelector((state) => state.orders);
  const {
    shippingFee,
    userCity,
    userPincode,
    userState,
    message,
    locallySavedAddress,
  } = useSelector((state) => state.delivery);

  const shippingAddressInitial = {
    address: locallySavedAddress.add1 || "",
    optionalAddress: locallySavedAddress.add2 || "",
    city: userCity ? userCity : "",
    state: userState ? userState : "",
    zipCode: userPincode ? userPincode : "",
    country: "India",
  };

  const initialValues = {
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    email: user?.email || "",
    phone: user?.phoneNumber || "",
    receiverFirstName: "",
    receiverLastName: "",
    receiverEmail: "",
    receiverPhone: "",
    shippingAddress: shippingAddressInitial,
    billingAddress: shippingAddressInitial,
    sameAsContact: true,
    sameAsShipping: true,
    paymentMethod: "",
    // saveShippingInfo: false,
  };

  // checkout form submission
  const handleSubmit = (values, action) => {
    const merchantTransactionId = generateTransactionID();
    // calutaing additional 5% discount for online payment and tax inlcuded in this discounted amount
    const { discountAmount, taxIncludedInDiscountAmount } =
      calculateDiscountAndTaxIncluded(cartItemsList);

    const orderDetails = cartItemsList.map((item) => {
      return {
        id: item._id,
        "name-url": item["name-url"],
        quantity: item.quantity,
        weight: item.weight,
        tax: item.tax,
        hsnCode: item["hsn-code"],
        // unitPrice: discountedPrice // Update price with the discounted value
        unitPrice: item.price, // Update price with the discounted value
      };
    });

    let checkoutData = {
      orderNo: "ON" + Date.now(),
      orderStatus: "active",
      userEmail: user?.email,
      billingAddress: address(values.billingAddress),
      shippingAddress: address(values.shippingAddress),
      orderDetails: orderDetails,
      subTotal:
        values.paymentMethod === "cash_on_delivery"
          ? totalCartAmount
          : totalCartAmount - discountAmount,
      paymentStatus: "pending",
      taxAmount:
        values.paymentMethod === "cash_on_delivery"
          ? totalTax
          : totalTax - taxIncludedInDiscountAmount,
      shippingFee: totalCartAmount < 499 ? shippingFee : 0,
      paymentMethod: values.paymentMethod,
      receiverDetails: {
        name: !values.sameAsContact ? values.receiverFirstName || "" : "",
        phoneNumber: !values.sameAsContact ? values.receiverPhone || "" : "",
      },
      merchantTransactionId: merchantTransactionId,
      couponCodeApplied: user.cart.couponCodeApplied,
      // isPickleCouponApplied: isPickleCouponApplied, // temporary field will be romved once the pickle offer over
    };

    if (user && cartItemsList.length > 0) {
      if (values.paymentMethod === "cash_on_delivery") {
        dispatch(addOrders(checkoutData)).then((value) => {
          if (value.type === "manageOrders/addOrders/fulfilled") {
            dispatch(clearCart());
            localStorage.removeItem("deliveryChargeToken");
            navigate(`/order-confirmed/${value.payload.orderId}`);
          }
        });
      } else {
        dispatch(addOrders(checkoutData)).then((value) => {
          if (value.type === "manageOrders/addOrders/fulfilled") {
            dispatch(
              initiatePayment({
                number: values.receiverPhone
                  ? values.receiverPhone
                  : values.phone.slice(3),
                amount:
                  totalCartAmount -
                  discountAmount +
                  (totalCartAmount < 499 ? shippingFee : 0),
                merchantTransactionId: merchantTransactionId,
              })
            );

            dispatch(clearCart());
            localStorage.removeItem("deliveryChargeToken");
          }
        });
      }
    }

    action.resetForm();
  };

  const lableStyle =
    "absolute tracking-widest text-sm text-gray-400  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0]  peer-focus:dark:text-green-700 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4";

  const inputStyle =
    "block py-2.5 tracking-widest  w-full text-sm bg-transparent border-0 border-b-2  appearance-none  dark:border-gray-600 dark:focus:border-green-700 focus:outline-none focus:ring-0  peer";

  return (
    <div className="xl:col-span-2 bg-[#d9cb9b]   rounded-md p-8 sticky top-0">
      <h2 className="text-2xl font-bold text-[#333]">Complete your order</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={checkoutSchema}
        onSubmit={handleSubmit}
      >
        {({ values, errors, touched, setFieldValue }) => (
          <Form className="mt-10">
            {/*============== contact details ================= */}
            <div>
              <div className="flex justify-between items-center mb-8 ">
                <h3 className=" font-bold text-[var(--themeColor)] uppercase tracking-widest italic ">
                  Contact Details:
                </h3>
                <Link
                  to="/register"
                  className="hover:underline underline-offset-4  cursor-pointer"
                >
                  {!user ? "Login" : null}
                </Link>
              </div>
              <div className="grid sm:grid-cols-2 gap-10">
                {/* first name  */}
                <InputField
                  name="firstName"
                  label="First Name"
                  icon={
                    <FaUserEdit className="absolute top-4 right-4 text-xl" />
                  }
                  errors={errors}
                  touched={touched}
                />

                {/* last name  */}
                <InputField
                  name="lastName"
                  label="Last Name"
                  icon={
                    <FaUserEdit className="absolute top-4 right-4 text-xl" />
                  }
                  errors={errors}
                  touched={touched}
                />

                {/* email */}
                <InputField
                  name="email"
                  label="Email"
                  icon={<MdEmail className="absolute top-4 right-4 text-xl" />}
                  errors={errors}
                  touched={touched}
                />

                {/* phone number */}
                <InputField
                  name="phone"
                  label="Phone"
                  icon={
                    <MdOutlinePhoneAndroid className="absolute top-4 right-4 text-xl" />
                  }
                  errors={errors}
                  touched={touched}
                />
              </div>
            </div>
            {/*============== receiver's details ================= */}
            <div className="mt-6">
              <h3 className=" font-bold text-[var(--themeColor)] uppercase tracking-widest my-8 italic ">
                Receiver Details:
              </h3>
              <div className="flex items-center gap-2">
                <Field
                  type="checkbox"
                  id="sameAsContact"
                  name="sameAsContact"
                  autoComplete="off"
                  onChange={(e) => {
                    setFieldValue("sameAsContact", e.target.checked);
                    if (e.target.checked && values.sameAsContact) {
                      setFieldValue("receiverFirstName", values.firstName);
                      setFieldValue("receiverLastName", values.lastName);
                      setFieldValue("receiverEmail", values.email);
                      setFieldValue("receiverPhone", values.phone);
                    } else {
                      setFieldValue(
                        "receiverFirstName",
                        values.receiverFirstName
                      );
                      setFieldValue(
                        "receiverLastName",
                        values.receiverLastName
                      );
                      setFieldValue("receiverEmail", values.receiverEmail);
                      setFieldValue("receiverPhone", values.receiverPhone);
                    }
                  }}
                />
                <label htmlFor="sameAsContact">Same as Contact Detail</label>
              </div>
              {!values.sameAsContact && (
                <div className="grid sm:grid-cols-2 gap-10">
                  {/* first name  */}
                  <InputField
                    name="receiverFirstName"
                    label="First Name"
                    icon={
                      <FaUserEdit className="absolute top-4 right-4 text-xl" />
                    }
                    errors={errors}
                    touched={touched}
                  />

                  {/* last name  */}
                  <InputField
                    name="receiverLastName"
                    label="Last Name"
                    icon={
                      <FaUserEdit className="absolute top-4 right-4 text-xl" />
                    }
                    errors={errors}
                    touched={touched}
                  />

                  {/* email */}
                  <InputField
                    name="receiverEmail"
                    label="Email"
                    icon={
                      <MdEmail className="absolute top-4 right-4 text-xl" />
                    }
                    errors={errors}
                    touched={touched}
                  />

                  {/* phone number */}
                  <InputField
                    name="receiverPhone"
                    label="Phone"
                    icon={
                      <MdOutlinePhoneAndroid className="absolute top-4 right-4 text-xl" />
                    }
                    errors={errors}
                    touched={touched}
                  />
                </div>
              )}
            </div>

            <div className="mt-6">
              {/*=========== shipping address ============  */}
              <div>
                <h3 className=" font-bold text-[var(--themeColor)] uppercase tracking-widest my-8 italic ">
                  Shipping Address:
                </h3>
                <div className="grid sm:grid-cols-2 gap-10">
                  {/* Address   */}
                  <div className="relative z-0 w-full">
                    <Field
                      type="text"
                      name="shippingAddress.address"
                      id="shippingAddress.address"
                      className={inputStyle}
                      placeholder=" "
                      autoComplete="off"
                      onBlur={(e) => {
                        dispatch(
                          handleSavingLocalAdd({ mainAdd: e.target.value })
                        );
                      }}
                    />

                    <label
                      htmlFor="shippingAddress.address"
                      className={lableStyle}
                    >
                      Address Line
                    </label>
                    <MdLocationCity className="absolute top-4 right-4 text-xl" />
                    {errors?.shippingAddress?.address &&
                    touched?.shippingAddress?.address ? (
                      <p className="text-red-600">
                        *{errors?.shippingAddress?.address}
                      </p>
                    ) : null}
                  </div>
                  {/* Optional Address   */}
                  <div className="relative z-0 w-full">
                    <Field
                      type="text"
                      name="shippingAddress.optionalAddress"
                      id="shippingAddress.optionalAddress"
                      className={inputStyle}
                      placeholder=" "
                      autoComplete="off"
                      onBlur={(e) => {
                        dispatch(
                          handleSavingLocalAdd({ optionalAdd: e.target.value })
                        );
                      }}
                    />

                    <label
                      htmlFor="shippingAddress.optionalAddress"
                      className={lableStyle}
                    >
                      Address Line 2 (Landmark)
                    </label>
                    <MdLocationCity className="absolute top-4 right-4 text-xl" />
                    {/* {errors?.shippingAddress?.optionalAddress && touched?.shippingAddress?.optionalAddress ? (
                                            <p className='text-red-600'>*{errors?.shippingAddress?.optionalAddress}</p>
                                        ) : (
                                            null
                                        )} */}
                  </div>
                  {/* City   */}
                  <InputField
                    name="shippingAddress.city"
                    label="City"
                    icon={
                      <MdLocationCity className="absolute top-4 right-4 text-xl" />
                    }
                    errors={errors}
                    touched={touched}
                  />

                  {/* state  */}
                  <div className="w-full relative">
                    <Field
                      as="select"
                      name="shippingAddress.state"
                      id="shippingAddress.state"
                      className={inputStyle}
                    >
                      <option value="select-state">Select State</option>
                      {states.map((state) => (
                        <option key={state} value={state} className="">
                          {state}
                        </option>
                      ))}
                    </Field>
                    <label
                      htmlFor="shippingAddress.state"
                      className={lableStyle}
                    >
                      State
                    </label>
                    {errors?.shippingAddress?.state &&
                    touched?.shippingAddress?.state ? (
                      <p className="text-red-600">
                        *{errors?.shippingAddress?.state}
                      </p>
                    ) : null}
                  </div>

                  {/* Zip code   */}
                  <div className="relative z-0">
                    <Field
                      type="text"
                      name="shippingAddress.zipCode"
                      id="shippingAddress.zipCode"
                      className={inputStyle}
                      placeholder=" "
                      autoComplete="off"
                      onChange={(e) => {
                        setFieldValue(
                          "shippingAddress.zipCode",
                          e.target.value
                        );

                        if (e.target.value.length === 6) {
                          checkDeliveryAndCalculateShippingFee(
                            e.target.value,
                            totalWeight,
                            dispatch
                          );
                        }
                      }}
                    />

                    <label
                      htmlFor="shippingAddress.zipCode"
                      className={lableStyle}
                    >
                      Zip Code
                    </label>
                    <PiFileZipFill className="absolute top-4 right-4 text-xl" />
                    {errors?.shippingAddress?.zipCode &&
                    touched?.shippingAddress?.zipCode ? (
                      <p className="text-red-600">
                        *{errors?.shippingAddress?.zipCode}
                      </p>
                    ) : null}
                  </div>
                  {/* country  */}
                  <div className="w-full relative ">
                    <Field
                      as="select"
                      name="shippingAddress.country"
                      id="shippingAddress.country"
                      className={inputStyle}
                    >
                      <option value="india">India</option>
                    </Field>
                    <label
                      htmlFor="shippingAddress.country"
                      className={lableStyle}
                    >
                      Country/Region
                    </label>
                    {errors?.shippingAddress?.country &&
                    touched?.shippingAddress?.country ? (
                      <p className="text-red-600">
                        *{errors?.shippingAddress?.country}
                      </p>
                    ) : null}
                  </div>
                  {/* save shipping info  */}
                  {/* <div className='flex items-center justify-center  col-span-2 gap-2 py-4'>
                                        <Field
                                            type="checkbox"
                                            id="saveShippingInfo"
                                            name="saveShippingInfo"
                                            onChange={(e) => {
                                                setFieldValue('saveShippingInfo', e.target.checked);
                                            }
                                            }
                                        />
                                        <label htmlFor='saveShippingInfo'>Save My Shipping Info for future Orders !</label>
                                    </div> */}
                </div>
              </div>

              {/* billing address  */}
              <div>
                <h3 className=" font-bold text-[var(--themeColor)] uppercase tracking-widest my-8 italic">
                  Billing Address:
                </h3>
                <div className="flex items-center gap-2 py-4">
                  <Field
                    type="checkbox"
                    id="sameAsShipping"
                    name="sameAsShipping"
                    onChange={(e) => {
                      setFieldValue("sameAsShipping", e.target.checked);
                      if (e.target.checked) {
                        setFieldValue(
                          "billingAddress.country",
                          values.shippingAddress.country
                        );
                        setFieldValue(
                          "billingAddress.address",
                          values.shippingAddress.address
                        );
                        setFieldValue(
                          "billingAddress.city",
                          values.shippingAddress.city
                        );
                        setFieldValue(
                          "billingAddress.state",
                          values.shippingAddress.state
                        );
                        setFieldValue(
                          "billingAddress.zipCode",
                          values.shippingAddress.zipCode
                        );
                      }
                    }}
                  />
                  <label htmlFor="sameAsShipping">
                    Same as Shipping address
                  </label>
                </div>
                {!values.sameAsShipping && (
                  <div className="grid sm:grid-cols-2 gap-10">
                    {/* Address   */}
                    <InputField
                      name="billingAddress.address"
                      label=" Address Line"
                      icon={
                        <MdLocationCity className="absolute top-4 right-4 text-xl" />
                      }
                      errors={errors}
                      touched={touched}
                    />

                    {/* Optional Address   */}
                    <InputField
                      name="billingAddress.optionalAddress"
                      label=" Address Line 2 (optional)"
                      icon={
                        <MdLocationCity className="absolute top-4 right-4 text-xl" />
                      }
                      errors={errors}
                      touched={touched}
                    />
                    {/* City   */}
                    <InputField
                      name="billingAddress.city"
                      label="City"
                      icon={
                        <MdLocationCity className="absolute top-4 right-4 text-xl" />
                      }
                      errors={errors}
                      touched={touched}
                    />
                    {/* state  */}
                    <div className="w-full relative">
                      <Field
                        as="select"
                        name="billingAddress.state"
                        id="billingAddress.state"
                        className={inputStyle}
                      >
                        <option value="select-state">Select State</option>
                        {states.map((state) => (
                          <option key={state} value={state} className="">
                            {state}
                          </option>
                        ))}
                      </Field>
                      <label
                        htmlFor="billingAddress.state"
                        className={lableStyle}
                      >
                        State
                      </label>
                      {errors.billingAddress?.state &&
                      touched.billingAddress?.state ? (
                        <p className="text-red-600">
                          *{errors.billingAddress?.state}
                        </p>
                      ) : null}
                    </div>

                    {/* Zip code   */}
                    <InputField
                      name="billingAddress.zipCode"
                      label="Zip Code"
                      icon={
                        <PiFileZipFill className="absolute top-4 right-4 text-xl" />
                      }
                      errors={errors}
                      touched={touched}
                    />

                    {/* country  */}
                    <div className="w-full relative">
                      <Field
                        as="select"
                        name="billingAddress.country"
                        id="billingAddress.country"
                        className={inputStyle}
                      >
                        <option value="india">India</option>
                      </Field>
                      <label
                        htmlFor="billingAddress.country"
                        className={lableStyle}
                      >
                        Country/Region
                      </label>
                      {errors.billingAddress?.country &&
                      touched.billingAddress?.country ? (
                        <p className="text-red-600">
                          *{errors.billingAddress?.country}
                        </p>
                      ) : null}
                    </div>
                  </div>
                )}
              </div>
              {/* payment method  */}
              <div>
                <h3 className=" font-bold text-[var(--themeColor)] uppercase tracking-widest my-8 italic">
                  Payment Method:
                </h3>
                <div className="flex flex-wrap xs:gap-10 gap-4 mt-2">
                  <div className="flex items-center gap-1">
                    <Field
                      type="radio"
                      id="online_payment"
                      name="paymentMethod"
                      value="online_payment"
                    />
                    <label htmlFor="online_payment">Online Payment</label>
                  </div>
                  <div className="flex items-center gap-1">
                    <Field
                      type="radio"
                      id="cash_on_delivery"
                      name="paymentMethod"
                      value="cash_on_delivery"
                    />
                    <label htmlFor="cash_on_delivery">Cash on Delivery</label>
                  </div>
                  <div className="text-[var(--themeColor)] font-bold">
                    <p>( Pay Online and Get 5% additional discount )</p>
                  </div>
                  {errors?.paymentMethod && touched?.paymentMethod ? (
                    <p className="text-red-600">*{errors?.paymentMethod}</p>
                  ) : null}
                </div>
              </div>
              {/* complete btn  */}
              <div className="flex  gap-10 max-sm:flex-col mt-10">
                {/* <button type="button" className="rounded-md px-6 py-3 w-full text-sm font-semibold bg-transparent hover:bg-gray-100 border-2 text-[#333]">Cancel</button> */}

                <button
                  type="submit"
                  disabled={addingNewOrder}
                  className="flex justify-center items-center gap-2 rounded-md px-6 py-3 w-full text-sm font-semibold bg-[var(--bgColorPrimary)] text-white hover:tracking-widest transition-all duration-500"
                >
                  {addingNewOrder ? (
                    <ImSpinner9 className="animate-spin" />
                  ) : (
                    <span className="flex justify-center items-center gap-2">
                      Complete Your Order <BsArrowRight className="font-bold" />
                    </span>
                  )}
                  {/* <BsArrowRight className='font-bold' /> */}
                </button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default CheckoutForm;




