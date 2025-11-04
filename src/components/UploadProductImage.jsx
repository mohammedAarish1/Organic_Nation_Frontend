// import React, { useState } from 'react'
// import { optimizeImages } from '../features/admin/adminData';
// import { useDispatch } from 'react-redux';

// const UploadProductImage = ({product}) => {

//     const dispatch = useDispatch()
//     const [images, setImages] = useState([])

//     // Handle file change event
//     const handleNewImageChange = (e) => {
//         const selectedFiles = Array.from(e.target.files); // Convert FileList to an array
//         setImages((prevImages) => [...prevImages, ...selectedFiles]); // Update the state with new files
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         // const productId =  product['name-url'];  // You can replace this with a dynamic value as needed
//         const bannerId =  product._id;  // You can replace this with a dynamic value as needed
//         // Create a FormData object to send data as multipart/form-data
//         const formData = new FormData();
//         formData.append('productId', bannerId);  // Add productId to the FormData

//         // Append all images to FormData
//         images.forEach((image, index) => {
//             formData.append('images', image);  // 'images' is the field name for images
//         });

//         // Send the form data to the backend using fetch or any HTTP library (e.g., Axios)
//         try {
//             dispatch(optimizeImages(formData))

//             // if (response.ok) {
//             //   const data = await response.json();
//             //   // Handle successful response here
//             // } else {
//             //   console.error('Failed to upload images');
//             //   // Handle error here
//             // }
//         } catch (error) {
//             throw error
//         }
//     };

//     return (
//         <div>
//             <form action="" onSubmit={handleSubmit}>
//                 <input
//                     type="file"
//                     multiple
//                     accept="image/*"
//                     // onSubmit={handleSubmit}
//                     onChange={handleNewImageChange}

//                 />
//                 <button type="submit" className='bg-green-500 py-1 px-4 rounded-sm'>submit</button>
//             </form>
//         </div>
//     )
// }

// export default UploadProductImage;
