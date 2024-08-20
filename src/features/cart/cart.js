import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const apiUrl = import.meta.env.VITE_BACKEND_URL;



// extracting the wwight since weight is in different formats like 900 gm, 1 Ltr, 20 bags *1.8g=36g
function extractWeight(description) {
    // Remove all spaces from the description
    const cleanDesc = description.replace(/\s/g, '');

    // Regular expression to match the last number followed by 'g', 'kg', 'l', or 'ltr'
    const match = cleanDesc.match(/(\d+(?:\.\d+)?)(g|kg|l|ltr|gm)$/i);
    if (match) {
        const value = parseFloat(match[1]);
        const unit = match[2].toLowerCase();

        switch (unit) {
            case 'kg':
                return value * 1000; // Convert kg to g
            case 'g':
                return value;
            case 'gm':
                return value;
            case 'l':
            case 'ltr':
                return value * 1000; // Assume 1 liter = 1000g (for water-based products)
            default:
                return null;
        }
    }

    return null; // Return null if no match is found
}



// for adding item to the cart 
export const addToCart = createAsyncThunk(
    'cart/addToCart',
    async ({ productId, quantity, productName }, { rejectWithValue, getState, dispatch }) => {
        const { user } = getState();
        try {
            if (user.token) {
                // const token = JSON.parse(sessionStorage.getItem('token'));

                const response = await axios.post(`${apiUrl}/api/cart`, { productId, quantity, productName },
                    {
                        headers: {
                            'Authorization': `Bearer ${user.token}`,
                            'Content-Type': 'application/json'
                        }
                    }
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
        const { user } = getState();
        try {
            if (user.token) {
                // const token = JSON.parse(sessionStorage.getItem('token'));
                const response = await axios.get(`${apiUrl}/api/cart`,
                    {
                        headers: {
                            'Authorization': `Bearer ${user.token}`,
                            'Content-Type': 'application/json'
                        }
                    }
                );

                if (response.status === 200) {
                    const products = response.data.map(product => {
                        return {
                            nameUrl: product.productName,
                            quantity: product.quantity
                        }
                    });

                    const productDetails = await Promise.all(
                        products.map(async ({ nameUrl, quantity }) => {
                            const response = await axios.get(`${apiUrl}/category/organic-honey/${nameUrl}`)
                            return { ...response.data.product, quantity }
                        })
                    );
                    return productDetails;

                }
            } else {
                let localCart = [];
                const localCartData = localStorage.getItem('cart')
                if (localCartData && localCartData !== '[]') {
                    localCart = JSON.parse(localCartData);
                }
                // const localCart = JSON.parse(localStorage.getItem('cart') || []);
                if (localCart.length > 0) {
                    const productDetails = await Promise.all(
                        localCart.map(async ({ quantity, productName }) => {
                            const response = await axios.get(`${apiUrl}/category/organic-honey/${productName}`)
                            return { ...response.data.product, quantity }
                        })
                    );
                    return productDetails;
                } else {
                    return [];
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
        const { user } = getState();

        try {
            // const token = JSON.parse(sessionStorage.getItem('token'));
            if (user.token) {
                const response = await axios.delete(`${apiUrl}/api/cart`,
                    {
                        headers: {
                            'Authorization': `Bearer ${user.token}`,
                            'Content-Type': 'application/json'
                        }
                    }
                )
                if (response.status === 200) {
                    return response.data;
                }
            } else {
                dispatch(clearLocalCart());
            }

        } catch (error) {
            return rejectWithValue(error)
        }
    }
)


//  for removing the single item from the cart 
export const removeFromCart = createAsyncThunk(
    'cart/removeFromCart',
    async (id, { rejectWithValue, getState, dispatch }) => {
        const { user } = getState();
        try {
            // const token = JSON.parse(sessionStorage.getItem('token'));
            if (user.token) {
                const response = await axios.delete(`${apiUrl}/api/cart/${id}`,
                    {
                        headers: {
                            'Authorization': `Bearer ${user.token}`,
                            'Content-Type': 'application/json'
                        }
                    }
                )
                if (response.status === 200) {
                    return response.data;
                }
            } else {
                dispatch(removeFromLocalCart(id));
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
        const { user } = getState();
        try {
            // const token = JSON.parse(sessionStorage.getItem('token'));
            if (user.token) {
                const response = await axios.put(`${apiUrl}/api/cart/updateQuantity/${product.productId}`, { action: product.type },
                    {
                        headers: {
                            'Authorization': `Bearer ${user.token}`,
                            'Content-Type': 'application/json'
                        }
                    }
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
    async (localData, { rejectWithValue, getState, dispatch }) => {
        const { user } = getState();
        try {
            if (user.token) {
                const response = await axios.post(`${apiUrl}/api/cart/merge`, localData,
                    {
                        headers: {
                            'Authorization': `Bearer ${user.token}`,
                            'Content-Type': 'application/json'
                        }
                    }
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



const initialState = {
    cartItems: [],  // it will contain only product id, qty and name-url
    cartItemsList: [], // it will contain all the product detail + qty
    loading: false,
    error: false,
    totalCartItems: 0,
    totalCartAmount: 0,
    totalWeight: '',
    // totalTax: 0,
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

            const existingItem = state.cartItems?.find(item => item.productId === productId);

            if (existingItem) {
                existingItem.quantity += quantity;
                // existingItem.quantity += quantity;
            } else {

                state.cartItems.push({ productId, quantity, productName })

            }
            localStorage.setItem('cart', JSON.stringify(state.cartItems));
        },
        updateLocalCartQty: (state, action) => {

            const localCart = JSON.parse(localStorage.getItem('cart'));
            const { productId, type } = action.payload;

            const newCartItems = localCart.map((curItem) => {
                if (curItem.productId === productId) {
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
            }

        },
        removeFromLocalCart: (state, action) => {
            const localCart = JSON.parse(localStorage.getItem('cart'));
            const updatedCart = localCart.filter((curItem) => curItem.productId !== action.payload);
            localStorage.setItem('cart', JSON.stringify(updatedCart));
            return {
                ...state,
                cartItems: updatedCart,
            }
        },
        clearLocalCart: (state) => {
            localStorage.removeItem('cart');
            return {
                ...state,
                cartItems: [],
                cartItemsList: [],
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
                if (action.payload && action.payload.length > 0) {
                    return {
                        ...state,
                        loading: false,
                        cartItems: action.payload,
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
                let totalPrice;
                let totalWeight;
                let totalQty;
                let totalTax;

                if (action.payload?.length > 0) {

                    totalQty = action.payload.reduce((total, product) => total + product.quantity, 0);

                    totalPrice = action.payload.reduce((total, product) => {
                        const discountedPrice = product.price * (1 - product.discount / 100);
                        return Math.round(total + discountedPrice * product.quantity);
                    }, 0);

                    totalWeight = action.payload.reduce((total, product) => {
                        const weight = extractWeight(product.weight);
                        return total + (isNaN(weight) ? 0 : weight);
                    }, 0);

                    totalTax = action.payload.reduce((total, product) => {
                        const discountedPrice = product.price * (1 - product.discount / 100);
                        const totalAmountWithTax = discountedPrice * product.quantity;

                        // Calculate the amount without tax
                        const amountWithoutTax = totalAmountWithTax / (1 + product.tax / 100);

                        // Calculate the tax amount
                        const taxAmount = totalAmountWithTax - amountWithoutTax;

                        return Math.round(total + taxAmount);
                    }, 0);
                }

                return {
                    ...state,
                    loading: false,
                    cartItemsList: action.payload,
                    totalCartItems: totalQty,
                    totalCartAmount: totalPrice,
                    totalWeight: JSON.stringify(totalWeight),
                    totalTax: totalTax
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
                        cartItems: action.payload,
                        cartItemsList: action.payload,
                        totalCartAmount: 0,
                        totalCartItems: 0,
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
                        cartItems: action.payload,
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
                        cartItems: action.payload,
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
                        cartItems: action.payload,
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
    }
})

// export const {addToCart,  increaseProductQty, decreaseProductQty, removeFromCart, clearCart, updateTotalCartItemsandPrice } = cartSlice.actions;
// export const { updateTotalCartPrice } = cartSlice.actions;

export const { addToLocalCart, updateLocalCartQty, removeFromLocalCart, clearLocalCart } = cartSlice.actions;



export default cartSlice.reducer;
