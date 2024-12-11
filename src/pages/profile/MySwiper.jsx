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

export default function MySwiper({ photos = [] }) {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

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
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          className="mySwiper2"
        >
          {photos.map((photo) => (
            <SwiperSlide key={photo?.id}>
              <Box
                sx={{
                  width: '80%',
                  mx: 'auto',
                  height: '100%',
                }}
              >
                <img src={photo?.upload} alt="girl img" />
              </Box>
            </SwiperSlide>
          ))}
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
            <img src={photo?.upload} alt="girl img" />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
