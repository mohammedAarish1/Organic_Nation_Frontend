// import * as Yup from 'yup';

// const phoneRegExp = /^(\+\d{1,3}[- ]?)?\d{10}$/;

// export const loginSchema = Yup.object({
//     userId: Yup.string()
//         .required('Please enter your email or phone number')
//         .test('is-valid-contact', 'Must be a valid email or phone number', value => {
//             if (!value) return false;
//             // Check for valid email
//             const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//             if (emailPattern.test(value)) return true;
//             // Check for valid phone number
//             return phoneRegExp.test(value);
//         }),
//     password: Yup.string().min(6).required('Please enter your password'),
// })