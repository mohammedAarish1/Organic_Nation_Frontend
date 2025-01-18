// import React from 'react'
// import { ErrorMessage, Field, Form, Formik } from "formik";
// import * as Yup from "yup";
// import { useDispatch, useSelector } from 'react-redux';
// import { calculateShippingFee, checkDeliveryAvailability } from '../../features/check-delivery/checkDelivery';
// import { ImSpinner9 } from 'react-icons/im';


// const CheckDeliveryAvailability = () => {

//   const dispatch = useDispatch();
//    const { isAvailable, message, checking ,error} = useSelector((state) => state.delivery);
//     const pincodeRegExp = /^(\+\d{1,3}[- ]?)?\d{6}$/;

//     const validationSchema = Yup.object({
//       pincode: Yup.string()
//         .required("Please enter your pin code")
//         .matches(pincodeRegExp, "Pin Code is not valid"),
//     });

//      const handleSubmit = (values, errros) => {
//         if (values) {
//           if (localStorage.getItem("deliveryChargeToken")) {
//             localStorage.removeItem("deliveryChargeToken");
//           }
//           dispatch(checkDeliveryAvailability(values.pincode)).then((res) => {
//             if (res.payload.available) {
//               dispatch(
//                 calculateShippingFee({ pinCode: res.meta.arg })
//               ).then((res) => {
//                 if (res.meta.requestStatus === "fulfilled") {
//                   localStorage.setItem("deliveryChargeToken", res?.payload?.token);
//                 }
//               });
//             }
//           });
//         }
//       };

//   return (
//      <div className="flex flex-col gap-2">
//                  <h3>Check Delivery Availability:</h3>
//                  <div>
//                    <Formik
//                      initialValues={{ pincode: "" }}
//                      validationSchema={validationSchema}
//                      onSubmit={handleSubmit}
//                    >
//                      {({ }) => (
//                        <Form>
//                          <div className="flex items-center ">
//                            <Field
//                              type="text"
//                              name="pincode"
//                              placeholder="Enter pin code"
//                              className="border border-gray-300 rounded-tl-md rounded-bl-md px-2 py-1 outline-none tracking-wide w-full "
//                            />
//                            <button
//                              type="submit"
//                              className="px-4 py-1 rounded-tr-md rounded-br-md bg-orange-400 hover:bg-orange-500"
//                            >
//                              {checking ? (
//                                <ImSpinner9 className="animate-spin" />
//                              ) : (
//                                "Check"
//                              )}
//                            </button>
//                          </div>
//                          <ErrorMessage
//                            name="pincode"
//                            component="div"
//                            className="text-red-600 text-[14px]"
//                          />
//                          <div className="max-w-1/3">
//                            {isAvailable ? (
//                              <p className="text-center text-green-700 text-[13px] py-1 break-all">
//                                {message}
//                              </p>
//                            ) : (
//                              <p className="text-center text-red-500 text-[13px] py-1 break-all">
//                                {error}
//                              </p>
//                            )}
//                          </div>
//                        </Form>
//                      )}
//                    </Formik>
//                  </div>
//                </div>
//   )
// }

// export default CheckDeliveryAvailability;



import React, { useCallback, useMemo } from 'react';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { calculateShippingFee, checkDeliveryAvailability } from '../../../features/check-delivery/checkDelivery';
import { ImSpinner9 } from 'react-icons/im';

const CheckDeliveryAvailability = React.memo(() => {
  const dispatch = useDispatch();

  // Select only the necessary pieces of state

const deliveryState = useSelector((state) => state.delivery);
const { isAvailable, message, checking, error } = useMemo(
    () => ({
      isAvailable: deliveryState.isAvailable,
      message: deliveryState.message,
      checking: deliveryState.checking,
      error: deliveryState.error,
    }),
    [deliveryState] // Only recompute when the whole `deliveryState` changes
  );
  

  const pincodeRegExp = /^(\+\d{1,3}[- ]?)?\d{6}$/;
  const [pincode, setPincode] = React.useState('');

  const validationSchema = Yup.object({
    pincode: Yup.string()
      .required('Please enter your pin code')
      .matches(pincodeRegExp, 'Pin Code is not valid'),
  });

  // Memoize the handleSubmit function to avoid re-creating it on each render
  const handleSubmit = useCallback(
    (values) => {
      if (values.pincode) {
        if (localStorage.getItem('deliveryChargeToken')) {
          localStorage.removeItem('deliveryChargeToken');
        }
        dispatch(checkDeliveryAvailability(values.pincode)).then((res) => {
          if (res.payload.available) {
            dispatch(calculateShippingFee({ pinCode: res.meta.arg })).then((res) => {
              if (res.meta.requestStatus === 'fulfilled') {
                localStorage.setItem('deliveryChargeToken', res?.payload?.token);
              }
            });
          }
        });
      }
    },
    [dispatch]
  );


  return (
    <div className="flex flex-col gap-2">
      <h3>Check Delivery Availability:</h3>
      <div>
        <Formik
          initialValues={{ pincode }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ setFieldValue }) => (
            <Form>
              <div className="flex items-center">
                <Field
                  type="text"
                  name="pincode"
                  placeholder="Enter pin code"
                  className="border border-gray-300 rounded-tl-md rounded-bl-md px-2 py-1 outline-none tracking-wide w-full"
                  value={pincode}
                  onChange={(e) => {
                    setPincode(e.target.value); // Set local state for immediate UI update
                    setFieldValue('pincode', e.target.value); // Sync Formik state
                  }}
                />
                <button
                  type="submit"
                  className="px-4 py-1 rounded-tr-md rounded-br-md bg-orange-400 hover:bg-orange-500"
                  disabled={checking} // Disable the button while checking
                >
                  {checking ? <ImSpinner9 className="animate-spin" /> : 'Check'}
                </button>
              </div>
              <ErrorMessage
                name="pincode"
                component="div"
                className="text-red-600 text-[14px]"
              />
              <div className="max-w-1/3">
                {isAvailable ? (
                  <p className="text-center text-green-700 text-[13px] py-1 break-all">
                    {message}
                  </p>
                ) : (
                  <p className="text-center text-red-500 text-[13px] py-1 break-all">
                    {error}
                  </p>
                )}
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
});

export default CheckDeliveryAvailability;
