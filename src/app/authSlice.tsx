import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

interface IAuthSlice {
    email: string,
    password: string,
    isLoggedIn: boolean
}

const initialState = { 
    email: "",
    password: "",
    isLoggedIn: false
} as IAuthSlice


const authSlice = createSlice({
    name: 'category',
    initialState,
    reducers: {
        setEmail(state, action: PayloadAction<string>) {
            state.email = action.payload;
        },
        setPassword(state, action: PayloadAction<string>) {
            state.password = action.payload;
        },
        setIsLoggedIn(state, action: PayloadAction<boolean>) {
            state.isLoggedIn = action.payload;
        }
    },
})

export const { 
    setEmail,
    setPassword,
    setIsLoggedIn
} = authSlice.actions
export default authSlice.reducer