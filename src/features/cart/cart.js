import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import api from "../../config/axiosConfig";
// import { calculateProgressiveDiscount } from "../../helper/discountCalculator";

const apiUrl = import.meta.env.VITE_BACKEND_URL;



// extracting the wwight since weight is in different formats like 900 gm, 1 Ltr, 20 bags *1.8g=36g
// function extractWeight(description) {
//     // Remove all spaces from the description
//     const cleanDesc = description.replace(/\s/g, '');

//     // Regular expression to match the last number followed by 'g', 'kg', 'l', or 'ltr'
//     const match = cleanDesc.match(/(\d+(?:\.\d+)?)(g|kg|l|ltr|gm)$/i);
//     if (match) {
//         const value = parseFloat(match[1]);
//         const unit = match[2].toLowerCase();

//         switch (unit) {
//             case 'kg':
//                 return value * 1000; // Convert kg to g
//             case 'g':
//                 return value;
//             case 'gm':
//                 return value;
//             case 'l':
//             case 'ltr':
//                 return value * 1000; // Assume 1 liter = 1000g (for water-based products)
//             default:
//                 return null;
//         }
//     }

//     return null; // Return null if no match is found
// }



// for adding item to the cart 
export const addToCart = createAsyncThunk(
    'cart/addToCart',
    async ({ productId, quantity, productName }, { rejectWithValue, getState, dispatch }) => {
        const { auth } = getState();
        try {
            if (auth.user) {
                // const token = JSON.parse(sessionStorage.getItem('token'));

                const response = await api.post(`/api/cart`, { productId, quantity, productName }

                )
                if (response.status === 200) {
                    return response.data;
                }

            }
            else {
                dispatch(addToLocalCart({ productId, quantity, productName }));
                // return { productId, quantity, productName }
            }


        } catch (error) {
            return rejectWithValue({
                message: err.message,
                status: err.response?.status
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
            if (auth.user) {
                const response = await api.get(`/api/cart`,

                );
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
                    // const productDetails = await Promise.all(
                    //     products.map(async ({ nameUrl, quantity }) => {
                    //         const response = await axios.get(`${apiUrl}/products/organic-honey/${nameUrl}`)
                    //         return { ...response.data.product, quantity }
                    //     })
                    // );

                    // const result = await calculateProgressiveDiscount(productDetails);
                    // return { productDetails, result };

                    // return { productDetails, totalCartAmount: response.data.totalCartAmount, totalTax: response.data.totalTaxes, couponCodeApplied: response.data.couponCodeApplied }

                }
            } else {
                let localCart = [];
                const localCartData = localStorage.getItem('cart')
                if (localCartData && localCartData !== '[]') {
                    localCart = JSON.parse(localCartData);
                }
                // const localCart = JSON.parse(localStorage.getItem('cart') || []);
                if (localCart.length > 0) {

                    const responseData = await api.post('api/cart/cart-details', { cartItems: localCart })
                    if (responseData.status === 200) {
                        const { productDetails, totals } = responseData.data
                        return { productDetails, result: totals };
                    }

                    // const productDetails = await Promise.all(
                    //     localCart.map(async ({ quantity, productName }) => {
                    //         const response = await axios.get(`${apiUrl}/products/organic-honey/${productName}`)
                    //         return { ...response.data.product, quantity }
                    //     })
                    // );
                    // const result = await calculateProgressiveDiscount(productDetails);
                    // let totalPrice = productDetails.reduce((total, product) => {
                    //     const discountedPrice = product.price * (1 - product.discount / 100);
                    //     return Math.round(total + discountedPrice * product.quantity);
                    // }, 0);


                    // let totalTax = productDetails.reduce((total, product) => {
                    //     const discountedPrice = product.price * (1 - product.discount / 100);
                    //     const totalAmountWithTax = discountedPrice * product.quantity;

                    //     // Calculate the amount without tax
                    //     const amountWithoutTax = totalAmountWithTax / (1 + product.tax / 100);

                    //     // Calculate the tax amount
                    //     const taxAmount = totalAmountWithTax - amountWithoutTax;

                    //     return Math.round(total + taxAmount);
                    // }, 0);

                    // // calculate the discounts applied so far
                    // const result = await calculateProgressiveDiscount(localCart);

                    // return { productDetails, totalCartAmount: totalPrice, totalTax: totalTax, couponCodeApplied: [], discountData: result }
                    // return { productDetails, result };
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
            // const token = JSON.parse(sessionStorage.getItem('token'));
            if (auth.user) {
                const response = await api.delete(`/api/cart`,

                )
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
            // const token = JSON.parse(sessionStorage.getItem('token'));
            if (auth.user) {
                const response = await api.delete(`/api/cart/${productName}`,

                )
                if (response.status === 200) {
                    return response.data;
                }
            } else {
                dispatch(removeFromLocalCart(productName));
            }

        } catch (error) {
            return rejectWithValue({
                message: err.message,
                status: err.response?.status
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
            // const token = JSON.parse(sessionStorage.getItem('token'));

            if (auth.user) {
                const response = await api.put(`/api/cart/updateQuantity/${product.productName}`, { action: product.type },

                )
                if (response.status === 200) {
                    return response.data;
                }
            } else {
                dispatch(updateLocalCartQty(product))
            }

        } catch (error) {
            return rejectWithValue({
                message: err.message,
                status: err.response?.status
            });
        }
    }
)


export const mergeCart = createAsyncThunk(
    'cart/mergeCart',
    async (cart, { rejectWithValue, getState, dispatch }) => {
        const { auth } = getState();
        try {
            if (auth.user) {
                const response = await api.post(`/api/cart/merge`, cart,

                )
                return response.data;

            }
        } catch (error) {
            return rejectWithValue({
                message: err.message,
                status: err.response?.status
            });
        }
    }
)


// family coupon code validation logic
export const getCouponCodeValidate = createAsyncThunk(
    'cart/getCouponCodeValidate',
    async (data, { rejectWithValue, getState }) => {
        // const { auth } = getState();
        try {
            // if (auth.user) {

            // }
            const response = await axios.post(`${apiUrl}/api/validate/family/coupon-code`, data,

            )
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data.error);
        }
    }
)


export const applyPickleCouponCode = createAsyncThunk(
    'cart/applyPickleCouponCode',
    async (payload, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${apiUrl}/api/validate/pickle/coupon-code`, payload);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data.error);
        }
    }
);
export const applyAdditionalCouponDiscount = createAsyncThunk(
    'cart/applyAdditionalCouponDiscount',
    async (payload, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${apiUrl}/api/validate/additional/coupon/discount`, payload);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data.error);
        }
    }
);


// family coupon code validation logic
export const applyReferralCouponDiscount = createAsyncThunk(
    'cart/applyReferralCouponDiscount',
    async (data, { rejectWithValue, getState }) => {
        const { auth } = getState();
        try {
            if (auth.user) {
                const response = await api.post(`/api/validate/referral/coupon/discount`, data)
                return response.data;
            } else {
                return rejectWithValue('Please login to apply referral code')
            }

        } catch (error) {
            return rejectWithValue(error.response.data.error);
        }
    }
)


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
            return {
                ...state,
                cartItems: updatedCart,
                couponCodeApplied: [],
            }
        },
        clearLocalCart: (state) => {
            localStorage.removeItem('cart');
            return {
                ...state,
                cartItems: [],
                cartItemsList: [],
                couponCodeApplied: [],
                totalCartItems: 0,
                totalCartAmount: 0,

            }
        },


    },
    extraReducers: (builder) => {
        builder
            //========================= for adding items into the cart =================
            .addCase(addToCart.pending, (state) => {
                return {
                    ...state,
                    loading: true,
                }
            })
            .addCase(addToCart.fulfilled, (state, action) => {
                if (action.payload && action.payload.items.length > 0) {
                    return {
                        ...state,
                        loading: false,
                        cartItems: action.payload.items,
                        totalCartAmount: action.payload.totalCartAmount,
                        totalTax: action.payload.totalTaxes,
                        couponCodeApplied: action.payload.couponCodeApplied,
                    }
                }

            })
            .addCase(addToCart.rejected, (state, action) => {
                return {
                    ...state,
                    loading: false,
                    error: action.payload,
                }
            })
            // ============= getting cart arary ============= 
            .addCase(getAllCartItems.pending, (state) => {
                return {
                    ...state,
                    loading: true,
                }
            })
            .addCase(getAllCartItems.fulfilled, (state, action) => {
                let totalQty;

                if (action.payload.productDetails?.length > 0) {

                    totalQty = action.payload.productDetails.reduce((total, product) => total + product.quantity, 0);

                }

                return {
                    ...state,
                    loading: false,
                    cartItemsList: action.payload?.productDetails || [],
                    totalCartItems: totalQty || 0,
                    // totalCartAmount: action.payload?.totalCartAmount || 0,
                    totalCartAmount: action.payload?.result?.finalAmount || 0,
                    // totalWeight: JSON.stringify(totalWeight),
                    totalTax: action.payload?.result?.totalTax || 0,
                    couponCodeApplied: action.payload?.couponCodeApplied || [],
                    // ADD THESE NEW FIELDS
                    discountProgress: action.payload?.result || {}

                    // originalAmount: action.payload?.originalAmount || 0,
                    // discountAmount: action.payload?.discountAmount || 0,
                    // progressiveDiscountApplied: action.payload?.progressiveDiscountApplied || 'none'

                }
            })
            .addCase(getAllCartItems.rejected, (state, action) => {
                return {
                    ...state,
                    loading: false,
                    error: action.payload,
                }
            })
            //  ======================= clear cart ===============
            .addCase(clearCart.pending, (state) => {
                return {
                    ...state,
                    loading: true,
                }
            })
            .addCase(clearCart.fulfilled, (state, action) => {


                if (action.payload) {
                    return {
                        ...state,
                        loading: false,
                        cartItems: action.payload.items,
                        cartItemsList: action.payload.items,
                        totalCartAmount: action.payload.totalCartAmount,
                        totalTax: action.payload.totalTax,
                        totalCartItems: 0,
                        couponCodeApplied: action.payload.couponCodeApplied,
                    }
                }
            })
            .addCase(clearCart.rejected, (state, action) => {
                return {
                    ...state,
                    loading: false,
                    error: action.payload,
                }
            })
            //  ======================= removing item from the cart ===============
            .addCase(removeFromCart.pending, (state) => {
                return {
                    ...state,
                    loading: true,
                }
            })
            .addCase(removeFromCart.fulfilled, (state, action) => {

                if (action.payload) {
                    return {
                        ...state,
                        loading: false,
                        cartItems: action.payload.items,
                        totalCartAmount: action.payload.totalCartAmount,
                        totalTax: action.payload.totalTaxes,
                        couponCodeApplied: action.payload.couponCodeApplied,

                    }
                }

            })
            .addCase(removeFromCart.rejected, (state, action) => {
                return {
                    ...state,
                    loading: false,
                    error: action.payload,
                }
            })
            //  ======================= updating qty in the cart ===============
            .addCase(updateQty.pending, (state) => {
                return {
                    ...state,
                    loading: true,
                }
            })
            .addCase(updateQty.fulfilled, (state, action) => {
                if (action.payload) {
                    return {
                        ...state,
                        loading: false,
                        cartItems: action.payload.items,
                        totalCartAmount: action.payload.totalCartAmount,
                        totalTax: action.payload.totalTaxes,
                        couponCodeApplied: action.payload.couponCodeApplied,


                    }
                }

            })
            .addCase(updateQty.rejected, (state, action) => {
                return {
                    ...state,
                    loading: false,
                    error: action.payload,
                }
            })
            //  ======================= merge cart ===============
            .addCase(mergeCart.pending, (state) => {
                return {
                    ...state,
                    loading: true,
                }
            })
            .addCase(mergeCart.fulfilled, (state, action) => {

                if (action.payload) {
                    return {
                        ...state,
                        loading: false,
                        cartItems: action.payload.items,
                        totalCartAmount: action.payload.totalCartAmount,
                        totalTax: action.payload.totalTaxes,
                        couponCodeApplied: action.payload.couponCodeApplied
                    }
                }

            })
            .addCase(mergeCart.rejected, (state, action) => {
                return {
                    ...state,
                    loading: false,
                    error: action.payload,
                }
            })
            //  ======================= coupon code validation ===============
            .addCase(getCouponCodeValidate.pending, (state) => {
                return {
                    ...state,
                    validatingCouponCode: true,
                }
            })
            .addCase(getCouponCodeValidate.fulfilled, (state, action) => {
                if (action.payload) {
                    return {
                        ...state,
                        validatingCouponCode: false,
                        // isCouponCodeApplied: action.payload.isCouponCodeApplied
                        couponCodeApplied: action.payload.couponCodeApplied,

                    }
                }

            })
            .addCase(getCouponCodeValidate.rejected, (state, action) => {
                return {
                    ...state,
                    validatingCouponCode: false,
                    error: action.payload,
                }
            })
            //  ======================= pickle coupon code validation ===============
            .addCase(applyPickleCouponCode.pending, (state) => {
                return {
                    ...state,
                    validatingCouponCode: true,
                }
            })
            .addCase(applyPickleCouponCode.fulfilled, (state, action) => {
                if (action.payload) {
                    return {
                        ...state,
                        validatingCouponCode: false,
                        totalCartAmount: action.payload.totalCartAmount,
                        totalTax: action.payload.totalTax,
                        couponCodeApplied: action.payload.couponCodeApplied,
                    }
                }

            })
            .addCase(applyPickleCouponCode.rejected, (state, action) => {
                return {
                    ...state,
                    validatingCouponCode: false,
                    error: action.payload,
                }
            })
            //  ======================= additional discount coupon code validation ===============
            .addCase(applyAdditionalCouponDiscount.pending, (state) => {
                return {
                    ...state,
                    validatingCouponCode: true,
                }
            })
            .addCase(applyAdditionalCouponDiscount.fulfilled, (state, action) => {
                if (action.payload) {
                    return {
                        ...state,
                        validatingCouponCode: false,
                        totalCartAmount: action.payload.totalCartAmount,
                        totalTax: action.payload.totalTax,
                        couponCodeApplied: action.payload.couponCodeApplied,
                    }
                }

            })
            .addCase(applyAdditionalCouponDiscount.rejected, (state, action) => {
                return {
                    ...state,
                    validatingCouponCode: false,
                    error: action.payload,
                }
            })

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



