import * as Yup from "yup";

const MAX_SIZE_MB = 15; // Maximum size in MB
const MAX_SIZE_BYTES = MAX_SIZE_MB * 1024 * 1024; // Convert to bytes

const returnItemFormSchema = Yup.object().shape({
  itemName: Yup.string().required("Required"),
  weight: Yup.string().required("Required"),
  // price: Yup.number().positive("Must be positive").required("Required"),
  quantity: Yup.number()
    .transform((value) => (isNaN(value) ? undefined : Number(value)))
    .positive("Must be positive")
    .required("Required"),
  images: Yup.array().min(
    1,
    "At least one image is required and You can only upload a maximum of 3 images"
  ),
  // .max(3, 'You can only upload a maximum of 3 images'),
  reason: Yup.string().required(
    "Please let us know a Valid Reason for your return !"
  ),
  returnOptions: Yup.string().required("Please select an option"),
  //   Add validation for bank details
  accountName: Yup.string().when("returnOptions", {
    is: "refund",
    then: (schema) => schema.required("Account Name is required for refund"),
  }),
  bankName: Yup.string().when("returnOptions", {
    is: "refund",
    then: (schema) => schema.required("Bank Name is required for refund"),
  }),
  accountNumber: Yup.string().when("returnOptions", {
    is: "refund",
    then: (schema) => schema.required("Account Number is required for refund"),
  }),
  ifscCode: Yup.string().when("returnOptions", {
    is: "refund",
    then: (schema) => schema.required("IFSC Code is required for refund"),
  }),
  video: Yup.mixed()
    .required("A video file is required")
    .test(
      "fileSize",
      `File size must be less than ${MAX_SIZE_MB} MB`,
      (value) => value && value.size <= MAX_SIZE_BYTES
    )
    .test(
      "fileType",
      "Unsupported file format",
      (value) => value && value.type.startsWith("video/")
    ),
});

export {returnItemFormSchema}