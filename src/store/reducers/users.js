import { apiSlice } from './apiSlice';

const user = apiSlice.injectEndpoints({
  tagTypes: ['User'],
  endpoints: (builder) => ({
    getMe: builder.query({
      query: () => '/users/me',
      providesTags: ['User', 'Profile'],
    }),
    editUser: builder.mutation({
      query: (data) => ({
        url: `/users/${data.id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['User', 'Profile'],
    }),
  }),
});

export const { useGetMeQuery, useEditUserMutation } = user;

export default user;
