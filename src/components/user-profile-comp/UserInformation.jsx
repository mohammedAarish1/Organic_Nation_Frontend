// import { useEffect, useRef, useState } from 'react';
// import { Formik, Form } from 'formik';
// import * as Yup from 'yup';

// import { FiX, FiEdit2, FiSave } from 'react-icons/fi';
// import { useDispatch, useSelector } from 'react-redux';
// import { updatePersonalInfo, updateUserPhoneNumber } from '../../features/user-profile/userProfile';
// import { getUserData, requestOTP } from '../../features/auth/auth';
// import { toast } from 'react-toastify';
// import { ImSpinner9 } from 'react-icons/im';



// const InfoCard = ({ title, isEditing, onEdit, onCancel, children }) => (
//   <div className=" rounded-xl shadow-xl border border-gray-100 overflow-hidden hover:shadow-md transition-shadow duration-300">
//     <div className="p-6">
//       <div className="flex justify-between items-center mb-4">
//         <h3 className="text-lg font-semibold text-gray-600">{title}</h3>
//         <button
//           type="button"
//           onClick={isEditing ? onCancel : onEdit}
//           className={`
//               flex items-center gap-2 px-4 py-2 rounded-lg transition-colors duration-200
//               ${isEditing
//               ? 'bg-gray-100 text-gray-600 hover:bg-gray-200'
//               : 'text-green-600 hover:bg-blue-50'
//             }
//             `}
//         >
//           {isEditing ? (
//             <>
//               <FiX size={18} />
//               <span>Cancel</span>
//             </>
//           ) : (
//             <>
//               <FiEdit2 size={18} />
//               <span>Edit</span>
//             </>
//           )}
//         </button>
//       </div>
//       {children}
//     </div>
//   </div>
// );


// const UserInformation = () => {

//   const dispatch = useDispatch();
//   const { user, user_loading } = useSelector(state => state.auth);
//   const { loading } = useSelector(state => state.userProfile);
//   const [showOTPFields, setShowOTPFields] = useState(false);
//   const [newPhoneNumber, setNewPhoneNumber] = useState(false);
//   const otpInputRef = useRef(null);


//   const [isEditing, setIsEditing] = useState({
//     personal: false,
//     email: false,
//     phoneNumber: false,
//   });

//   const validationSchema = Yup.object({
//     firstName: Yup.string().required('First name is required'),
//     lastName: Yup.string(),
//     email: Yup.string().email('Invalid email').required('Email is required'),
//     phoneNumber: Yup.string().matches(/^\d{10}$/, 'Invalid phone number').required('Phone is required'),
//   });

//   const initialValues = {
//     firstName: user ? user.firstName : '',
//     lastName: user ? user.lastName : '',
//     email: user ? user.email : '',
//     phoneNumber: user ? user.phoneNumber.slice(3) : '',
//   };

//   const handleEdit = (field) => {
//     setIsEditing({ ...isEditing, [field]: !isEditing[field] });
//   }

//   const handleCancel = (field) => {
//     dispatch(getUserData())
//       .then(() => {
//         setIsEditing({ ...isEditing, [field]: !isEditing[field] });
//         setShowOTPFields(false)
//       })
//   }

//   const handleSubmit = (values, { setSubmitting }) => {
//     setSubmitting(true)
//     const payload = { ...values, phoneNumber: '+91' + values.phoneNumber }
//     dispatch(updatePersonalInfo(payload))
//       .then((result) => {

//         if (result?.error?.message === 'Rejected') {
//           toast.error(result?.payload)

//         } else {
//           if (result.payload.message === 'requiresOTP') {
//             // console.log('payload', payload)
//             dispatch(requestOTP(payload.phoneNumber))
//               .then(() => {
//                 setNewPhoneNumber(payload.phoneNumber)
//                 setShowOTPFields(true)
//               })
//           }
//           else {
//             dispatch(getUserData())
//             toast.info(result?.payload?.message)
//             setIsEditing({ personal: false, email: false, phoneNumber: false });

//           }
//         }



//       })
//     // setIsEditing({ personal: false, email: false, phoneNumber: false });
//     setSubmitting(false);
//   };



//   const handleOtpSubmit = (otp) => {
//     const payload = { newPhoneNumber, otp }
//     console.log('payload', payload)
//     dispatch(updateUserPhoneNumber(payload))
//       .then((result) => {
//         console.log('result phone', result)
//         setShowOTPFields(false)
//         setIsEditing({ personal: false, email: false, phoneNumber: false });
//         dispatch(getUserData())
//         toast.info(result.payload?.message)
//       })
//   }

