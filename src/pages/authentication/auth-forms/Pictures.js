import React from 'react';
import PropTypes from 'prop-types';
import { Navigation, Pagination, A11y, Scrollbar, Autoplay } from 'swiper/modules';

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

  const handleDeletePhoto = (id) => {
    const updatedPhotos = photos.filter((photo) => photo.id !== id);
    const deletedPhoto = photos.find((photo) => photo.id === id);
    deletedPhoto.upload = null;

    setPhotos(() => [...updatedPhotos, deletedPhoto]);
    props.setFieldValue('photos', updatedPhotos);
  };

  const handleDeleteMedia = (id) => {
    const updatedMedia = media.filter((photo) => photo.id !== id);
    const deletedPhoto = media.find((photo) => photo.id === id);
    deletedPhoto.upload = null;

    setMedia(() => [...updatedMedia, deletedPhoto]);
    props.setFieldValue('media', updatedMedia);
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
    <Box
      width="100%"
      sx={{
        '& .swiper-slide': {
          display: 'flex',
          justifyContent: 'center',
        },
      }}
    >
      <Swiper
        modules={[Navigation, Pagination, A11y, Scrollbar, Autoplay]}
        navigation
        pagination={{ clickable: true }}
        scrollbar={{ draggable: true }}
        slidesPerView="auto"
        spaceBetween={10}
        breakpoints={{
          320: { slidesPerView: 1 },
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
          1280: { slidesPerView: 4 },
        }}
      >
        <SwiperSlide>
          <Stack
            direction="column"
            justifyContent="center"
            alignItems="center"
            sx={{ height: '350px', width: '256px' }}
          >
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                overflow: 'hidden',
                width: '250px',
                height: '350px',
                border: '1px solid #ccc',
                borderTopLeftRadius: '5px',
                borderTopRightRadius: '5px',
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
                      console.log(prev);

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
                фото
              </Button>
            </Box>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                overflow: 'hidden',
                width: '250px',
                height: '350px',
                border: '1px solid #ccc',
                borderBottomRightRadius: '5px',
                borderBottomLeftRadius: '5px',
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
                видео
              </Button>
            </Box>
          </Stack>
        </SwiperSlide>
        {photos?.map((photo, i) => {
          if (!photo?.upload) return null;
          return (
            <SwiperSlide
              key={i}
              style={{
                position: 'relative',
                width: '250px',
                height: '350px',
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              <IconButton
                onClick={() => handleDeletePhoto(photos[i].id)}
                sx={{ position: 'absolute', top: '2%', right: '2%' }}
                variant="contained"
                color="error"
              >
                <Delete size="large" />
              </IconButton>

              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  overflow: 'hidden',
                  width: '250px',
                  height: '350px',
                  border: '1px solid #ccc',
                  borderRadius: '5px',
                }}
              >
                <img
                  src={createPreview(photo.upload)}
                  alt="img"
                  loading="lazy"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                  }}
                  onClick={handleFullScreen}
                />
              </Box>
            </SwiperSlide>
          );
        })}

        {media?.map((video, i) => {
          if (!video?.upload) return null;
          return (
            <SwiperSlide
              key={i}
              style={{ position: 'relative', display: 'flex', justifyContent: 'center' }}
            >
              <IconButton
                onClick={() => handleDeleteMedia(media[i].id)}
                sx={{ position: 'absolute', top: '2%', right: '2%' }}
                variant="contained"
                color="error"
              >
                <Delete size="large" />
              </IconButton>

              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  overflow: 'hidden',
                  width: '250px',
                  height: '350px',
                  border: '1px solid #ccc',
                  borderRadius: '5px',
                  mx: 'auto',
                }}
              >
                <video
                  src={createPreview(video.upload)}
                  alt="img"
                  loading="lazy"
                  style={{
                    width: 'fit-content',
                    height: '100%',
                    objectFit: 'contain',
                  }}
                  onClick={handleFullScreen}
                  controls
                />
              </Box>
            </SwiperSlide>
          );
        })}
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
