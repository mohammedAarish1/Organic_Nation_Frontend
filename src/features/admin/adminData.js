import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const apiUrl = import.meta.env.VITE_BACKEND_URL;

// get all orders 
export const getTotalOrders = createAsyncThunk(
    'adminData/getTotalOrders',
    async (_, { rejectWithValue }) => {
        const adminToken = JSON.parse(sessionStorage.getItem('adminToken'));
        try {
            const response = await axios.get(`${apiUrl}/api/admin/orders`, {
                headers: {
                    'Authorization': `Bearer ${adminToken}`,
                    'Content-Type': 'application/json'
                }
            })

            return response.data;
        } catch (error) {
            if (error.response && error.response.data) {
                return rejectWithValue(error.response.data);
            } else {
                return rejectWithValue(error.message);
            }
        }
    }
)
// get all users
export const getAllUsers = createAsyncThunk(
    'adminData/getAllUsers',
    async (_, { rejectWithValue }) => {
        const adminToken = JSON.parse(sessionStorage.getItem('adminToken'));
        try {
            const response = await axios.get(`${apiUrl}/api/admin/users`, {
                headers: {
                    'Authorization': `Bearer ${adminToken}`,
                    'Content-Type': 'application/json'
                }
            })

            return response.data;
        } catch (error) {
            if (error.response && error.response.data) {
                return rejectWithValue(error.response.data);
            } else {
                return rejectWithValue(error.message);
            }
        }
    }
)
// get all users queris
export const getAllUserQueries = createAsyncThunk(
    'adminData/getAllUserQueries',
    async (_, { rejectWithValue }) => {
        const adminToken = JSON.parse(sessionStorage.getItem('adminToken'));
        try {
            const response = await axios.get(`${apiUrl}/api/admin/queries`, {
                headers: {
                    'Authorization': `Bearer ${adminToken}`,
                    'Content-Type': 'application/json'
                }
            })

            return response.data;
        } catch (error) {
            if (error.response && error.response.data) {
                return rejectWithValue(error.response.data);
            } else {
                return rejectWithValue(error.message);
            }
        }
    }
)


// generate invoice
export const generateInvoice = createAsyncThunk(
    'adminData/generateInvoice',
    async (orderId, { rejectWithValue }) => {
        const adminToken = JSON.parse(sessionStorage.getItem('adminToken'));
        try {
            const response = await axios.post(
                `${apiUrl}/api/admin/orders/invoice`,
                { orderId },
                {
                    headers: {
                        'Authorization': `Bearer ${adminToken}`,
                        'Content-Type': 'application/json'
                    },
                    responseType: 'blob' // Change back to 'blob'
                }
            );

            const blob = new Blob([response.data], { type: 'application/pdf' });
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `invoice-${orderId}.pdf`);
            document.body.appendChild(link);
            link.click();
            link.remove();
            window.URL.revokeObjectURL(url);

            return { success: true, message: 'Invoice generated successfully' };
        } catch (error) {
            return rejectWithValue(error.response?.data || 'Failed to generate invoice');
        }
    }
);

// update order status 
export const updateOrderStatus = createAsyncThunk(
    'adminData/updateOrderStatus',
    async (data, { rejectWithValue }) => {
        const adminToken = JSON.parse(sessionStorage.getItem('adminToken'));
        try {
            const response = await axios.put(`${apiUrl}/api/admin/orders/update-status`, data, {
                headers: {
                    'Authorization': `Bearer ${adminToken}`,
                    'Content-Type': 'application/json'
                }
            })

            // return response.data;
        } catch (error) {
            if (error.response && error.response.data) {
                return rejectWithValue(error.response.data);
            } else {
                return rejectWithValue(error.message);
            }
        }
    }
)


