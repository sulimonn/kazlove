import { apiSlice } from './apiSlice';

export const balanceApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getBalance: builder.query({
      query: () => '/users/me/balance',
      providesTags: ['Balance'],
    }),
    getTrades: builder.query({
      query: () => '/trades/created',
      providesTags: ['Trade'],
    }),
    createTrade: builder.mutation({
      query: (amount) => ({
        url: `/trades/${amount}`,
        method: 'POST',
      }),
      invalidatesTags: ['Trade'],
    }),
  }),
  overrideExisting: false, // Prevents overriding existing endpoints
});

export const { useGetBalanceQuery, useGetTradesQuery, useCreateTradeMutation } = balanceApi;
