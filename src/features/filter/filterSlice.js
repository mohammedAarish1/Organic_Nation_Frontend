import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios";

const apiUrl = import.meta.env.VITE_BACKEND_URL;



export const fetchCategoryWiseData = createAsyncThunk(
    "filterSlice/fetchCategoryWiseData",
    async (category) => {
        try {
            let response;
            if (category === "all") {
                // Handle case for all categories
                response = await axios.get(`${apiUrl}/category/all`);
                if (response.data) {
                    return response.data.product;
                }

            } else {
                // Handle case for specific category
                response = await axios.get(`${apiUrl}/category/${category}`);
                if (response.data) {
                    return response.data.products;
                }
            }
        } catch (error) {
            return error.message;

        }
    }
);



const initialState = {
    data: [],
    loading: false,
    error: null,
    categoryBtnValue: 'all',
    searchInputValue: '',
    priceRangeFilter: {
        price: 0,
        minPrice: 0,
        maxPrice: 0,
    }
}




const filterSlice = createSlice({
    name: "filterData",
    initialState,
    reducers: {

        setFilterInitialValues: (state, action) => {

            if (Array.isArray(action.payload)) {
                const productData = [...action.payload]

                if (productData.length !== 0) {

                    const productPriceArr = action.payload.map((curElm) => curElm.price)
                    let maxPrice = Math.max(...productPriceArr)
                    return {
                        ...state,
                        searchInputValue: '',
                        priceRangeFilter: {
                            ...state.priceRangeFilter,
                            price: maxPrice,
                            maxPrice: maxPrice,
                        }
                    }
                }
            }

            return state;

        },
        setCategoryBtnValue: (state, action) => {
            return {
                ...state,
                categoryBtnValue: action.payload.toLowerCase(),
            }
        },

        getFilterData: (state, action) => {
            const { type, data } = action.payload;

            if (type === 'PRICE_FILTER') {
                return {
                    ...state,
                    priceRangeFilter: {
                        ...state.priceRangeFilter,
                        price: data.value,
                    }
                }
            }

        },
        getSortData: (state, action) => {

            let sortData;
            const { value, productData } = action.payload;
            // below i had make a shallow copy of original data 
            const data = [...productData]

            if (value === "a-z") {
                sortData = data.sort((a, b) => a.name.localeCompare(b.name))
            } else if (value === "z-a") {
                sortData = data.sort((a, b) => b.name.localeCompare(a.name))
            } else if (value === "low_to_high") {
                sortData = data.sort((a, b) => a.price - b.price)
            } else if (value === "high_to_low") {
                sortData = data.sort((a, b) => b.price - a.price)
            } else {
                sortData = data
            }


            return {
                ...state,
                data: sortData,
            }
        },
        getPricerRangeData: (state, action) => {
            let filterData;
            const { price, productData } = action.payload;
            if (price === 0) {
                filterData = productData.filter((curItem) => curItem.price === price)
                return {
                    ...state,
                    data: filterData,
                }
            } else {
                filterData = productData.filter((curItem) => curItem.price <= price)
                return {
                    ...state,
                    data: filterData,
                }
            }

        },
        getSearchedData: (state, action) => {
            const { value, productData } = action.payload;
            const data = [...productData];
            let filterData;
            if (value === '') {
                return {
                    ...state,
                    data: data,
                }
            }
            else if (value) {
                // filterData = data.filter((curItem) => curItem.name.toLowerCase().includes(value));
                filterData = data.filter((curItem) => {
                    const itemWords = curItem.name.toLowerCase().split(/\s+/);
                    const searchWords = value.toLowerCase().split(/\s+/);
                    return searchWords.every(word => itemWords.some(itemWord => itemWord.includes(word)));
                });
                return {
                    ...state,
                    data: filterData,
                    searchInputValue: value,
                }
            }
            return {
                ...state,
            }

        },
        clearFilters: (state, action) => {

            const productData = [...action.payload]

            if (productData.length !== 0) {

                const productPriceArr = action.payload.map((curElm) => curElm.price)
                let maxPrice = Math.max(...productPriceArr)

                return {
                    ...state,
                    data: action.payload,
                    categoryData: {
                        ...state.categoryData,
                        categoryBtnValue: 'All'
                    },
                    priceRangeFilter: {
                        ...state.priceRangeFilter,
                        price: maxPrice,
                        maxPrice: maxPrice,
                    }
                }
            }

        }
    },
    extraReducers: builder => {
        builder.addCase(fetchCategoryWiseData.pending, (state, action) => {
            return {
                ...state,
                loading: true,
            }
        }),
            builder.addCase(fetchCategoryWiseData.fulfilled, (state, action) => {
                return {
                    ...state,
                    loading: false,
                    data: action.payload
                }
            }),
            builder.addCase(fetchCategoryWiseData.rejected, (state, action) => {
                return {
                    ...state,
                    loading: false,
                    error: action.payload,
                }
            })
    }
})

export const { setFilterInitialValues, getFilterData, getSortData, getPricerRangeData, getSearchedData, setCategoryBtnValue, clearFilters } = filterSlice.actions;
export default filterSlice.reducer;