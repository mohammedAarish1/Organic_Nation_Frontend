import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../config/axiosConfig";

// Async Thunks
export const fetchWishlist = createAsyncThunk(
  "wishlist/fetchWishlist",
  async (_, { rejectWithValue, getState }) => {
    try {
      const { auth } = getState();
      if (auth.user) {
        const response = await api.get(`/api/orders/all/wish-list`);
        return response.data;
      }
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch wishlist"
      );
    }
  }
);


export const clearWishlist = createAsyncThunk(
  "wishlist/clearWishlist",
  async (_, { rejectWithValue, getState }) => {
    try {
      const { auth } = getState();
      if (auth.user) {
        const response = await api.delete(`/api/orders/wish-list/clear`);
        return response.data;
      }
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch wishlist"
      );
    }
  }
);

// export const fetchWishlistProducts = createAsyncThunk(
//   "wishlist/fetchWishlistProducts",
//   async (_, { rejectWithValue, getState }) => {
//     try {
//       const { auth } = getState();
//       if (auth.user) {
//         const response = await api.get(`/api/orders/all/wish-list/products`);
//         return response.data;
//       }
//     } catch (error) {
//       return rejectWithValue(
//         error.response?.data?.message || "Failed to fetch wishlist Products"
//       );
//     }
//   }
// );

export const toggleWishlistItem = createAsyncThunk(
  "wishlist/toggle",
  async ({ productId, isInWishlist }, { rejectWithValue, getState }) => {
    try {
      const { auth } = getState();
      if (auth.user) {
        if (!isInWishlist) {
          const response = await api.post(
            `/api/orders/add-to-wishlist/${productId}`
          );
          return response.data;
        } else {
          const response = await api.delete(`/api/orders/wish-list/remove/${productId}`);
          return response.data;

        }
      }
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update wishlist"
      );
    }
  }
);

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: {
    items: [],
    wishlistProducts: [],
    loading: false,
    error: null,
  },
  reducers: {
    resetWishlist: (state) => {
      state.items = [];
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Wishlist
      .addCase(fetchWishlist.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWishlist.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.wishlist;
        state.wishlistProducts = action.payload.wishlistProducts;
      })
      .addCase(fetchWishlist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // fetch wishlist products
    //   .addCase(fetchWishlistProducts.pending, (state) => {
    //     state.loading = true;
    //     state.error = null;
    //   })
    //   .addCase(fetchWishlistProducts.fulfilled, (state, action) => {
    //     state.loading = false;
    //     state.wishlistProducts = action.payload;
    //   })
    //   .addCase(fetchWishlistProducts.rejected, (state, action) => {
    //     state.loading = false;
    //     state.error = action.payload;
    //   })

      // Toggle Wishlist
      .addCase(toggleWishlistItem.pending, (state) => {
        state.loading = true;
      })
      .addCase(toggleWishlistItem.fulfilled, (state, action) => {
        state.loading = false;
        state.items=action.payload.wishlist
        state.wishlistProducts=action.payload.wishlistProducts
        // const { productId, action: actionType } = action.payload;

        // if (actionType === "remove") {
        //   state.items = state.items.filter((item) => item._id !== productId);
        // }
        // For 'add', we'll refetch to get full product details
      })
      .addCase(toggleWishlistItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Clear Wishlist
      .addCase(clearWishlist.fulfilled, (state) => {
        state.items = [];
        state.wishlistProducts=[];
        state.loading = false;
      });
  },
});

export const { resetWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
