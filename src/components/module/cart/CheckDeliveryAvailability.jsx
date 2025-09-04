// import React, { useCallback, useMemo } from 'react';
// import { ErrorMessage, Field, Form, Formik } from 'formik';
// import * as Yup from 'yup';
// import { useDispatch, useSelector } from 'react-redux';
// import { calculateShippingFee, checkDeliveryAvailability } from '../../../features/check-delivery/checkDelivery';
// import { motion } from 'framer-motion';

// const CheckDeliveryAvailability = React.memo(() => {
//   const dispatch = useDispatch();

//   // Select only the necessary pieces of state

//   const deliveryState = useSelector((state) => state.delivery);
//   const { isAvailable, message, checking, error } = useMemo(
//     () => ({
//       isAvailable: deliveryState.isAvailable,
//       message: deliveryState.message,
//       checking: deliveryState.checking,
//       error: deliveryState.error,
//     }),
//     [deliveryState] // Only recompute when the whole `deliveryState` changes
//   );


//   const pincodeRegExp = /^(\+\d{1,3}[- ]?)?\d{6}$/;
//   const [pincode, setPincode] = React.useState('');

//   const validationSchema = Yup.object({
//     pincode: Yup.string()
//       .required('Please enter your pin code')
//       .matches(pincodeRegExp, 'Pin Code is not valid'),
//   });

//   // Memoize the handleSubmit function to avoid re-creating it on each render
//   const handleSubmit = useCallback(
//     (values) => {
//       if (values.pincode) {
//         if (localStorage.getItem('deliveryChargeToken')) {
//           localStorage.removeItem('deliveryChargeToken');
//         }
//         dispatch(checkDeliveryAvailability(values.pincode)).then((res) => {
//           if (res.payload.available) {
//             dispatch(calculateShippingFee({ pinCode: res.meta.arg })).then((res) => {
//               if (res.meta.requestStatus === 'fulfilled') {
//                 localStorage.setItem('deliveryChargeToken', res?.payload?.token);
//               }
//             });
//           }
//         });
//       }
//     },
//     [dispatch]
//   );


//   return (
//     <div className="mb-6 border-b border-[#DCD2C0] pb-4">
//       <h3 className="text-sm font-medium text-[#3E2C1B] mb-3 flex items-center">
//         <FiMapPin className="mr-2" /> Check Delivery Availability
//       </h3>
//       <Formik
//         initialValues={{ pincode }}
//         validationSchema={validationSchema}
//         onSubmit={handleSubmit}
//       >
//         {({ setFieldValue }) => (
//           <Form>
//             <div className="flex items-center">
//               <Field
//                 type="text"
//                 name="pincode"
//                 placeholder="Enter pin code"
//                 className="flex-grow px-3 py-2 bg-[#F5EFE6] border border-[#DCD2C0] rounded-l-md text-[#3E2C1B] placeholder-[#3E2C1B] placeholder-opacity-50 focus:outline-none focus:ring-1 focus:ring-[#9B7A2F]"
//                 value={pincode}
//                 onChange={(e) => {
//                   setPincode(e.target.value);
//                   setFieldValue('pincode', e.target.value);
//                 }}
//               />
//               <motion.button
//                 type="submit"
//                 className="bg-[#9B7A2F] text-[#FFFFFF] px-4 py-2 rounded-r-md disabled:opacity-70"
//                 whileTap={{ scale: 0.95 }}
//                 disabled={deliveryState.checking}
//               >
//                 {deliveryState.checking ? (
//                   <ImSpinner9 className="animate-spin" />
//                 ) : (
//                   'Check'
//                 )}
//               </motion.button>
//             </div>
//             <ErrorMessage
//               name="pincode"
//               component="div"
//               className="text-[#D87C45] text-xs mt-1"
//             />
//             <div className="mt-2">
//               {deliveryState.isAvailable === true && (
//                 <p className="text-[#6B8E23] text-xs">
//                   {deliveryState.message}
//                 </p>
//               )}
//               {deliveryState.isAvailable === false && (
//                 <p className="text-[#D87C45] text-xs">
//                   {deliveryState.error}
//                 </p>
//               )}
//             </div>
//           </Form>
//         )}
//       </Formik>
//     </div>
//   );
// });

// export default CheckDeliveryAvailability;
