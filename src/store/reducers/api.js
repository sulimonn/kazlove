import { apiSlice } from './apiSlice';

const api = apiSlice.injectEndpoints({
  tagTypes: ['api', 'Profile', 'City', 'Type', 'Service', 'Gender', 'User', 'Comments'],
  endpoints: (builder) => ({
    fetchProfiles: builder.query({
      query: () => '/profiles',
      providesTags: ['Profile'],
    }),
    myProfile: builder.query({
      query: () => '/profile/me',
      providesTags: ['Profile'],
    }),
    postProfile: builder.mutation({
      query: (data) => ({
        url: '/profiles/',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Profile'],
    }),
    editProfile: builder.mutation({
      query: (data) => ({
        url: `/profiles/${data.id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['Profile'],
    }),
    getProfile: builder.query({
      query: (id) => `/profiles/${id}`,
      providesTags: ['Profile'],
    }),
    fetchCities: builder.query({
      query: () => '/cities/all',
      providesTags: ['City'],
    }),
    fetchTypes: builder.query({
      query: () => '/profile_types/all',
      providesTags: ['Type'],
    }),
    fetchServices: builder.query({
      query: () => '/services/all',
      providesTags: ['Service'],
    }),
    addService: builder.mutation({
      query: (data) => ({
        url: '/profiles-services/add',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Service'],
    }),
    deleteService: builder.mutation({
      query: (data) => ({
        url: '/profiles-services/delete',
        method: 'DELETE',
        body: data,
      }),
      invalidatesTags: ['Service'],
    }),
    postPhotos: builder.mutation({
      query: ({ data, profile_id }) => {
        console.log(data, profile_id);
        return {
          url: `/profiles/${profile_id}/photos`,
          method: 'POST',
          body: data,
        };
      },
      invalidatesTags: ['Profile'],
    }),
    getProfilePhotos: builder.query({
      query: (profile_id) => `/profiles/${profile_id}/photos`,
      providesTags: ['Profile'],
    }),
    deleteProfilePhoto: builder.mutation({
      query: (data) => ({
        url: `/profiles/${data.profile_id}/photos/${data.id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Profile'],
    }),
    fetchGenders: builder.query({
      query: () => '/genders/all',
      providesTags: ['Genders'],
    }),
    postComment: builder.mutation({
      query: (data) => ({
        url: '/comments',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Comments'],
    }),
    getProfileComments: builder.query({
      query: (profile_id) => `/comments/profile/${profile_id}`,
      providesTags: ['Comments'],
    }),
  }),
});

export const {
  useFetchProfilesQuery,
  useMyProfileQuery,
  useFetchCitiesQuery,
  useFetchTypesQuery,
  useFetchServicesQuery,
  useFetchGendersQuery,
  usePostProfileMutation,
  useEditProfileMutation,
  useAddServiceMutation,
  useDeleteServiceMutation,
  usePostPhotosMutation,
  useGetProfilePhotosQuery,
  useDeleteProfilePhotoMutation,
  useGetProfileQuery,
  useGetProfileCommentsQuery,
  usePostCommentMutation,
} = api;

export default api;
