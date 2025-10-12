import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { AuthApi } from "./services/Auth/Auth";
import { SearchApi } from "./services/Search";
import { ServicesApi } from "./services/Services";
import { CitiesApi } from "./services/Cities";
import { FavoritesApi } from "./services/Favorites";
import { CompaniesApi } from "./services/Companies";
import { ProfileApi } from "./services/Auth/Profile";
import { OrdersApi } from "./services/Orders";
import { OccasionsApi } from "./services/Occasions";
import { AddressesApi } from "./services/Address";
import { AppInfoApi } from "./services/AppInfo";
import { MembershipsApi } from "./services/MembershipPackage";
import { NotificationsApi } from "./services/Notifications";
import { ChatApi } from "./services/Chat";

const rootReducer = combineReducers({
  //   userData: userDataReducer,
  [AuthApi.reducerPath]: AuthApi.reducer,
  [ProfileApi.reducerPath]: ProfileApi.reducer,
  [SearchApi.reducerPath]: SearchApi.reducer,
  [ServicesApi.reducerPath]: ServicesApi.reducer,
  [CitiesApi.reducerPath]: CitiesApi.reducer,
  [FavoritesApi.reducerPath]: FavoritesApi.reducer,
  [CompaniesApi.reducerPath]: CompaniesApi.reducer,
  [OrdersApi.reducerPath]: OrdersApi.reducer,
  [OccasionsApi.reducerPath]: OccasionsApi.reducer,
  [AddressesApi.reducerPath]: AddressesApi.reducer,
  [AppInfoApi.reducerPath]: AppInfoApi.reducer,
  [MembershipsApi.reducerPath]: MembershipsApi.reducer,
  [NotificationsApi.reducerPath]: NotificationsApi.reducer,
  [ChatApi.reducerPath]: ChatApi.reducer,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["userData"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(
      AuthApi.middleware,
      ProfileApi.middleware,
      SearchApi.middleware,
      ServicesApi.middleware,
      CitiesApi.middleware,
      FavoritesApi.middleware,
      OrdersApi.middleware,
      OccasionsApi.middleware,
      AddressesApi.middleware,
      AppInfoApi.middleware,
      MembershipsApi.middleware,
      NotificationsApi.middleware,
      CompaniesApi.middleware,
      ChatApi.middleware
    ),
});

export const persistor = persistStore(store);

// Infer the type of makeStore
export type AppStore = typeof store;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
