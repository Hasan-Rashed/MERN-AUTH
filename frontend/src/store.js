import { configureStore } from '@reduxjs/toolkit';

const store = configureStore({
    reducer: {},
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
    devTools: true
});

export default store;