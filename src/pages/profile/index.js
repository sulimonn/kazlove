import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  Container,
  Box,
  Typography,
  Button,
  TextField,
  List,
  ListItem,
  ListItemText,
  Stack,
  CircularProgress,
} from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

import { Scrollbar, A11y, Navigation, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/scrollbar';
import 'swiper/css/navigation';

import {
  useGetProfilePhotosQuery,
  useGetProfileQuery,
  useGetProfileCommentsQuery,
  usePostCommentMutation,
} from 'store/reducers/api';
import { useAuth } from 'contexts/index';

const Profile = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const [showContact, setShowContact] = useState(false);
  const [photos, setPhotos] = useState([]);
  const [newComment, setNewComment] = useState({});
  const [comments, setComments] = useState([]);

  const { data: girl = {} } = useGetProfileQuery(id);
  const { data: photoData = [] } = useGetProfilePhotosQuery(girl?.id);
  const { data: commentData = [] } = useGetProfileCommentsQuery(girl?.id);
  const [postComment, { isLoading }] = usePostCommentMutation();

  // Handle setting profile photos
  useEffect(() => {
    if (photoData.length > 0) {
      setPhotos(
        photoData.map((photo) => ({
          id: photo[0],
          upload: process.env.REACT_APP_SERVER_URL + photo[1],
        }))
      );
    }
  }, [photoData]);

  // Handle setting comments
  useEffect(() => {
    if (commentData.length > 0) {
      setComments(commentData);
    }
  }, [commentData]);

  // Handle comment submission
  const handleCommentSubmit = async () => {
    if (newComment.text.trim()) {
      const commentPayload = {
        text: newComment?.text.trim(),
        user_name: newComment?.user_name,
        user_id: user?.user_id,
        profile_id: girl?.id,
        date: new Date(),
      };

      const response = await postComment(commentPayload);

      if (response?.data) {
        setComments((prevComments) => [...prevComments, response.data]);
        setNewComment({}); // Clear the comment input
      }
    }
  };

  return (
    <Container maxWidth="xl">
      <Box sx={{ display: 'flex', gap: 3, flexDirection: { xs: 'column', sm: 'row' } }}>
        <Box
          height={{ xs: 350, sm: 550 }}
          width={{ xs: '100%', sm: 400 }}
          bgcolor={'background.paper'}
          borderRadius={2}
          sx={{
            '--swiper-theme-color': '#6e5ae2',
          }}
        >
          <Swiper
            modules={[Scrollbar, A11y, Navigation, Autoplay]}
            navigation
            slidesPerView={1}
            spaceBetween={0}
            scrollbar={{ draggable: true }}
            style={{ height: '100%' }}
            autoplay
            delay={3000}
          >
            {photos?.map((image) => (
              <SwiperSlide key={image.id}>
                <Box height="100%">
                  <img
                    src={image?.upload}
                    alt="girl"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    loading="lazy"
                  />
                </Box>
              </SwiperSlide>
            ))}
          </Swiper>
        </Box>
        <Box flex={1}>
          <Typography variant="h3" color="text.primary">
            {girl.name} {girl.age}
          </Typography>
          <Typography variant="body1" color="text.secondary" fontWeight={'900'} my={1}>
            {girl.address}, {girl.city?.name}
          </Typography>
          <Box display={'flex'} gap={1} width={'100%'}>
            {showContact ? (
              <Button
                color="primary"
                variant="contained"
                onClick={() => {
                  setShowContact(false);
                }}
              >
                {girl.phone}
              </Button>
            ) : (
              <Button
                color="primary"
                variant="contained"
                onClick={() => {
                  setShowContact(true);
                }}
                sx={{ width: '100%' }}
              >
                Показать контакты
              </Button>
            )}
          </Box>
          <Box display={'flex'} mt={2} gap={2} flexDirection={{ xs: 'column', md: 'row' }}>
            <Stack flex={1}>
              <Typography
                variant="body1"
                color="text.secondary"
                whiteSpace={'pre-line'}
                mb={4}
                sx={{ flex: 1 }}
              >
                {girl.additional_info}
              </Typography>

              <Typography
                variant="h4"
                fontWeight={700}
                color="text.secondary"
                whiteSpace={'pre-line'}
                mb={2}
              >
                Услуги
              </Typography>
              {girl.services?.map((service) => (
                <Typography variant="body1" color="text.secondary" whiteSpace={'pre-line'} mb={2}>
                  <i>{service?.name}</i>
                </Typography>
              ))}
            </Stack>
            <Box bgcolor={'primary.lighter'} sx={{ flex: 1, borderRadius: 2, p: 2 }}>
              <Typography variant="h5" fontWeight={'bold'}>
                {girl.nationality}, {girl?.profile_type?.name}
              </Typography>
              <Typography variant="h5" fontWeight={'bold'}>
                {girl.weight}кг, {girl.height}см
              </Typography>
              <Typography variant="h5" fontWeight={'bold'}>
                {girl.breast_size} размер груди
              </Typography>
              <Typography
                variant="h4"
                fontWeight={700}
                sx={{
                  mt: 2,
                  backgroundColor: 'white',
                  px: 1,
                  py: 0.5,
                  borderRadius: 30,
                  color: 'primary.main',
                  width: 'fit-content',
                }}
              >
                от {girl.price} ₽
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
      {/* Comment Section */}
      <Box mt={6} pl={{ xs: 0, sm: '400px' }}>
        <Typography variant="h3" gutterBottom>
          Отзывы
        </Typography>
        <List>
          {comments.map((comment) => (
            <ListItem key={comment.id} alignItems="flex-start">
              <ListItemText
                primary={
                  <Box display="flex" alignItems="center" gap={0.5} mb={0.5} flexWrap="wrap">
                    <AccountCircleIcon sx={{ color: 'grey.500' }} />
                    <Typography variant="caption" color="grey.500" sx={{ fontWeight: 700, mr: 2 }}>
                      {comment.user_name}
                    </Typography>
                    <Typography variant="caption" color="grey.500">
                      {new Date(comment.date).toLocaleDateString('ru-RU')}
                    </Typography>
                  </Box>
                }
                secondary={
                  <Typography variant="subtitle1" whiteSpace={'pre-line'}>
                    {comment.text}
                  </Typography>
                }
              />
            </ListItem>
          ))}
        </List>

        {/* Comment Input */}
        <Box mt={2}>
          <TextField
            value={newComment.user_name || ''}
            fullWidth
            label="Ваше имя"
            variant="outlined"
            onChange={(e) => setNewComment((prev) => ({ ...prev, user_name: e.target.value }))}
            color="secondary"
            sx={{
              '& .MuiOutlinedInput-root': {
                '&:hover fieldset': {
                  borderColor: 'secondary.main',
                },
              },
              mb: 1,
            }}
          />
          <TextField
            fullWidth
            label="Комментарий"
            variant="outlined"
            value={newComment?.text || ''}
            onChange={(e) => setNewComment((prev) => ({ ...prev, text: e.target.value }))}
            multiline
            rows={3}
            color="secondary"
            sx={{
              '& .MuiOutlinedInput-root': {
                '&:hover fieldset': {
                  borderColor: 'secondary.main',
                },
              },
            }}
          />
          {!user?.user_id && (
            <Typography variant="subtitle2" color="error">
              Войдите или зарегистрируйтесь, чтобы оставлять комментарии
            </Typography>
          )}
          <Button
            variant="contained"
            color="secondary"
            onClick={handleCommentSubmit}
            sx={{ mt: 2 }}
            disabled={!newComment?.text || !newComment?.user_name || !user?.user_id || isLoading}
          >
            {isLoading ? <CircularProgress color="inherit" size={20} /> : 'Отправить комментарий'}
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Profile;
