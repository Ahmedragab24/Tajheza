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
import { ProductsApi } from "./services/Products";
import { CategoriesApi } from "./services/Categories";
import { AttributesApi } from "./services/Attributes";
import { ProviderProductsApi } from "./services/Provider/products";
import { ProviderPackagesApi } from "./services/Provider/Packages";
import { ProviderOrdersApi } from "./services/Provider/ProviderOrders";
import { ProviderCompanyApi } from "./services/Provider/Company";
import serviceReducer from "./features/servicesSlice";
import { PackagesApi } from "./services/Packages";
import { ProviderDiscountCodesApi } from "./services/Provider/DiscountCodes";

const rootReducer = combineReducers({
  service: serviceReducer,
  [AuthApi.reducerPath]: AuthApi.reducer,
  [ProfileApi.reducerPath]: ProfileApi.reducer,
  [ProductsApi.reducerPath]: ProductsApi.reducer,
  [PackagesApi.reducerPath]: PackagesApi.reducer,
  [CategoriesApi.reducerPath]: CategoriesApi.reducer,
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
  [AttributesApi.reducerPath]: AttributesApi.reducer,
  [ProviderProductsApi.reducerPath]: ProviderProductsApi.reducer,
  [ProviderPackagesApi.reducerPath]: ProviderPackagesApi.reducer,
  [ChatApi.reducerPath]: ChatApi.reducer,
  [ProviderOrdersApi.reducerPath]: ProviderOrdersApi.reducer,
  [ProviderCompanyApi.reducerPath]: ProviderCompanyApi.reducer,
  [ProviderDiscountCodesApi.reducerPath]: ProviderDiscountCodesApi.reducer,
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
      ProductsApi.middleware,
      CategoriesApi.middleware,
      SearchApi.middleware,
      ServicesApi.middleware,
      CitiesApi.middleware,
      FavoritesApi.middleware,
      OrdersApi.middleware,
      OccasionsApi.middleware,
      AddressesApi.middleware,
      AppInfoApi.middleware,
      MembershipsApi.middleware,
      PackagesApi.middleware,
      AttributesApi.middleware,
      NotificationsApi.middleware,
      ProviderProductsApi.middleware,
      ProviderPackagesApi.middleware,
      CompaniesApi.middleware,
      ProviderOrdersApi.middleware,
      ProviderCompanyApi.middleware,
      ProviderDiscountCodesApi.middleware,
      ChatApi.middleware
    ),
});

export const persistor = persistStore(store);

// Infer the type of makeStore
export type AppStore = typeof store;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
