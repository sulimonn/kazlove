import React from 'react';
import PropTypes from 'prop-types';
import { Navigation, Pagination, A11y } from 'swiper/modules';

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

// material-ui
import { Box, IconButton, Button, Stack } from '@mui/material';
import { Delete, Add } from '@mui/icons-material';
import createPreview from 'utils/createPreview';

const MySwiper = ({ photos = [], setPhotos, media, setMedia, ...props }) => {
  const mediaRef = React.useRef(null);
  const imageRef = React.useRef(null);
  const [isFullScreen, setIsFullScreen] = React.useState(false);

  const handleDeletePhoto = (id) => {
    const updatedPhotos = photos.filter((photo) => photo.id !== id);
    const deletedPhoto = photos.find((photo) => photo.id === id);
    deletedPhoto.upload = null;

    setPhotos(() => [...updatedPhotos, deletedPhoto]);
    props.setFieldValue('photos', updatedPhotos);
  };

  const handleFullScreen = (event) => {
    const element = event.target;

    // Prevent default click/tap behavior if fullscreen is triggered
    event.stopPropagation();

    // Check if any element is in full-screen mode
    if (
      document.fullscreenElement ||
      document.webkitFullscreenElement ||
      document.mozFullScreenElement ||
      document.msFullscreenElement
    ) {
      setIsFullScreen(false);
      // Exit full-screen mode
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.webkitExitFullscreen) {
        // Chrome, Safari, Opera
        document.webkitExitFullscreen();
      } else if (document.mozCancelFullScreen) {
        // Firefox
        document.mozCancelFullScreen();
      } else if (document.msExitFullscreen) {
        // IE/Edge
        document.msExitFullscreen();
      }
    } else {
      setIsFullScreen(true);
      // Otherwise, request full-screen mode
      if (element.requestFullscreen) {
        element.requestFullscreen();
      } else if (element.mozRequestFullScreen) {
        // Firefox
        element.mozRequestFullScreen();
      } else if (element.webkitRequestFullscreen) {
        // Chrome, Safari, and Opera
        element.webkitRequestFullscreen();
      } else if (element.msRequestFullscreen) {
        // IE/Edge
        element.msRequestFullscreen();
      }
    }
  };

  return (
    <Box maxWidth={{ xs: '370px', sm: '700px' }} width="100%" mx="auto">
      <Swiper
        modules={[Navigation, Pagination, A11y]}
        spaceBetween={20}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
      >
        {photos.map((photo, i) => {
          if (!photo?.upload) return null;
          return (
            <SwiperSlide key={i} style={{ position: 'relative' }}>
              <IconButton
                onClick={() => handleDeletePhoto(photos[i].id)}
                sx={{ position: 'absolute', top: '2%', right: '2%' }}
              >
                <Delete size="large" />
              </IconButton>

              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  minWidth: '250px',
                  maxWidth: { xs: '250px', sm: '300px' },
                  height: { xs: '350px', sm: '400px' },
                  mx: 'auto',
                  overflow: 'hidden',
                }}
              >
                <img
                  src={createPreview(photo.upload)}
                  alt="img"
                  loading="lazy"
                  style={{
                    width: 'auto',
                    height: '100%',
                    objectFit: isFullScreen ? 'contain' : 'cover',
                  }}
                  onClick={handleFullScreen}
                />
              </Box>
            </SwiperSlide>
          );
        })}

        {media.map((video, i) => {
          if (!video?.upload) return null;
          return (
            <SwiperSlide key={i} style={{ position: 'relative' }}>
              <IconButton
                onClick={() => handleDeletePhoto(media[i].id)}
                sx={{ position: 'absolute', top: '2%', right: '2%' }}
              >
                <Delete size="large" />
              </IconButton>

              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  minWidth: '250px',
                  maxWidth: { xs: '250px', sm: '300px' },
                  height: { xs: '350px', sm: '400px' },
                  mx: 'auto',
                  overflow: 'hidden',
                }}
              >
                <video
                  src={createPreview(video.upload)}
                  alt="img"
                  loading="lazy"
                  style={{
                    width: 'fit-content',
                    height: '100%',
                    objectFit: isFullScreen ? 'contain' : 'cover',
                  }}
                  onClick={handleFullScreen}
                />
              </Box>
            </SwiperSlide>
          );
        })}

        <SwiperSlide>
          <Stack
            direction="column"
            justifyContent="stretch"
            alignItems="center"
            sx={{ height: { xs: '350px', sm: '400px' } }}
          >
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minWidth: '250px',
                maxWidth: { xs: '250px', sm: '300px' },
                height: '100%',
                mx: 'auto',
                overflow: 'hidden',
                backgroundColor: 'secondary.light',
                opacity: 0.7,
              }}
            >
              <Button
                sx={{
                  backgroundColor: 'white',
                  opacity: 1,
                  borderRadius: '50px',
                  border: '1px solid',
                  borderColor: 'white',
                  color: 'secondary.main',
                  '&:hover': {
                    backgroundColor: 'secondary.light',
                    color: 'white',
                  },
                }}
                variant="contained"
                startIcon={<Add />}
                onClick={() => imageRef.current.click()}
              >
                <input
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={(e) => {
                    let photos2 = [];
                    setPhotos((prev) => {
                      photos2 = [
                        ...prev,
                        ...Array.from(e.target.files).map((file) => ({
                          upload: file,
                          id: file.lastModified,
                        })),
                      ];
                      return photos2;
                    });
                    props.setFieldValue('photos', photos2);
                  }}
                  multiple
                  ref={imageRef}
                />
                Добавить фото
              </Button>
            </Box>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minWidth: '250px',
                maxWidth: { xs: '250px', sm: '300px' },
                height: '100%',
                mx: 'auto',
                overflow: 'hidden',
                backgroundColor: 'primary.light',
                opacity: 0.7,
              }}
            >
              <Button
                sx={{
                  backgroundColor: 'white',
                  opacity: 1,
                  borderRadius: '50px',
                  border: '1px solid',
                  borderColor: 'white',
                  color: 'primary.main',
                  '&:hover': {
                    backgroundColor: 'primary.light',
                    color: 'white',
                  },
                }}
                variant="contained"
                startIcon={<Add />}
                onClick={() => mediaRef.current.click()}
              >
                <input
                  type="file"
                  accept="video/mp4, video/webm, video/ogg, video/quicktime, video/x-msvideo, video/x-matroska, video/x-flv"
                  hidden
                  onChange={(e) => {
                    setMedia((prev) => [
                      ...prev,
                      ...Array.from(e.target.files).map((file) => ({
                        upload: file,
                        id: file.lastModified,
                        media: 'video',
                      })),
                    ]);
                    props.setFieldValue('media', media);
                  }}
                  ref={mediaRef}
                />
                Добавить видео
              </Button>
            </Box>
          </Stack>
        </SwiperSlide>
      </Swiper>
    </Box>
  );
};

MySwiper.propTypes = {
  photos: PropTypes.array,
  setPhotos: PropTypes.func,
  description: PropTypes.bool,
  errors: PropTypes.object,
  setErrors: PropTypes.func,
  reorder: PropTypes.bool,
  media: PropTypes.array,
  setMedia: PropTypes.func,
};

export default MySwiper;
