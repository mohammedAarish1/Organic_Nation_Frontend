import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios";

const apiUrl = import.meta.env.VITE_BACKEND_URL;

export const getProductsData = createAsyncThunk(
    "filterSlice/getProductsData",
    async () => {
        try {
            const response = await axios.get(`${apiUrl}/products`);
            if (response.status === 200) {

                // const filteredProductList = products
                //     // below filteration it to hide the specific categories
                //     .filter(product => product.category !== 'Organic Tea' && product.category !== 'Breakfast Cereals')
                // return { filteredProductList, categoryList };
                return response.data
            } else {
                return {}
            }
        } catch (error) {
            throw error
        }
    });



export const fetchCategoryWiseData = createAsyncThunk(
    "filterSlice/fetchCategoryWiseData",
    async (category, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${apiUrl}/products/${category}`)
            if (response.status === 200) {
                return { category, data: response.data }
            }
        } catch (error) {
            return rejectWithValue(error.message);

        }
    }
);

// Move this function outside to prevent recreation
// const createCategoryList = (products) => {
//     if (!products) return [];

//     const categoryListData = products
//         // below filteration it to hide the specific categories
//         // .filter(product => product.category !== 'Organic Tea' && product.category !== 'Breakfast Cereals')
//         .map(product => ({
//             category: product.category,
//             categoryUrl: product['category-url']
//         }));

//     const uniqueData = categoryListData.filter((product, index, self) =>
//         index === self.findIndex(t =>
//             t.category === product.category && t.categoryUrl === product.categoryUrl
//         )
//     );


//     return [{ category: 'All', categoryUrl: 'All' }, ...uniqueData];
// };

const initialState = {
    products: [],
    filteredProducts: [],
    categoryList: [],
    loading: false,
    error: null,
    categoryBtnValue: 'all',
    searchInputValue: '',
    sortValue: 'sort',
    selectedRanges: [],
    // priceRangeFilter: {
    //     price: 0,
    //     minPrice: 0,
    //     maxPrice: 0,
    // }
}




const filterSlice = createSlice({
    name: "filterData",
    initialState,
    reducers: {
        // setFilterInitialValues: (state, action) => {

        //     if (Array.isArray(action.payload)) {
        //         const productData = [...action.payload]

        //         if (productData.length !== 0) {

        //             const productPriceArr = action.payload.map((curElm) => curElm.price)
        //             let maxPrice = Math.max(...productPriceArr)
        //             return {
        //                 ...state,
        //                 searchInputValue: '',
        //                 priceRangeFilter: {
        //                     ...state.priceRangeFilter,
        //                     price: maxPrice,
        //                     maxPrice: maxPrice,
        //                 }
        //             }
        //         }
        //     }

        //     return state;

        // },
        setCategoryBtnValue: (state, action) => {
            return {
                ...state,
                categoryBtnValue: action.payload.toLowerCase(),
            }
        },

        // getFilterData: (state, action) => {
        //     const { type, data } = action.payload;

        //     if (type === 'PRICE_FILTER') {
        //         return {
        //             ...state,
        //             priceRangeFilter: {
        //                 ...state.priceRangeFilter,
        //                 price: data.value,
        //             }
        //         }
        //     }

        // },
        // getSortData: (state, action) => {

        //     let sortData;
        //     const { value, productData } = action.payload;
        //     // below i had make a shallow copy of original data 
        //     const data = [...productData]

        //     if (value === "a-z") {
        //         sortData = data.sort((a, b) => a.name.localeCompare(b.name))
        //     } else if (value === "z-a") {
        //         sortData = data.sort((a, b) => b.name.localeCompare(a.name))
        //     } else if (value === "low_to_high") {
        //         sortData = data.sort((a, b) => a.price - b.price)
        //     } else if (value === "high_to_low") {
        //         sortData = data.sort((a, b) => b.price - a.price)
        //     } else {
        //         sortData = data
        //     }


        //     return {
        //         ...state,
        //         data: sortData,
        //     }
        // },
        // getPricerRangeData: (state, action) => {
        //     let filterData;
        //     const { price, productData } = action.payload;
        //     if (price === 0) {
        //         filterData = productData.filter((curItem) => curItem.price === price)
        //         return {
        //             ...state,
        //             data: filterData,
        //         }
        //     } else {
        //         filterData = productData.filter((curItem) => curItem.price <= price)
        //         return {
        //             ...state,
        //             data: filterData,
        //         }
        //     }

        // },
        // filterBasedOnPrice: (state, action) => {
        //     const { selectedRanges, items, priceRanges } = action.payload;
        //     let filterData;
        //     if (selectedRanges.length === 0) {
        //         filterData = items;
        //     } else {
        //         filterData = items.filter((item) => {
        //             return selectedRanges.some((rangeValue) => {
        //                 const range = priceRanges.find((r) => r.value === rangeValue);
        //                 return item.price >= range.min && item.price <= range.max;
        //             });
        //         });
        //     }
        //     state.data = filterData

        // },
        // getSearchedData: (state, action) => {
        //     const { value, productData } = action.payload;
        //     const data = [...productData];
        //     let filterData;
        //     if (value === '') {
        //         return {
        //             ...state,
        //             data: data,
        //         }
        //     }
        //     else if (value) {
        //         // filterData = data.filter((curItem) => curItem.name.toLowerCase().includes(value));
        //         filterData = data.filter((curItem) => {
        //             const itemWords = curItem.name.toLowerCase().split(/\s+/);
        //             const searchWords = value.toLowerCase().split(/\s+/);
        //             return searchWords.every(word => itemWords.some(itemWord => itemWord.includes(word)));
        //         });
        //         return {
        //             ...state,
        //             data: filterData,
        //             searchInputValue: value,
        //         }
        //     }
        //     return {
        //         ...state,
        //     }

        // },
        setSelectedRanges: (state, action) => {
            // const { selectedRanges } = action.payload;
            state.selectedRanges = action.payload;
        },
        clearFilters: (state, action) => {

            // const productData = [...action.payload]

            // if (productData.length !== 0) {

            //     const productPriceArr = action.payload.map((curElm) => curElm.price)
            //     let maxPrice = Math.max(...productPriceArr)

            //     return {
            //         ...state,
            //         data: action.payload,
            //         categoryData: {
            //             ...state.categoryData,
            //             categoryBtnValue: 'All'
            //         },
            //         priceRangeFilter: {
            //             ...state.priceRangeFilter,
            //             price: maxPrice,
            //             maxPrice: maxPrice,
            //         }
            //     }
            // }
            state.filteredProducts = state.products;
            state.categoryBtnValue = 'all';
            state.sortValue = 'sort';
            state.selectedRanges = [];
            state.searchInputValue = ''

        },
        getFilteredData: (state, action) => {
            const { type, value } = action.payload;
            if (type === "SEARCH") {
                if (value === '') {
                    state.filteredProducts = state.products

                }
                else if (value) {
                    // filterData = data.filter((curItem) => curItem.name.toLowerCase().includes(value));
                    state.filteredProducts = state.products.filter((curItem) => {
                        const itemWords = curItem.name.toLowerCase().split(/\s+/);
                        const searchWords = value.toLowerCase().split(/\s+/);
                        return searchWords.every(word => itemWords.some(itemWord => itemWord.includes(word)));
                    });
                }
                state.searchInputValue = value
            } else if (type === 'SORT') {
                let filterData;

                if (value === "a-z") {
                    filterData = state.products.sort((a, b) => a.name.localeCompare(b.name))
                } else if (value === "z-a") {
                    filterData = state.products.sort((a, b) => b.name.localeCompare(a.name))
                } else if (value === "low_to_high") {
                    filterData = state.products.sort((a, b) => a.price - b.price)
                } else if (value === "high_to_low") {
                    filterData = state.products.sort((a, b) => b.price - a.price)
                } else {
                    filterData = state.products
                }
                state.filteredProducts = filterData;
                state.sortValue = value;
                state.searchInputValue = '';

            } else if (type === 'PRICE') {
                if (state.selectedRanges?.length === 0) {
                    state.filteredProducts = state.products;
                } else {
                    state.filteredProducts = state.products.filter((item) => {
                        return state.selectedRanges.some((rangeValue) => {
                            const range = value.find((r) => r.value === rangeValue);
                            return item.price >= range.min && item.price <= range.max;
                        });
                    });
                }
                state.searchInputValue = '';
            }
        }
    },
    extraReducers: builder => {
        builder
            .addCase(getProductsData.pending, (state) => {
                state.loading = true;
            })
            .addCase(getProductsData.fulfilled, (state, action) => {
                const { products, categoryList } = action.payload;
                if (products.length > 0) {
                    state.products = products;
                    state.filteredProducts = products;
                    state.categoryList = categoryList;
                    // Only update categoryList if it's actually different
                    // const newCategoryList = createCategoryList(action.payload);
                    // if (JSON.stringify(state.categoryList) !== JSON.stringify(newCategoryList)) {
                    //     state.categoryList = newCategoryList;
                    // }
                }
                state.loading = false;
            })
            .addCase(getProductsData.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'An unknown error occurred';
            })
            // catgory wise filteration ==========
            .addCase(fetchCategoryWiseData.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(fetchCategoryWiseData.fulfilled, (state, action) => {
                state.loading = false;
                state.filteredProducts = action.payload.data
                state.categoryBtnValue = action.payload.category
                state.searchInputValue = ''
            })
            .addCase(fetchCategoryWiseData.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'An unknown error occurred';
            })
    }
})

export const {
    // setFilterInitialValues,
    setSelectedRanges,
    // getFilterData,
    // getSortData,
    // getPricerRangeData,
    // getSearchedData,
    setCategoryBtnValue,
    clearFilters,
    // filterBasedOnPrice,
    getFilteredData
} = filterSlice.actions;
export default filterSlice.reducer;