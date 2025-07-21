import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    spotlightProducts: [],
    productsType:"best_seller"
}

export const spotlightProducts = createSlice({
    name: "spotlight",
    initialState,
    reducers: {
        getSpotlightProducts: (state, action) => {
            if(action.payload.type==="new_arrivals"){
                const newArrivals=action.payload?.products?.filter((curItem)=>curItem.meta.new_arrivals)
                return{
                    ...state,
                    spotlightProducts:newArrivals,
                    productsType:action.payload.type
                }
            }
            if(action.payload.type==="deal_of_the_day"){
                const newArrivals=action.payload?.products?.filter((curItem)=>curItem.meta.deal_of_the_day)
                return{
                    ...state,
                    spotlightProducts:newArrivals,
                    productsType:action.payload.type
                }
            }
            if(action.payload.type==="best_seller"){
                const bestSeller=action.payload?.products?.filter((curItem)=>curItem.meta.best_seller)
                return{
                    ...state,
                    spotlightProducts:bestSeller,
                    productsType:action.payload.type
                }
            }
            if(action.payload.type==="season_special"){
                const seasonSpecial=action.payload?.products?.filter((curItem)=>curItem.meta.season_special)
                return{
                    ...state,
                    spotlightProducts:seasonSpecial,
                    productsType:action.payload.type
                }
            }
            return {
                ...state,
            }
          }
    }
})

export const {getSpotlightProducts } = spotlightProducts.actions;

export default spotlightProducts.reducer;