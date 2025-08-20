import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import api from "../../config/axiosConfig";

const apiUrl = import.meta.env.VITE_BACKEND_URL;


// for adding item to the cart 
export const addToCart = createAsyncThunk(
    'cart/addToCart',
    async ({ productId, quantity, productName }, { rejectWithValue, getState, dispatch }) => {
        const { auth } = getState();
        try {
            if (auth.user) {
                const response = await api.post(`/api/cart`, { productId, quantity, productName })
                if (response.status === 200) {
                    return response.data;
                }
            }
            else {
                dispatch(addToLocalCart({ productId, quantity, productName }));
            }
        } catch (error) {
            return rejectWithValue({
                message: error.message,
                status: error.response?.status
            });
        }
    }
)

// for fetching each item details in order to show them on cart page 
export const getAllCartItems = createAsyncThunk(
    'cart/getAllCartItems',
    async (_, { rejectWithValue, getState, dispatch }) => {
        const { auth } = getState();
        try {
            // x=x=x=x=x=x=x=x=x=x=x= handles when the user is logged in x=x=x=x=x=x=x=x=x=x=
            if (auth.user) {
                const response = await api.get(`/api/cart`);
                if (response.status === 200) {
                    const products = response.data.items.map(product => {
                        return {
                            productName: product.productName,
                            quantity: product.quantity
                        }
                    });
                    const responseData = await api.post('api/cart/cart-details', { cartItems: products })
                    if (responseData.status === 200) {
                        const { productDetails, totals } = responseData.data
                        return { productDetails, result: totals };
                    }
                }
            }
            // x=x=x=x=x=x=x=x=x=x=x= handles when the user is logged out x=x=x=x=x=x=x=x=x=x=

            else {
                let localCart = [];
                const localCartData = localStorage.getItem('cart')
                if (localCartData && localCartData !== '[]') {
                    localCart = JSON.parse(localCartData);
                }
                if (localCart.length > 0) {

                    const responseData = await api.post('api/cart/cart-details', { cartItems: localCart })
                    if (responseData.status === 200) {
                        const { productDetails, totals } = responseData.data
                        return { productDetails, result: totals };
                    }

                } else {
                    return {};
                }

            }

        } catch (error) {
            // return rejectWithValue(error.response);
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);


//  for clearing the whole cart 
export const clearCart = createAsyncThunk(
    'cart/clearCart',
    async (_, { rejectWithValue, getState, dispatch }) => {
        const { auth } = getState();
        try {
            if (auth.user) {
                const response = await api.delete(`/api/cart`)
                if (response.status === 200) {
                    return response.data;
                }
            } else {
                dispatch(clearLocalCart())

            }

        } catch (error) {
            return rejectWithValue(error)
        }
    }
)


//  for removing the single item from the cart 
export const removeFromCart = createAsyncThunk(
    'cart/removeFromCart',
    async (productName, { rejectWithValue, getState, dispatch }) => {
        const { auth } = getState();
        try {
            // x=x=x=x=x=x=x=x=x=x=x= handles when the user is logged in x=x=x=x=x=x=x=x=x=x=
            if (auth.user) {
                const response = await api.delete(`/api/cart/${productName}`,

                )
                if (response.status === 200) {
                    return response.data;
                }
            }
            // x=x=x=x=x=x=x=x=x=x=x= handles when the user is logged out x=x=x=x=x=x=x=x=x=x=
            else {
                dispatch(removeFromLocalCart(productName));
            }

        } catch (error) {
            return rejectWithValue({
                message: error.message,
                status: error.response?.status
            });
        }
    }
)

//  for updating qty from the cart 
export const updateQty = createAsyncThunk(
    'cart/updateQty',
    async (product, { rejectWithValue, getState, dispatch }) => {
        const { auth } = getState();
        try {
            if (auth.user) {
                const response = await api.put(`/api/cart/updateQuantity/${product.productName}`, { action: product.type })
                if (response.status === 200) {
                    return response.data;
                }
            } else {
                dispatch(updateLocalCartQty(product))
            }

        } catch (error) {
            return rejectWithValue({
                message: error.message,
                status: error.response?.status
            });
        }
    }
)

// for merging the cart when the user logged in after adding the items
export const mergeCart = createAsyncThunk(
    'cart/mergeCart',
    async (cart, { rejectWithValue, getState }) => {
        const { auth } = getState();
        try {
            if (auth.user) {
                const response = await api.post(`/api/cart/merge`, cart)
                return response.data;
            }
        } catch (error) {
            return rejectWithValue({
                message: error.message,
                status: error.response?.status
            });
        }
    }
)


// family coupon code validation logic
export const applyFamilyCouponCode = createAsyncThunk(
    'cart/applyFamilyCouponCode',
    async (data, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${apiUrl}/api/validate/family/coupon-code`, data)
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data.error);
        }
    }
)


// export const applyPickleCouponCode = createAsyncThunk(
//     'cart/applyPickleCouponCode',
//     async (payload, { rejectWithValue }) => {
//         try {
//             const response = await axios.post(`${apiUrl}/api/validate/pickle/coupon-code`, payload);
//             return response.data;
//         } catch (error) {
//             return rejectWithValue(error.response.data.error);
//         }
//     }
// );


// export const applyAdditionalCouponDiscount = createAsyncThunk(
//     'cart/applyAdditionalCouponDiscount',
//     async (payload, { rejectWithValue }) => {
//         try {
//             const response = await axios.post(`${apiUrl}/api/validate/additional/coupon/discount`, payload);
//             return response.data;
//         } catch (error) {
//             return rejectWithValue(error.response.data.error);
//         }
//     }
// );


// family coupon code validation logic
// export const applyReferralCouponDiscount = createAsyncThunk(
//     'cart/applyReferralCouponDiscount',
//     async (data, { rejectWithValue, getState }) => {
//         const { auth } = getState();
//         try {
//             if (auth.user) {
//                 const response = await api.post(`/api/validate/referral/coupon/discount`, data)
//                 return response.data;
//             } else {
//                 return rejectWithValue('Please login to apply referral code')
//             }

//         } catch (error) {
//             return rejectWithValue(error.response.data.error);
//         }
//     }
// )


// ADD new async thunk for getting discount progress
// export const getDiscountProgress = createAsyncThunk(
//     'cart/getDiscountProgress',
//     async (_, { rejectWithValue, getState }) => {
//         const { auth } = getState();
//         try {
//             if (auth.user) {
//                 const response = await api.get('/api/cart/discount-progress');
//                 return response.data;
//             } else {
//                 // Handle local cart discount calculation
//                 const localCart = JSON.parse(localStorage.getItem('cart') || '[]');

//                 if (localCart.length > 0) {
//                     const result = await calculateProgressiveDiscount(localCart);

//                     return {
//                         hasEligibleItems: result.eligibleItems.length > 0,
//                         progressInfo: result.progressInfo,
//                         currentDiscount: result.discountType,
//                         eligibleItems: result.eligibleItems
//                     };
//                 }
//                 return { hasEligibleItems: false, progressInfo: null };
//             }
//         } catch (error) {
//             return rejectWithValue(error.response?.data || error.message);
//         }
//     }
// );





const initialState = {
    cartItems: [],  // it will contain only product id, qty and name-url
    cartItemsList: [], // it will contain all the product detail + qty
    loading: false,
    validatingCouponCode: false,
    couponCodeApplied: [],
    error: null,
    totalCartItems: 0,
    totalCartAmount: 0,
    // totalWeight: '',
    totalTax: 0,
    // below NEW FIELDS for discount feature
    originalAmount: 0,
    discountAmount: 0,
    progressiveDiscountApplied: 'none',
    discountProgress: {
        // hasEligibleItems: false,
        // progressInfo: null,
        // currentDiscount: 'none',
        // eligibleItems: []
    }
}

export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToLocalCart: (state, action) => {
            const localCart = JSON.parse(localStorage.getItem('cart'))
            if (localCart && localCart.length > 0) {
                state.cartItems = localCart;
            }
            const { productId, quantity, productName } = action.payload;

            const existingItem = state.cartItems?.find(item => item.productName === productName);

            if (existingItem) {
                existingItem.quantity += quantity;
                // existingItem.quantity += quantity;
            } else {

                state.cartItems.push({ productId, quantity, productName })

            }
            localStorage.setItem('cart', JSON.stringify(state.cartItems));
            state.couponCodeApplied = []

        },
        updateLocalCartQty: (state, action) => {

            const localCart = JSON.parse(localStorage.getItem('cart'));
            const { productName, type } = action.payload;

            const newCartItems = localCart.map((curItem) => {
                if (curItem.productName === productName) {
                    let newQty;
                    if (type === 'increase') {
                        newQty = curItem.quantity + 1;

                    }
                    else if (type === 'decrease') {
                        // newQty = curItem.quantity - 1;
                        newQty = Math.max(curItem.quantity - 1, 1)
                    }
                    return { ...curItem, quantity: newQty }
                } else {
                    return {
                        ...curItem,
                    }
                }
            })
            localStorage.setItem('cart', JSON.stringify(newCartItems));

            return {
                ...state,
                cartItems: newCartItems,
                couponCodeApplied: [],
            }

        },
        removeFromLocalCart: (state, action) => {
            const localCart = JSON.parse(localStorage.getItem('cart'));
            const updatedCart = localCart.filter((curItem) => curItem.productName !== action.payload);
            localStorage.setItem('cart', JSON.stringify(updatedCart));
            state.cartItems = updatedCart
            state.couponCodeApplied = []
            // return {
            //     ...state,
            //     cartItems: updatedCart,
            //     couponCodeApplied: [],
            // }
        },
        clearLocalCart: (state) => {
            localStorage.removeItem('cart');
            state.cartItems = [];
            state.cartItemsList = [];
            state.couponCodeApplied = [];
            state.totalCartItems = 0;
            state.totalCartAmount = 0;

            // return {
            //     ...state,
            //     cartItems: [],
            //     cartItemsList: [],
            //     couponCodeApplied: [],
            //     totalCartItems: 0,
            //     totalCartAmount: 0,

            // }
        },


    },
    extraReducers: (builder) => {
        builder
            //========================= for adding items into the cart =================
            .addCase(addToCart.pending, (state) => {
                state.loading = true;
                // return {
                //     ...state,
                //     loading: true,
                // }
            })
            .addCase(addToCart.fulfilled, (state, action) => {
                if (action.payload && action.payload.items.length > 0) {
                    state.loading = false;
                    state.cartItems = action.payload.items;
                    state.totalCartAmount = action.payload.totalCartAmount;
                    state.totalTax = action.payload.totalTaxes;
                    state.couponCodeApplied = action.payload.couponCodeApplied;
                    // return {
                    //     ...state,
                    //     loading: false,
                    //     cartItems: action.payload.items,
                    //     totalCartAmount: action.payload.totalCartAmount,
                    //     totalTax: action.payload.totalTaxes,
                    //     couponCodeApplied: action.payload.couponCodeApplied,
                    // }
                }

            })
            .addCase(addToCart.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                // return {
                //     ...state,
                //     loading: false,
                //     error: action.payload,
                // }
            })
            // ============= getting cart arary ============= 
            .addCase(getAllCartItems.pending, (state) => {
                state.loading = true;
                // return {
                //     ...state,
                //     loading: true,
                // }
            })
            .addCase(getAllCartItems.fulfilled, (state, action) => {
                let totalQty;

                if (action.payload.productDetails?.length > 0) {

                    totalQty = action.payload.productDetails.reduce((total, product) => total + product.quantity, 0);

                }

                state.loading = false;
                state.cartItemsList = action.payload?.productDetails || [];
                state.totalCartItems = totalQty || 0;
                state.totalCartAmount = action.payload?.result?.finalAmount || 0;
                state.totalTax = action.payload?.result?.totalTax || 0;
                state.couponCodeApplied = action.payload?.couponCodeApplied || [];
                //=ADD THESE NEW FIELDS
                state.discountProgress = action.payload?.result || {};

                // return {
                //     ...state,
                //     loading: false,
                //     cartItemsList: action.payload?.productDetails || [],
                //     totalCartItems: totalQty || 0,
                //     totalCartAmount: action.payload?.result?.finalAmount || 0,
                //     totalTax: action.payload?.result?.totalTax || 0,
                //     couponCodeApplied: action.payload?.couponCodeApplied || [],
                //     // ADD THESE NEW FIELDS
                //     discountProgress: action.payload?.result || {}

                //     // originalAmount: action.payload?.originalAmount || 0,
                //     // discountAmount: action.payload?.discountAmount || 0,
                //     // progressiveDiscountApplied: action.payload?.progressiveDiscountApplied || 'none'

                // }
            })
            .addCase(getAllCartItems.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                // return {
                //     ...state,
                //     loading: false,
                //     error: action.payload,
                // }
            })
            //  ======================= clear cart ===============
            .addCase(clearCart.pending, (state) => {
                state.loading = true;
                // return {
                //     ...state,
                //     loading: true,
                // }
            })
            .addCase(clearCart.fulfilled, (state, action) => {


                if (action.payload) {
                    state.loading = false;
                    state.cartItems = action.payload.items;
                    state.cartItemsList = action.payload.items;
                    state.totalCartAmount = action.payload.totalCartAmount;
                    state.totalTax = action.payload.totalTax;
                    state.totalCartItems = 0;
                    state.couponCodeApplied = action.payload.couponCodeApplied;

                    // return {
                    //     ...state,
                    //     loading: false,
                    //     cartItems: action.payload.items,
                    //     cartItemsList: action.payload.items,
                    //     totalCartAmount: action.payload.totalCartAmount,
                    //     totalTax: action.payload.totalTax,
                    //     totalCartItems: 0,
                    //     couponCodeApplied: action.payload.couponCodeApplied,
                    // }
                }
            })
            .addCase(clearCart.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                // return {
                //     ...state,
                //     loading: false,
                //     error: action.payload,
                // }
            })
            //  ======================= removing item from the cart ===============
            .addCase(removeFromCart.pending, (state) => {
                state.loading = true;
                // return {
                //     ...state,
                //     loading: true,
                // }
            })
            .addCase(removeFromCart.fulfilled, (state, action) => {

                if (action.payload) {
                    state.loading = false;
                    state.cartItems = action.payload.items;
                    state.totalCartAmount = action.payload.totalCartAmount;
                    state.totalTax = action.payload.totalTaxes;
                    state.couponCodeApplied = action.payload.couponCodeApplied;

                    // return {
                    //     ...state,
                    //     loading: false,
                    //     cartItems: action.payload.items,
                    //     totalCartAmount: action.payload.totalCartAmount,
                    //     totalTax: action.payload.totalTaxes,
                    //     couponCodeApplied: action.payload.couponCodeApplied,

                    // }
                }

            })
            .addCase(removeFromCart.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                // return {
                //     ...state,
                //     loading: false,
                //     error: action.payload,
                // }
            })
            //  ======================= updating qty in the cart ===============
            .addCase(updateQty.pending, (state) => {
                state.loading = true;
                // return {
                //     ...state,
                //     loading: true,
                // }
            })
            .addCase(updateQty.fulfilled, (state, action) => {
                if (action.payload) {

                    state.loading = false;
                    state.cartItems = action.payload.items;
                    state.totalCartAmount = action.payload.totalCartAmount;
                    state.totalTax = action.payload.totalTaxes;
                    state.couponCodeApplied = action.payload.couponCodeApplied;

                    // return {
                    //     ...state,
                    //     loading: false,
                    //     cartItems: action.payload.items,
                    //     totalCartAmount: action.payload.totalCartAmount,
                    //     totalTax: action.payload.totalTaxes,
                    //     couponCodeApplied: action.payload.couponCodeApplied,
                    // }
                }

            })
            .addCase(updateQty.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                // return {
                //     ...state,
                //     loading: false,
                //     error: action.payload,
                // }
            })
            //  ======================= merge cart ===============
            .addCase(mergeCart.pending, (state) => {
                state.loading = true;
                // return {
                //     ...state,
                //     loading: true,
                // }
            })
            .addCase(mergeCart.fulfilled, (state, action) => {

                if (action.payload) {

                    state.loading = false;
                    state.cartItems = action.payload.items;
                    state.totalCartAmount = action.payload.totalCartAmount;
                    state.totalTax = action.payload.totalTaxes;
                    state.couponCodeApplied = action.payload.couponCodeApplied;

                    // return {
                    //     ...state,
                    //     loading: false,
                    //     cartItems: action.payload.items,
                    //     totalCartAmount: action.payload.totalCartAmount,
                    //     totalTax: action.payload.totalTaxes,
                    //     couponCodeApplied: action.payload.couponCodeApplied
                    // }
                }

            })
            .addCase(mergeCart.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                // return {
                //     ...state,
                //     loading: false,
                //     error: action.payload,
                // }
            })
            //  ======================= coupon code validation ===============
            .addCase(applyFamilyCouponCode.pending, (state) => {
                state.validatingCouponCode = true
            })
            .addCase(applyFamilyCouponCode.fulfilled, (state, action) => {
                if (action.payload) {
                    const { message, couponCodeApplied, totalCartAmount, discountAmount, totalTax, discountType, discountPercentage } = action.payload
                   
                    state.validatingCouponCode = false;
                    state.couponCodeApplied = couponCodeApplied;
                    state.totalCartAmount = totalCartAmount;
                    state.totalTax = totalTax;
                    state.discountProgress = {
                        ...state.discountProgress,
                        discountAmount: discountAmount,
                        discountType: discountType,
                        discountPercentage: discountPercentage
                    }
                }

            })
            .addCase(applyFamilyCouponCode.rejected, (state, action) => {
                state.validatingCouponCode = false;
                state.error = action.payload;
            })
        //  ======================= pickle coupon code validation ===============
        // .addCase(applyPickleCouponCode.pending, (state) => {
        //     return {
        //         ...state,
        //         validatingCouponCode: true,
        //     }
        // })
        // .addCase(applyPickleCouponCode.fulfilled, (state, action) => {
        //     if (action.payload) {
        //         return {
        //             ...state,
        //             validatingCouponCode: false,
        //             totalCartAmount: action.payload.totalCartAmount,
        //             totalTax: action.payload.totalTax,
        //             couponCodeApplied: action.payload.couponCodeApplied,
        //         }
        //     }

        // })
        // .addCase(applyPickleCouponCode.rejected, (state, action) => {
        //     return {
        //         ...state,
        //         validatingCouponCode: false,
        //         error: action.payload,
        //     }
        // })
        //  ======================= additional discount coupon code validation ===============
        // .addCase(applyAdditionalCouponDiscount.pending, (state) => {
        //     return {
        //         ...state,
        //         validatingCouponCode: true,
        //     }
        // })
        // .addCase(applyAdditionalCouponDiscount.fulfilled, (state, action) => {
        //     if (action.payload) {
        //         return {
        //             ...state,
        //             validatingCouponCode: false,
        //             totalCartAmount: action.payload.totalCartAmount,
        //             totalTax: action.payload.totalTax,
        //             couponCodeApplied: action.payload.couponCodeApplied,
        //         }
        //     }

        // })
        // .addCase(applyAdditionalCouponDiscount.rejected, (state, action) => {
        //     return {
        //         ...state,
        //         validatingCouponCode: false,
        //         error: action.payload,
        //     }
        // })

        // for discount feature
        // .addCase(getDiscountProgress.pending, (state) => {
        //     state.loading = true;
        // })
        // .addCase(getDiscountProgress.fulfilled, (state, action) => {
        //     console.log('dddd', action.payload)
        //     state.loading = false;
        //     state.discountProgress = action.payload;
        // })
        // .addCase(getDiscountProgress.rejected, (state, action) => {
        //     state.loading = false;
        //     state.error = action.payload;
        // })

    }
})



export const { addToLocalCart, updateLocalCartQty, removeFromLocalCart, clearLocalCart } = cartSlice.actions;



export default cartSlice.reducer;



