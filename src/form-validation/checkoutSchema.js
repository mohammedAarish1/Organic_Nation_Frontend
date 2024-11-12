import * as Yup from 'yup';

const phoneRegExp = /^(\+\d{1,3}[- ]?)?\d{10}$/;
const pinCodeRegExp = /^(\+\d{1,3}[- ]?)?\d{6}$/;


const checkoutSchema = Yup.object().shape({
  firstName: Yup.string().required('Name is required').min(2).max(20),
  lastName: Yup.string().max(20),
  email: Yup.string().email('Invalid email address').required('Email is required'),
  phoneNumber: Yup.string().matches(phoneRegExp, 'Phone number is not valid'),
  sameAsContact: Yup.boolean().required(),
  receiverFirstName: Yup.string().min(2).when("sameAsContact", {
    is: false,
    then: (schema) => schema.required('First name is required'),
    otherwise: (schema) => schema,
  }),
  receiverLastName: Yup.string().min(2).when("sameAsContact", {
    is: false,
    then: (schema) => schema.required('Last name is required'),
    otherwise: (schema) => schema,
  }),
  receiverEmail: Yup.string().email('Invalid email address'),
  receiverPhone: Yup.string().matches(phoneRegExp, 'Phone number is not valid').when("sameAsContact", {
    is: false,
    then: (schema) => schema.required('Phone is required'),
    otherwise: (schema) => schema,
  }),
  shippingAddress: Yup.object().shape({
    mainAddress: Yup.string().required('Address is required'),
    optionalAddress: Yup.string(),
    city: Yup.string().required('City is required'),
    state: Yup.string().required('State is required'),
    pinCode: Yup.string().matches(pinCodeRegExp, 'Pin code  is not valid').required('Pin code is required'),
  }),
  sameAsShipping: Yup.boolean().required(),
  billingAddress: Yup.object({

    mainAddress: Yup.string().when("$sameAsShipping", {
      is: false,
      then: (schema) => schema.required('Address is required'),
      otherwise: (schema) => schema,
    }),
    city: Yup.string().when("$sameAsShipping", {
      is: false,
      then: (schema) => schema.required('city is required'),
      otherwise: (schema) => schema,
    }),
    state: Yup.string().when("$sameAsShipping", {
      is: false,
      then: (schema) => schema.required('State is required'),
      otherwise: (schema) => schema,
    }),
    pinCode: Yup.string().matches(pinCodeRegExp, 'pin code  is not valid').when("$sameAsShipping", {
      is: false,
      then: (schema) => schema.required('pinCode is required'),
      otherwise: (schema) => schema,
    }),
    country: Yup.string().required(),
  }),
  paymentMethod: Yup.string().required('Payment method is required'),
});

export { checkoutSchema };