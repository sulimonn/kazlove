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
import DoneIcon from '@mui/icons-material/Done';
import TelegramIcon from '@mui/icons-material/Telegram';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';

import {
  useGetProfilePhotosQuery,
  useGetProfileQuery,
  useGetProfileCommentsQuery,
  usePostCommentMutation,
  useDeleteCommentMutation,
  useFetchMediaQuery,
} from 'store/reducers/api';
import { useAuth } from 'contexts/index';
import Loader from 'components/Loader';
import MySwiper from './MySwiper';

const Profile = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const [photos, setPhotos] = useState([]);
  const [media, setMedia] = useState([]);
  const [newComment, setNewComment] = useState({});
  const [showContact, setShowContact] = useState(false);

  const { data: girl = {}, isFetching } = useGetProfileQuery(id);
  const {
    data: photoData = [],
    isFetching: photoIsFetching,
    refetch,
  } = useGetProfilePhotosQuery(id);
  const { data: intitialMedia = [], isFetching: mediaIsFetching } = useFetchMediaQuery(id);
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

    if (intitialMedia.length > 0) {
      setMedia(
        intitialMedia.map((photo) => ({
          id: photo[0],
          upload: process.env.REACT_APP_SERVER_URL + photo[1],
        }))
      );
    }
  }, [photoData, intitialMedia]);

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
  if (isFetching || photoIsFetching || mediaIsFetching) {
    return <Loader />;
  }

  return (
    <Container maxWidth="xl">
      <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
        <Box
          width={{
            xs: '100%',
            md: 462,
          }}
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            height: '100%',
            overflow: 'hidden',
          }}
        >
          {photos.length > 0 && <MySwiper photos={photos} refetch={refetch} media={media} />}
        </Box>
        <Box flex={1}>
          <Stack spacing={1.5} justifyContent="left">
            <Stack
              direction="column"
              justifyContent="space-between"
              mb={2}
              spacing={2}
              alignItems="left"
            >
              <Typography variant="h2" fontWeight="bold" color="text.primary">
                {girl.name}, {girl.age} года
              </Typography>
              <Typography variant="h4" fontWeight="normal" color="text.primary">
                {girl.city?.name}, {girl.address}
              </Typography>
              <Stack justifyContent="left">
                {showContact ? (
                  <Stack direction={{ xs: 'column', md: 'row' }} spacing={1}>
                    {girl.phone && (
                      <Button
                        component="a"
                        href={`tel:${girl.phone}`}
                        variant="outlined"
                        sx={{ flex: 1 }}
                        startIcon={<LocalPhoneIcon />}
                      >
                        <Typography variant="body1" color="text.primary">
                          {girl.phone}
                        </Typography>
                      </Button>
                    )}
                    {girl.telegram && (
                      <Button
                        component="a"
                        href={`https://t.me/${girl.telegram}`}
                        variant="outlined"
                        sx={{ flex: 1 }}
                        startIcon={<TelegramIcon />}
                      >
                        <Typography variant="body1" color="text.primary">
                          {girl.telegram}
                        </Typography>
                      </Button>
                    )}
                    {girl.whatsapp && (
                      <Button
                        component="a"
                        href={`https://whatsapp.com/${girl.whatsapp}`}
                        variant="outlined"
                        sx={{ flex: 1 }}
                        startIcon={<WhatsAppIcon />}
                      >
                        <Typography variant="body1" color="text.primary">
                          {girl.whatsapp}
                        </Typography>
                      </Button>
                    )}
                  </Stack>
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
            <Stack
              direction={{ xs: 'column', sm: 'row', md: 'column', lg: 'row' }}
              justifyContent="left"
              spacing={0.5}
            >
              <Stack direction="row" justifyContent="left" spacing={1} flex={1.5}>
                <Typography variant="h5" color="text.primary" whiteSpace="pre-line">
                  {girl.additional_info}
                </Typography>
              </Stack>
              <Stack flex={1}>
                <Box
                  sx={{
                    width: '100%',
                    p: 1.5,
                    borderRadius: 2,
                    position: 'relative',
                    '&::after': {
                      content: '""',
                      display: 'block',
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      backgroundColor: 'secondary.lighter',
                      opacity: 0.3,
                      borderRadius: 2,
                      zIndex: -1,
                    },
                  }}
                >
                  <Typography
                    variant="h5"
                    color="text.primary"
                    whiteSpace="pre-line"
                    fontWeight="bold"
                  >
                    🙍‍♀️ {girl.nationality}
                  </Typography>
                  <Typography
                    variant="h5"
                    color="text.primary"
                    whiteSpace="pre-line"
                    fontWeight="bold"
                  >
                    ❤️‍🩹 {girl.weight} кг, {girl.height} см
                  </Typography>
                  <Typography
                    variant="h5"
                    color="text.primary"
                    whiteSpace="pre-line"
                    fontWeight="bold"
                  >
                    🍒 {girl.breast_size} размер груди
                  </Typography>
                  <Box display="grid" sx={{ gridTemplateColumns: '1fr 1fr', gap: 1 }} mt={3}>
                    <Box height="100%" bgcolor="primary.dark" py={1} px={2} borderRadius={2}>
                      <Stack
                        direction="row"
                        justifyContent="space-between"
                        alignItems="flex-start"
                        spacing={1}
                      >
                        <Typography variant="h5" color="text.primary" whiteSpace="pre-line">
                          Цена от
                        </Typography>
                        <Typography variant="h2">💫</Typography>
                      </Stack>
                      <Typography variant="h5" color="text.primary" whiteSpace="pre-line">
                        {new Intl.NumberFormat('ru-RU').format(girl.price)} ₸
                      </Typography>
                    </Box>
                    <Box height="100%" bgcolor="primary.dark" py={1} px={2} borderRadius={2}>
                      <Stack
                        direction="row"
                        justifyContent="space-between"
                        alignItems="flex-start"
                        spacing={1}
                      >
                        <Typography variant="h5" color="text.primary" whiteSpace="pre-line">
                          1 час
                        </Typography>
                        <Typography variant="h2">🌞</Typography>
                      </Stack>
                      <Typography variant="h5" color="text.primary" whiteSpace="pre-line">
                        {new Intl.NumberFormat('ru-RU').format(girl.price_hour)} ₸
                      </Typography>
                    </Box>
                    <Box height="100%" bgcolor="primary.dark" py={1} px={2} borderRadius={2}>
                      <Stack
                        direction="row"
                        justifyContent="space-between"
                        alignItems="flex-start"
                        spacing={1}
                      >
                        <Typography variant="h5" color="text.primary" whiteSpace="pre-line">
                          2 часа
                        </Typography>
                        <Typography variant="h2">🌞</Typography>
                      </Stack>
                      <Typography variant="h5" color="text.primary" whiteSpace="pre-line">
                        {new Intl.NumberFormat('ru-RU').format(girl.price_two_hours)} ₸
                      </Typography>
                    </Box>
                    <Box height="100%" bgcolor="secondary.dark" py={1} px={2} borderRadius={2}>
                      <Stack
                        direction="row"
                        justifyContent="space-between"
                        alignItems="flex-start"
                        spacing={1}
                      >
                        <Typography variant="h5" color="text.primary" whiteSpace="pre-line">
                          Ночь
                        </Typography>
                        <Typography variant="h2">🌚</Typography>
                      </Stack>
                      <Typography variant="h5" color="text.primary" whiteSpace="pre-line">
                        {new Intl.NumberFormat('ru-RU').format(girl.price_night)} ₸
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </Stack>
            </Stack>
          </Stack>
          {girl.services.length > 0 && (
            <Stack direction="column" justifyContent="left" spacing={2} my={4}>
              <Typography variant="h3" fontWeight="bold">
                Предпочтения
              </Typography>
              <Box
                component="ul"
                sx={{
                  listStyle: 'none',
                  padding: 0,
                  margin: 0,
                  columnCount: { xs: 1, md: 2 },
                  columnFill: 'balance',
                  display: 'block',
                  gap: '10px',
                }}
              >
                {girl.services.map((service) => (
                  <Box
                    component="li"
                    key={service.id}
                    my={1}
                    sx={{
                      breakInside: 'avoid',
                      display: 'list-item',
                      width: 'fit-content',
                    }}
                  >
                    <Stack direction="column">
                      <Stack alignItems="center" direction="row" spacing={1}>
                        <DoneIcon
                          size="small"
                          color="primary"
                          sx={{ width: '16px', height: '16px' }}
                        />
                        <Typography
                          variant="h4"
                          color="text.primary"
                          whiteSpace="pre-line"
                          fontWeight="bold"
                        >
                          {service.name}
                        </Typography>
                      </Stack>
                      {service?.price !== '' && (
                        <Typography
                          variant="body1"
                          color="primary"
                          whiteSpace="pre-line"
                          sx={{ ml: 3 }}
                        >
                          <i>{service.price}</i>
                        </Typography>
                      )}
                    </Stack>
                  </Box>
                ))}
              </Box>
            </Stack>
          )}
        </Box>
      </Stack>
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
