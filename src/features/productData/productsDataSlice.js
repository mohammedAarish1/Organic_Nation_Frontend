// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from 'axios';

// const apiUrl = import.meta.env.VITE_BACKEND_URL;

// export const getProductsData = createAsyncThunk(
//   "getData",
//   async () => {
//     try {
//       const response = await axios.get(`${apiUrl}/category/all-Products`);
//       return response.data;
//     } catch (error) {
//       throw error
//     }
//   });


//   // Move this function outside to prevent recreation
// const createCategoryList = (products) => {
//   if (!products) return [];
  
//   const categoryListData = products.map(product => ({
//     category: product.category,
//     categoryUrl: product['category-url']
//   }));

//   const uniqueData = categoryListData.filter((product, index, self) =>
//     index === self.findIndex(t =>
//       t.category === product.category && t.categoryUrl === product.categoryUrl
//     )
//   );

//   return [{ category: 'All', categoryUrl: 'All' }, ...uniqueData];
// };

// const initialState = {
//   isLoading: false,
//   isError: false,
//   productData: [],
//   categoryList: [],

// }

// export const productsDataSlice = createSlice({
//   name: "product_data",
//   initialState,
//   // for fetching data 
//   extraReducers: (builder) => {
//     builder
//     .addCase(getProductsData.pending, (state) => {
//       state.isLoading = true;
//     })
//     .addCase(getProductsData.fulfilled, (state, action) => {
//       if (action.payload?.product) {
//         state.productData = action.payload.product;
//         // Only update categoryList if it's actually different
//         const newCategoryList = createCategoryList(action.payload.product);
//         if (JSON.stringify(state.categoryList) !== JSON.stringify(newCategoryList)) {
//           state.categoryList = newCategoryList;
//         }
//       }
//       state.isLoading = false;
//     })
//     .addCase(getProductsData.rejected, (state) => {
//       state.isError = true;
//       state.isLoading = false;
//     });
//   },

// })


// export default productsDataSlice.reducer;