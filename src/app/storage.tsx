import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import categorySlice from './categorySlice'
import authSlice from './authSlice'
import cartSlice from './cartSlice'
import {
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist';

import storage from 'redux-persist/lib/storage';

const persistConfig = {
    key: 'root',
	storage,
}

const rootReducer = combineReducers({ categorySlice, authSlice, cartSlice })

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({ 
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
        },
    })
});

export type RootState = ReturnType<typeof store.getState>

export const persistor = persistStore(store);

export default store;