//   useEffect(() => {
//     otpInputRef?.current?.focus();
//   }, []);

//   if (user_loading) return <div>Loading..</div>


//   return (
//     <Formik
//       initialValues={initialValues}
//       validationSchema={validationSchema}
//       onSubmit={handleSubmit}
//     >
//       {({ values, errors, touched, handleChange, isSubmitting }) => (
//         <Form className="space-y-6">
//           <InfoCard
//             title="Personal Information"
//             isEditing={isEditing.personal}
//             onEdit={() => handleEdit('personal')}
//             onCancel={() => handleCancel('personal')}
//           >
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
//                 <input
//                   type="text"
//                   name="firstName"
//                   disabled={!isEditing.personal}
//                   value={values.firstName}
//                   onChange={handleChange}
//                   className={`
//                       w-full px-4 py-3 rounded-lg border transition-colors duration-200
//                       ${isEditing.personal
//                       ? 'border-gray-300 bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200'
//                       : 'border-gray-100 bg-transparent'
//                     }
//                     `}
//                 />
//                 {errors.firstName && touched.firstName && (
//                   <div className="text-red-500 text-sm mt-1">{errors.firstName}</div>
//                 )}
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
//                 <input
//                   type="text"
//                   name="lastName"
//                   disabled={!isEditing.personal}
//                   value={values.lastName}
//                   onChange={handleChange}
//                   className={`
//                       w-full px-4 py-3 rounded-lg border transition-colors duration-200
//                       ${isEditing.personal
//                       ? 'border-gray-300 bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200'
//                       : 'border-gray-100 bg-transparent'
//                     }
//                     `}
//                 />
//                 {errors.lastName && touched.lastName && (
//                   <div className="text-red-500 text-sm mt-1">{errors.lastName}</div>
//                 )}
//               </div>
//             </div>
//             {isEditing.personal && (
//               <button
//                 type="submit"
//                 disabled={isSubmitting}
//                 className="mt-6 w-full md:w-auto flex items-center justify-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200"
//               >
//                 {loading ? (
//                   <ImSpinner9 className="animate-spin" />
//                 ) : (
//                   <>
//                     <FiSave size={18} />
//                     <span>Save Changes</span>
//                   </>
//                 )}
//               </button>
//             )}
//           </InfoCard>

//           <InfoCard
//             title="Email Address"
//             isEditing={isEditing.email}
//             onEdit={() => handleEdit('email')}
//             onCancel={() => handleCancel('email')}
//           >
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
//               <input
//                 type="email"
//                 name="email"
//                 disabled={!isEditing.email}
//                 value={values.email}
//                 onChange={handleChange}
//                 className={`
//                     w-full px-4 py-3 rounded-lg border transition-colors duration-200
//                     ${isEditing.email
//                     ? 'border-gray-300 bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200'
//                     : 'border-gray-100 bg-transparent'
//                   }
//                   `}
//               />
//               {errors.email && touched.email && (
//                 <div className="text-red-500 text-sm mt-1">{errors.email}</div>
//               )}
//             </div>
//             {isEditing.email && (
//               <button
//                 type="submit"
//                 disabled={isSubmitting}
//                 className="mt-6 w-full md:w-auto flex items-center justify-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200"
//               >
//                 {isSubmitting ? (
//                   <ImSpinner9 className="animate-spin" />
//                 ) : (
//                   <>
//                     <FiSave size={18} />
//                     <span>Save Changes</span>
//                   </>
//                 )}
//               </button>
//             )}
//           </InfoCard>

//           <InfoCard
//             title="Phone Number"
//             isEditing={isEditing.phoneNumber}
//             onEdit={() => handleEdit('phoneNumber')}
//             onCancel={() => handleCancel('phoneNumber')}
//           >
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
//               <div className='flex items-center'>
//                 <span className={`
//                      px-2 py-3 rounded-lg border transition-colors duration-200
//                     ${isEditing.phoneNumber
//                     ? 'border-gray-300 bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200'
//                     : 'border-gray-100 bg-transparent'
//                   }
//                   `}>+91</span>
//                 <input
//                   type="tel"
//                   name="phoneNumber"
//                   disabled={!isEditing.phoneNumber}
//                   value={values.phoneNumber}
//                   onChange={handleChange}
//                   className={`
//                     w-full px-2 py-3 rounded-lg border transition-colors duration-200
//                     ${isEditing.phoneNumber
//                       ? 'border-gray-300 bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200'
//                       : 'border-gray-100 bg-transparent'
//                     }
//                   `}
//                 />
//               </div>
//               {errors.phoneNumber && touched.phoneNumber && (
//                 <div className="text-red-500 text-sm mt-1">{errors.phoneNumber}</div>
//               )}
//             </div>
//             {showOTPFields && (
//               <div className='mt-3 flex flex-col gap-2'>
//                 <label htmlFor='otp'>Please enter the OTP sent to your mobile phone </label>
//                 <input
//                   ref={otpInputRef}
//                   type="text"
//                   name='otp'
//                   id='otp'
//                   className='py-2 px-2 outline-none xs:w-1/4 tracking-widest rounded-md font-bold font-sans'
//                   onChange={(e) => {
//                     const otp = e.target.value
//                     if (otp.length === 6) {
//                       handleOtpSubmit(otp)
//                     }
//                   }}
//                 />
//               </div>
//             )}
//             {isEditing.phoneNumber && (
//               <button
//                 type="submit"
//                 disabled={isSubmitting}
//                 className="mt-6 w-full md:w-auto flex items-center justify-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200"
//               >

