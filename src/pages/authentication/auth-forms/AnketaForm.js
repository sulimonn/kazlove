import React from 'react';
import { useNavigate } from 'react-router-dom';
// material-ui
import {
  Button,
  FormHelperText,
  Stack,
  InputLabel,
  OutlinedInput,
  Select,
  MenuItem,
  TextField,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Typography,
  Divider,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';

// project import
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
  useAddServiceMutation,
  useDeleteMediaMutation,
  useDeleteProfilePhotoMutation,
  useDeleteServiceMutation,
  useEditProfileMutation,
  useFetchCitiesQuery,
  useFetchGendersQuery,
  useFetchTypesQuery,
  usePostMediaMutation,
  usePostPhotosMutation,
  usePostProfileMutation,
  useUpdateServiceMutation,
} from 'store/reducers/api';
import { useAuth } from 'contexts/index';
import Pictures from './Pictures';
import Loader from 'components/Loader';
import { useEditUserMutation } from 'store/reducers/users';

// assets

// ============================|| FIREBASE - REGISTER ||============================ //

const AnketaForm = ({ profile = null, ...others }) => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [postProfile, { isLoading: isPosting }] = usePostProfileMutation();
  const [editProfile, { isLoading: isEditing }] = useEditProfileMutation();
  const [addService, { isLoading: isAdding }] = useAddServiceMutation();
  const [editUser] = useEditUserMutation();
  const [updateService, { isLoading: isUpdating }] = useUpdateServiceMutation();
  const [deleteService, { isLoading: isDeleting }] = useDeleteServiceMutation();
  const [postPhotos, { isLoading: isPostingPhotos }] = usePostPhotosMutation();
  const [deletePhoto, { isLoading: isDeletingPhoto }] = useDeleteProfilePhotoMutation();
  const [postMedia, { isLoading: isPostingMedia }] = usePostMediaMutation();
  const [deleteMedia, { isLoading: isDeletingMedia }] = useDeleteMediaMutation();

  const { data: cities = [] } = useFetchCitiesQuery();
  const { data: genders = [] } = useFetchGendersQuery();
  const { data: servicesTypes = [] } = useFetchTypesQuery();

  const [photos, setPhotos] = React.useState([]);
  const [media, setMedia] = React.useState([]);

  React.useEffect(() => {
    if (profile?.photos?.length > 0) {
      setPhotos(
        profile?.photos?.map((photo) => ({
          id: photo[0],
          upload: process.env.REACT_APP_SERVER_URL + photo[1],
        }))
      );
    }

    if (profile?.media?.length > 0) {
      setMedia(
        profile?.media?.map((photo) => ({
          id: photo[0],
          upload: process.env.REACT_APP_SERVER_URL + photo[1],
        }))
      );
    }
  }, [profile?.photos, profile?.media]);

  if (
    isPosting ||
    isEditing ||
    isAdding ||
    isDeleting ||
    isPostingPhotos ||
    isDeletingPhoto ||
    isPostingMedia ||
    isDeletingMedia ||
    isUpdating ||
    others?.isFetching
  ) {
    return <Loader />;
  }

  return (
    <>
      <Formik
        enableReinitialize
        initialValues={{
          user_id: user?.user_id,
          name: '',
          phone: '',
          age: '',
          height: '',
          weight: '',
          breast_size: '',
          nationality: '',
          address: '',
          services: [],
          price: '',
          price_hour: '',
          price_two_hours: '',
          price_night: '',
          price_hour_at_your_place: '',
          price_two_hours_at_your_place: '',
          price_night_at_your_place: '',
          additional_info: '',
          ...profile,
          city: profile?.city?.id || '',
          gender: profile?.gender?.id || '',
          submit: null,
        }}
        validationSchema={Yup.object().shape({
          services: Yup.array()
            .of(
              Yup.object().shape({
                price: Yup.string(),
              })
            )
            .min(1, 'Услуги обязательны')
            .required('Услуги обязательны'),
          name: Yup.string().max(255).required('Имя обязательно'),
          phone: Yup.string().max(255).required('Телефон обязателен'),
          telegram: Yup.string().max(255),
          whatsapp: Yup.string().max(255),
          gender: Yup.string().max(255).required('Пол обязателен'),
          age: Yup.number()
            .min(18, 'Минимальный возраст 18 лет')
            .max(255)
            .required('Возраст обязателен'),
          height: Yup.number()
            .min(20, 'Минимальный рост 20 см')
            .max(255)
            .required('Рост обязателен'),
          weight: Yup.number().min(0, 'Минимальный вес 0 кг').max(255).required('Вес обязателен'),
          breast_size: Yup.number()
            .min(0, 'Минимальный размер груди 0')
            .max(255)
            .required('Размер груди обязателен'),
          nationality: Yup.string().required('Национальность обязателен'),
          address: Yup.string().max(255).required('Адрес обязателен'),
          price: Yup.number().required('Цена обязательна'),
          price_hour: Yup.number().required('Цена за час обязательна'),
          price_two_hours: Yup.number().required('Цена за 2 часа обязательна'),
          price_night: Yup.number().required('Цена за ночь обязательна'),
          price_hour_at_your_place: Yup.number().required('Цена за час обязательна'),
          price_two_hours_at_your_place: Yup.number().required('Цена за 2 часа обязательна'),
          price_night_at_your_place: Yup.number().required('Цена за ночь обязательна'),
          city: Yup.number().required('Город обязателен'),
          additional_info: Yup.string().required('Дополнительная информация обязательна'),
          photos: Yup.array()
            .min(2, 'Минимальное количество фото 3')
            .max(15, 'Максимальное количество фото 15')
            .required('Фото обязательно'),
        })}
        onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
          try {
            setStatus({ success: true });

            if (photos.filter((photo) => photo?.upload).length < 3) {
              setStatus({ success: false });
              setErrors({
                submit: 'Минимальное количество фото 3',
                photos: 'Минимальное количество фото 3',
              });
              return;
            } else if (values.services.length < 1) {
              setStatus({ success: false });
              setErrors({
                submit: 'Услуги обязательны',
                services: 'Добавьте хотя бы одну услугу',
              });
              return;
            }

            const profileData = {
              ...values,
              city_id: values.city,
              profile_type_id: values.profile_type,
              gender_id: values.gender,
              user_id: user?.user_id,
            };

            const services = values.services;
            delete profileData.services;
            delete profileData.photos;
            delete profileData.media;

            const addServices = async (profile_id) => {
              const allServices = profile?.services || [];
              const selectedServices = services || [];

              const forUpdate = selectedServices
                .filter((item) =>
                  allServices.find(
                    (service) => service.id === item.id && service.price !== item.price
                  )
                )
                .map((item) => ({
                  service_id: item.id,
                  profile_id: profile_id,
                  price: item.price,
                }));

              const forAdd = selectedServices
                .filter((item) => !allServices.some((service) => service.id === item.id))
                .map((item) => ({
                  service_id: item.id,
                  profile_id: profile_id,
                  price: item.price,
                }));

              const forDelete = allServices
                .filter((service) => !selectedServices.some((item) => item.id === service.id))
                .map((service) => ({ service_id: service.id, profile_id: profile_id }));

              if (forUpdate.length > 0) {
                const response = await updateService(forUpdate);
                if (response?.error) throw new Error('Ошибка обновления услуг');
              }

              if (forAdd.length > 0) {
                const response = await addService(forAdd);
                if (response?.error) throw new Error('Ошибка добавления услуг');
              }

              if (forDelete.length > 0) {
                const response = await deleteService(forDelete);
                if (response?.error) throw new Error('Ошибка удаления услуг');
              }
            };

            const handlePostPhotos = async (profile_id) => {
              setPhotos((prev) => prev.map((photo) => photo.upload));
              const postFormData = new FormData();

              for (const photo of photos) {
                if (photo.upload && typeof photo?.upload === 'object') {
                  postFormData.append('files', photo.upload);
                } else if (!photo?.upload && photo?.id) {
                  await deletePhoto({ id: photo.id, profile_id: profile_id });
                }
              }

              if (photos.some((photo) => typeof photo?.upload === 'object' && photo?.upload)) {
                const responsePhotos = await postPhotos({
                  data: postFormData,
                  profile_id: profile_id,
                });

                if (responsePhotos?.error) throw new Error('Ошибка загрузки фото');
              }
            };

            const handlePostMedia = async (profile_id) => {
              setMedia((prev) => prev.map((video) => video.upload));
              const postFormData = new FormData();

              for (const video of media) {
                if (video.upload && typeof video?.upload === 'object') {
                  postFormData.append('file', video.upload);
                } else if (!video?.upload && video?.id) {
                  await deleteMedia({ id: video.id, profile_id: profile_id });
                }
              }

              if (media.some((video) => typeof video?.upload === 'object' && video?.upload)) {
                const responseMedia = await postMedia({
                  data: postFormData,
                  profile_id: profile_id,
                });

                if (responseMedia?.error) throw new Error('Ошибка загрузки видео');
              }
            };

            if (!profile) {
              const response = await postProfile({ ...profileData, user_id: user?.user_id });
              if (response?.error) throw new Error('Ошибка создания профиля');

              await addServices(response.data.id);
              await handlePostPhotos(response.data.id);
              await handlePostMedia(response.data.id);
              await editUser({
                id: user?.user_id,
                email: user?.email,
                twitter_link: values?.telegram,
                facebook_link: values?.whatsapp,
              });
            } else {
              const response = await editProfile(profileData);
              if (response?.error) throw new Error('Ошибка редактирования профиля');

              await addServices(profile.id);
              await handlePostPhotos(profile.id);
              await handlePostMedia(profile.id);
              await editUser({
                id: user?.user_id,
                email: user?.email,
                twitter_link: values?.telegram,
                facebook_link: values?.whatsapp,
              });
            }

            // ✅ SUCCESS: Navigate after everything completes
            setStatus({ success: true });

            navigate('/profile/me');
          } catch (err) {
            console.error(err);
            setStatus({ success: false });
            setErrors({ submit: err.message });
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({
          errors,
          handleBlur,
          handleChange,
          handleSubmit,
          isSubmitting,
          touched,
          values,
          setFieldValue,
        }) => (
          <form noValidate onSubmit={handleSubmit}>
            <Stack spacing={6} my={4}>
              <Stack xs={12}>
                <Stack
                  spacing={3}
                  direction="column"
                  height="100%"
                  justifyContent="space-between"
                  alignItems="left"
                  sx={{
                    border: '1px solid #ccc',
                    borderRadius: '10px',
                    padding: '20px',
                  }}
                >
                  <Typography variant="h4">Фото и видео*</Typography>
                  <Divider />
                  <Typography variant="body2">Загрузите фото и видео</Typography>
                  <Pictures
                    photos={photos}
                    setPhotos={setPhotos}
                    setFieldValue={setFieldValue}
                    media={media}
                    setMedia={setMedia}
                  />
                  {errors.photos && (
                    <FormHelperText error id="helper-text-photos-form" sx={{ mx: 'auto' }}>
                      {errors.photos}
                    </FormHelperText>
                  )}
                </Stack>
              </Stack>
              <Stack
                spacing={1}
                sx={{
                  border: '1px solid #ccc',
                  borderRadius: '10px',
                  padding: '20px',
                }}
              >
                <Typography variant="h4" mb={3}>
                  Обо мне*
                </Typography>
                <Divider sx={{ mt: 6 }} />
                <Stack spacing={3}>
                  <Stack spacing={3} direction="row" justifyContent="center">
                    <Stack spacing={1} sx={{ width: '70%' }}>
                      <InputLabel htmlFor="name-signup">Имя*</InputLabel>
                      <OutlinedInput
                        id="name-login"
                        type="name"
                        value={values.name || ''}
                        name="name"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        placeholder="Ваше имя"
                        fullWidth
                        error={Boolean(touched.name && errors.name)}
                      />
                      {touched.name && errors.name && (
                        <FormHelperText error id="helper-text-name-signup">
                          {errors.name}
                        </FormHelperText>
                      )}
                    </Stack>

                    <Stack spacing={1} sx={{ width: '30%' }}>
                      <InputLabel htmlFor="name-signup">Возраст*</InputLabel>
                      <OutlinedInput
                        id="age-login"
                        type="number"
                        value={values.age || ''}
                        name="age"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        placeholder="20"
                        inputProps={{ inputMode: 'numeric', pattern: '[0-9]*', min: 18 }}
                        fullWidth
                        error={Boolean(touched.age && errors.age)}
                      />
                      {touched.age && errors.age && (
                        <FormHelperText error id="helper-text-age-signup">
                          {errors.age}
                        </FormHelperText>
                      )}
                    </Stack>
                  </Stack>
                </Stack>

                <Stack xs={12}>
                  <Stack spacing={1}>
                    <InputLabel htmlFor="decription-form">О себе*</InputLabel>
                    <TextField
                      id="decription-form"
                      type="text"
                      value={values.additional_info}
                      name="additional_info"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      placeholder="Напишите что-нибудь о себе"
                      fullWidth
                      multiline
                      rows={4}
                      error={Boolean(touched.additional_info && errors.additional_info)}
                    />
                    {touched.additional_info && errors.additional_info && (
                      <FormHelperText error id="helper-text-additional_info-form">
                        {errors.additional_info}
                      </FormHelperText>
                    )}
                  </Stack>
                </Stack>
                <Stack direction="column" spacing={3}>
                  <Stack direction="row" spacing={3}>
                    <Stack spacing={1} sx={{ width: '40%' }}>
                      <InputLabel htmlFor="name-signup">Рост*</InputLabel>
                      <OutlinedInput
                        id="height-login"
                        type="number"
                        value={values.height || ''}
                        name="height"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        placeholder="170"
                        fullWidth
                        inputProps={{ inputMode: 'numeric', pattern: '[0-9]*', min: 18 }}
                        error={Boolean(touched.height && errors.height)}
                      />
                      {touched.height && errors.height && (
                        <FormHelperText error id="helper-text-height-signup">
                          {errors.height}
                        </FormHelperText>
                      )}
                    </Stack>
                    <Stack spacing={1} sx={{ width: '40%' }}>
                      <InputLabel htmlFor="name-signup">Вес*</InputLabel>
                      <OutlinedInput
                        id="weight-login"
                        type="number"
                        value={values.weight || ''}
                        name="weight"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        placeholder="45"
                        fullWidth
                        error={Boolean(touched.weight && errors.weight)}
                        inputProps={{ inputMode: 'numeric', pattern: '[0-9]*', min: 18 }}
                      />
                      {touched.weight && errors.weight && (
                        <FormHelperText error id="helper-text-weight-signup">
                          {errors.weight}
                        </FormHelperText>
                      )}
                    </Stack>
                    <Stack spacing={1} sx={{ width: '20%' }}>
                      <InputLabel htmlFor="name-signup">Размер груди*</InputLabel>
                      <OutlinedInput
                        id="breast_size-login"
                        type="number"
                        value={values.breast_size || ''}
                        name="breast_size"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        placeholder="2"
                        fullWidth
                        inputProps={{ inputMode: 'numeric', pattern: '[0-9]*', min: 0 }}
                        error={Boolean(touched.breast_size && errors.breast_size)}
                      />
                      {touched.breast_size && errors.breast_size && (
                        <FormHelperText error id="helper-text-breast_size-signup">
                          {errors.breast_size}
                        </FormHelperText>
                      )}
                    </Stack>
                  </Stack>
                  <Stack direction={{ xs: 'column', md: 'row' }} spacing={3}>
                    <Stack
                      spacing={1}
                      sx={{ width: { xs: '100%', md: '50%' }, position: 'relative' }}
                    >
                      <InputLabel id="gender-label">Категория*</InputLabel>
                      <Select
                        sx={{
                          '& .MuiList-root': { backgroundColor: '#121212 !important' },
                        }}
                        labelId="gender-label"
                        id="gender"
                        value={values.gender || ''}
                        label="Категория"
                        name="gender"
                        onChange={handleChange}
                      >
                        {genders.map((item) => (
                          <MenuItem key={item.id} value={item.id}>
                            {item.name}
                          </MenuItem>
                        ))}
                      </Select>
                      {touched.gender && errors.gender && (
                        <FormHelperText error id="helper-text-gender-signup">
                          {errors.gender}
                        </FormHelperText>
                      )}
                    </Stack>
                    <Stack spacing={1} sx={{ width: { xs: '100%', md: '50%' } }}>
                      <InputLabel htmlFor="nationality-form">Национальность*</InputLabel>
                      <OutlinedInput
                        id="nationality-form"
                        type="text"
                        value={values.nationality || ''}
                        name="nationality"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        placeholder="Марсианка"
                        fullWidth
                        error={Boolean(touched.nationality && errors.nationality)}
                      />
                      {touched.nationality && errors.nationality && (
                        <FormHelperText error id="helper-text-nationality-form">
                          {errors.nationality}
                        </FormHelperText>
                      )}
                    </Stack>
                  </Stack>
                </Stack>
              </Stack>
              <Stack
                spacing={1}
                sx={{
                  border: '1px solid #ccc',
                  borderRadius: '10px',
                  padding: '20px',
                }}
              >
                <Typography variant="h4" mb={3}>
                  Адрес и контакты*
                </Typography>
                <Divider sx={{ mt: 6 }} />
                <Stack direction="column" spacing={1}>
                  <Stack direction={{ xs: 'column', md: 'row' }} spacing={3}>
                    <Stack
                      spacing={1}
                      sx={{ width: { xs: '100%', md: '50%' }, position: 'relative' }}
                    >
                      <Stack spacing={1}>
                        <InputLabel htmlFor="city-form">Город*</InputLabel>
                        <Select
                          sx={{
                            '& .MuiList-root': { backgroundColor: '#121212 !important' },
                          }}
                          id="city-form"
                          value={values.city || ''}
                          name="city"
                          onBlur={handleBlur}
                          onChange={handleChange}
                        >
                          {cities?.map((city) => (
                            <MenuItem key={city.id} value={city.id}>
                              {city.name}
                            </MenuItem>
                          ))}
                        </Select>

                        {touched.city && errors.city && (
                          <FormHelperText error id="helper-text-city-form">
                            {errors.city}
                          </FormHelperText>
                        )}
                      </Stack>
                    </Stack>
                    <Stack spacing={1} sx={{ width: { xs: '100%', md: '50%' } }}>
                      <InputLabel htmlFor="address-form">Адрес*</InputLabel>
                      <OutlinedInput
                        id="address-form"
                        type="text"
                        value={values.address || ''}
                        name="address"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        placeholder="г. Москва, ул. Пушкина, д. 23"
                        fullWidth
                        error={Boolean(touched.address && errors.address)}
                      />
                      {touched.address && errors.address && (
                        <FormHelperText error id="helper-text-address-form">
                          {errors.address}
                        </FormHelperText>
                      )}
                    </Stack>
                  </Stack>
                  <Stack direction={{ xs: 'column', md: 'row' }} spacing={3}>
                    <Stack spacing={1} sx={{ width: { xs: '100%', md: '50%' } }}>
                      <InputLabel htmlFor="name-signup">Телефон*</InputLabel>
                      <OutlinedInput
                        id="phone-login"
                        type="phone"
                        value={values.phone || ''}
                        name="phone"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        placeholder="+7 (999) 999-99-99"
                        fullWidth
                        error={Boolean(touched.phone && errors.phone)}
                      />
                      {touched.phone && errors.phone && (
                        <FormHelperText error id="helper-text-phone-signup">
                          {errors.phone}
                        </FormHelperText>
                      )}
                    </Stack>
                    <Stack spacing={1} sx={{ width: { xs: '100%', md: '50%' } }}>
                      <InputLabel htmlFor="name-login">Телеграм</InputLabel>
                      <OutlinedInput
                        id="name-login"
                        type="text"
                        value={values.telegram || ''}
                        name="telegram"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        placeholder="@username"
                        fullWidth
                        error={Boolean(touched.telegram && errors.telegram)}
                      />
                      {touched.telegram && errors.telegram && (
                        <FormHelperText error id="helper-text-telegram-signup">
                          {errors.telegram}
                        </FormHelperText>
                      )}
                    </Stack>
                    <Stack spacing={1} sx={{ width: { xs: '100%', md: '50%' } }}>
                      <InputLabel htmlFor="whatsapp-login">Whatsapp</InputLabel>
                      <OutlinedInput
                        id="whatsapp-login"
                        type="phone"
                        value={values.whatsapp || ''}
                        name="whatsapp"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        placeholder="+7 (999) 999-99-99"
                        fullWidth
                        error={Boolean(touched.whatsapp && errors.whatsapp)}
                      />
                      {touched.whatsapp && errors.whatsapp && (
                        <FormHelperText error id="helper-text-whatsapp-signup">
                          {errors.whatsapp}
                        </FormHelperText>
                      )}
                    </Stack>
                  </Stack>
                </Stack>
              </Stack>
              <Stack
                spacing={2}
                sx={{
                  border: '1px solid #ccc',
                  borderRadius: '10px',
                  padding: '20px',
                }}
              >
                <Typography variant="h4" mb={3}>
                  Условия встречи*
                </Typography>
                <Divider sx={{ mt: 6 }} />

                <Stack direction="row" spacing={3} mb={3}>
                  <Stack spacing={1} sx={{ width: '100%' }}>
                    <InputLabel htmlFor="price-form">Цена от*</InputLabel>
                    <OutlinedInput
                      id="price-form"
                      type="number"
                      min="0"
                      value={values.price || ''}
                      name="price"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      placeholder="3000"
                      fullWidth
                      error={Boolean(touched.price && errors.price)}
                    />
                    {touched.price && errors.price && (
                      <FormHelperText error id="helper-text-price-form">
                        {errors.price}
                      </FormHelperText>
                    )}
                  </Stack>
                </Stack>
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3} mb={3}>
                  <Stack spacing={1} width="100%">
                    <InputLabel htmlFor="price_hour-form">Цена за час у меня*</InputLabel>
                    <OutlinedInput
                      id="price_hour-form"
                      type="number"
                      min="0"
                      value={values.price_hour || ''}
                      name="price_hour"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      placeholder="3000"
                      fullWidth
                      error={Boolean(touched.price_hour && errors.price_hour)}
                    />
                    {touched.price_hour && errors.price_hour && (
                      <FormHelperText error id="helper-text-price_hour-form">
                        {errors.price_hour}
                      </FormHelperText>
                    )}
                  </Stack>
                  <Stack spacing={1} width="100%">
                    <InputLabel htmlFor="price_hour_at_your_place-form">
                      Цена за час у клиента*
                    </InputLabel>
                    <OutlinedInput
                      id="price_hour_at_your_place-form"
                      type="number"
                      min="0"
                      value={values.price_hour_at_your_place || ''}
                      name="price_hour_at_your_place"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      placeholder="3000"
                      fullWidth
                      error={Boolean(
                        touched.price_hour_at_your_place && errors.price_hour_at_your_place
                      )}
                    />
                    {touched.price_hour_at_your_place && errors.price_hour_at_your_place && (
                      <FormHelperText error id="helper-text-price_hour_at_your_place-form">
                        {errors.price_hour_at_your_place}
                      </FormHelperText>
                    )}
                  </Stack>
                </Stack>
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3} mb={3}>
                  <Stack spacing={1} width="100%">
                    <InputLabel htmlFor="price_two_hours-form">Цена за два часа у меня*</InputLabel>
                    <OutlinedInput
                      id="price_two_hours-form"
                      type="number"
                      min="0"
                      value={values.price_two_hours || ''}
                      name="price_two_hours"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      placeholder="3000"
                      fullWidth
                      error={Boolean(touched.price_two_hours && errors.price_two_hours)}
                    />
                    {touched.price_two_hours && errors.price_two_hours && (
                      <FormHelperText error id="helper-text-price_two_hours-form">
                        {errors.price_two_hours}
                      </FormHelperText>
                    )}
                  </Stack>
                  <Stack spacing={1} width="100%">
                    <InputLabel htmlFor="price_two_hours_at_you_place-form">
                      Цена за два часа у клиента*
                    </InputLabel>
                    <OutlinedInput
                      id="price_two_hours_at_your_place-form"
                      type="number"
                      min="0"
                      value={values.price_two_hours_at_your_place || ''}
                      name="price_two_hours_at_your_place"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      placeholder="3000"
                      fullWidth
                      error={Boolean(
                        touched.price_two_hours_at_your_place &&
                          errors.price_two_hours_at_your_place
                      )}
                    />
                    {touched.price_two_hours_at_your_place &&
                      errors.price_two_hours_at_your_place && (
                        <FormHelperText error id="helper-text-price_two_hours_at_your_place-form">
                          {errors.price_two_hours_at_your_place}
                        </FormHelperText>
                      )}
                  </Stack>
                </Stack>
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3} mb={3}>
                  <Stack spacing={1} width="100%">
                    <InputLabel htmlFor="price_night-form">Цена за ночь у меня*</InputLabel>
                    <OutlinedInput
                      id="price_night-form"
                      type="number"
                      min="0"
                      value={values.price_night || ''}
                      name="price_night"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      placeholder="3000"
                      fullWidth
                      error={Boolean(touched.price_night && errors.price_night)}
                    />
                    {touched.price_night && errors.price_night && (
                      <FormHelperText error id="helper-text-price_night-form">
                        {errors.price_night}
                      </FormHelperText>
                    )}
                  </Stack>
                  <Stack spacing={1} width="100%">
                    <InputLabel htmlFor="price_night_at_your_place-form">
                      Цена за ночь у клиента*
                    </InputLabel>
                    <OutlinedInput
                      id="price_night_at_your_place-form"
                      type="number"
                      min="0"
                      value={values.price_night_at_your_place || ''}
                      name="price_night_at_your_place"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      placeholder="3000"
                      fullWidth
                      error={Boolean(
                        touched.price_night_at_your_place && errors.price_night_at_your_place
                      )}
                    />
                    {touched.price_night_at_your_place && errors.price_night_at_your_place && (
                      <FormHelperText error id="helper-text-price_night_at_your_place-form">
                        {errors.price_night_at_your_place}
                      </FormHelperText>
                    )}
                  </Stack>
                </Stack>
                <Divider sx={{ my: 6 }} />
                <Stack spacing={0} sx={{ width: '100%' }}>
                  <Typography variant="h4">Услуги*</Typography>
                  {touched.services && errors.services && (
                    <FormHelperText error id="helper-text-services-form">
                      {errors.services}
                    </FormHelperText>
                  )}
                  <FormGroup>
                    {servicesTypes?.length > 0 ? (
                      servicesTypes
                        .filter((s) => s.services.length > 0)
                        .map((serviceType) => (
                          <Accordion
                            key={serviceType.id}
                            sx={{
                              backgroundColor: 'transparent',
                              backgroundImage: 'none',
                              boxShadow: 'none',
                              margin: '0 !important',
                            }}
                          >
                            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                              <Typography variant="h6">{serviceType.name}</Typography>
                            </AccordionSummary>
                            <AccordionDetails sx={{ paddingY: 0 }}>
                              <Stack
                                spacing={1}
                                component="ul"
                                sx={{
                                  listStyle: 'none',
                                  padding: 0,
                                  margin: 0,
                                  columnCount: { xs: 1, md: 3 },
                                  columnFill: 'balance',
                                  display: 'block',
                                }}
                              >
                                {serviceType.services.map((service) => (
                                  <Stack
                                    key={service.id}
                                    component="li"
                                    sx={{
                                      breakInside: 'avoid',
                                      display: 'list-item',
                                      width: 'fit-content',
                                    }}
                                  >
                                    <FormControlLabel
                                      control={
                                        <Checkbox
                                          error={Boolean(touched.services && errors.services)}
                                          checked={values.services.some((s) => s.id === service.id)}
                                          name={service.id}
                                          onChange={(e) => {
                                            if (e.target.checked) {
                                              setFieldValue('services', [
                                                ...values.services,
                                                { id: service.id, price: '' },
                                              ]);
                                            } else {
                                              setFieldValue(
                                                'services',
                                                values.services.filter((s) => s.id !== service.id)
                                              );
                                            }
                                          }}
                                        />
                                      }
                                      label={service.name}
                                    />
                                    {values.services.some((s) => s.id === service.id) && (
                                      <OutlinedInput
                                        id={`price-${service.id}`}
                                        type="text"
                                        value={
                                          values.services.find((s) => s.id === service.id)?.price ||
                                          ''
                                        }
                                        onBlur={handleBlur}
                                        onChange={(e) => {
                                          setFieldValue(
                                            'services',
                                            values.services.map((s) =>
                                              s.id === service.id
                                                ? { ...s, price: e.target.value }
                                                : s
                                            )
                                          );
                                        }}
                                        placeholder="Добавьте комментарий"
                                        fullWidth
                                        sx={{ mb: 1 }}
                                      />
                                    )}
                                  </Stack>
                                ))}
                              </Stack>
                            </AccordionDetails>
                          </Accordion>
                        ))
                    ) : (
                      <Typography variant="h6">Услуги не найдены</Typography>
                    )}
                  </FormGroup>
                </Stack>
              </Stack>

              <Stack xs={12} sx={{ mt: 3 }}>
                {errors.submit && (
                  <Stack xs={12}>
                    <FormHelperText error>{errors.submit}</FormHelperText>
                  </Stack>
                )}
                <Button
                  disabled={
                    isSubmitting ||
                    isPosting ||
                    isEditing ||
                    [
                      'name',
                      'phone',
                      'gender',
                      'age',
                      'height',
                      'weight',
                      'breast_size',
                      'nationality',
                      'address',
                      'price',
                      'price_hour',
                      'price_two_hours',
                      'price_night',
                      'price_hour_at_your_place',
                      'price_two_hours_at_your_place',
                      'price_night_at_your_place',
                      'city',
                      'additional_info',
                    ].some((field) => values[field] === '') ||
                    !values.services?.length > 0 ||
                    values.photos?.length < 3
                  }
                  fullWidth
                  size="large"
                  type="submit"
                  variant="contained"
                  color="primary"
                  onClick={handleSubmit}
                >
                  {profile?.id ? 'Сохранить анкету' : 'Создать анкету'}
                </Button>
              </Stack>
            </Stack>
          </form>
        )}
      </Formik>
    </>
  );
};

export default AnketaForm;
