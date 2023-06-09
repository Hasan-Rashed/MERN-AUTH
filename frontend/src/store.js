import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';

const store = configureStore({
    reducer: {
        // auth is the name of the state or slice and authReducer is the reducer function
        auth: authReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
    devTools: true
});

export default store;