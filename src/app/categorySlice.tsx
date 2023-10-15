import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'


interface ICategory {
    lastCategory: string
}

const initialState = { 
    lastCategory: 'Architecture'
} as ICategory


const categorySlice = createSlice({
    name: 'category',
    initialState,
    reducers: {
        setCategory(state, action: PayloadAction<string>) {
            state.lastCategory = action.payload;
        }
    },
})

export const { 
    setCategory
} = categorySlice.actions
export default categorySlice.reducer