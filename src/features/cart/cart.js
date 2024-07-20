import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


// extracting the wwight since weight is in different formats like 900 gm, 1 Ltr, 20 bags *1.8g=36g
function extractWeight(description) {
    // Remove all spaces from the description
    const cleanDesc = description.replace(/\s/g, '');
  
    // Regular expression to match the last number followed by 'g', 'kg', 'l', or 'ltr'
    const match = cleanDesc.match(/(\d+(?:\.\d+)?)(g|kg|l|ltr)$/i);
  
    if (match) {
      const value = parseFloat(match[1]);
      const unit = match[2].toLowerCase();
  
      switch (unit) {
        case 'kg':
          return value * 1000; // Convert kg to g
        case 'g':
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
        console.log('add to cart quantity', quantity)
        const { user } = getState();
        console.log(user, 'user')
        try {
            if (user.token) {
                console.log('from add to cart')
                // const token = JSON.parse(sessionStorage.getItem('token'));

                const response = await axios.post('http://localhost:4000/api/cart', { productId, quantity, productName },
                    {
                        headers: {
                            'Authorization': `Bearer ${user.token}`,
                            'Content-Type': 'application/json'
                        }
                    }
                )
                if (response.statusText === 'OK') {
                    return response.data;
                }
                // console.log('product', product)

            }
            else {
                console.log('from local add to cart ')
                console.log('localqty', quantity)
                dispatch(addToLocalCart({ productId, quantity, productName }));
                // return { productId, quantity, productName }
            }


        } catch (error) {
            console.log(error)
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
        console.log(user, 'userrrrrrrrrrrrrrr')
        try {
            if (user.token) {
                // const token = JSON.parse(sessionStorage.getItem('token'));
                const response = await axios.get(`http://localhost:4000/api/cart`,
                    {
                        headers: {
                            'Authorization': `Bearer ${user.token}`,
                            'Content-Type': 'application/json'
                        }
                    }
                );

                if (response.statusText === 'OK') {
                    const products = response.data.map(product => {
                        return {
                            nameUrl: product.productName,
                            quantity: product.quantity
                        }
                    });

                    const productDetails = await Promise.all(
                        products.map(async ({ nameUrl, quantity }) => {
                            const response = await axios.get(`http://localhost:8000/category/organic-honey/${nameUrl}`)
                            // console.log('ressss', response.data.product[0])
                            return { ...response.data.product[0], quantity }
                        })
                    );
                    // console.log(productDetails)
                    return productDetails;

                }
            } else {
                let localCart = [];
                const localCartData = localStorage.getItem('cart')
                if (localCartData && localCartData !== '[]') {
                    localCart = JSON.parse(localCartData);
                }
                // const localCart = JSON.parse(localStorage.getItem('cart') || []);
                // console.log(localCart, 'localcart')
                if (localCart.length > 0) {
                    // console.log('local storage items', localCartData)
                    const productDetails = await Promise.all(
                        localCart.map(async ({ quantity, productName }) => {
                            const response = await axios.get(`http://localhost:8000/category/organic-honey/${productName}`)
                            // console.log('ressss', response.data.product[0])
                            return { ...response.data.product[0], quantity }
                        })
                    );
                    return productDetails;
                } else {
                    return [];
                }

                // console.log('checkckkkkkkkkkkkkkk', savedCart)
            }


        } catch (error) {
            // console.log(error.response.data)
            // return rejectWithValue(error.response);
            console.log(error.response?.data || error.message)
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
                const response = await axios.delete('http://localhost:4000/api/cart',
                    {
                        headers: {
                            'Authorization': `Bearer ${user.token}`,
                            'Content-Type': 'application/json'
                        }
                    }
                )
                if (response.statusText === 'OK') {
                    return response.data;
                }
                // console.log('product', product)
                // console.log('clear cart', response)
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
                const response = await axios.delete(`http://localhost:4000/api/cart/${id}`,
                    {
                        headers: {
                            'Authorization': `Bearer ${user.token}`,
                            'Content-Type': 'application/json'
                        }
                    }
                )
                if (response.statusText === 'OK') {
                    console.log('remove cart', response.data)
                    return response.data;
                }
                // console.log('product', product)
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
        console.log('remove cart', product)
        const { user } = getState();
        console.log(user.token, 'updateuser')
        try {
            // const token = JSON.parse(sessionStorage.getItem('token'));
            if (user.token) {
                const response = await axios.put(`http://localhost:4000/api/cart/updateQuantity/${product.productId}`, { action: product.type },
                    {
                        headers: {
                            'Authorization': `Bearer ${user.token}`,
                            'Content-Type': 'application/json'
                        }
                    }
                )
                if (response.statusText === 'OK') {
                    return response.data;
                    // console.log('update qty...', response.data)
                }
                // console.log('product', product)
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
        console.log('localcarttt', localData);
        try {
            if (user.token) {
                const response = await axios.post('http://localhost:4000/api/cart/merge', localData,
                    {
                        headers: {
                            'Authorization': `Bearer ${user.token}`,
                            'Content-Type': 'application/json'
                        }
                    }
                )
                console.log('cartemerge response----', response)
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
}

export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToLocalCart: (state, action) => {
            // console.log('log out', action.payload)
            const localCart = JSON.parse(localStorage.getItem('cart'))
            if (localCart && localCart.length > 0) {
                state.cartItems = localCart;
            }
            console.log('localllllllllcart', localCart)
            const { productId, quantity, productName } = action.payload;
            // console.log(state.cartItems)

            const existingItem = state.cartItems?.find(item => item.productId === productId);

            console.log(existingItem)
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

            console.log(action.payload, 'lllllllllll')
            const newCartItems = localCart.map((curItem) => {
                if (curItem.productId === productId) {
                    let newQty;
                    if (type === 'increase') {
                        newQty = curItem.quantity + 1;

                    }
                    else if (type === 'decrease') {
                        console.log(curItem.quantity, 'decfrese')
                        // newQty = curItem.quantity - 1;
                        newQty = Math.max(curItem.quantity - 1, 1)
                    }
                    console.log('newQtyyyyyyyyyy', newQty)
                    return { ...curItem, quantity: newQty }
                } else {
                    // console.log('adfasdfasdfasd')
                    return {
                        ...curItem,
                    }
                }
            })
            console.log(newCartItems)
            localStorage.setItem('cart', JSON.stringify(newCartItems));

            return {
                ...state,
                cartItems: newCartItems,
            }

        },
        removeFromLocalCart: (state, action) => {
            const localCart = JSON.parse(localStorage.getItem('cart'));
            const updatedCart = localCart.filter((curItem) => curItem.productId !== action.payload);
            console.log(updatedCart)
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
                console.log(action.payload, 'cartcheck');
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
                console.log('checkingggggggg', action.payload)
                let totalPrice;
                let totalWeight;
                let totalQty;

                if (action.payload?.length > 0) {

                    totalQty = action.payload.reduce((total, product) => total + product.quantity, 0);

                    totalPrice = action.payload.reduce((total, product) => {
                        const discountedPrice = product.price * (1 - product["discount "] / 100);
                        return total + discountedPrice * product.quantity;
                    }, 0);

                    totalWeight = action.payload.reduce((total, product) => {
                        const weight = extractWeight(product.weight);
                        return total + (isNaN(weight) ? 0 : weight);
                    }, 0)
                }
                console.log('total weight', typeof JSON.stringify(totalWeight))

                return {
                    ...state,
                    loading: false,
                    cartItemsList: action.payload,
                    totalCartItems: totalQty,
                    totalCartAmount: totalPrice,
                    totalWeight: JSON.stringify(totalWeight)
                }
            })
            .addCase(getAllCartItems.rejected, (state, action) => {
                console.log('error', action.payload)
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
                // console.log(action.payload, 'cartcheck')

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
                console.log(action.payload, 'removethunk')
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
                console.log(action.payload, 'updatefro thunk')
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
                console.log(action.payload, 'mergecartdatapayload')
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