//                 {isSubmitting ? (
//                   <ImSpinner9 className="animate-spin" />
//                 ) : (
//                   <>
//                     <FiSave size={18} />
//                     <span>Save Changes</span>
//                   </>
//                 )}


//               </button>
//             )}
//           </InfoCard>
//         </Form>
//       )}
//     </Formik>
//   );
// };

// export default UserInformation






import { useEffect, useRef, useState } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { FiX, FiEdit2, FiSave } from 'react-icons/fi';
import { ImSpinner9 } from 'react-icons/im';
import { useDispatch, useSelector } from 'react-redux';
import { updatePersonalInfo, updateUserPhoneNumber } from '../../features/user-profile/userProfile';
import { getUserData, requestOTP } from '../../features/auth/auth';
import { toast } from 'react-toastify';

const FormInput = ({ label, name, type = 'text', disabled, value, onChange, error, touched, prefix }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
    <div className={prefix ? 'flex items-center' : ''}>
      {prefix && (
        <span className={`
          px-2 py-3 rounded-lg border transition-colors duration-200
          ${!disabled
            ? 'outline-none bg-white focus:border-green-500 focus:ring-2 focus:ring-green-200'
            : 'border-gray-100 bg-transparent'
          }
        `}>
          {prefix}
        </span>
      )}
      <input
        type={type}
        name={name}
        disabled={disabled}
        value={value}
        onChange={onChange}
        className={`
          w-full px-4 py-3 rounded-lg border transition-colors duration-200
          ${!disabled
            ? 'outline-none bg-white focus:border-green-500 focus:ring-2 focus:ring-green-200'
            : 'border-gray-100 bg-transparent font- tracking-widest'
          }
        `}
      />
    </div>
    {error && touched && (
      <div className="text-red-500 text-sm mt-1">{error}</div>
    )}
  </div>
);

const SaveButton = ({ isSubmitting, loading }) => (
  <button
    type="submit"
    disabled={isSubmitting}
    className="mt-6 w-full md:w-auto flex items-center justify-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200"
  >
    {loading || isSubmitting ? (
      <ImSpinner9 className="animate-spin" />
    ) : (
      <>
        <FiSave size={18} />
        <span>Save Changes</span>
      </>
    )}
  </button>
);

const InfoCard = ({ title, isEditing, onEdit, onCancel, children }) => (
  <div className="rounded-xl shadow-xl border border-gray-100 overflow-hidden hover:shadow-md transition-shadow duration-300">
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="xs:text-lg font-semibold text-gray-600">{title}</h3>
        <button
          type="button"
          onClick={isEditing ? onCancel : onEdit}
          className={`
            flex items-center gap-2 px-4 py-2 rounded-lg transition-colors duration-200
            ${isEditing
              ? 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              : 'text-green-600 hover:bg-blue-50'
            }
          `}
        >
          {isEditing ? (
            <>
              <FiX size={18} />
              <span>Cancel</span>
            </>
          ) : (
            <>
              <FiEdit2 size={18} />
              <span>Edit</span>
            </>
          )}
        </button>
      </div>
      {children}
    </div>
  </div>
);

