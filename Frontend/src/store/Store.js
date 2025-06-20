import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import authReducer from './slices/authSlice.js';
import bookReducer from './slices/bookSlice.js';

// Persist configuration for auth
const persistConfigAuth = {
    key: 'auth',
    storage,
};

const persistedAuthReducer = persistReducer(persistConfigAuth, authReducer);

// Persist configuration for posts (if you want to persist posts)
const persistConfigPosts = {
    key: 'books',
    storage,
};

const persistedBookReducer = persistReducer(persistConfigPosts, bookReducer);

const Store = configureStore({
    reducer: {
        auth: persistedAuthReducer,
        book: persistedBookReducer,  // Now persistedPostReducer is defined
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
            },
        }),
    devTools: true,
});

export const persistor = persistStore(Store);
export default Store;