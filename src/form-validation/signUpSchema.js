import * as Yup from 'yup';

const phoneRegExp = /^(\+\d{1,3}[- ]?)?\d{10}$/;

export const signUpSchema = Yup.object({
    firstName: Yup.string().min(2).max(20).required('Please enter your First name'),
    lastName: Yup.string().min(2).max(20).required('Please enter your Last name'),
    email: Yup.string().email().required("Please enter your email"),
    phoneNumber: Yup.string().matches(phoneRegExp, 'Phone number is not valid').required('Please enter your phone number'),
    password: Yup.string().min(6).required('Please enter your password'),
    // confirm_password: Yup.string().required().oneOf([Yup.ref('password'), null], 'Password must match')
})