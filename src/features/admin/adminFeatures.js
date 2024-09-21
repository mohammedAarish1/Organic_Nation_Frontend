// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import axios from "axios";

// const apiUrl = import.meta.env.VITE_BACKEND_URL;


// // export const adminLogin = createAsyncThunk(
// //     'admin/adminLogin',
// //     async (data, { rejectWithValue }) => {
// //         try {
// //             const response = await axios.post(`${apiUrl}/api/admin/login`, data);

// //             if (response.status === 200) {
// //                 return response.data;
// //             }
// //         } catch (error) {
// //             return rejectWithValue(error.response.data)
// //         }
// //     }
// // );



// const initialState = {
//     orders: [],
//     products: [],
//     queries: [],
//     users: [],
//     currentView: 'orders', // 'orders', 'products', 'queries', or 'users'
//     searchTerm: '',
//     currentPage: 1,
//     itemsPerPage: 8,
//     sortDirection: 'desc',
//     loading: false,
//     error: null,
// };

// const adminFeatures = createSlice({
//     name: 'adminFeatures',
//     initialState,
//     reducers: {
//         setCurrentView: (state, action) => {
//             state.currentView = action.payload;
//             state.currentPage = 1;
//             state.searchTerm = '';
//         },
//         setSearchTerm: (state, action) => {
//             state.searchTerm = action.payload;
//             state.currentPage = 1;
//         },
//         setSortDirection: (state, action) => {
//             state.sortDirection = action.payload;
//         },
//         setCurrentPage: (state, action) => {
//             state.currentPage = action.payload;
//         },
//     },



// })


// export const { setCurrentView, setSearchTerm, setSortDirection, setCurrentPage } = adminFeatures.actions;

// // Selector for filtered and paginated data
// export const selectFilteredData = (state) => {
//     const { currentView, searchTerm, sortDirection, currentPage, itemsPerPage } = state.adminData;
//     let data = state.adminFeatures[currentView];

//     // Filter
//     if (searchTerm) {
//         data = data.filter(item =>
//             Object.values(item).some(value =>
//                 String(value).toLowerCase().includes(searchTerm.toLowerCase())
//             )
//         );
//     }

//     // Sort
//     data = [...data].sort((a, b) => {
//         const dateA = new Date(a.createdAt);
//         const dateB = new Date(b.createdAt);
//         return sortDirection === 'asc' ? dateA - dateB : dateB - dateA;
//     });

//     // Paginate
//     const startIndex = (currentPage - 1) * itemsPerPage;
//     const paginatedData = data.slice(startIndex, startIndex + itemsPerPage);

//     return {
//         data: paginatedData,
//         totalPages: Math.ceil(data.length / itemsPerPage),
//     };
// };


// export default adminFeatures.reducer;