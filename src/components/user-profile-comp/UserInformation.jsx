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
    <label className="block text-sm font-medium  mb-2">{label}</label>
    <div className={prefix ? 'flex items-center' : ''}>
      {prefix && (
        <span className={`
          px-2 py-3 rounded-lg border transition-colors duration-200
          ${!disabled
            ? 'outline-none bg-transparent focus:border-green-500 focus:ring-2 focus:ring-green-200'
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
            ? 'outline-none bg-transparent focus:border-green-500 focus:ring-2 focus:ring-green-200'
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
  <div className="bg-white rounded-lg overflow-hidden hover:shadow-md transition-shadow duration-300">
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="xs:text-lg">{title}:</h3>
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
    fullName: Yup.string().required('First name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    phoneNumber: Yup.string().matches(/^\d{10}$/, 'Invalid phone number').required('Phone is required'),
  });

  const initialValues = {
    fullName: user?.fullName || '',
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
            <div className="grid grid-cols-1  gap-6">
              <FormInput
                label="Name"
                name="fullName"
                disabled={!isEditing.personal}
                value={values.fullName}
                onChange={handleChange}
                error={errors.fullName}
                touched={touched.fullName}
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