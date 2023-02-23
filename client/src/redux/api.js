import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

//redux-toolkit query is a simple way to make api requests ,instead of using thunk & request.js file
export const api = createApi({

    baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_BASE_URL }),           //server URL
    reducerPath: "adminApi",         //redux-toolkit Slice name (any name we choose)
    tagTypes: [ "User", "Products", "Customers", "Transactions", "Geography", "Sales", "Admins", "Performance", "Dashboard", ],
    //Endpoints requests functions
    endpoints: (build) => ({      
      getUser: build.query({ query: (id) => `general/user/${id}`, providesTags: ["User"], }),
      getProducts: build.query({ query: () => "clients/products", providesTags: ["Products"],  }),
      getCustomers: build.query({ query: () => "clients/customers", providesTags: ["Customers"], }),
      getTransactions: build.query({ query: ({ page, pageSize, sort, search }) => ({
          url: "clients/transactions",
          method: "GET",
          params: { page, pageSize, sort, search },
        }),
        providesTags: ["Transactions"],
      }),
      getGeography: build.query({ query: () => "clients/geography", providesTags: ["Geography"], }),
      getSales: build.query({ query: () => "sales/sales", providesTags: ["Sales"], }),
      getAdmins: build.query({ query: () => "management/admins", providesTags: ["Admins"], }),
      getUserPerformance: build.query({ query: (id) => `management/performance/${id}`, providesTags: ["Performance"], }),
      getDashboard: build.query({ query: () => "general/dashboard", providesTags: ["Dashboard"], }),   
    }),
  });
  

//export the endpoints requests functions as hooks , ex: const {data, isLoading, error} = use-Endpoint-Query();
export const { useGetUserQuery, useGetProductsQuery, useGetCustomersQuery, useGetTransactionsQuery, useGetGeographyQuery,
                useGetSalesQuery, useGetAdminsQuery, useGetUserPerformanceQuery, useGetDashboardQuery, } = api; 

    