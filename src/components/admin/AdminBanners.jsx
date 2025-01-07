import React, { useState } from "react";
import { useEffect } from "react";
import {  FaTrashAlt } from "react-icons/fa";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addNewBannerInDatabase, deleteBannerFromDatabase } from "../../features/admin/adminData";
import { toast } from "react-toastify";
import UploadProductImage from "../UploadProductImage";
import BannerImage from "../image/BannerImage";


const apiUrl = import.meta.env.VITE_BACKEND_URL;

// Placeholder data (replace this with API data in production)
const initialBanners = [
  {
    id: 1,
    image: "https://via.placeholder.com/150",
    title: "Summer Sale",
    description: "50% off on all products!",
    redirectionUrl: "/sale",
    order: 1,
  },
  {
    id: 2,
    image: "https://via.placeholder.com/150",
    title: "New Arrivals",
    description: "Check out the latest products.",
    redirectionUrl: "/new-arrivals",
    order: 2,
  },
];

const AdminBanners = () => {
  const dispatch = useDispatch();
  const [bannersList, setBannersList] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBanner, setEditingBanner] = useState(null); // Store the banner being edited

  // Validation Schema with Yup
  const validationSchema = Yup.object({
    title: Yup.string(),
    description: Yup.string(),
    image: Yup.mixed().required("Image is required").test("fileSize", "File is too large", value => value && value.size <= 2000000), // max 2MB image size
    redirectionUrl: Yup.string().required("Redirection URL is required"),
    order: Yup.number().required("Order is required").positive("Order must be a positive number").integer("Order must be an integer"),
  });


  const getMainBanners = async () => {
    try {
      const response = await axios.get(`${apiUrl}/api/main/banners`)
      if (response.data) {
        setBannersList(response.data.mainBanners)
      }
    } catch (error) {
      throw error
    }
  }

  // delete the banner
  const handleDeleteBanner = (id) => {
    dispatch(deleteBannerFromDatabase(id))
      .then(result => {
        if (result.error?.message === 'Rejected') {
          toast.error(result.payload)
        } else {
          getMainBanners()
          toast.success(result.payload?.message);
        }
      })
  };

  // const handleEditBanner = (banner) => {
  //   setEditingBanner(banner);
  //   setIsModalOpen(true);
  // };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setEditingBanner(null);
  };

  const handleSaveBanner = (values, { resetForm }) => {


    // Create FormData for uploading the image with other banner data
    const formData = new FormData();
    formData.append('image', values.image);
    formData.append('title', values.title);
    formData.append('description', values.description);
    formData.append('redirectionUrl', values.redirectionUrl);
    formData.append('order', values.order);

    if (editingBanner) {
      // Editing existing banner
      setBannersList(
        bannersList.map((banner) =>
          banner.id === editingBanner.id ? { ...editingBanner, ...values, image: URL.createObjectURL(values.image) } : banner
        )
      );
    } else {
      // Adding new banner

      dispatch(addNewBannerInDatabase(formData))
        // .unwrap()
        .then(result => {
          if (result.error?.message === 'Rejected') {
            toast.error(result.payload)
          } else {
            getMainBanners()
            toast.success(result.payload?.message);
          }
        })

      // setBannersList([newBanner, ...bannersList]);
    }
    resetForm();
    handleModalClose();
  };

  useEffect(() => {
    getMainBanners();
  }, [])



  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Banner Management</h2>
        <button
          className='flex justify-center items-center gap-2 shadow-md shadow-green-500 px-4 py-2 rounded-md  hover:bg-green-600 hover:text-white'
          onClick={() => setIsModalOpen(true)}
        >
          Add New Banner
        </button>
      </div>

      {/* Banners List Table */}
      <div className="overflow-x-auto">
        <table className="table-auto w-full ">
          <thead>
            <tr className="bg-[var(--bgColorPrimary)] text-white ">
              <th className="p-3 text-left">Image</th>
              <th className="p-3 text-center">Title</th>
              <th className="p-3 text-center">Description</th>
              <th className="p-3 text-center">Redirection URL</th>
              <th className="p-3 text-center">Order</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {bannersList.map((banner) => (
              <tr key={banner._id} className="border-b border-gray-200">
                <td className="p-3 text-center">
                  {/* <img
                    src={banner.image}
                    alt={banner.title}
                    className="w-16 h-16 object-cover rounded-md"
                  /> */}
                   <BannerImage
                  src={{
                    sm: banner.image.sm,
                    md: banner.image.md,
                    lg: banner.image.lg
                  }}
                  alt={banner.image.redirectionUrl}
                  className="w-16 h-16 object-cover rounded-md"
                  blurSrc={banner.image.blur}
                />
                </td>
                <td className="p-3 text-center">{banner.title}</td>
                <td className="p-3">{banner.description}</td>
                <td className="p-3 text-center">{banner.redirectionUrl}</td>
                <td className="p-3 text-center">{banner.order}</td>
                <td className="p-3 flex space-x-2 justify-center ">
                  {/* <button
                    onClick={() => handleEditBanner(banner)}
                    className="text-yellow-500 hover:text-yellow-600"
                  >
                    <FaEdit />
                  </button> */}
                  <button
                    onClick={() => handleDeleteBanner(banner._id)}
                    className="text-red-500 hover:text-red-600 "
                  >
                    <FaTrashAlt />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal for Add/Edit Banner */}
      {isModalOpen && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50"
          onClick={handleModalClose}
        >
          <div
            className="bg-white rounded-lg p-6 w-full max-w-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 
            className="text-xl font-semibold mb-4"
            >
              {editingBanner ? "Edit Banner" : "Add New Banner"}
            </h3>

            <Formik
              initialValues={{
                title: editingBanner ? editingBanner.title : "",
                description: editingBanner ? editingBanner.description : "",
                image: editingBanner ? null : "", // Keep null for image until upload
                redirectionUrl: editingBanner ? editingBanner.redirectionUrl : "",
                order: editingBanner ? editingBanner.order : 1,
              }}
              validationSchema={validationSchema}
              onSubmit={handleSaveBanner}
            >
              {({ setFieldValue, values }) => (
                <Form className="space-y-4">
                  <div>
                    <label htmlFor="title" className="block text-sm font-medium mb-1">
                      Title
                    </label>
                    <Field
                      type="text"
                      id="title"
                      name="title"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md"
                    />
                    <ErrorMessage name="title" component="div" className="text-red-500 text-sm mt-1" />
                  </div>

                  <div>
                    <label htmlFor="description" className="block text-sm font-medium mb-1">
                      Description
                    </label>
                    <Field
                      as="textarea"
                      id="description"
                      name="description"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md"
                      rows="3"
                    />
                    <ErrorMessage name="description" component="div" className="text-red-500 text-sm mt-1" />
                  </div>

                  <div>
                    <label htmlFor="image" className="block text-sm font-medium mb-1">
                      Banner Image
                    </label>
                    <input
                      type="file"
                      id="image"
                      name="image"
                      accept="image/*"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md"
                      onChange={(event) => {
                        const file = event.target.files[0];
                        if (file) {
                          setFieldValue("image", file);
                        }
                      }}
                    />
                    {values.image && (
                      <div className="mt-2">
                        <p className="text-sm text-gray-500">Selected File: {values.image.name}</p>
                      </div>
                    )}
                    <ErrorMessage name="image" component="div" className="text-red-500 text-sm mt-1" />
                  </div>

                  <div>
                    <label htmlFor="redirectionUrl" className="block text-sm font-medium mb-1">
                      Redirection URL
                    </label>
                    <Field
                      type="text"
                      id="redirectionUrl"
                      name="redirectionUrl"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md"
                    />
                    <ErrorMessage name="redirectionUrl" component="div" className="text-red-500 text-sm mt-1" />
                  </div>

                  <div>
                    <label htmlFor="order" className="block text-sm font-medium mb-1">
                      Order
                    </label>
                    <Field
                      type="number"
                      id="order"
                      name="order"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md"
                    />
                    <ErrorMessage name="order" component="div" className="text-red-500 text-sm mt-1" />
                  </div>

                  <div className="flex justify-end space-x-3 mt-4">
                    <button
                      type="button"
                      onClick={handleModalClose}
                      className="bg-gray-300 px-4 py-2 rounded-md hover:bg-gray-400"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
                    >
                      Save
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>

        // <UploadProductImage
        //   product={editingBanner}
        // // onSubmit={handleFormSubmit}
        // //  onCancel={handleFormCancel}
        // />
      )}
    </div>
  );
};

export default AdminBanners;

