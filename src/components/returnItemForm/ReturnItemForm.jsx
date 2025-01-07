import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { addReturnItems } from "../../features/manage-returns/manageReturns";
import { getAllOrders } from "../../features/manageOrders/manageOrders";

const MAX_SIZE_MB = 15; // Maximum size in MB
const MAX_SIZE_BYTES = MAX_SIZE_MB * 1024 * 1024; // Convert to bytes

const productSchema = Yup.object().shape({
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

const FormField = ({ name, label, type = "text", as }) => (
  <div className="mb-4">
    <label
      htmlFor={name}
      className="block text-sm font-medium text-gray-500 mb-1 tracking-widest"
    >
      {label}
    </label>
    <Field
      name={name}
      type={type}
      as={as}
      readOnly
      className="mt-1 block w-full rounded-sm  px-2 py-1 border border-gray-200 shadow-sm outline-none focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
    />
    <ErrorMessage
      name={name}
      component="div"
      className="mt-1 text-sm text-red-600"
    />
  </div>
);
const BankDetailsFormField = ({ name, label, type = "text", as }) => (
  <div className="mb-4">
    <label
      htmlFor={name}
      className="block text-sm font-medium text-gray-500 mb-1 tracking-widest"
    >
      {label}
    </label>
    <Field
      name={name}
      type={type}
      as={as}
      className="mt-1 block w-full rounded-sm  px-2 py-1 border border-gray-200 shadow-sm outline-none focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
    />
    <ErrorMessage
      name={name}
      component="div"
      className="mt-1 text-sm text-red-600"
    />
  </div>
);

const ReturnItemForm = ({
  product,
  returnedQuantity,
  paymentMethod,
  amountPaid,
  invoiceNumber,
  onSubmit,
  onCancel,
}) => {
  const dispatch = useDispatch();

  const actualAmountPaid = (productMRP) => {
    // Find the product details based on the nameUrl
    if (!product) {
      return <p>Product not found</p>;
    }

    let discountedPrice;
    // Calculate the discounted unit price
    if (paymentMethod === "cash_on_delivery") {
      discountedPrice = amountPaid;
    } else {
      const totalDiscountInPercentage = 100 - (amountPaid * 100) / productMRP;
      discountedPrice =
        productMRP - (productMRP * (totalDiscountInPercentage + 5)) / 100;
    }
    return Math.round(discountedPrice);
  };

  const initialValues = product
    ? {
        // itemName: product["name-url"].replace(/-/g, " "),
        itemName: product["name-url"],
        weight: product.weight,
        // price:
        //   actualAmountPaid(product.unitPrice) *
        //   (returnedQuantity > 0
        //     ? product.quantity - returnedQuantity
        //     : product.quantity),
        quantity: Number(product.quantity - returnedQuantity),
        images: [],
        reason: "",
        returnOptions: "",
        // Add initial values for bank details
        accountName: "",
        bankName: "",
        accountNumber: "",
        ifscCode: "",
        video: null,
      }
    : {
        itemName: "",
        weight: "",
        // price: "",
        quantity: "",
        images: [],
        reason: "",
        returnOptions: "",
        // Add initial values for bank details
        accountName: "",
        bankName: "",
        accountNumber: "",
        ifscCode: "",
        video: null,
      };

  const handleImageChange = (e, setFieldValue, values) => {
    const files = Array.from(e.target.files);
    const currentImages = values.images || [];

    setFieldValue("images", [...currentImages, ...files].slice(0, 3));
    // setImageError('');
  };

  const handleSubmit = (values, { setSubmitting,resetForm }) => {
    const data = new FormData();

    const formValues = {
      ...values,
      quantity: Number(values.quantity),
    };

    // // Append form values to FormData
    // Object.keys(formValues).forEach((key) => {
    //   data.append(key, formValues[key]);
    // });

    // // Append images to FormData
    // values.images.forEach((image, index) => {
    //   data.append(`images`, image);
    // });


     // Append form values to FormData
  Object.keys(formValues).forEach((key) => {
    if (key !== 'images' && key !== 'video') {
      data.append(key, formValues[key]);
    }
  });

  // Append images to FormData
  values.images.forEach((image) => {
    data.append('images', image);
  });

  // Append video to FormData if it exists
  if (values.video) {
    data.append('video', values.video);
  }
    // Append invoiceNumber
    data.append("invoiceNumber", invoiceNumber);

    // for (let [key, value] of data.entries()) {
    //     console.log(key, typeof value, value);
    // }

    try {
      dispatch(addReturnItems(data))
        .unwrap()
        .then(() => {
          dispatch(getAllOrders());
          onSubmit();
          toast.success("Request Submitted Succefully");
        })
        .catch(() => {});
    } catch (error) {
      throw error;
    }

    setSubmitting(false);
    resetForm();
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={productSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting, setFieldValue, errors, values, touched }) => {
        const handleQuantityChange = (e) => {
          const quantity = Number(e.target.value);

          if (returnedQuantity !== 0) {
            if (quantity > product.quantity - returnedQuantity) {
              alert(`You have already returned ${returnedQuantity} quantity`);
              return; // Early exit to prevent further updates
            }
          } else {
            // Ensure quantity does not exceed product.quantity
            if (quantity > product.quantity) {
              alert(`Quantity cannot exceed ${product.quantity}`);
              return; // Early exit to prevent further updates
            }
          }

          setFieldValue("quantity", quantity);
          // Update price based on quantity and unit price
          const newPrice = actualAmountPaid(product.unitPrice) * quantity;
          setFieldValue("price", newPrice);
        };

        return (
          <Form className="bg-[var(--bgColorSecondary)] xs: shadow-none xs:shadow-md rounded xs:px-8 pt-6 pb-8 mb-4">
            <FormField name="itemName" label="Product Name" />
            <FormField name="weight" label="Weight" />
            {/* <FormField name="price" label="Rate Per Quantity" type="number" /> */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Quantity
              </label>
              <input
                type="number"
                name="quantity"
                value={values.quantity}
                onChange={handleQuantityChange}
                className="mt-1 block w-full rounded-sm  px-2 py-1 border border-gray-200 shadow-sm outline-none focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
              <ErrorMessage
                name="quantity"
                component="div"
                className="mt-1 text-sm text-red-600"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Valid Reason for Returning
              </label>
              <Field
                as="textarea"
                name="reason"
                className="mt-1 block w-full rounded-sm px-2 py-1 border border-gray-200 shadow-sm outline-none focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
              <ErrorMessage
                name="reason"
                component="div"
                className="mt-1 text-sm text-red-600"
              />
            </div>

            {/* payment method  */}
            <div>
              <h3 className=" font-bold text-[var(--themeColor)] uppercase tracking-widest italic">
                What Do you want ?
              </h3>
              <div className="flex flex-wrap xs:gap-10 gap-4 m-5">
                <div className="flex items-center gap-1">
                  <Field
                    type="radio"
                    id="replacement"
                    name="returnOptions"
                    value="replacement"
                  />
                  <label htmlFor="replacement">Replacement</label>
                </div>
                <div className="flex items-center gap-1">
                  <Field
                    type="radio"
                    id="refund"
                    name="returnOptions"
                    value="refund"
                  />
                  <label htmlFor="refund">Refund</label>
                </div>

                {errors?.returnOptions && touched?.returnOptions ? (
                  <p className="text-red-600">*{errors?.returnOptions}</p>
                ) : null}
              </div>
            </div>

            <div>
              {/* Conditional rendering of bank details fields */}
              {values.returnOptions === "refund" && (
                <div className="mt-4">
                  <h4 className="font-semibold mb-2">
                    Bank Details for Refund
                  </h4>
                  <BankDetailsFormField
                    name="accountName"
                    label="Account Holder Name"
                  />
                  <BankDetailsFormField name="bankName" label="Bank Name" />
                  <BankDetailsFormField
                    name="accountNumber"
                    label="Account Number"
                  />
                  <BankDetailsFormField name="ifscCode" label="IFSC Code" />
                </div>
              )}
            </div>
            {/* product images  */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Product Images (maximum 3 images)
              </label>
              <input
                type="file"
                multiple
                accept="image/*" // Only allows image files
                // onChange={handleImageChange}
                onChange={(e) => handleImageChange(e, setFieldValue, values)}
                className="mt-1 block w-full text-sm text-gray-500
                                        file:mr-4 file:py-2 file:px-4
                                        file:rounded-md file:border-0
                                        file:text-sm file:font-semibold
                                        file:bg-indigo-50 file:text-indigo-700
                                        hover:file:bg-indigo-100"
              />
              <ErrorMessage
                name="images"
                component="div"
                className="mt-1 text-sm text-red-600"
              />
              <div className="mt-2">
                {values.images &&
                  values.images.map((image, index) => (
                    <div key={index} className="inline-block mr-2 mb-2">
                      <img
                        src={URL.createObjectURL(image)}
                        alt={`Upload ${index + 1}`}
                        className="h-20 w-20 object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          const newImages = values.images.filter(
                            (_, i) => i !== index
                          );
                          setFieldValue("images", newImages);
                        }}
                        className="mt-1 text-red-500"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
              </div>
            </div>

            {/* product video  */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Upload Video (maximum size - 15 MB)
              </label>
              <input
                type="file"
                name="video"
                accept="video/*" // Only allows image files
                // onChange={handleImageChange}
                // onChange={(e) => handleImageChange(e, setFieldValue, values)}
                className="mt-1 block w-full text-sm text-gray-500
                                        file:mr-4 file:py-2 file:px-4
                                        file:rounded-md file:border-0
                                        file:text-sm file:font-semibold
                                        file:bg-indigo-50 file:text-indigo-700
                                        hover:file:bg-indigo-100"
                onChange={(event) => {
                  setFieldValue("video", event.currentTarget.files[0]);
                }}
              />
              <ErrorMessage
                name="video"
                component="div"
                className="mt-1 text-sm text-red-600"
              />
            </div>

            <div className="flex items-center flex-wrap  gap-2 justify-between">
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 xs:px-4 px-1 xs:text-[16px] w-full rounded focus:outline-none focus:shadow-outline"
              >
                Submit Request
              </button>
              <button
                type="button"
                onClick={onCancel}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 w-full rounded focus:outline-none focus:shadow-outline"
              >
                Cancel
              </button>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};

export default ReturnItemForm;
