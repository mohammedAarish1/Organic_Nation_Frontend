import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

const apiUrl = import.meta.env.VITE_BACKEND_URL;

export const getProductsData = createAsyncThunk(
  "getData",
  async () => {
    try {
      const response = await axios.get(`${apiUrl}/category/all`);
      return response.data;
    } catch (error) {
      throw error
    }
  })

const initialState = {
  isLoading: false,
  isError: false,
  productData: [],
  categoryList: [],

}

export const productsDataSlice = createSlice({
  name: "product_data",
  initialState,
  // for fetching data 
  extraReducers: (builder) => {
    builder.addCase(getProductsData.pending, (state, action) => {
      return {
        ...state,
        isLoading: true
      }
    })
    builder.addCase(getProductsData.fulfilled, (state, action) => {

      if (action.payload) {
        const data = [...action.payload?.product];

        let categoryListData = data?.map(product => ({
          category: product.category,
          categoryUrl: product['category-url'] // Accessing category-url using bracket notation
        }));

        let uniqueData = categoryListData.filter((product, index, self) =>
          index === self.findIndex(t =>
            t.category === product.category && t.categoryUrl === product.categoryUrl
          )
        );

        categoryListData = [{ category: 'All', categoryUrl: 'All' }, ...uniqueData];

        return {
          ...state,
          isLoading: false,
          productData: action.payload.product,
          categoryList: categoryListData,
        }
      }


    })
    builder.addCase(getProductsData.rejected, (state, action) => {
      return {
        ...state,
        isError: true,
      }
    })
  },

})


export default productsDataSlice.reducer;