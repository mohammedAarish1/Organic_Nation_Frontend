import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    showSidebar: false,
    showFilters: false,
}

const sidebar = createSlice({
    name: 'sidebar',
    initialState,
    reducers: {
        setShowSidebar: (state, action) => {

            return {
                ...state,
                showSidebar: !state.showSidebar
            }
        },
        setShowFilters: (state, action) => {
            if (action.payload === 'showHide') {
                return {
                    ...state,
                    showFilters: !state.showFilters,
                }
            }else if(action.payload==='hide'){
                return {
                    ...state,
                    showFilters: false,
                }
            }

        },
    }
})

export const { setShowSidebar, setShowFilters } = sidebar.actions;

export default sidebar.reducer;