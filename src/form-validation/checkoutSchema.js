import * as Yup from 'yup';

const phoneRegExp = /^(\+\d{1,3}[- ]?)?\d{10}$/;
const zipCodeRegExp = /^(\+\d{1,3}[- ]?)?\d{6}$/;


const checkoutSchema = Yup.object().shape({
  firstName: Yup.string().min(2).max(20),
  lastName: Yup.string().min(2).max(20),
  email: Yup.string().email('Invalid email address').required('Email is required'),
  phone: Yup.string().matches(phoneRegExp, 'Phone number is not valid'),
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
    address: Yup.string().required('Address is required'),
    city: Yup.string().required('City is required'),
    state: Yup.string().required('State is required'),
    zipCode: Yup.string().matches(zipCodeRegExp, 'zip code  is not valid').required('Zip code is required'),
  }),
  sameAsShipping: Yup.boolean().required(),
  billingAddress: Yup.object({
    country: Yup.string().required(),
    address: Yup.string().when("$sameAsShipping", {
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
    zipCode: Yup.string().matches(zipCodeRegExp, 'zip code  is not valid').when("$sameAsShipping", {
      is: false,
      then: (schema) => schema.required('zipCode is required'),
      otherwise: (schema) => schema,
    }),
  }),
  paymentMethod: Yup.string().required('Payment method is required'),
});

export { checkoutSchema };