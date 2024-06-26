import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE, persistReducer, persistStore } from 'redux-persist';
import authSlice from "./authSlice";
import dashboardSlice from "./dashboard/dashboard";
import productSlice from "./dashboard/product";
import rootSlice from "./rootSlice";
import storage from "./storage";
import cartSlice from "./cartSlice";
import favoriteSlice from "./favoriteSlice";

const rootReducer = combineReducers({ 
  account: authSlice,
  product: productSlice,
  dashboard: dashboardSlice,
  root: rootSlice,
  cart: cartSlice,
  favorite: favoriteSlice
})

const persistConfig = {
  key: 'root',
  storage
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }),
});

export const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
