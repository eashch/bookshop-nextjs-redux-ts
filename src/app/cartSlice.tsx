import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { IBookInfoGoogleBooksAPI, ICartItem } from './interfaces'

interface ICartSlice {
    books: ICartItem[]
}

const initialState = { 
    books: []
} as ICartSlice


const cartSlice = createSlice({
    name: 'category',
    initialState,
    reducers: {
        setAllBooks(state, action: PayloadAction<ICartItem[]>) {
            state.books = action.payload;
        },
        addBook(state, action: PayloadAction<IBookInfoGoogleBooksAPI>) {
            const bookAlreadyInCart = state.books.find((book) => book.book.id === action.payload.id);

            if (!bookAlreadyInCart) {
                const newItem = {
                    book: action.payload,
                    amount: 1
                } as ICartItem;
                state.books = [...state.books, newItem];
            } else {
                state.books = state.books.map(
                    (cartItem) => {
                        if (cartItem.book.id === action.payload.id)  {
                            return {
                                ...cartItem,
                                amount: (cartItem.amount + 1)
                            };
                        } else {
                            return cartItem;
                        }
                    }
                )
            }
        },
        removeBook(state, action: PayloadAction<IBookInfoGoogleBooksAPI>) {
            const bookAlreadyInCart = state.books.find((book) => book.book.id === action.payload.id);
            if (!bookAlreadyInCart)
                return;
            if (bookAlreadyInCart.amount == 1)
                state.books = state.books.filter((obj) => obj.book.id !== action.payload.id);
            else 
                state.books = state.books.map(
                    (cartItem) => {
                        if (cartItem.book.id === action.payload.id)  {
                            return {
                                ...cartItem,
                                amount: (cartItem.amount - 1)
                            };
                        } else {
                            return cartItem;
                        }
                    }
                )
        }
    },
})

export const { 
    setAllBooks,
    addBook,
    removeBook
} = cartSlice.actions
export default cartSlice.reducer