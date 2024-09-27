import React from 'react';
// material-ui
import {
  Button,
  FormHelperText,
  Grid,
  InputLabel,
  OutlinedInput,
  Stack,
  Select,
  MenuItem,
  TextField,
} from '@mui/material';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';

// project import
import AnimateButton from 'components/@extended/AnimateButton';
import {
  useAddServiceMutation,
  useDeleteProfilePhotoMutation,
  useDeleteServiceMutation,
  useEditProfileMutation,
  useFetchCitiesQuery,
  useFetchGendersQuery,
  useFetchServicesQuery,
  useFetchTypesQuery,
  usePostPhotosMutation,
  usePostProfileMutation,
} from 'store/reducers/api';
import Autocomplete from './Autocomplete';
import { useAuth } from 'contexts/index';
import Pictures from './Pictures';
import Loader from 'components/Loader';

// assets

// ============================|| FIREBASE - REGISTER ||============================ //

const AnketaForm = ({ profile = null, photos: initialPhotos = [], ...others }) => {
  const { user } = useAuth();

  const [postProfile, { isLoading: isPosting }] = usePostProfileMutation();
  const [editProfile, { isLoading: isEditing }] = useEditProfileMutation();
  const [addService, { isLoading: isAdding }] = useAddServiceMutation();
  const [deleteService, { isLoading: isDeleting }] = useDeleteServiceMutation();
  const [postPhotos, { isLoading: isPostingPhotos }] = usePostPhotosMutation();
  const [deletePhoto, { isLoading: isDeletingPhoto }] = useDeleteProfilePhotoMutation();

  const { data: cities = [] } = useFetchCitiesQuery();
  const { data: genders = [] } = useFetchGendersQuery();
  const { data: types = [] } = useFetchTypesQuery();
  const { data: servicesData } = useFetchServicesQuery();

  const [photos, setPhotos] = React.useState(initialPhotos);

  React.useEffect(() => {
    setPhotos(initialPhotos);
  }, [initialPhotos]);

  if (
    isPosting ||
    isEditing ||
    isAdding ||
    isDeleting ||
    isPostingPhotos ||
    isDeletingPhoto ||
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
          additional_info: '',
          ...profile,
          city: profile?.city?.id || '',
          gender: profile?.gender?.id || '',
          profile_type: profile?.profile_type?.id || '',
          photos: initialPhotos,
          submit: null,
        }}
        validationSchema={Yup.object().shape({
          name: Yup.string().max(255).required('Имя обязательно'),
          phone: Yup.string().max(255).required('Телефон обязателен'),
          profile_type: Yup.string().max(255).required('Тип обязателен'),
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
          price: Yup.string().max(255).required('Цена обязательна'),
          city: Yup.number().required('Город обязателен'),
          additional_info: Yup.string().required('Дополнительная информация обязательна'),
          photos: Yup.array()
            .min(2, 'Минимальное количество фото 3')
            .max(15, 'Максимальное количество фото 15')
            .required('Фото обязательно'),
        })}
        onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
          try {
            if (photos.filter((photo) => photo?.upload).length < 3) {
              setStatus({ success: false });
              setErrors({
                submit: 'Минимальное количество фото 3',
                photos: 'Минимальное количество фото 3',
              });
            } else {
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
              const addServices = async (profile_id) => {
                const allServices = profile?.services || [];
                const selectedServices = services || [];

                // Assuming services are objects with an `id` property
                const forAdd = selectedServices
                  .filter(
                    (item) =>
                      !allServices.find((service) => {
                        return service.id === item.id;
                      })
                  )
                  .map((item) => ({ service_id: item.id, profile_id: profile_id }));

                const forDelete = allServices
                  .filter((service) => !selectedServices.find((item) => item.id === service.id))
                  .map((service) => ({ service_id: service.id, profile_id: profile_id }));
                if (forAdd.length > 0) {
                  const response = await addService(forAdd);
                  if (response?.error) {
                    setErrors({ submit: 'Что то пошло не так при добавлении услуг' });
                  }
                }
                if (forDelete.length > 0) {
                  const response = await deleteService(forDelete);
                  if (response?.error) {
                    setErrors({ submit: 'Что то пошло не так при удалении услуг' });
                  }
                }
              };

              const handlePostPhotos = async (profile_id) => {
                setPhotos((prev) => prev.map((photo) => photo.upload));
                const postFormData = new FormData();

                photos.forEach(async (photo) => {
                  if (photo.upload && typeof photo?.upload === 'object') {
                    postFormData.append('files', photo.upload);
                  } else if (!photo?.upload && photo?.id) {
                    await deletePhoto({ id: photo.id, profile_id: profile_id });
                  }
                });

                if (
                  photos.filter((photo) => typeof photo?.upload === 'object' && photo?.upload)
                    .length > 0
                ) {
                  const responsePhotos = await postPhotos({
                    data: postFormData,
                    profile_id: profile_id,
                  });

                  if (responsePhotos?.error) {
                    setErrors({ submit: 'Что то пошло не так при загрузке фото' });
                  } else {
                    setSubmitting(false);
                  }
                }
              };

              if (!profile) {
                const response = await postProfile({ ...profileData, user_id: user?.user_id });
                if (response?.error) {
                  setErrors({ submit: 'Что то пошло не так' });
                  setStatus({ success: false });
                } else {
                  await addServices(response.data.id);
                  await handlePostPhotos(response.data.id);
                }
              } else {
                const response = await editProfile(profileData);
                if (response.error) {
                  setErrors({ submit: 'Что то пошло не так' });
                } else {
                  await addServices(profile.id);
                  await handlePostPhotos(profile.id);
                }
              }
              setStatus({ success: false });
            }
          } catch (err) {
            console.error(err);
            setStatus({ success: false });
            setErrors({ submit: err.message });
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
            <Grid container spacing={3}>
              <Grid item xs={12} md={5}>
                <Stack
                  spacing={3}
                  direction="column"
                  height="100%"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Pictures photos={photos} setPhotos={setPhotos} setFieldValue={setFieldValue} />
                  {errors.photos && (
                    <FormHelperText error id="helper-text-photos-form" sx={{ mx: 'auto' }}>
                      {errors.photos}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>
              <Grid item xs={12} md={7}>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <Stack spacing={1}>
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
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Stack spacing={1}>
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
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Stack spacing={1}>
                      <InputLabel id="profile_type-label">Тип</InputLabel>
                      <Select
                        sx={{
                          '& .MuiList-root': { backgroundColor: 'background.default' },
                        }}
                        labelId="profile_type-label"
                        id="profile_type"
                        value={values.profile_type || ''}
                        label="Тип"
                        onChange={handleChange}
                        name="profile_type"
                        onBlur={handleBlur}
                      >
                        {types.map((item) => (
                          <MenuItem key={item.id} value={item.id}>
                            {item.name}
                          </MenuItem>
                        ))}
                      </Select>
                      {touched.profile_type && errors.profile_type && (
                        <FormHelperText error id="helper-text-type-signup">
                          {errors.profile_type}
                        </FormHelperText>
                      )}
                    </Stack>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Stack spacing={1}>
                      <InputLabel id="gender-label">Пол*</InputLabel>
                      <Select
                        sx={{
                          '& .MuiList-root': { backgroundColor: '#121212 !important' },
                        }}
                        labelId="gender-label"
                        id="gender"
                        value={values.gender || ''}
                        label="Пол"
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
                  </Grid>
                  <Grid item xs={5} md={3}>
                    <Stack spacing={1}>
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
                  </Grid>
                  <Grid item xs={4} md={3}>
                    <Stack spacing={1}>
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
                  </Grid>{' '}
                  <Grid item xs={3}>
                    <Stack spacing={1}>
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
                  </Grid>
                  <Grid item xs={4} md={3}>
                    <Stack spacing={1}>
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
                  </Grid>
                  <Grid item xs={8} md={6}>
                    <Stack spacing={1}>
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
                  </Grid>
                  <Grid item xs={12} md={6}>
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
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12} md={3}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="price-form">Цена за услуги*</InputLabel>
                  <OutlinedInput
                    id="price-form"
                    type="number"
                    min="0"
                    value={values.price || ''}
                    name="price"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="3000+"
                    fullWidth
                    error={Boolean(touched.price && errors.price)}
                  />
                  {touched.price && errors.price && (
                    <FormHelperText error id="helper-text-price-form">
                      {errors.price}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>
              <Grid item xs={12} md={9}>
                <Stack spacing={1}>
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
              </Grid>
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel>Услуги*</InputLabel>

                  <Autocomplete
                    value={values?.services}
                    values={servicesData || []}
                    setValues={(values) => setFieldValue('services', values)}
                  />
                </Stack>
              </Grid>
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="decription-form">Обо мне*</InputLabel>
                  <TextField
                    id="decription-form"
                    type="text"
                    value={values.additional_info}
                    name="additional_info"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="Напишите какой-нибудь текст"
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
              </Grid>
              {errors.submit && (
                <Grid item xs={12}>
                  <FormHelperText error>{errors.submit}</FormHelperText>
                </Grid>
              )}
              <Grid item xs={12}>
                <AnimateButton>
                  <Button
                    disableElevation
                    disabled={isSubmitting || isPosting || isEditing}
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                    color="primary"
                  >
                    {profile?.id ? 'Сохранить анкету' : 'Создать анкету'}
                  </Button>
                </AnimateButton>
              </Grid>
            </Grid>
          </form>
        )}
      </Formik>
    </>
  );
};

export default AnketaForm;