// update payment status 
export const updatePaymentStatus = createAsyncThunk(
    'adminData/updatePaymentStatus',
    async (data, { rejectWithValue }) => {
        const adminToken = JSON.parse(sessionStorage.getItem('adminToken'));
        try {
            const response = await axios.put(`${apiUrl}/api/admin/orders/update/payment-status`, data, {
                headers: {
                    'Authorization': `Bearer ${adminToken}`,
                    'Content-Type': 'application/json'
                }
            })
            // return response.data;
        } catch (error) {
            if (error.response && error.response.data) {
                return rejectWithValue(error.response.data);
            } else {
                return rejectWithValue(error.message);
            }
        }
    }
)

// add a new product in the database 
export const addNewProductInDatabase = createAsyncThunk(
    'adminData/addNewProductInDatabase',
    async (data, { rejectWithValue }) => {
        const adminToken = JSON.parse(sessionStorage.getItem('adminToken'));
        try {
            const response = await axios.post(`${apiUrl}/api/admin/products/add`, data, {
                headers: {
                    'Authorization': `Bearer ${adminToken}`,
                    'Content-Type': 'multipart/form-data'  // Changed this line
                }
            });

            // return response.data;
        } catch (error) {
            if (error.response && error.response.data) {
                return rejectWithValue(error.response.data);
            } else {
                return rejectWithValue(error.message);
            }
        }
    }
);


// delete the document fromt the database 
export const deleteDocumentFromDatabase = createAsyncThunk(
    'adminData/deleteDocumentFromDatabase',
    async (data, { rejectWithValue }) => {
        const adminToken = JSON.parse(sessionStorage.getItem('adminToken'));
        try {
            if (adminToken) {
                const response = await axios.delete(`${apiUrl}/api/admin/delete/${data.collection}/${data.id}`, {
                    headers: {
                        'Authorization': `Bearer ${adminToken}`,
                        'Content-Type': 'application/json'
                    }
                });

                // return response.data;
            }

        } catch (error) {
            if (error.response && error.response.data) {
                return rejectWithValue(error.response.data);
            } else {
                return rejectWithValue(error.message);
            }
        }
    }
);


