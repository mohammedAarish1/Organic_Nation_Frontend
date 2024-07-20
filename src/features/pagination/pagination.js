import { createSlice } from "@reduxjs/toolkit"


const paginationSlice = createSlice({
    name: "pagination",
    initialState: {
        currentPage: 1,
    },
    reducers: {
        setCurrentPage: (state, action) => {
            return {
                ...state,
                currentPage: action.payload
            }

        },
        // for previous button 
        setPrev: (state, action) => {
            let {currentPage,totalPages}=action.payload
            console.log(currentPage,totalPages)
            if(currentPage===1){
                return {
                    ...state,
                    currentPage:totalPages
                }
            }
            return {
                ...state,
                currentPage:currentPage-1
            }
        },
        // for next button 
        setNext: (state, action) => {
            let {currentPage,totalPages}=action.payload
            console.log(currentPage,totalPages)
            if(currentPage===totalPages){
                return {
                    ...state,
                    currentPage:1,
                }
            }
            return {
                ...state,
                currentPage:currentPage+1
            }
        },
    }
})

export const { setCurrentPage, setPrev,setNext } = paginationSlice.actions;
export default paginationSlice.reducer;


