// eslint-disable-next-line import/no-extraneous-dependencies
import { apiSlice } from './apiSlice';

export const authApi = apiSlice.injectEndpoints({
  tagTypes: ['User'],
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: '/login',
        method: 'POST',
        body: credentials,
        headers: {
          'Content-Type': 'application/json',
          Accept: '*/*',
          'Accept-Encoding': 'gzip, deflate, br',
          Connection: 'keep-alive',
          'Access-Control-Allow-Origin': 'http://localhost:3000',
        },
      }),
    }),
    register: builder.mutation({
      query: (credentials) => ({
        url: '/register',
        method: 'POST',
        body: { ...credentials },
      }),
      invalidatesTags: ['User'],
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation } = authApi;

export default authApi;
