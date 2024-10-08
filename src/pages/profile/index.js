import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  Container,
  Box,
  Typography,
  Button,
  TextField,
  Stack,
  List,
  ListItem,
  ListItemText,
  CircularProgress,
  IconButton,
} from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import DeleteIcon from '@mui/icons-material/Delete';

import {
  useGetProfilePhotosQuery,
  useGetProfileQuery,
  useGetProfileCommentsQuery,
  usePostCommentMutation,
  useDeleteCommentMutation,
} from 'store/reducers/api';
import { useAuth } from 'contexts/index';
import Loader from 'components/Loader';
import MySwiper from './MySwiper';

const Profile = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const [photos, setPhotos] = useState([]);
  const [newComment, setNewComment] = useState({});
  const [showContact, setShowContact] = useState(false);

  const { data: girl = {}, isFetching } = useGetProfileQuery(id);
  const { data: photoData = [], isFetching: photoIsFetching } = useGetProfilePhotosQuery(id);
  const { data: comments = [] } = useGetProfileCommentsQuery(id);
  const [postComment, { isLoading }] = usePostCommentMutation();
  const [deleteComment, { isLoading: isDeletingComment }] = useDeleteCommentMutation();

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
        setNewComment({}); // Clear the comment input
      }
    }
  };
  if (isFetching || photoIsFetching) {
    return <Loader />;
  }

  return (
    <Container>
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        justifyContent="space-between"
        mb={2}
        spacing={2}
        alignItems="center"
      >
        <Typography variant="h1" fontWeight="bold" color="text.primary">
          {girl.name}, {girl.age} года, в городе {girl.city?.name}
        </Typography>
        <Stack justifyContent="center">
          {showContact ? (
            <Typography variant="h4" color="text.primary" onClick={() => setShowContact(false)}>
              {girl.phone}
            </Typography>
          ) : (
            <Button
              onClick={() => setShowContact(true)}
              color="secondary"
              variant="contained"
              startIcon={<AccountCircleIcon />}
            >
              Показать контакты
            </Button>
          )}
        </Stack>
      </Stack>
      <Box sx={{ display: 'flex', gap: 3, flexDirection: { xs: 'column', sm: 'row' } }}>
        <Box height={{ xs: 450, sm: 700 }} width={{ xs: '100%', sm: 550 }}>
          {photos.length > 0 && <MySwiper photos={photos} />}
        </Box>
        <Box flex={1}>
          <Stack spacing={1.5} justifyContent="left">
            <Stack direction="row" justifyContent="left" spacing={1}>
              <Typography variant="h4" fontWeight="bold" color="text.disabled">
                Город :
              </Typography>
              <Typography variant="h4" color="text.primary">
                {girl.city?.name}
              </Typography>
            </Stack>
            <Stack direction="row" justifyContent="left" spacing={1}>
              <Typography variant="h4" fontWeight="bold" color="text.disabled">
                Адрес :
              </Typography>
              <Typography variant="h4" color="text.primary">
                {girl.address}
              </Typography>
            </Stack>
            <Stack direction="row" justifyContent="left" spacing={1}>
              <Typography variant="h4" color="text.primary">
                {girl.profile_type?.name}
              </Typography>
            </Stack>

            <Stack direction="row" justifyContent="left" spacing={1}>
              <Typography variant="h4" fontWeight="bold" color="text.disabled">
                Гендер :
              </Typography>
              <Typography variant="h4" color="text.primary">
                {girl.gender?.name}
              </Typography>
            </Stack>
            <Stack direction="row" justifyContent="left" spacing={1}>
              <Typography variant="h4" color="text.primary">
                <Typography variant="h4" fontWeight="bold" color="text.disabled" component="span">
                  Возраст :
                </Typography>
                {girl.age}
              </Typography>
            </Stack>
            <Stack direction="row" justifyContent="left" spacing={1}>
              <Typography variant="h4" fontWeight="bold" color="text.disabled">
                Грудь :
              </Typography>
              <Typography variant="h4" color="text.primary">
                {girl.breast_size}
              </Typography>
            </Stack>
            <Stack direction="row" justifyContent="left" spacing={1}>
              <Typography variant="h4" fontWeight="bold" color="text.disabled">
                Вес :
              </Typography>
              <Typography variant="h4" color="text.primary">
                {girl.weight}
              </Typography>
            </Stack>
            <Stack direction="row" justifyContent="left" spacing={1}>
              <Typography variant="h4" fontWeight="bold" color="text.disabled">
                Рост :
              </Typography>
              <Typography variant="h4" color="text.primary">
                {girl.height}
              </Typography>
            </Stack>
            <Stack direction="row" justifyContent="left" spacing={1}>
              <Typography variant="h4" fontWeight="bold" color="text.disabled">
                Национальность :
              </Typography>
              <Typography variant="h4" color="text.primary">
                {girl.nationality}
              </Typography>
            </Stack>
            <Stack direction="row" justifyContent="left" spacing={1}>
              <Typography variant="h4" fontWeight="bold" color="text.disabled">
                Цена за час :
              </Typography>
              <Typography variant="h4" color="text.primary">
                {girl.price_hour}
              </Typography>
            </Stack>
            <Stack direction="row" justifyContent="left" spacing={1}>
              <Typography variant="h4" fontWeight="bold" color="text.disabled">
                Цена за два часа :
              </Typography>
              <Typography variant="h4" color="text.primary">
                {girl.price_two_hours}
              </Typography>
            </Stack>
            <Stack direction="row" justifyContent="left" spacing={1}>
              <Typography variant="h4" fontWeight="bold" color="text.disabled">
                Цена за ночь :
              </Typography>
              <Typography variant="h4" color="text.primary">
                {girl.price_night}
              </Typography>
            </Stack>
            <Stack direction="row" justifyContent="left" spacing={1}>
              <Typography variant="h4" color="text.primary" whiteSpace="pre-line">
                <Typography variant="h4" fontWeight="bold" color="text.disabled" component="span">
                  О себе :
                </Typography>{' '}
                {girl.additional_info}
              </Typography>
            </Stack>
            {girl.services.length > 0 && (
              <Stack direction="row" justifyContent="left" spacing={1}>
                <Typography variant="h4" fontWeight="bold" color="text.disabled" component="span">
                  Услуги :
                </Typography>
                {girl.services.map((service) => (
                  <Typography variant="h4" color="text.primary" whiteSpace="pre-line">
                    {service.name} за {service.price}
                  </Typography>
                ))}
              </Stack>
            )}
          </Stack>
        </Box>
      </Box>
      {/* Comment Section */}
      <Box mt={6}>
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
                    {(girl?.user_id === user?.user_id || user?.is_admin === 1) && (
                      <IconButton
                        onClick={async () => await deleteComment(comment.id)}
                        size="small"
                        disabled={isDeletingComment}
                      >
                        {<DeleteIcon sx={{ color: 'grey.300' }} fontSize="small" />}
                      </IconButton>
                    )}
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
        {user?.user_id !== girl?.user_id && (
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
        )}
      </Box>
    </Container>
  );
};

export default Profile;
