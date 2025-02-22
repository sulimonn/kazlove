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
    deleteProfile: builder.mutation({
      query: (id) => ({
        url: `/profiles/${id}`,
        method: 'DELETE',
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
    getCity: builder.query({
      query: (id) => `/cities/${id}`,
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
    updateService: builder.mutation({
      query: (data) => ({
        url: '/profiles-services/update',
        method: 'PUT',
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
      query: ({ data, profile_id }) => ({
        url: `/profiles/${profile_id}/photos`,
        method: 'POST',
        body: data,
      }),
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
    deleteComment: builder.mutation({
      query: (id) => ({
        url: `/comments/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Comments'],
    }),
    fetchTariffs: builder.query({
      query: () => '/tariffs/all',
    }),
    fetchMedia: builder.query({
      query: (id) => `/profiles/${id}/media/`,
      providesTags: ['Profile'],
    }),
    postMedia: builder.mutation({
      query: ({ data, profile_id }) => ({
        url: `/profiles/${profile_id}/media/`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Profile'],
    }),
    deleteMedia: builder.mutation({
      query: ({ id, profile_id }) => ({
        url: `/profiles/${profile_id}/media/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Profile'],
    }),
    resendCode: builder.mutation({
      query: (email) => ({
        url: `/send-verification-email`,
        method: 'POST',
        body: email,
      }),
    }),
    verifyEmail: builder.mutation({
      query: (email) => ({
        url: `/verify`,
        method: 'POST',
        body: email,
      }),
    }),
    updateTariff: builder.mutation({
      query: (data) => ({
        url: '/profiles/tariff/',
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['Tariffs', 'Profile', 'Balance'],
    }),
    deleteTariff: builder.mutation({
      query: () => ({
        url: '/profiles/tariff/',
        method: 'DELETE',
      }),
      invalidatesTags: ['Tariffs', 'Profile', 'Balance'],
    }),
    fetchTariffTypes: builder.query({
      query: () => '/tariff-types/all',
      providesTags: ['Tariffs'],
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
  useDeleteProfileMutation,
  useDeleteCommentMutation,
  useUpdateServiceMutation,
  useFetchTariffsQuery,
  useFetchMediaQuery,
  usePostMediaMutation,
  useDeleteMediaMutation,
  useResendCodeMutation,
  useVerifyEmailMutation,
  useGetCityQuery,
  useUpdateTariffMutation,
  useDeleteTariffMutation,
  useFetchTariffTypesQuery,
} = api;

export default api;
