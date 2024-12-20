/* eslint-disable no-unused-vars */

import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";

//
import storage from "redux-persist/lib/storage"; // defaults to local storage for web

// importing slices
import cartReducer from "./cartSlice";
import venueBookingReducer from "./venueBookingSlice";
import remainingOrderReducer from "./remainingOrderSlice";
import reservationSlice from "./reservationSlice";

// Combining two or more redux slices together
const rootReducer = combineReducers({
  cart: cartReducer,
  venue: venueBookingReducer,
  remainingOrders: remainingOrderReducer,
  reservation: reservationSlice,
});

// this is to hold the data in the local Storage even if the browser sessison ends
const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configuring the Redux store with the persisted reducer
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Disables the serializable check if you're getting non-serializable warnings
    }),
});

// Creating the persistor
const persistor = persistStore(store);
export { store, persistor };
