import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    products: [],
    productsType:"new_arrivals"
}

export const spotlightProducts = createSlice({
    name: "spotlight",
    initialState,
    reducers: {
        spotlighProducts: (state, action) => {
            if(action.payload.type==="new_arrivals"){
                const newArrivals=action.payload?.productData?.filter((curItem)=>curItem.meta.new_arrivals)
                return{
                    ...state,
                    products:newArrivals,
                    productsType:action.payload.type
                }
            }
            if(action.payload.type==="deal_of_the_day"){
                const newArrivals=action.payload?.productData?.filter((curItem)=>curItem.meta.deal_of_the_day)
                return{
                    ...state,
                    products:newArrivals,
                    productsType:action.payload.type
                }
            }
            if(action.payload.type==="best_seller"){
                const bestSeller=action.payload?.productData?.filter((curItem)=>curItem.meta.best_seller)
                return{
                    ...state,
                    products:bestSeller,
                    productsType:action.payload.type
                }
            }
            if(action.payload.type==="season_special"){
                const seasonSpecial=action.payload?.productData?.filter((curItem)=>curItem.meta.season_special)
                return{
                    ...state,
                    products:seasonSpecial,
                    productsType:action.payload.type
                }
            }
            return {
                ...state,
            }
          }
    }
})

export const {spotlighProducts } = spotlightProducts.actions;

export default spotlightProducts.reducer;