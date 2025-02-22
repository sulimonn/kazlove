import React, { useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';

import './styles.css';

// import required modules
import { FreeMode, Navigation, Thumbs, Autoplay } from 'swiper/modules';
import { Box } from '@mui/material';

export default function MySwiper({ photos = [], media = [] }) {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [isFullScreen, setIsFullScreen] = React.useState(false);

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
    <>
      {typeof thumbsSwiper === 'object' && (
        <Swiper
          style={{
            '--swiper-navigation-color': '#fff',
            '--swiper-pagination-color': '#fff',
            '--swiper-navigation-sides-offset': 0,
          }}
          spaceBetween={10}
          navigation={true}
          thumbs={{ swiper: thumbsSwiper }}
          modules={[FreeMode, Navigation, Thumbs, Autoplay]}
          autoplay={{ delay: 6000, disableOnInteraction: false }}
          className="mySwiper2"
        >
          {photos.map((photo) => (
            <SwiperSlide key={photo?.id}>
              <Box
                sx={{
                  width: '80%',
                  mx: 'auto',
                  height: '100%',
                  overflow: 'hidden',
                }}
              >
                <img
                  src={photo?.upload}
                  alt="girl img"
                  style={{
                    objectFit: isFullScreen ? 'contain' : 'cover',
                  }}
                  onClick={handleFullScreen}
                />
              </Box>
            </SwiperSlide>
          ))}
          {media?.map((video, i) => {
            if (!video?.upload) return null;
            return (
              <SwiperSlide key={i} style={{ position: 'relative' }}>
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
                    src={video.upload}
                    alt="video"
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
        </Swiper>
      )}

      <Swiper
        onSwiper={setThumbsSwiper}
        spaceBetween={10}
        slidesPerView={3}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper"
      >
        {photos.map((photo) => (
          <SwiperSlide key={photo?.id}>
            <img src={photo?.upload} alt="girl img" loading="lazy" />
          </SwiperSlide>
        ))}
        {media?.map((video) => (
          <SwiperSlide key={video?.id}>
            <video
              src={video?.upload}
              alt="video img"
              loading="lazy"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