// to generate the sale report 
export const generateReport = createAsyncThunk(
    'report/generate',
    async ({ startDate, endDate }, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${apiUrl}/api/admin/generate-report`, { startDate, endDate }, {
                responseType: 'blob'
            });
            // Instead of returning the blob, we'll handle it here
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'OrderReport.xlsx');
            document.body.appendChild(link);
            link.click();
            link.parentNode.removeChild(link);

            return { success: true };
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);


const initialState = {
    totalOrders: [],
    totalUsers: [],
    totalUserQueries: [],
    loading: false,
    error: null,
    generatingInvoice: false,
    generatingSaleReport: false,
    ordersByStatus: {
        orderData: [],
        orderStatusTab: "total"
    },
    // token: JSON.parse(sessionStorage.getItem('token')) || '',
    // hasLocalCart: false,
}

const adminData = createSlice({
    name: 'adminData',
    initialState,
    reducers: {
        getOrdersByStatus: (state, action) => {
            if (action.payload === "total") {
                return {
                    ...state,
                    ordersByStatus: {
                        ...state.ordersByStatus,
                        orderData: state.totalOrders,
                        orderStatusTab: action.payload
                    }
                }
            } else if (action.payload === "active") {
                let activeOrders = state.totalOrders.filter(order => order.orderStatus === action.payload);
                return {
                    ...state,
                    ordersByStatus: {
                        ...state.ordersByStatus,
                        orderData: activeOrders,
                        orderStatusTab: action.payload
                    }
                }
            } else if (action.payload === "completed") {
                let completedOrders = state.totalOrders.filter(order => order.orderStatus === action.payload);
                return {
                    ...state,
                    ordersByStatus: {
                        ...state.ordersByStatus,
                        orderData: completedOrders,
                        orderStatusTab: action.payload
                    }
                }
            } else if (action.payload === "cancelled") {
                let cancelledOrders = state.totalOrders.filter(order => order.orderStatus === action.payload);
                return {
                    ...state,
                    ordersByStatus: {
                        ...state.ordersByStatus,
                        orderData: cancelledOrders,
                        orderStatusTab: action.payload
                    }
                }
            } else if (action.payload === "dispatched") {
                let dispatchOrders = state.totalOrders.filter(order => order.orderStatus === action.payload);
                return {
                    ...state,
                    ordersByStatus: {
                        ...state.ordersByStatus,
                        orderData: dispatchOrders,
                        orderStatusTab: action.payload
                    }
                }
            } else {
                return {
                    ...state,
                    ordersByStatus: {
                        ...state.ordersByStatus,
                        orderData: state.cancelledOrders,
                    }
                }
            }
        },
    },
    extraReducers: (builder) => {
        builder
            // ========= totla orders ==========
            .addCase(getTotalOrders.pending, (state) => {
                return {
                    ...state,
                    loading: true,
                    error: null,
                }
            })
            .addCase(getTotalOrders.fulfilled, (state, action) => {
                return {
                    ...state,
                    loading: false,
                    totalOrders: action.payload,
                    ordersByStatus: {
                        ...state.ordersByStatus,
                        orderData: state.totalOrders,
                        orderStatusTab: action.payload
                    }

                }
            })
            .addCase(getTotalOrders.rejected, (state, action) => {
                return {
                    ...state,
                    loading: false,
                    error: action.payload,
                }
            })
            // ========= totla users ==========
            .addCase(getAllUsers.pending, (state) => {
                return {
                    ...state,
                    loading: true,
                    error: null,
                }
            })
            .addCase(getAllUsers.fulfilled, (state, action) => {
                return {
                    ...state,
                    loading: false,
                    totalUsers: action.payload,

                }
            })
            .addCase(getAllUsers.rejected, (state, action) => {
                return {
                    ...state,
                    loading: false,
                    error: action.payload,
                }
            })
            // ========= totla user queries ==========
            .addCase(getAllUserQueries.pending, (state) => {
                return {
                    ...state,
                    loading: true,
                    error: null,
                }
            })
            .addCase(getAllUserQueries.fulfilled, (state, action) => {
                return {
                    ...state,
                    loading: false,
                    totalUserQueries: action.payload,

                }
            })
            .addCase(getAllUserQueries.rejected, (state, action) => {
                return {
                    ...state,
                    loading: false,
                    error: action.payload,
                }
            })
            // ========= invoice generate ==========
            .addCase(generateInvoice.pending, (state) => {
                return {
                    ...state,
                    generatingInvoice: true,
                    error: null,
                }
            })
            .addCase(generateInvoice.fulfilled, (state, action) => {
                return {
                    ...state,
                    generatingInvoice: false,

                }
            })
            .addCase(generateInvoice.rejected, (state, action) => {
                return {
                    ...state,
                    generatingInvoice: false,
                    error: action.payload,
                }
            })
            // ========= invoice generate ==========
            .addCase(updateOrderStatus.pending, (state) => {
                return {
                    ...state,
                    loading: true,
                    error: null,
                }
            })
            .addCase(updateOrderStatus.fulfilled, (state, action) => {
                return {
                    ...state,
                    loading: false,

                }
            })
            .addCase(updateOrderStatus.rejected, (state, action) => {
                return {
                    ...state,
                    loading: false,
                    error: action.payload,
                }
            })
            // ========= admin data ==========
            // generating sales report
            .addCase(generateReport.pending, (state) => {
                state.generatingSaleReport = true;
                state.error = null;
            })
            .addCase(generateReport.fulfilled, (state) => {
                state.generatingSaleReport = false;
            })
            .addCase(generateReport.rejected, (state, action) => {
                state.generatingSaleReport = false;
                state.error = action.payload;
            });

    }


})

// export const { userLogout, clearLocalCartFlag } = userSlice.actions;
export const { getOrdersByStatus } = adminData.actions;


export default adminData.reducer;