import { configureStore } from '@reduxjs/toolkit'  //replaces createStore & combineReducers , have Dev-tools and thunk by default
import  globalSlice  from './globalSlice'
import { api } from "./api";

//configure Store then pass the reducers & the redux-toolkit query 
export const store = configureStore({
    reducer: { globalSlice : globalSlice , [api.reducerPath]: api.reducer } ,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware),
});