const UserInformation = () => {
  const dispatch = useDispatch();
  const { user, user_loading } = useSelector(state => state.auth);
  const { loading } = useSelector(state => state.userProfile);
  const [showOTPFields, setShowOTPFields] = useState(false);
  const [newPhoneNumber, setNewPhoneNumber] = useState(false);
  const otpInputRef = useRef(null);

  const [isEditing, setIsEditing] = useState({
    personal: false,
    email: false,
    phoneNumber: false,
  });

  const validationSchema = Yup.object({
    firstName: Yup.string().required('First name is required'),
    lastName: Yup.string(),
    email: Yup.string().email('Invalid email').required('Email is required'),
    phoneNumber: Yup.string().matches(/^\d{10}$/, 'Invalid phone number').required('Phone is required'),
  });

  const initialValues = {
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    phoneNumber: user?.phoneNumber?.slice(3) || '',
  };

  const handleEdit = (field) => {
    setIsEditing(prev => ({ ...prev, [field]: !prev[field] }));
  };

  const handleCancel = (field) => {
    dispatch(getUserData())
      .then(() => {
        setIsEditing(prev => ({ ...prev, [field]: !prev[field] }));
        setShowOTPFields(false);
      });
  };

  const handleOtpSubmit = (otp) => {
    dispatch(updateUserPhoneNumber({ newPhoneNumber, otp }))
      .then((result) => {
        setShowOTPFields(false);
        setIsEditing(prev => ({ ...prev, phoneNumber: false }));
        dispatch(getUserData());
        toast.info(result.payload?.message);
      });
  };

  const handleSubmit = (values, { setSubmitting }) => {
    const payload = { ...values, phoneNumber: '+91' + values.phoneNumber };
    dispatch(updatePersonalInfo(payload))
      .then((result) => {
        if (result?.error?.message === 'Rejected') {
          toast.error(result?.payload);
        } else if (result.payload.message === 'requiresOTP') {
          dispatch(requestOTP(payload.phoneNumber))
            .then(() => {
              setNewPhoneNumber(payload.phoneNumber);
              setShowOTPFields(true);
            });
        } else {
          dispatch(getUserData());
          toast.info(result?.payload?.message);
          setIsEditing({ personal: false, email: false, phoneNumber: false });
        }
        setSubmitting(false);
      });
  };

  useEffect(() => {
    otpInputRef?.current?.focus();
  }, [showOTPFields]);

  if (user_loading) return <div>Loading..</div>;

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ values, errors, touched, handleChange, isSubmitting }) => (
        <Form className="space-y-6">
          <InfoCard
            title="Personal Information"
            isEditing={isEditing.personal}
            onEdit={() => handleEdit('personal')}
            onCancel={() => handleCancel('personal')}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormInput
                label="First Name"
                name="firstName"
                disabled={!isEditing.personal}
                value={values.firstName}
                onChange={handleChange}
                error={errors.firstName}
                touched={touched.firstName}
              />
              <FormInput
                label="Last Name"
                name="lastName"
                disabled={!isEditing.personal}
                value={values.lastName}
                onChange={handleChange}
                error={errors.lastName}
                touched={touched.lastName}
              />
            </div>
            {isEditing.personal && <SaveButton isSubmitting={isSubmitting} loading={loading} />}
          </InfoCard>

          <InfoCard
            title="Email Address"
            isEditing={isEditing.email}
            onEdit={() => handleEdit('email')}
            onCancel={() => handleCancel('email')}
          >
            <FormInput
              label="Email"
              name="email"
              type="email"
              disabled={!isEditing.email}
              value={values.email}
              onChange={handleChange}
              error={errors.email}
              touched={touched.email}
            />
            {isEditing.email && <SaveButton isSubmitting={isSubmitting} loading={loading} />}
          </InfoCard>

          <InfoCard
            title="Phone Number"
            isEditing={isEditing.phoneNumber}
            onEdit={() => handleEdit('phoneNumber')}
            onCancel={() => handleCancel('phoneNumber')}
          >
            <FormInput
              label="Phone"
              name="phoneNumber"
              type="tel"
              disabled={!isEditing.phoneNumber}
              value={values.phoneNumber}
              onChange={handleChange}
              error={errors.phoneNumber}
              touched={touched.phoneNumber}
              prefix="+91"
            />
            {showOTPFields && (
              <div className="mt-3 flex flex-col gap-2">
                <label htmlFor="otp">Please enter the OTP sent to your mobile phone</label>
                <input
                  ref={otpInputRef}
                  type="text"
                  name="otp"
                  id="otp"
                  className="py-2 px-2 outline-none xs:w-1/3 xs:min-w-72 tracking-widest rounded-md font-bold font-sans"
                  onChange={(e) => {
                    const otp = e.target.value;
                    if (otp.length === 6) {
                      handleOtpSubmit(otp);
                    }
                  }}
                />
              </div>
            )}
            {isEditing.phoneNumber && <SaveButton isSubmitting={isSubmitting} loading={loading} />}
          </InfoCard>
        </Form>
      )}
    </Formik>
  );
};

export default UserInformation;